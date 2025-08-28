"use client"

import { useState } from "react"
import { Menu, X, Home, CreditCard, DollarSign, Wallet, PieChart, Settings, PhoneCall, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useNavbarLinks } from "@/hooks/use-navbar-links"
import { usePathname } from "next/navigation"

interface Consultant {
  id: string
  name: string
  avatar: string
  phone: string
  zalo: string
  zalo_link?: string
}

interface MobileSidebarProps {
  consultant: Consultant | null
}

export default function MobileSidebar({ consultant }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { getNavigationUrls } = useNavbarLinks()
  const navigationUrls = getNavigationUrls()
  const pathname = usePathname()

  const ACTIVE = "#1DA1F2"
  const INACTIVE = "#9E9E9E"

  const toggleSidebar = () => setIsOpen(!isOpen)

  const items = [
    { id: "home", title: "Trang chủ", href: navigationUrls.home, icon: Home },
    { id: "muadee", title: "Thẻ muadee", href: navigationUrls.muadee, icon: CreditCard },
    { id: "tnex", title: "Vay Tnex", href: navigationUrls.tnex, icon: DollarSign },
    { id: "fe", title: "Vay FE", href: navigationUrls.fe, icon: Wallet },
    { id: "cub", title: "Vay CUB", href: navigationUrls.cub, icon: PieChart },
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
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="md:hidden p-2 hover:bg-slate-100 rounded-xl border border-slate-200 shadow-sm transition-all duration-300"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-slate-800" />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[1000] md:hidden" onClick={toggleSidebar} />
      )}

      {/* Off-Canvas Sidebar: 70% width */}
      <aside
        className={`fixed top-0 left-0 h-full w-[70%] max-w-[360px] bg-slate-50 z-[1001] transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Card container (single block) */}
        <div className="h-full p-4">
          <div className="flex flex-col h-full rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
            {/* Header: avatar + name + balance */}
            <div className="px-4 py-4 border-b border-slate-200 bg-gradient-to-br from-white to-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-200">
                    {consultant?.avatar ? (
                      <Image src={consultant.avatar} alt={consultant.name} width={48} height={48} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600">👤</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Xin chào</div>
                    <div className="font-semibold text-slate-900 leading-tight">{consultant?.name || "Khách hàng"}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Số dư: <span className="font-semibold text-slate-800">15,800,000 ₫</span></div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-700" />
                </Button>
              </div>
            </div>

            {/* Tabs block */}
            <nav className="flex-1 px-2 py-2">
              <div className="rounded-xl bg-white border border-slate-200 shadow-inner">
                {items.map((item, idx) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  const color = active ? "#ffffff" : INACTIVE
                  return (
                    <a
                      key={item.id}
                      href={item.href || "#"}
                      onClick={(e) => {
                        if (!item.href) e.preventDefault()
                        else toggleSidebar()
                      }}
                      className={`flex items-center justify-between px-4 py-3 transition-colors ${
                        active ? "bg-[#1DA1F2]" : "bg-transparent"
                      } ${idx !== items.length - 1 ? "border-b border-slate-200/70" : ""}`}
                      style={{ borderRadius: idx === 0 ? "12px 12px 0 0" : idx === items.length - 1 ? "0 0 12px 12px" : undefined }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? "bg-white/20" : "bg-slate-100"}`}>
                          <Icon className="w-5 h-5" style={{ color }} />
                        </div>
                        <span className={`text-[15px] ${active ? "font-semibold text-white" : "font-medium"}`} style={{ color: active ? "#ffffff" : "#111827" }}>
                          {item.title}
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </nav>

            {/* Footer actions */}
            <div className="px-4 pt-2 pb-4 border-t border-slate-200 bg-white">
              <div className="grid grid-cols-3 gap-2">
                <Button className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200">
                  <Settings className="w-4 h-4 mr-2" /> Cài đặt
                </Button>
                <Button className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                  onClick={() => {
                    const url = consultant?.zalo_link || (consultant?.zalo ? `https://zalo.me/${consultant.zalo}` : "")
                    if (url) window.open(url, "_blank")
                  }}
                >
                  <PhoneCall className="w-4 h-4 mr-2" /> Hỗ trợ
                </Button>
                <Button className="h-11 rounded-xl bg-slate-900 hover:bg-black text-white shadow" onClick={toggleSidebar}>
                  <LogOut className="w-4 h-4 mr-2" /> Thoát
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
