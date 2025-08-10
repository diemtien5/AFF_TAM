import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { NavbarLink } from "@/types"

export function useNavbarLinks() {
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNavbarLinks()
  }, [])

  const fetchNavbarLinks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("navbar_links")
        .select("*")
        .order("created_at", { ascending: true })

      if (error) throw error
      setNavbarLinks(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch navbar links")
    } finally {
      setLoading(false)
    }
  }

  const addNavbarLink = async (linkData: Omit<NavbarLink, "id" | "created_at">) => {
    try {
      const { data, error } = await supabase
        .from("navbar_links")
        .insert([linkData])
        .select()
        .single()

      if (error) throw error
      setNavbarLinks(prev => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add navbar link")
      throw err
    }
  }

  const updateNavbarLink = async (id: string, updates: Partial<NavbarLink>) => {
    try {
      const { data, error } = await supabase
        .from("navbar_links")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      setNavbarLinks(prev => prev.map(link => link.id === id ? data : link))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update navbar link")
      throw err
    }
  }

  const deleteNavbarLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from("navbar_links")
        .delete()
        .eq("id", id)

      if (error) throw error
      setNavbarLinks(prev => prev.filter(link => link.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete navbar link")
      throw err
    }
  }

  return {
    navbarLinks,
    loading,
    error,
    fetchNavbarLinks,
    addNavbarLink,
    updateNavbarLink,
    deleteNavbarLink,
  }
} 