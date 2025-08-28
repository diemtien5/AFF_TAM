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
        className="md:hidden p-2 hover:bg-blue-50 rounded-xl border border-blue-100/60 shadow-sm transition-all duration-300 hover:scale-105"
      >
        <Menu className="w-6 h-6 text-blue-600" />
      </Button>

      {/* Beautiful gradient overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-800/70 to-purple-900/80 z-40 md:hidden animate-in fade-in duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Modern gradient drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] max-w-[380px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-2xl z-50 transform transition-all duration-500 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with beautiful gradient */}
        <div className="p-6 border-b border-white/30 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg ring-4 ring-white/30">
                {consultant?.avatar ? (
                  <Image src={consultant.avatar} alt={consultant.name} width={56} height={56} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center text-white text-xl">👤</div>
                )}
              </div>
              <div>
                <div className="text-sm text-white/80 font-medium">Tư vấn viên</div>
                <div className="font-bold text-white text-lg leading-tight">{consultant?.name || "Hỗ trợ tài chính"}</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-white/20 rounded-full text-white hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Navigation list with smooth animations */}
        <nav className="px-3 py-4 space-y-2">
          {[
            { id: "home", title: "Trang chủ", href: navigationUrls.home, icon: <Home className="w-6 h-6" />, color: "from-emerald-500 to-teal-500" },
            { id: "muadee", title: "Thẻ Muadee", href: navigationUrls.muadee, icon: <CreditCard className="w-6 h-6" />, color: "from-blue-500 to-indigo-500" },
            { id: "tnex", title: "Vay Tnex", href: navigationUrls.tnex, icon: <Wallet className="w-6 h-6" />, color: "from-orange-500 to-red-500" },
            { id: "fe", title: "Vay FE", href: navigationUrls.fe, icon: <DollarSign className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
            { id: "cub", title: "Vay CUB", href: navigationUrls.cub, icon: <DollarSign className="w-6 h-6" />, color: "from-green-500 to-emerald-500" },
          ].map((item, index) => (
            <div
              key={item.id}
              className={`transform transition-all duration-300 ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={item.href || "#"}
                onClick={(e) => {
                  if (!item.href) e.preventDefault()
                  else toggleSidebar()
                }}
                className={`group flex items-center justify-between mx-1 px-4 py-4 rounded-2xl border transition-all duration-300 ${
                  item.href
                    ? "bg-white/80 hover:bg-white border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white/60 border-white/40 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center space-x-4 text-slate-700 group-hover:text-slate-900">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-lg">{item.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-all duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </nav>

        {/* Beautiful CTA zone */}
        {consultant && (
          <div className="p-5 border-t border-white/30 bg-gradient-to-br from-white/90 to-slate-50/90">
            <div className="grid grid-cols-2 gap-4">
              <Button
                className="h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  window.open(`tel:${consultant.phone}`, "_self")
                  toggleSidebar()
                }}
              >
                <Phone className="w-5 h-5 mr-2" /> Gọi ngay
              </Button>
              <Button
                className="h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  window.open(consultant.zalo_link || `https://zalo.me/${consultant.zalo}`, "_blank")
                  toggleSidebar()
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" /> Chat Zalo
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-slate-600 font-medium">🔒 Bảo mật thông tin tuyệt đối</div>
          </div>
        )}
      </div>
    </>
  )
}
