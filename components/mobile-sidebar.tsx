"use client"

import { useState } from "react"
import { Menu, X, Home, CreditCard, DollarSign, Wallet, Phone, MessageCircle, Shield, ChevronRight } from "lucide-react"
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="md:hidden p-2 hover:bg-blue-50 rounded-xl border border-blue-100/60 shadow-sm transition-colors"
      >
        <Menu className="w-6 h-6 text-blue-600" />
      </Button>

      {/* Dim overlay with blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Modern Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[86%] max-w-[360px] bg-white/95 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with consultant */}
        <div className="p-5 border-b border-slate-200/70 bg-gradient-to-br from-white to-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shadow ring-2 ring-blue-100">
                {consultant?.avatar ? (
                  <Image src={consultant.avatar} alt={consultant.name} width={48} height={48} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-700">👤</div>
                )}
              </div>
              <div>
                <div className="text-sm text-slate-500">Tư vấn viên</div>
                <div className="font-semibold text-slate-800 leading-tight">{consultant?.name || "Hỗ trợ tài chính"}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-slate-100 rounded-xl">
              <X className="w-5 h-5 text-slate-700" />
            </Button>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-2 py-3">
          {[
            { id: "home", title: "Trang chủ", href: navigationUrls.home, icon: <Home className="w-5 h-5" /> },
            { id: "muadee", title: "Thẻ Muadee", href: navigationUrls.muadee, icon: <CreditCard className="w-5 h-5" /> },
            { id: "tnex", title: "Vay Tnex", href: navigationUrls.tnex, icon: <Wallet className="w-5 h-5" /> },
            { id: "fe", title: "Vay FE", href: navigationUrls.fe, icon: <DollarSign className="w-5 h-5" /> },
            { id: "cub", title: "Vay CUB", href: navigationUrls.cub, icon: <DollarSign className="w-5 h-5" /> },
          ].map((item) => (
            <a
              key={item.id}
              href={item.href || "#"}
              onClick={(e) => {
                if (!item.href) e.preventDefault()
                else toggleSidebar()
              }}
              className={`group flex items-center justify-between mx-2 my-1 px-4 py-3 rounded-xl border transition-all ${
                item.href
                  ? "bg-white/70 hover:bg-white border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md"
                  : "bg-white/60 border-slate-200/70 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center space-x-3 text-slate-700 group-hover:text-blue-700">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </a>
          ))}
        </nav>

        {/* CTA zone */}
        {consultant && (
          <div className="p-4 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            <div className="grid grid-cols-2 gap-3">
              <Button
                className="h-11 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
                onClick={() => {
                  window.open(`tel:${consultant.phone}`, "_self")
                  toggleSidebar()
                }}
              >
                <Phone className="w-4 h-4 mr-2" /> Gọi ngay
              </Button>
              <Button
                className="h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-md"
                onClick={() => {
                  window.open(consultant.zalo_link || `https://zalo.me/${consultant.zalo}`, "_blank")
                  toggleSidebar()
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Chat Zalo
              </Button>
            </div>
            <div className="mt-3 text-center text-xs text-slate-500">Bảo mật thông tin tuyệt đối</div>
          </div>
        )}
      </div>
    </>
  )
}
