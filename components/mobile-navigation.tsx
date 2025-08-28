"use client"

import { Home, CreditCard, DollarSign, Wallet, PieChart } from "lucide-react"
import React from "react"
import { useNavbarLinks } from "@/hooks/use-navbar-links"
import { usePathname } from "next/navigation"

export default function MobileNavigation() {
  const { getNavigationUrls } = useNavbarLinks()
  const navigationUrls = getNavigationUrls()
  const pathname = usePathname()

  const ACTIVE = "#1DA1F2"
  const INACTIVE = "#9E9E9E"

  const items = [
    { id: "muadee", title: "Thẻ muadee", url: navigationUrls.muadee, icon: CreditCard },
    { id: "tnex", title: "Vay Tnex", url: navigationUrls.tnex, icon: DollarSign },
    // center is home
    { id: "home", title: "Trang chủ", url: navigationUrls.home, icon: Home, center: true },
    { id: "fe", title: "Vay FE", url: navigationUrls.fe, icon: Wallet },
    { id: "cub", title: "Vay CUB", url: navigationUrls.cub, icon: PieChart },
  ] as const

  const isActive = (url?: string) => {
    if (!url) return false
    try {
      const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost")
      return pathname === u.pathname
    } catch {
      return false
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
      {/* Container with rounded background */}
      <div className="relative mx-0 px-3 pb-2 pt-3 bg-white border-t border-slate-200 shadow-2xl">
        {/* Grid with space for centered FAB */}
        <div className="grid grid-cols-5 items-end">
          {items.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.url)
            const color = active ? ACTIVE : INACTIVE

            if (item.center) {
              return (
                <div key={item.id} className="flex items-end justify-center">
                  <a
                    href={item.url}
                    className="-mt-10 mb-0 inline-flex flex-col items-center justify-center"
                  >
                    {/* Floating action button */}
                    <div
                      className="w-16 h-16 rounded-full shadow-xl flex items-center justify-center"
                      style={{ backgroundColor: ACTIVE }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="mt-1 text-xs font-semibold" style={{ color: ACTIVE }}>Trang chủ</span>
                  </a>
                </div>
              )
            }

            return (
              <a
                key={item.id}
                href={item.url || "#"}
                onClick={(e) => {
                  if (!item.url) e.preventDefault()
                }}
                className="flex flex-col items-center justify-center py-1"
              >
                <Icon className="w-6 h-6" style={{ color }} />
                <span className="text-[11px] mt-1 font-medium" style={{ color }}>
                  {item.title}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
