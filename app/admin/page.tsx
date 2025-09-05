"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
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
      // Kiểm tra thông tin đăng nhập từ Supabase
      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username.trim())
        .eq("password", password.trim())
        .single()

      if (error) {
        console.error("Database error:", error)
        throw new Error("Lỗi kết nối database")
      }

      if (adminUser) {
        // Lưu thông tin đăng nhập thành công
        localStorage.setItem("admin_authenticated", "true")
        localStorage.setItem("admin_user_id", adminUser.id)
        localStorage.setItem("admin_username", adminUser.username)

        toast({
          title: "Thành công",
          description: "Đăng nhập thành công!",
        })
        router.push("/admin/dashboard")
      } else {
        toast({
          title: "Lỗi",
          description: "Tên đăng nhập hoặc mật khẩu không đúng",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi đăng nhập: ${error instanceof Error ? error.message : "Unknown error"}`,
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
      const currentUsername = localStorage.getItem("admin_username")
      if (!currentUsername) {
        throw new Error("Không tìm thấy thông tin người dùng")
      }

      // Kiểm tra mật khẩu hiện tại
      const { data: currentUser, error: checkError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", currentUsername)
        .eq("password", currentPassword.trim())
        .single()

      if (checkError || !currentUser) {
        toast({
          title: "Lỗi",
          description: "Mật khẩu hiện tại không đúng",
          variant: "destructive",
        })
        return
      }

      // Cập nhật mật khẩu mới
      const { error: updateError } = await supabase
        .from("admin_users")
        .update({ password: newPassword.trim() })
        .eq("id", currentUser.id)

      if (updateError) {
        console.error("Update password error:", updateError)
        throw new Error("Lỗi cập nhật mật khẩu")
      }

      toast({
        title: "Thành công",
        description: "Đã đổi mật khẩu thành công!",
      })

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setShowChangePassword(false)
    } catch (error) {
      console.error("Change password error:", error)
      toast({
        title: "Lỗi",
        description: `Có lỗi xảy ra khi đổi mật khẩu: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setChangePasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Đăng nhập Admin
            </CardTitle>
            <p className="text-gray-600">
              Vui lòng đăng nhập để truy cập trang quản trị
            </p>
          </CardHeader>

          <CardContent>
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
            <div className="text-center mt-6">
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
              <div className="border-t pt-6 mt-6">
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

          </CardContent>
        </Card>
      </div>
    </div>
  )
}
