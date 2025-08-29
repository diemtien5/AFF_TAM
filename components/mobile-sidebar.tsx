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

  const toggleSidebar = () => setIsOpen((v) => !v)

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
      {/* Hamburger Button - Right side */}
      <div className="md:hidden flex items-center relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 relative z-[1200]"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-slate-800" />
        </Button>

        {/* Dropdown Panel - 2/3 width, right-aligned, no height limit */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-[66vw] max-w-[350px] z-[1201]">
            <div className="rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/60 overflow-hidden">
              {/* Header section */}
              <div className="px-6 py-6 border-b border-white/40 bg-gradient-to-br from-white/90 to-slate-50/90">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Menu</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="hover:bg-slate-100/80 rounded-full text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* User info with avatar - removed balance line */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-white/60 shadow-lg">
                    {consultant?.avatar ? (
                      <Image src={consultant.avatar} alt={consultant.name} width={56} height={56} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 text-xl">👤</div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Xin chào</div>
                    <div className="font-bold text-slate-900 text-lg leading-tight">{consultant?.name || "Khách hàng"}</div>
                  </div>
                </div>
              </div>

              {/* Navigation tabs in single card block */}
              <nav className="px-4 py-4">
                <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-inner">
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
                        className={`flex items-center justify-between px-5 py-4 transition-all duration-300 ${
                          active
                            ? "bg-[#1DA1F2] shadow-lg"
                            : "bg-transparent hover:bg-slate-50/80"
                        } ${idx !== items.length - 1 ? "border-b border-white/40" : ""}`}
                        style={{
                          borderRadius: idx === 0 ? "16px 16px 0 0" : idx === items.length - 1 ? "0 0 16px 16px" : undefined
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            active
                              ? "bg-white/20 shadow-inner"
                              : "bg-slate-100/80 shadow-sm"
                          }`}>
                            <Icon className="w-5 h-5" style={{ color }} />
                          </div>
                          <span className={`text-base font-medium transition-colors ${
                            active ? "text-white font-semibold" : "text-slate-700"
                          }`}>
                            {item.title}
                          </span>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </nav>

              {/* Footer actions with enhanced neumorphism style */}
              <div className="px-4 pt-3 pb-6 border-t border-white/40 bg-gradient-to-br from-white/60 to-slate-50/60">
                <div className="space-y-3">
                  <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-slate-100/90 to-slate-200/90 hover:from-slate-200/90 hover:to-slate-300/90 text-slate-700 border border-white/60 shadow-inner hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <Settings className="w-5 h-5 mr-3" /> Cài đặt
                  </Button>

                  <Button
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-slate-100/90 to-slate-200/90 hover:from-slate-200/90 hover:to-slate-300/90 text-slate-700 border border-white/60 shadow-inner hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                    onClick={() => {
                      const url = consultant?.zalo_link || (consultant?.zalo ? `https://zalo.me/${consultant.zalo}` : "")
                      if (url) window.open(url, "_blank")
                    }}
                  >
                    <PhoneCall className="w-5 h-5 mr-3" /> Hỗ trợ
                  </Button>

                  <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm" onClick={toggleSidebar}>
                    <LogOut className="w-5 h-5 mr-3" /> Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dark overlay when menu is open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100] md:hidden" onClick={toggleSidebar} />
      )}
    </>
  )
}
