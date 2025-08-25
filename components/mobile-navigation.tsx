"use client"

import { Home, CreditCard, DollarSign, Wallet } from "lucide-react"
import React from "react"

interface NavbarLink {
  id: string
  title: string
  url: string
}

interface MobileNavigationProps {
  navbarLinks: NavbarLink[]
}

export default function MobileNavigation({ navbarLinks }: MobileNavigationProps) {
  const normalize = (s: string) => (s || "").normalize("NFD").replace(/\p{Diacritic}+/gu, "").toLowerCase().trim()

  const findUrl = (keywords: string[]): string | null => {
    // 1) match theo tab param
    const byTab = (navbarLinks || []).find((l) => {
      const url = l.url || ""
      const m = /[?&]tab=([^&#]+)/i.exec(url)
      if (!m) return false
      const tab = normalize(m[1])
      return keywords.some((k) => tab.includes(normalize(k)))
    })
    if (byTab && byTab.url) return byTab.url

    // 2) fallback theo tiêu đề
    const byTitle = (navbarLinks || []).find((l) => {
      const t = normalize(l.title || "")
      return keywords.some((k) => t.includes(normalize(k)))
    })
    return byTitle && byTitle.url ? byTitle.url : null
  }

  const items = [
    { id: "home", title: "Trang chủ", url: findUrl(["trang chu", "home"]) || "/", icon: <Home className="w-5 h-5 mb-1" /> },
    { id: "muadee", title: "Thẻ Muadee", url: findUrl(["muadee"]) || "", icon: <CreditCard className="w-5 h-5 mb-1" /> },
    { id: "tnex", title: "Vay Tnex", url: findUrl(["tnex"]) || "", icon: <Wallet className="w-5 h-5 mb-1" /> },
    { id: "fe", title: "Vay FE", url: findUrl(["fe", "fe credit", "fecredit"]) || "", icon: <DollarSign className="w-5 h-5 mb-1" /> },
    { id: "cub", title: "Vay CUB", url: findUrl(["cub"]) || "", icon: <DollarSign className="w-5 h-5 mb-1" /> },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {items.map((link) => (
          <a
            key={link.id}
            href={link.url || "#"}
            className={`flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors ${link.url ? "text-gray-600 hover:text-blue-600" : "text-gray-400 cursor-not-allowed"}`}
            onClick={(e) => {
              if (!link.url) e.preventDefault()
            }}
          >
            {link.icon}
            <span className="truncate w-full text-center">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
