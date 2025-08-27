"use client"

import { useState } from "react"
import { Menu, X, Home, CreditCard, DollarSign, Wallet, Phone, MessageCircle, Shield } from "lucide-react"
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

  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("muadee") || lowerTitle.includes("thẻ")) {
      return <CreditCard className="w-5 h-5 text-gray-600" />
    }
    if (lowerTitle.includes("tnex")) {
      return <Wallet className="w-5 h-5 text-gray-600" />
    }
    if (lowerTitle.includes("cub") || lowerTitle.includes("fe")) {
      return <DollarSign className="w-5 h-5 text-gray-600" />
    }
    return <DollarSign className="w-5 h-5 text-gray-600" />
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button variant="ghost" size="sm" onClick={toggleSidebar} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
        <Menu className="w-6 h-6 text-gray-700" />
      </Button>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              <X className="w-6 h-6 text-gray-700" />
            </Button>
          </div>

          {/* Consultant Info */}
          {consultant && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {consultant.avatar ? (
                    <Image
                      src={consultant.avatar || "/placeholder.svg"}
                      alt={consultant.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-lg">👤</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{consultant.name}</h3>
                  <p className="text-sm text-gray-600">Nhân viên tư vấn</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-2">
            {/* Home Link */}
            <a
              href={navigationUrls.home}
              onClick={toggleSidebar}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Home className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Trang chủ</span>
            </a>

            {/* Fixed Navigation Links */}
            <a
              href={navigationUrls.muadee || "#"}
              onClick={(e) => {
                if (!navigationUrls.muadee) e.preventDefault()
                else toggleSidebar()
              }}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${navigationUrls.muadee ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
            >
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Thẻ Muadee</span>
            </a>
            <a
              href={navigationUrls.tnex || "#"}
              onClick={(e) => {
                if (!navigationUrls.tnex) e.preventDefault()
                else toggleSidebar()
              }}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${navigationUrls.tnex ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
            >
              <Wallet className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Vay Tnex</span>
            </a>
            <a
              href={navigationUrls.fe || "#"}
              onClick={(e) => {
                if (!navigationUrls.fe) e.preventDefault()
                else toggleSidebar()
              }}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${navigationUrls.fe ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
            >
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Vay FE</span>
            </a>
            <a
              href={navigationUrls.cub || "#"}
              onClick={(e) => {
                if (!navigationUrls.cub) e.preventDefault()
                else toggleSidebar()
              }}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${navigationUrls.cub ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}`}
            >
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Vay CUB</span>
            </a>

            {/* Admin Link */}
            <a
              href="http://aff.phucnguyens.id.vn/admin"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleSidebar}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors opacity-60"
            >
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Đăng nhập</span>
            </a>
          </div>

          {/* Contact Actions */}
          {consultant && (
            <div className="p-4 border-t border-gray-200 space-y-3">
              <Button
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                onClick={() => {
                  window.open(`tel:${consultant.phone}`, "_self")
                  toggleSidebar()
                }}
              >
                <Phone className="w-4 h-4" />
                <span>Gọi ngay: {consultant.phone}</span>
              </Button>

              <Button
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                onClick={() => {
                  window.open(consultant.zalo_link || `https://zalo.me/${consultant.zalo}`, "_blank")
                  toggleSidebar()
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Zalo</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
