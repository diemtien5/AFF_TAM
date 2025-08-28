"use client"

import { useState } from "react"
import { Menu, X, Home, CreditCard, DollarSign, Wallet, PieChart, Settings, PhoneCall, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useNavbarLinks } from "@/hooks/use-navbar-links"

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

  const ACTIVE = "#1DA1F2"
  const INACTIVE = "#9E9E9E"

  const toggleSidebar = () => setIsOpen(!isOpen)

  const items = [
    { id: "home", title: "Trang chủ", href: navigationUrls.home, icon: Home },
    { id: "muadee", title: "Thẻ muadee", href: navigationUrls.muadee, icon: CreditCard },
    { id: "tnex", title: "Vay Tnex", href: navigationUrls.tnex, icon: DollarSign },
    { id: "fe", title: "Vay FE", href: navigationUrls.fe, icon: Wallet },
    { id: "cub", title: "Vay CUB", href: navigationUrls.cub, icon: PieChart },
    { id: "settings", title: "Cài đặt", href: "#", icon: Settings },
    { id: "support", title: "Hỗ trợ", href: consultant?.zalo_link || (consultant?.zalo ? `https://zalo.me/${consultant.zalo}` : "#"), icon: PhoneCall },
  ] as const

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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Off-Canvas Sidebar: 70% width */}
      <aside
        className={`fixed top-0 left-0 h-full w-[70%] max-w-[360px] bg-white z-50 transform transition-transform duration-400 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200">
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

        {/* Menu list */}
        <nav className="py-2">
          {items.map((item, idx) => {
            const Icon = item.icon
            const disabled = !item.href || item.href === "#"
            const color = disabled ? INACTIVE : ACTIVE
            return (
              <a
                key={item.id}
                href={item.href || "#"}
                onClick={(e) => {
                  if (disabled) e.preventDefault()
                  else toggleSidebar()
                }}
                className={`mx-3 my-1 flex items-center justify-between rounded-xl px-4 py-3 border shadow-sm transition-all duration-300 ${
                  disabled
                    ? "border-slate-200 text-slate-400 cursor-not-allowed bg-white"
                    : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <span className="text-[15px] font-medium" style={{ color: disabled ? INACTIVE : "#111827" }}>{item.title}</span>
                </div>
              </a>
            )
          })}
        </nav>

        {/* Footer Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <Button className="w-full h-11 rounded-xl bg-slate-900 hover:bg-black text-white shadow" onClick={toggleSidebar}>
            <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
          </Button>
        </div>
      </aside>
    </>
  )
}
