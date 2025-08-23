"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Lock, User, X } from "lucide-react"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin đăng nhập",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Lấy mật khẩu hiện tại (mặc định hoặc đã đổi)
      const currentStoredPassword = localStorage.getItem("admin_password") || "123456"

      // Thông tin đăng nhập admin
      if (username === "haidang" && password === currentStoredPassword) {
        localStorage.setItem("admin_authenticated", "true")
        toast({
          title: "Thành công",
          description: "Đăng nhập thành công!",
        })
        onClose()
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "Lỗi",
          description: "Tên đăng nhập hoặc mật khẩu không đúng",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đăng nhập",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới và xác nhận không khớp",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 6 ký tự",
        variant: "destructive",
      })
      return
    }

    setChangePasswordLoading(true)

    try {
      // Lấy mật khẩu hiện tại từ localStorage hoặc mặc định
      const currentStoredPassword = localStorage.getItem("admin_password") || "123456"

      // Kiểm tra mật khẩu hiện tại
      if (currentPassword === currentStoredPassword) {
        // Lưu mật khẩu mới vào localStorage (có thể thay bằng API thực tế)
        localStorage.setItem("admin_password", newPassword)

        toast({
          title: "Thành công",
          description: "Đã đổi mật khẩu thành công!",
        })

        // Reset form
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        setShowChangePassword(false)
      } else {
        toast({
          title: "Lỗi",
          description: "Mật khẩu hiện tại không đúng",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đổi mật khẩu",
        variant: "destructive",
      })
    } finally {
      setChangePasswordLoading(false)
    }
  }

  const handleClose = () => {
    setUsername("")
    setPassword("")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowChangePassword(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Đăng nhập Admin
          </DialogTitle>
          <p className="text-center text-gray-600 mt-2">
            Vui lòng đăng nhập để truy cập trang quản trị
          </p>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>

        {/* Nút đổi mật khẩu */}
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            {showChangePassword ? "Ẩn đổi mật khẩu" : "Đổi mật khẩu"}
          </Button>
        </div>

        {/* Form đổi mật khẩu */}
        {showChangePassword && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Đổi mật khẩu
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                  disabled={changePasswordLoading}
                />
              </div>

              <div>
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  disabled={changePasswordLoading}
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  disabled={changePasswordLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={changePasswordLoading}
              >
                {changePasswordLoading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
              </Button>
            </form>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-4 right-4 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}
