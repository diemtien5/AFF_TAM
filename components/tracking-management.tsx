"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTracking } from "@/hooks/use-tracking"
import TrackingTestData from "./tracking-test-data"
import { RefreshCw, Eye, MousePointer, TrendingUp, Clock, BarChart3, Smartphone, Monitor, Globe } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export default function TrackingManagement() {
  const { impressions, clicks, stats, loading, error, refresh } = useTracking()
  const [activeTab, setActiveTab] = useState("overview")

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi })
  }

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getDeviceIcon = (device: string | null) => {
    if (!device) return <Globe className="w-4 h-4" />
    if (device.toLowerCase().includes("mobile")) return <Smartphone className="w-4 h-4" />
    return <Monitor className="w-4 h-4" />
  }

  const getPlatformBadgeVariant = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "web": return "default"
      case "mobile": return "secondary"
      case "app": return "outline"
      default: return "default"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Quản lý Tracking
          </CardTitle>
          <CardDescription>
            Đang tải dữ liệu theo dõi hiệu suất...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Quản lý Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Lỗi: {error}</p>
            <Button onClick={refresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Thử lại
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quản lý Tracking
            </CardTitle>
            <CardDescription>
              Theo dõi hiệu suất và tương tác của khách hàng
            </CardDescription>
          </div>
          <Button onClick={refresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="impressions">Lượt hiển thị</TabsTrigger>
            <TabsTrigger value="clicks">Lượt click</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
            <TabsTrigger value="test">Test Data</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Eye className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Tổng lượt hiển thị</p>
                      <p className="text-2xl font-bold">{stats?.totalImpressions || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MousePointer className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Tổng lượt click</p>
                      <p className="text-2xl font-bold">{stats?.totalClicks || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Tỷ lệ click</p>
                      <p className="text-2xl font-bold">{stats?.clickThroughRate.toFixed(2) || 0}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Thời gian trung bình</p>
                      <p className="text-2xl font-bold">{formatDuration(Math.round(stats?.avgStayTime || 0))}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lượt hiển thị theo nền tảng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats?.impressionsByPlatform || {}).map(([platform, count]) => (
                      <div key={platform} className="flex items-center justify-between">
                        <Badge variant={getPlatformBadgeVariant(platform)}>
                          {platform}
                        </Badge>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lượt click theo nền tảng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats?.clicksByPlatform || {}).map(([platform, count]) => (
                      <div key={platform} className="flex items-center justify-between">
                        <Badge variant={getPlatformBadgeVariant(platform)}>
                          {platform}
                        </Badge>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impressions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết lượt hiển thị</CardTitle>
                <CardDescription>
                  Danh sách tất cả lượt hiển thị gói vay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gói vay</TableHead>
                        <TableHead>Nền tảng</TableHead>
                        <TableHead>Thời gian</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {impressions.map((impression) => (
                        <TableRow key={impression.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {impression.loan_packages?.name || `Offer ${impression.offer_id}`}
                              </div>
                              <div className="text-sm text-gray-500">
                                {impression.loan_packages?.bank_name || "Không xác định"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPlatformBadgeVariant(impression.platform_source)}>
                              {impression.platform_source}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDate(impression.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clicks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết lượt click</CardTitle>
                <CardDescription>
                  Danh sách tất cả lượt click với thông tin chi tiết
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Gói vay</TableHead>
                        <TableHead>Nền tảng</TableHead>
                        <TableHead>Thiết bị</TableHead>
                        <TableHead>Thời gian ở lại</TableHead>
                        <TableHead>Độ cuộn</TableHead>
                        <TableHead>Thời gian</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clicks.map((click) => (
                        <TableRow key={click.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {click.loan_packages?.name || `Offer ${click.offer_id}`}
                              </div>
                              <div className="text-sm text-gray-500">
                                {click.loan_packages?.bank_name || "Không xác định"}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPlatformBadgeVariant(click.platform_source)}>
                              {click.platform_source}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(click.device)}
                              <span className="text-sm">{click.device || "Không xác định"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {click.stay_time ? formatDuration(click.stay_time) : "-"}
                          </TableCell>
                          <TableCell>
                            {click.scroll_depth ? `${click.scroll_depth}%` : "-"}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDate(click.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top gói vay - Lượt hiển thị</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats?.impressionsByOffer || {})
                      .sort(([,a], [,b]) => b.count - a.count)
                      .slice(0, 5)
                      .map(([offerId, data]) => (
                        <div key={offerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{data.name}</div>
                            <div className="text-sm text-gray-500">ID: {offerId.slice(0, 8)}...</div>
                          </div>
                          <Badge variant="outline">{data.count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top gói vay - Lượt click</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats?.clicksByOffer || {})
                      .sort(([,a], [,b]) => b.count - a.count)
                      .slice(0, 5)
                      .map(([offerId, data]) => (
                        <div key={offerId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{data.name}</div>
                            <div className="text-sm text-gray-500">ID: {offerId.slice(0, 8)}...</div>
                          </div>
                          <Badge variant="outline">{data.count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê chi tiết</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats?.avgScrollDepth.toFixed(1) || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Độ cuộn trung bình</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {stats?.totalImpressions > 0 ? ((stats.totalClicks / stats.totalImpressions) * 100).toFixed(2) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">Tỷ lệ chuyển đổi</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {clicks.filter(c => c.stay_time && c.stay_time > 30).length}
                    </div>
                    <div className="text-sm text-gray-600">Lượt xem > 30s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="space-y-6">
            <TrackingTestData />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
