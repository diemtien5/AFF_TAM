"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import ImageUpload from "@/components/image-upload"
 import { useNavbarLinks } from "@/hooks/use-navbar-links"
import NavbarLinksEditor from "@/components/navbar-links-editor"
import TrackingManagement from "@/components/tracking-management"
import { NavbarLink } from "@/types"

interface LoanPackage {
  id: string
  name: string
  slug: string
  description: string
  loan_limit: string
  interest_rate: string
  disbursement_speed: string
  logo: string
  image: string
  register_link: string
  detail_link: string
}

interface Consultant {
  id: string
  name: string
  avatar: string
  phone: string
  zalo: string
  zalo_link: string
  facebook: string
  email: string
  credit_cards: string
  loans: string
  ewallets: string
}



export default function AdminDashboard() {
  const router = useRouter()
  const [loanPackages, setLoanPackages] = useState<LoanPackage[]>([])
  const [consultant, setConsultant] = useState<Consultant | null>({
    id: "",
    name: "",
    avatar: "",
    phone: "",
    zalo: "",
    zalo_link: "",
    facebook: "",
    email: "",
    credit_cards: "",
    loans: "",
    ewallets: "",
  })
  const { navbarLinks, refresh: refreshNavbarLinks } = useNavbarLinks()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      // Fetch loan packages
      const { data: packages } = await supabase
        .from("loan_packages")
        .select("*")
        .order("created_at", { ascending: true })

      // Fetch consultant info (lấy 1 bản ghi nếu có)
      const { data: consultantsList } = await supabase.from("consultants").select("*").limit(1)

      setLoanPackages(packages || [])
      if (consultantsList && consultantsList.length > 0) {
        setConsultant(consultantsList[0] as Consultant)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveLoanPackage = async (pkg: LoanPackage) => {
    try {
      // Ensure all required fields are present
      const packageData = {
        ...pkg,
        // Nếu id rỗng, bỏ qua để Supabase tự tạo UUID
        id: pkg.id && pkg.id !== "" ? pkg.id : undefined,
        register_link: pkg.register_link || "",
        detail_link: pkg.detail_link || "",
      }

      const { error } = await supabase.from("loan_packages").upsert(packageData)

      if (error) {
        console.error("Supabase error:", error)
        throw error
      }

      toast({
        title: "Thành công",
        description: "Đã lưu thông tin gói vay và link affiliate",
      })

      fetchData()
    } catch (error) {
      console.error("Error saving loan package:", error)
      toast({
        title: "Lỗi",
        description: `Không thể lưu thông tin gói vay: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      })
    }
  }

  const handleSaveConsultant = async () => {
    try {
      if (!consultant || !consultant.name || consultant.name.trim() === "") {
        toast({
          title: "Lỗi",
          description: "Tên nhân viên là bắt buộc",
          variant: "destructive",
        })
        return
      }

      const payload = {
        id: consultant.id && consultant.id !== "" ? consultant.id : undefined,
        name: (consultant.name || "").trim(),
        avatar: (consultant.avatar || "").trim(),
        phone: (consultant.phone || "").trim(),
        zalo: (consultant.zalo || "").trim(),
        zalo_link: (consultant.zalo_link || "").trim(),
        facebook: (consultant.facebook || "").trim(),
        email: (consultant.email || "").trim(),
        credit_cards: (consultant.credit_cards || "").trim(),
        loans: (consultant.loans || "").trim(),
        ewallets: (consultant.ewallets || "").trim(),
      }

      console.log("Saving consultant payload:", payload)

      const { data, error } = await supabase
        .from("consultants")
        .upsert(payload, { onConflict: "id" })
        .select("*")
        .single()

      if (error) {
        console.error("Supabase error details:", error)
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`)
      }

      if (data) {
        setConsultant(data as Consultant)
        console.log("Successfully saved consultant:", data)
      }

      toast({
        title: "Thành công",
        description: "Đã lưu thông tin nhân viên tư vấn",
      })
    } catch (error) {
      console.error("Error saving consultant:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast({
        title: "Lỗi",
        description: `Không thể lưu thông tin nhân viên tư vấn: ${errorMessage}`,
        variant: "destructive",
      })
    }
  }



  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/admin")} className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Về trang đăng nhập</span>
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="loan-packages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="loan-packages">Quản lý gói vay</TabsTrigger>
            <TabsTrigger value="navbar-links">Liên kết điều hướng</TabsTrigger>
            <TabsTrigger value="consultant">Nhân viên tư vấn</TabsTrigger>
            <TabsTrigger value="tracking">Quản lý tracking</TabsTrigger>
          </TabsList>

          {/* Loan Packages Management */}
          <TabsContent value="loan-packages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý 8 gói vay & thẻ</h2>
              <Button
                disabled={loanPackages.length >= 8}
                onClick={() => {
                  if (loanPackages.length >= 8) return
                  const newPackage: LoanPackage = {
                    id: "",
                    name: "Gói vay mới",
                    slug: "goi-vay-moi",
                    description: "Mô tả gói vay",
                    loan_limit: "Tối đa 50.000.000 ₫",
                    interest_rate: "Từ 1.5%/tháng",
                    disbursement_speed: "Trong 24 giờ",
                    logo: "",
                    image: "",
                    register_link: "",
                    detail_link: "",
                  }
                  setLoanPackages([...loanPackages, newPackage])
                }}
              >
                {loanPackages.length >= 8 ? "Đã đủ 8 tổ chức" : "Thêm gói vay mới"}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loanPackages.map((pkg, index) => (
                <Card key={pkg.id || index} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Gói vay #{index + 1}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={async () => {
                          if (pkg.id) {
                            await supabase.from("loan_packages").delete().eq("id", pkg.id)
                          }
                          setLoanPackages(loanPackages.filter((_, i) => i !== index))
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${index}`}>Tên tổ chức</Label>
                        <Input
                          id={`name-${index}`}
                          value={pkg.name}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].name = e.target.value
                            setLoanPackages(updated)
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`slug-${index}`}>Slug</Label>
                        <Input
                          id={`slug-${index}`}
                          value={pkg.slug}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].slug = e.target.value
                            setLoanPackages(updated)
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`description-${index}`}>Mô tả</Label>
                      <Textarea
                        id={`description-${index}`}
                        value={pkg.description}
                        onChange={(e) => {
                          const updated = [...loanPackages]
                          updated[index].description = e.target.value
                          setLoanPackages(updated)
                        }}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor={`loan-limit-${index}`}>Hạn mức vay</Label>
                        <Input
                          id={`loan-limit-${index}`}
                          value={pkg.loan_limit}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].loan_limit = e.target.value
                            setLoanPackages(updated)
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`interest-rate-${index}`}>Lãi suất</Label>
                        <Input
                          id={`interest-rate-${index}`}
                          value={pkg.interest_rate}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].interest_rate = e.target.value
                            setLoanPackages(updated)
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`disbursement-speed-${index}`}>Tốc độ giải ngân</Label>
                        <Input
                          id={`disbursement-speed-${index}`}
                          value={pkg.disbursement_speed}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].disbursement_speed = e.target.value
                            setLoanPackages(updated)
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor={`register-link-${index}`}>Link nút ĐĂNG KÝ (Affiliate)</Label>
                        <Input
                          id={`register-link-${index}`}
                          value={pkg.register_link}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].register_link = e.target.value
                            setLoanPackages(updated)
                          }}
                          placeholder="https://example.com/register"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`detail-link-${index}`}>Link nút CHI TIẾT (Affiliate)</Label>
                        <Input
                          id={`detail-link-${index}`}
                          value={pkg.detail_link}
                          onChange={(e) => {
                            const updated = [...loanPackages]
                            updated[index].detail_link = e.target.value
                            setLoanPackages(updated)
                          }}
                          placeholder="https://example.com/details"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <ImageUpload
                        currentImage={pkg.logo}
                        onImageChange={(url) => {
                          const updated = [...loanPackages]
                          updated[index].logo = url
                          setLoanPackages(updated)
                        }}
                        label="Logo tổ chức"
                        folder="logos"
                      />

                      <ImageUpload
                        currentImage={pkg.image}
                        onImageChange={(url) => {
                          const updated = [...loanPackages]
                          updated[index].image = url
                          setLoanPackages(updated)
                        }}
                        label="Hình ảnh minh họa"
                        folder="images"
                      />
                    </div>

                    <Button onClick={() => handleSaveLoanPackage(pkg)} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Lưu thay đổi
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

                              {/* Navbar Links Management */}
          <TabsContent value="navbar-links" className="space-y-6">
            <NavbarLinksEditor
              navbarLinks={navbarLinks}
              onRefresh={refreshNavbarLinks}
            />
          </TabsContent>

          {/* Consultant Management */}
          <TabsContent value="consultant" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cấu hình nhân viên tư vấn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consultant-name">Tên nhân viên</Label>
                      <Input
                        id="consultant-name"
                        value={consultant.name}
                        onChange={(e) => setConsultant({ ...consultant, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <ImageUpload
                        currentImage={consultant.avatar}
                        onImageChange={(url) => setConsultant({ ...consultant, avatar: url })}
                        label="Ảnh đại diện nhân viên"
                        folder="avatars"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consultant-zalo">Zalo</Label>
                      <Input
                        id="consultant-zalo"
                        value={consultant.zalo}
                        onChange={(e) => setConsultant({ ...consultant, zalo: e.target.value })}
                        placeholder="0888.979.809"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultant-zalo-link">Link Zalo</Label>
                      <Input
                        id="consultant-zalo-link"
                        value={consultant.zalo_link || ""}
                        onChange={(e) => setConsultant({ ...consultant, zalo_link: e.target.value })}
                        placeholder="https://zalo.me/0888979809"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consultant-facebook">Facebook</Label>
                      <Input
                        id="consultant-facebook"
                        value={consultant.facebook}
                        onChange={(e) => setConsultant({ ...consultant, facebook: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultant-phone">Số điện thoại</Label>
                      <Input
                        id="consultant-phone"
                        value={consultant.phone}
                        onChange={(e) => setConsultant({ ...consultant, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="consultant-email">Email</Label>
                    <Input
                      id="consultant-email"
                      type="email"
                      value={consultant.email}
                      onChange={(e) => setConsultant({ ...consultant, email: e.target.value })}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="consultant-credit-cards">Thẻ tín dụng hỗ trợ</Label>
                    <Input
                      id="consultant-credit-cards"
                      value={consultant.credit_cards}
                      onChange={(e) => setConsultant({ ...consultant, credit_cards: e.target.value })}
                      placeholder="VIB, HDBank, VPBank"
                    />
                  </div>

                  <div>
                    <Label htmlFor="consultant-loans">Vay tiêu dùng hỗ trợ</Label>
                    <Input
                      id="consultant-loans"
                      value={consultant.loans}
                      onChange={(e) => setConsultant({ ...consultant, loans: e.target.value })}
                      placeholder="TNEX, LOTTE, FE Credit"
                    />
                  </div>

                  <div>
                    <Label htmlFor="consultant-ewallets">Ví trả sau hỗ trợ</Label>
                    <Input
                      id="consultant-ewallets"
                      value={consultant.ewallets}
                      onChange={(e) => setConsultant({ ...consultant, ewallets: e.target.value })}
                      placeholder="MUADEE, Kredivo, MoMo"
                    />
                  </div>

                  <Button onClick={handleSaveConsultant} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Lưu thông tin nhân viên tư vấn
                  </Button>
                </CardContent>
              </Card>
          </TabsContent>

          {/* Tracking Management */}
          <TabsContent value="tracking" className="space-y-6">
            <TrackingManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
