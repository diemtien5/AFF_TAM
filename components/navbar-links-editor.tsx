"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { NavbarLink } from "@/types"
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

interface NavbarLinksEditorProps {
  navbarLinks: NavbarLink[]
  onRefresh: () => void
}

export default function NavbarLinksEditor({ navbarLinks, onRefresh }: NavbarLinksEditorProps) {
  const [editingLinks, setEditingLinks] = useState<NavbarLink[]>([])

  const fixedTitles = [
    "Trang chủ",
    "Thẻ Muadee",
    "Vay Tnex",
    "Vay FE",
    "Vay CUB",
  ]

  // Initialize editing links when navbarLinks change
  useEffect(() => {
    const fixed = fixedTitles.map((title, index) => {
      const existing = navbarLinks.find(l => l.title === title)
      return {
        id: existing?.id || "",
        title: title,
        url: existing?.url || ""
      }
    })
    setEditingLinks(fixed)
  }, [navbarLinks])

  const handleSave = async () => {
    try {
      const sanitized = editingLinks.filter((l) => l.url !== "")

      // Delete existing links and insert new ones
      await supabase.from("navbar_links").delete().neq("id", "")

      if (sanitized.length > 0) {
        const { error } = await supabase.from("navbar_links").insert(sanitized)
        if (error) throw error
      }

      toast({
        title: "Thành công",
        description: "Đã lưu các liên kết điều hướng",
      })

      // Refresh navbar links to update all components
      onRefresh()
    } catch (error) {
      console.error("Error saving navbar links:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu các liên kết điều hướng",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chỉnh sửa liên kết điều hướng (cố định 5 mục)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {editingLinks.map((link, index) => (
          <div key={link.id || index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor={`link-title-${index}`}>Mục menu</Label>
              <Input id={`link-title-${index}`} value={link.title} readOnly />
            </div>
            <div>
              <Label htmlFor={`link-url-${index}`}>URL</Label>
              <Input
                id={`link-url-${index}`}
                value={link.url}
                onChange={(e) => {
                  const updated = [...editingLinks]
                  updated[index] = { ...updated[index], url: e.target.value }
                  setEditingLinks(updated)
                }}
                placeholder="https://..."
              />
            </div>
          </div>
        ))}

        <div className="flex space-x-2">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Lưu 5 liên kết
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


