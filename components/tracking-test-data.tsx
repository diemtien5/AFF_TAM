"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

export default function TrackingTestData() {
  const [loading, setLoading] = useState(false)

  const createTestData = async () => {
    try {
      setLoading(true)

      // First, get some loan packages to use as offer_id
      const { data: packages } = await supabase
        .from("loan_packages")
        .select("id")
        .limit(3)

      if (!packages || packages.length === 0) {
        toast({
          title: "Lỗi",
          description: "Không tìm thấy gói vay nào. Vui lòng tạo gói vay trước.",
          variant: "destructive",
        })
        return
      }

      const offerIds = packages.map(p => p.id)

      // Create test impressions
      const impressionsData = [
        { offer_id: offerIds[0], platform_source: "homepage" },
        { offer_id: offerIds[1], platform_source: "muadee_page" },
        { offer_id: offerIds[2], platform_source: "tnex_page" },
        { offer_id: offerIds[0], platform_source: "fe_page" },
        { offer_id: offerIds[1], platform_source: "cub_page" },
      ]

      const { error: impressionsError } = await supabase
        .from("offer_impressions")
        .insert(impressionsData)

      if (impressionsError) {
        console.error("Impressions error:", impressionsError)
        throw new Error(`Lỗi tạo impressions: ${impressionsError.message}`)
      }

      // Create test clicks
      const clicksData = [
        {
          offer_id: offerIds[0],
          platform_source: "homepage_register",
          device: "desktop",
          session_id: "test_session_1",
          stay_time: 45,
          scroll_depth: 75,
        },
        {
          offer_id: offerIds[1],
          platform_source: "muadee_page_detail",
          device: "mobile",
          session_id: "test_session_2",
          stay_time: 30,
          scroll_depth: 50,
        },
        {
          offer_id: offerIds[2],
          platform_source: "tnex_page_register",
          device: "desktop",
          session_id: "test_session_3",
          stay_time: 60,
          scroll_depth: 90,
        },
        {
          offer_id: "navigation",
          platform_source: "navigation_home",
          device: "mobile",
          session_id: "test_session_4",
          stay_time: 15,
          scroll_depth: 25,
        },
      ]

      const { error: clicksError } = await supabase
        .from("click_tracking")
        .insert(clicksData)

      if (clicksError) {
        console.error("Clicks error:", clicksError)
        throw new Error(`Lỗi tạo clicks: ${clicksError.message}`)
      }

      toast({
        title: "Thành công",
        description: "Đã tạo dữ liệu test tracking thành công!",
      })

    } catch (error) {
      console.error("Error creating test data:", error)
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Lỗi không xác định",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const clearTestData = async () => {
    try {
      setLoading(true)

      // Clear all tracking data
      await supabase.from("click_tracking").delete().neq("id", "")
      await supabase.from("offer_impressions").delete().neq("id", "")

      toast({
        title: "Thành công",
        description: "Đã xóa tất cả dữ liệu tracking!",
      })

    } catch (error) {
      console.error("Error clearing data:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa dữ liệu tracking",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Tracking Data</CardTitle>
        <CardDescription>
          Tạo dữ liệu mẫu để test hệ thống tracking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Button
            onClick={createTestData}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {loading ? "Đang tạo..." : "Tạo dữ liệu test"}
          </Button>
          <Button
            onClick={clearTestData}
            disabled={loading}
            variant="destructive"
          >
            {loading ? "Đang xóa..." : "Xóa tất cả dữ liệu"}
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Lưu ý: Cần có ít nhất 1 gói vay trong database để tạo dữ liệu test.
        </p>
      </CardContent>
    </Card>
  )
}
