# 🚀 Hướng Dẫn Deploy Lên Vercel

## 📋 Yêu Cầu Trước Khi Deploy

1. **GitHub Repository**: Code đã được push lên GitHub
2. **Supabase Project**: Đã tạo và cấu hình database
3. **Vercel Account**: Đã đăng ký tài khoản Vercel

## 🔧 Bước 1: Chuẩn Bị Code

### Kiểm tra file cần thiết:
```bash
# Đảm bảo các file này có trong project
vercel.json
next.config.mjs
package.json
tsconfig.json
tailwind.config.ts
postcss.config.mjs
```

### Kiểm tra .gitignore:
```bash
# Đảm bảo .env* được ignore
.env*
```

## 🌐 Bước 2: Deploy Lên Vercel

### 2.1. Import Project
1. Vào [vercel.com](https://vercel.com)
2. Click "New Project"
3. Chọn "Import Git Repository"
4. Chọn repository `diemtien5/AFF1`

### 2.2. Cấu Hình Project
- **Framework Preset**: Next.js (tự động detect)
- **Root Directory**: `./` (để nguyên)
- **Project Name**: `aff-1` (hoặc tên bạn muốn)

### 2.3. Cấu Hình Environment Variables
Trong Vercel dashboard, thêm:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2.4. Deploy
Click "Deploy" và chờ quá trình hoàn tất

## 🗄️ Bước 3: Cấu Hình Database

### 3.1. Chạy SQL Scripts
Trong Supabase SQL Editor, chạy theo thứ tự:

1. `scripts/create-tables.sql`
2. `scripts/seed-data.sql`

### 3.2. Kiểm Tra Bảng
Đảm bảo các bảng đã được tạo:
- `loan_packages`
- `consultants`
- `navbar_links`
- `admin_users`

## ✅ Bước 4: Kiểm Tra

### 4.1. Test Website
- Kiểm tra trang chủ
- Test responsive design
- Kiểm tra admin login

### 4.2. Test Admin Functions
- Login với: `haidang` / `123456`
- Thêm/sửa/xóa gói vay
- Upload ảnh

## 🚨 Xử Lý Lỗi Thường Gặp

### Lỗi Build
```bash
# Kiểm tra dependencies
npm install

# Build local để test
npm run build
```

### Lỗi Database
- Kiểm tra Supabase connection
- Kiểm tra environment variables
- Kiểm tra SQL scripts

### Lỗi Images
- Kiểm tra Supabase storage bucket
- Kiểm tra image URLs

## 🔒 Bảo Mật

### Environment Variables
- **KHÔNG BAO GIỜ** commit `.env.local`
- Sử dụng Vercel Environment Variables
- Kiểm tra `.gitignore` có `.env*`

### Admin Access
- Thay đổi password mặc định
- Sử dụng HTTPS
- Giới hạn IP access nếu cần

## 📱 Custom Domain (Tùy Chọn)

1. Trong Vercel dashboard
2. Settings > Domains
3. Add domain: `finz.vn`
4. Cấu hình DNS records

## 📊 Monitoring

### Vercel Analytics
- Performance monitoring
- Error tracking
- User analytics

### Supabase Monitoring
- Database performance
- API usage
- Storage usage

## 🆘 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Vercel build logs
2. Kiểm tra browser console
3. Kiểm tra Supabase logs
4. Tạo issue trên GitHub

---

**Lưu ý**: Đảm bảo tất cả environment variables được cấu hình đúng trên Vercel trước khi deploy!
