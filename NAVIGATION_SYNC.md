# Hệ Thống Đồng Bộ Navigation

## Tổng Quan

Hệ thống này đảm bảo tất cả các menu navigation trong ứng dụng đều được đồng bộ từ AdminDashboard thông qua cơ sở dữ liệu Supabase.

## Cấu Trúc

### 1. Database Schema
```sql
-- Bảng navbar_links chứa thông tin navigation
CREATE TABLE navbar_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,  -- Tên menu (cố định 5 mục)
  url TEXT NOT NULL,    -- URL của menu
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. 5 Menu Cố Định
1. **Trang chủ** - Luôn trỏ về "/"
2. **Thẻ Muadee** - URL từ AdminDashboard
3. **Vay Tnex** - URL từ AdminDashboard  
4. **Vay FE** - URL từ AdminDashboard
5. **Vay CUB** - URL từ AdminDashboard

### 3. Components Sử Dụng Navigation

#### A. Top Navigation Bar (Desktop)
- **File**: `app/page.tsx`
- **Hook**: `useNavbarLinks()`
- **Chức năng**: Hiển thị menu navigation ở header trang chủ

#### B. Bottom Tab Bar (Mobile)
- **File**: `components/mobile-navigation.tsx`
- **Hook**: `useNavbarLinks()`
- **Chức năng**: Navigation bar cố định ở dưới màn hình mobile

#### C. Hamburger Menu (Mobile)
- **File**: `components/mobile-sidebar.tsx`
- **Hook**: `useNavbarLinks()`
- **Chức năng**: Menu sidebar khi click vào hamburger button

#### D. AdminDashboard
- **File**: `app/admin/dashboard/page.tsx`
- **Component**: `components/navbar-links-editor.tsx`
- **Chức năng**: Quản lý và chỉnh sửa các URL navigation

## Cách Hoạt Động

### 1. Hook useNavbarLinks
```typescript
export function useNavbarLinks() {
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data từ Supabase
  const fetchNavbarLinks = async () => { ... }

  // Tìm URL theo keywords
  const getUrlFor = (keywords: string[]): string | null => { ... }

  // Lấy tất cả URL navigation
  const getNavigationUrls = () => {
    return {
      home: getUrlFor(["trang chu", "home"]) || "/",
      muadee: getUrlFor(["muadee"]) || "",
      tnex: getUrlFor(["tnex"]) || "",
      fe: getUrlFor(["fe", "fe credit", "fecredit"]) || "",
      cub: getUrlFor(["cub"]) || ""
    }
  }

  return {
    navbarLinks,
    loading,
    getUrlFor,
    getNavigationUrls,
    refresh: fetchNavbarLinks
  }
}
```

### 2. Logic Tìm URL
1. **Ưu tiên 1**: Tìm theo tham số `tab` trong URL
2. **Ưu tiên 2**: Tìm theo tiêu đề menu đã normalize

### 3. Đồng Bộ Hóa
- Khi Admin thay đổi URL trong AdminDashboard
- Tất cả components sử dụng `useNavbarLinks()` sẽ tự động cập nhật
- Không cần refresh trang

## Quy Trình Chỉnh Sửa

### 1. Đăng Nhập Admin
- Truy cập: `/admin`
- Đăng nhập với tài khoản admin

### 2. Chỉnh Sửa Navigation
- Vào tab "Liên kết điều hướng"
- Nhập URL cho từng menu
- Click "Lưu 5 liên kết"

### 3. Áp Dụng Thay Đổi
- Hệ thống tự động cập nhật tất cả components
- Không cần restart server

## Lợi Ích

1. **Đồng Bộ Hoàn Toàn**: Tất cả menu đều lấy từ cùng một nguồn
2. **Dễ Quản Lý**: Admin có thể thay đổi URL từ một nơi
3. **Real-time**: Thay đổi áp dụng ngay lập tức
4. **Bảo Mật**: Chỉ admin mới có thể thay đổi navigation
5. **Linh Hoạt**: Có thể thay đổi URL mà không cần deploy lại

## Bảo Trì

### 1. Thêm Menu Mới
- Cập nhật `fixedTitles` trong `useNavbarLinks`
- Cập nhật tất cả components sử dụng navigation
- Cập nhật database schema nếu cần

### 2. Thay Đổi Logic Tìm URL
- Chỉnh sửa hàm `getUrlFor` trong `useNavbarLinks`
- Test với các URL khác nhau

### 3. Backup Database
- Export bảng `navbar_links` trước khi thay đổi lớn
- Test trên môi trường staging trước

## Troubleshooting

### 1. Menu Không Cập Nhật
- Kiểm tra kết nối Supabase
- Kiểm tra console errors
- Verify AdminDashboard có lưu thành công không

### 2. URL Không Hoạt Động
- Kiểm tra URL có hợp lệ không
- Kiểm tra có redirect hoặc CORS issues không
- Test URL trực tiếp trên browser

### 3. Performance Issues
- Kiểm tra số lượng API calls
- Implement caching nếu cần
- Monitor database performance



