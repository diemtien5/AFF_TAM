"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

interface TrackingSession {
  sessionId: string
  startTime: number
  scrollDepth: number
  device: string
}

export function useTrackingActions() {
  const [session, setSession] = useState<TrackingSession | null>(null)

  useEffect(() => {
    // Initialize tracking session
    const sessionId = generateSessionId()
    const startTime = Date.now()
    const device = getDeviceType()

    setSession({
      sessionId,
      startTime,
      scrollDepth: 0,
      device
    })

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100)

      setSession(prev => prev ? { ...prev, scrollDepth } : null)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (/mobile|android|iphone|ipad|tablet/.test(userAgent)) {
      return 'mobile'
    }
    return 'desktop'
  }

  const getPlatformSource = () => {
    // Determine platform based on current context
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      if (pathname.includes('/the-muadee')) return 'muadee_page'
      if (pathname.includes('/vay-tnex')) return 'tnex_page'
      if (pathname.includes('/vay-fe')) return 'fe_page'
      if (pathname.includes('/vay-cub')) return 'cub_page'
      if (pathname === '/') return 'homepage'
    }
    return 'web'
  }

  const trackImpression = async (offerId: string, customPlatform?: string) => {
    try {
      const platformSource = customPlatform || getPlatformSource()

      const { error } = await supabase
        .from('offer_impressions')
        .insert({
          offer_id: offerId,
          platform_source: platformSource
        })

      if (error) {
        console.error('Error tracking impression:', error)
        // Don't throw error to avoid breaking user experience
      }
    } catch (error) {
      console.error('Error tracking impression:', error)
      // Don't throw error to avoid breaking user experience
    }
  }

  const trackClick = async (
    offerId: string,
    customPlatform?: string,
    additionalData?: {
      stayTime?: number
      scrollDepth?: number
    }
  ) => {
    try {
      if (!session) return

      const platformSource = customPlatform || getPlatformSource()
      const stayTime = additionalData?.stayTime || Math.round((Date.now() - session.startTime) / 1000)
      const scrollDepth = additionalData?.scrollDepth || session.scrollDepth

      const { error } = await supabase
        .from('click_tracking')
        .insert({
          offer_id: offerId,
          platform_source: platformSource,
          device: session.device,
          session_id: session.sessionId,
          stay_time: stayTime,
          scroll_depth: scrollDepth
        })

      if (error) {
        console.error('Error tracking click:', error)
        // Don't throw error to avoid breaking user experience
      }
    } catch (error) {
      console.error('Error tracking click:', error)
      // Don't throw error to avoid breaking user experience
    }
  }

  const trackNavigationClick = async (navigationType: string) => {
    try {
      if (!session) return

      const { error } = await supabase
        .from('click_tracking')
        .insert({
          offer_id: 'navigation', // Special ID for navigation tracking
          platform_source: `navigation_${navigationType}`,
          device: session.device,
          session_id: session.sessionId,
          stay_time: Math.round((Date.now() - session.startTime) / 1000),
          scroll_depth: session.scrollDepth
        })

      if (error) {
        console.error('Error tracking navigation click:', error)
        // Don't throw error to avoid breaking user experience
      }
    } catch (error) {
      console.error('Error tracking navigation click:', error)
      // Don't throw error to avoid breaking user experience
    }
  }

  return {
    trackImpression,
    trackClick,
    trackNavigationClick,
    session
  }
}
