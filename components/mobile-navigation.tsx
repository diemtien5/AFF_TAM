"use client"

import { Home, CreditCard, DollarSign, Wallet } from "lucide-react"
import React from "react"
import { useNavbarLinks } from "@/hooks/use-navbar-links"

export default function MobileNavigation() {
  const { getNavigationUrls } = useNavbarLinks()
  const navigationUrls = getNavigationUrls()

  const items = [
    { id: "home", title: "Trang chủ", url: navigationUrls.home, icon: <Home className="w-5 h-5 mb-1" /> },
    { id: "muadee", title: "Thẻ Muadee", url: navigationUrls.muadee || "", icon: <CreditCard className="w-5 h-5 mb-1" /> },
    { id: "tnex", title: "Vay Tnex", url: navigationUrls.tnex || "", icon: <Wallet className="w-5 h-5 mb-1" /> },
    { id: "fe", title: "Vay FE", url: navigationUrls.fe || "", icon: <DollarSign className="w-5 h-5 mb-1" /> },
    { id: "cub", title: "Vay CUB", url: navigationUrls.cub || "", icon: <DollarSign className="w-5 h-5 mb-1" /> },
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
