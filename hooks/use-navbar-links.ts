"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { NavbarLink } from "@/types"

export function useNavbarLinks() {
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNavbarLinks()
  }, [])

  const fetchNavbarLinks = async () => {
    try {
      const { data: links } = await supabase
        .from("navbar_links")
        .select("*")
        .order("created_at", { ascending: true })

      setNavbarLinks(links || [])
    } catch (error) {
      console.error("Error fetching navbar links:", error)
    } finally {
      setLoading(false)
    }
  }

  const getUrlFor = (keywords: string[]): string | null => {
    const links = navbarLinks || []

    const normalize = (s: string) =>
      (s || "")
        .normalize("NFD")
        .replace(/\p{Diacritic}+/gu, "")
        .toLowerCase()
        .trim()

    // 1) Ưu tiên match theo tham số tab trong URL
    const byTab = links.find((l) => {
      const url = l.url || ""
      const tabMatch = /[?&]tab=([^&#]+)/i.exec(url)
      if (!tabMatch) return false
      const tab = normalize(tabMatch[1])
      return keywords.some((k) => tab.includes(normalize(k)))
    })
    if (byTab && byTab.url) return byTab.url

    // 2) Fallback: match theo tiêu đề đã normalize
    const byTitle = links.find((l) => {
      const t = normalize(l.title || "")
      return keywords.some((k) => t.includes(normalize(k)))
    })
    return byTitle && byTitle.url ? byTitle.url : null
  }

  const getNavigationUrls = () => {
    // Fallback mặc định đến các trang nội bộ khi admin chưa cấu hình
    const defaults = {
      home: "/",
      muadee: "/the-muadee",
      tnex: "/vay-tnex",
      fe: "/vay-fe",
      cub: "/vay-cub",
    }

    return {
      home: getUrlFor(["trang chu", "home"]) || defaults.home,
      muadee: getUrlFor(["muadee"]) || defaults.muadee,
      tnex: getUrlFor(["tnex"]) || defaults.tnex,
      fe: getUrlFor(["fe", "fe credit", "fecredit"]) || defaults.fe,
      cub: getUrlFor(["cub"]) || defaults.cub,
    }
  }

  return {
    navbarLinks,
    loading,
    getUrlFor,
    getNavigationUrls,
    refresh: fetchNavbarLinks
  }
}
