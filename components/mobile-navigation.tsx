"use client"

import { Home, CreditCard, DollarSign, Wallet, Sparkles } from "lucide-react"
import React from "react"
import { useNavbarLinks } from "@/hooks/use-navbar-links"

export default function MobileNavigation() {
  const { getNavigationUrls } = useNavbarLinks()
  const navigationUrls = getNavigationUrls()

  const items = [
    {
      id: "home",
      title: "Trang chủ",
      url: navigationUrls.home,
      icon: <Home className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500",
      activeColor: "from-emerald-600 to-teal-600"
    },
    {
      id: "muadee",
      title: "Thẻ Muadee",
      url: navigationUrls.muadee || "",
      icon: <CreditCard className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500",
      activeColor: "from-blue-600 to-indigo-600"
    },
    {
      id: "tnex",
      title: "Vay Tnex",
      url: navigationUrls.tnex || "",
      icon: <Wallet className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      activeColor: "from-orange-600 to-red-600"
    },
    {
      id: "fe",
      title: "Vay FE",
      url: navigationUrls.fe || "",
      icon: <DollarSign className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      activeColor: "from-purple-600 to-pink-600"
    },
    {
      id: "cub",
      title: "Vay CUB",
      url: navigationUrls.cub || "",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      activeColor: "from-green-600 to-emerald-600"
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/60 md:hidden z-50 shadow-2xl">
      {/* Main navigation bar */}
      <div className="grid grid-cols-5 gap-1 px-2 py-3">
        {items.map((link) => (
          <a
            key={link.id}
            href={link.url || "#"}
            className={`group relative flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-300 ${
              link.url
                ? "hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 hover:scale-105"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!link.url) e.preventDefault()
            }}
          >
            {/* Active indicator */}
            {link.url && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-150"></div>
            )}

            {/* Icon with gradient background */}
            <div className={`relative mb-2 w-12 h-12 rounded-2xl bg-gradient-to-r ${link.color} text-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 ${
              link.url ? "group-hover:from-slate-100 group-hover:to-blue-100" : ""
            }`}>
              {link.icon}
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Title */}
            <span className={`text-xs font-semibold text-center transition-all duration-300 ${
              link.url
                ? "text-slate-700 group-hover:text-slate-900"
                : "text-slate-400"
            }`}>
              {link.title}
            </span>

            {/* Hover effect line */}
            {link.url && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-8 transition-all duration-300"></div>
            )}
          </a>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-full mx-4 mb-1 opacity-60"></div>
    </div>
  )
}
