"use client"

import { useState } from "react"
import { Menu, X, Home, CreditCard, DollarSign, Wallet, Phone, MessageCircle, ChevronRight } from "lucide-react"
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

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
        className="md:hidden p-2 hover:bg-slate-100 rounded-xl border border-slate-200 shadow-sm transition-all duration-300"
      >
        <Menu className="w-6 h-6 text-slate-800" />
      </Button>

      {/* Solid overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Clean solid drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[88%] max-w-[370px] bg-white z-50 transform transition-transform duration-400 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
                <div className="text-xs text-slate-500">Tư vấn viên</div>
                <div className="font-semibold text-slate-900 leading-tight">{consultant?.name || "Hỗ trợ tài chính"}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-slate-100 rounded-full">
              <X className="w-5 h-5 text-slate-700" />
            </Button>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="px-2 py-3">
          {[
            { id: "home", title: "Trang chủ", href: navigationUrls.home, icon: <Home className="w-5 h-5" /> },
            { id: "muadee", title: "Thẻ Muadee", href: navigationUrls.muadee, icon: <CreditCard className="w-5 h-5" /> },
            { id: "tnex", title: "Vay Tnex", href: navigationUrls.tnex, icon: <DollarSign className="w-5 h-5" /> },
            { id: "fe", title: "Vay FE", href: navigationUrls.fe, icon: <Wallet className="w-5 h-5" /> },
            { id: "cub", title: "Vay CUB", href: navigationUrls.cub, icon: <DollarSign className="w-5 h-5" /> },
          ].map((item, index) => (
            <a
              key={item.id}
              href={item.href || "#"}
              onClick={(e) => {
                if (!item.href) e.preventDefault()
                else toggleSidebar()
              }}
              className={`group flex items-center justify-between mx-2 my-1 px-4 py-3 rounded-xl border transition-all duration-300 ${
                item.href
                  ? "bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
                  : "bg-white border-slate-200 opacity-60 cursor-not-allowed"
              }`}
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        {consultant && (
          <div className="p-4 border-t border-slate-200 space-y-3">
            <Button
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-black text-white shadow"
              onClick={() => {
                window.open(`tel:${consultant.phone}`, "_self")
                toggleSidebar()
              }}
            >
              <Phone className="w-4 h-4 mr-2" /> Gọi ngay
            </Button>

            <Button
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow"
              onClick={() => {
                window.open(consultant.zalo_link || `https://zalo.me/${consultant.zalo}`, "_blank")
                toggleSidebar()
              }}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Chat Zalo
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
