"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

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

const normalize = (s: string) => (s || "").normalize("NFD").replace(/\p{Diacritic}+/gu, "").toLowerCase().trim()

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = useMemo(() => normalize(searchParams.get("tab") || ""), [searchParams])

  const [loanPackages, setLoanPackages] = useState<LoanPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: packages } = await supabase
          .from("loan_packages")
          .select("*")
          .order("created_at", { ascending: true })
        setLoanPackages(packages || [])
      } catch (e) {
        // noop
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = useMemo(() => {
    if (!tab) return loanPackages
    return (loanPackages || []).filter((p) => normalize(p.slug).includes(tab) || normalize(p.name).includes(tab))
  }, [loanPackages, tab])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!filtered || filtered.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-semibold text-slate-800 mb-2">Không tìm thấy nội dung</h1>
          <p className="text-slate-600 mb-6">Vui lòng kiểm tra lại liên kết hoặc chọn mục khác.</p>
          <Button onClick={() => router.push("/")}>Về trang chủ</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">Danh sách sản phẩm</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {filtered.map((pkg) => (
            <Card
              key={pkg.id}
              className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-md rounded-2xl w-[320px] flex-shrink-0"
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      {pkg.logo ? (
                        <Image
                          src={pkg.logo || "/placeholder.svg"}
                          alt={pkg.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-xs">🏦</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-base text-gray-900 truncate">{pkg.name}</h3>
                  </div>

                  <div className="flex justify-center">
                    {pkg.image ? (
                      <div className="w-full max-w-[280px] h-32 rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.name}
                          width={280}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ) : (
                      <div className="w-full max-w-[280px] h-32 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="text-3xl mb-1">📷</div>
                          <div className="text-xs">Ảnh đại diện</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Hạn mức vay: <span className="font-medium text-gray-900">{pkg.loan_limit}</span></div>
                    <div className="text-sm text-gray-600">Lãi suất: <span className="font-medium text-gray-900">{pkg.interest_rate}</span></div>
                    <div className="text-sm text-gray-600">Giải ngân: <span className="font-medium text-gray-900">{pkg.disbursement_speed}</span></div>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 pt-2">
                  <Button
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0 text-sm rounded-full flex-1 max-w-[130px]"
                    onClick={() => {
                      if (pkg.register_link && pkg.register_link.trim() !== "") {
                        window.open(pkg.register_link, "_blank", "noopener,noreferrer")
                      } else {
                        // No register link available
                      }
                    }}
                  >
                    🔘 ĐĂNG KÝ
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 py-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-sm rounded-full flex-1 max-w-[130px]"
                    onClick={() => {
                      if (pkg.detail_link && pkg.detail_link.trim() !== "") {
                        window.open(pkg.detail_link, "_blank", "noopener,noreferrer")
                      } else {
                        // No detail link available
                      }
                    }}
                  >
                    🔍 CHI TIẾT
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

