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

  const defaultUrls: Record<string, string> = {
    "Trang chủ": "/",
    "Thẻ Muadee": "/the-muadee",
    "Vay Tnex": "/vay-tnex",
    "Vay FE": "/vay-fe",
    "Vay CUB": "/vay-cub",
  }

  // Initialize editing links when navbarLinks change
  useEffect(() => {
    const fixed = fixedTitles.map((title) => {
      const existing = navbarLinks.find(l => l.title === title)
      return {
        id: existing?.id || "",
        title: title,
        url: existing?.url || "",
      }
    })
    setEditingLinks(fixed)
  }, [navbarLinks])

  const handleSave = async () => {
    try {
      // Luôn tạo đủ 5 bản ghi: dùng URL người dùng nhập, nếu trống thì dùng default nội bộ
      const desired = fixedTitles.map((title) => {
        const input = editingLinks.find(l => l.title === title)
        const url = (input?.url || "").trim() || defaultUrls[title]
        return { title, url }
      })

      // Lấy dữ liệu hiện tại để quyết định update hay insert
      const { data: current, error: fetchError } = await supabase
        .from("navbar_links")
        .select("id,title,url")
      if (fetchError) throw fetchError

      const currentByTitle = new Map<string, NavbarLink>()
      ;(current || []).forEach((row: any) => currentByTitle.set(row.title, row))

      for (const item of desired) {
        const existing = currentByTitle.get(item.title)
        if (existing) {
          if (existing.url !== item.url) {
            const { error: updateError } = await supabase
              .from("navbar_links")
              .update({ url: item.url })
              .eq("id", existing.id)
            if (updateError) throw updateError
          }
        } else {
          const { error: insertError } = await supabase
            .from("navbar_links")
            .insert([{ title: item.title, url: item.url }])
          if (insertError) throw insertError
        }
      }

      toast({
        title: "Thành công",
        description: "Đã lưu 5 liên kết điều hướng lên Supabase",
      })

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


