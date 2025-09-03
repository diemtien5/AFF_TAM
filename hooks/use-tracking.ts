"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export interface OfferImpression {
  id: string
  offer_id: string
  platform_source: string
  created_at: string
  loan_packages?: {
    id: string
    name: string
    bank_name: string
  }
}

export interface ClickTracking {
  id: string
  offer_id: string
  platform_source: string
  device: string | null
  session_id: string | null
  stay_time: number | null
  scroll_depth: number | null
  created_at: string
  loan_packages?: {
    id: string
    name: string
    bank_name: string
  }
}

export interface TrackingStats {
  totalImpressions: number
  totalClicks: number
  clickThroughRate: number
  avgStayTime: number
  avgScrollDepth: number
  impressionsByPlatform: Record<string, number>
  clicksByPlatform: Record<string, number>
  impressionsByOffer: Record<string, { name: string; count: number }>
  clicksByOffer: Record<string, { name: string; count: number }>
}

export function useTracking() {
  const [impressions, setImpressions] = useState<OfferImpression[]>([])
  const [clicks, setClicks] = useState<ClickTracking[]>([])
  const [stats, setStats] = useState<TrackingStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrackingData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch impressions with loan package info
      const { data: impressionsData, error: impressionsError } = await supabase
        .from("offer_impressions")
        .select(`
          *,
          loan_packages (
            id,
            name,
            bank_name
          )
        `)
        .order("created_at", { ascending: false })

      if (impressionsError) {
        console.error("Impressions error:", impressionsError)
        throw new Error(`Lỗi khi tải dữ liệu impressions: ${impressionsError.message}`)
      }

      // Fetch clicks with loan package info
      const { data: clicksData, error: clicksError } = await supabase
        .from("click_tracking")
        .select(`
          *,
          loan_packages (
            id,
            name,
            bank_name
          )
        `)
        .order("created_at", { ascending: false })

      if (clicksError) {
        console.error("Clicks error:", clicksError)
        throw new Error(`Lỗi khi tải dữ liệu clicks: ${clicksError.message}`)
      }

      setImpressions(impressionsData || [])
      setClicks(clicksData || [])

      // Calculate stats
      const calculatedStats = calculateStats(impressionsData || [], clicksData || [])
      setStats(calculatedStats)

    } catch (err) {
      console.error("Error fetching tracking data:", err)
      const errorMessage = err instanceof Error ? err.message : "Lỗi không xác định khi tải dữ liệu tracking"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (impressions: OfferImpression[], clicks: ClickTracking[]): TrackingStats => {
    const totalImpressions = impressions.length
    const totalClicks = clicks.length
    const clickThroughRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

    // Calculate average stay time
    const validStayTimes = clicks.filter(c => c.stay_time !== null).map(c => c.stay_time!)
    const avgStayTime = validStayTimes.length > 0
      ? validStayTimes.reduce((sum, time) => sum + time, 0) / validStayTimes.length
      : 0

    // Calculate average scroll depth
    const validScrollDepths = clicks.filter(c => c.scroll_depth !== null).map(c => c.scroll_depth!)
    const avgScrollDepth = validScrollDepths.length > 0
      ? validScrollDepths.reduce((sum, depth) => sum + depth, 0) / validScrollDepths.length
      : 0

    // Group by platform
    const impressionsByPlatform: Record<string, number> = {}
    const clicksByPlatform: Record<string, number> = {}

    impressions.forEach(imp => {
      impressionsByPlatform[imp.platform_source] = (impressionsByPlatform[imp.platform_source] || 0) + 1
    })

    clicks.forEach(click => {
      clicksByPlatform[click.platform_source] = (clicksByPlatform[click.platform_source] || 0) + 1
    })

    // Group by offer
    const impressionsByOffer: Record<string, { name: string; count: number }> = {}
    const clicksByOffer: Record<string, { name: string; count: number }> = {}

    impressions.forEach(imp => {
      const offerName = imp.loan_packages?.name || `Offer ${imp.offer_id}`
      if (!impressionsByOffer[imp.offer_id]) {
        impressionsByOffer[imp.offer_id] = { name: offerName, count: 0 }
      }
      impressionsByOffer[imp.offer_id].count++
    })

    clicks.forEach(click => {
      const offerName = click.loan_packages?.name || `Offer ${click.offer_id}`
      if (!clicksByOffer[click.offer_id]) {
        clicksByOffer[click.offer_id] = { name: offerName, count: 0 }
      }
      clicksByOffer[click.offer_id].count++
    })

    return {
      totalImpressions,
      totalClicks,
      clickThroughRate,
      avgStayTime,
      avgScrollDepth,
      impressionsByPlatform,
      clicksByPlatform,
      impressionsByOffer,
      clicksByOffer
    }
  }

  useEffect(() => {
    fetchTrackingData()
  }, [])

  return {
    impressions,
    clicks,
    stats,
    loading,
    error,
    refresh: fetchTrackingData
  }
}
