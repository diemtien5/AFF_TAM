# Hướng dẫn Deployment

## 🚀 Deployment lên Vercel

### Bước 1: Chuẩn bị

1. Đảm bảo code đã được commit và push lên GitHub
2. Tạo tài khoản Vercel (nếu chưa có)
3. Kết nối GitHub repository với Vercel

### Bước 2: Cấu hình Environment Variables

Trong Vercel Dashboard, thêm các biến môi trường:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Bước 3: Deploy

1. Vào Vercel Dashboard
2. Click "New Project"
3. Import GitHub repository
4. Cấu hình:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - Install Command: `npm install`

### Bước 4: Kiểm tra

1. Truy cập URL được cung cấp
2. Kiểm tra các tính năng chính
3. Test admin panel

## 🐳 Deployment với Docker

### Tạo Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Build và chạy

```bash
# Build image
docker build -t finz-app .

# Run container
docker run -p 3000:3000 finz-app
```

## 🔧 Cấu hình Production

### 1. Environment Variables

Đảm bảo các biến môi trường được cấu hình đúng:

```env
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Database

1. Tạo production database trên Supabase
2. Chạy migration scripts
3. Seed data cần thiết

### 3. Domain và SSL

1. Cấu hình custom domain
2. SSL certificate tự động với Vercel
3. Redirect www to non-www (nếu cần)

## 📊 Monitoring

### 1. Vercel Analytics

- Bật Vercel Analytics trong dashboard
- Theo dõi performance metrics
- Monitor error rates

### 2. Supabase Monitoring

- Kiểm tra database performance
- Monitor API usage
- Set up alerts

## 🔒 Security

### 1. Environment Variables

- Không commit .env files
- Sử dụng Vercel environment variables
- Rotate keys định kỳ

### 2. Database Security

- Enable RLS (Row Level Security)
- Cấu hình proper policies
- Regular backups

### 3. API Security

- Rate limiting
- CORS configuration
- Input validation

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Kiểm tra Node.js version
   - Verify dependencies
   - Check TypeScript errors

2. **Environment variables not working**
   - Verify variable names
   - Check Vercel configuration
   - Restart deployment

3. **Database connection issues**
   - Check Supabase URL and key
   - Verify network connectivity
   - Check RLS policies

### Support

Nếu gặp vấn đề, liên hệ:
- **Email**: contact@finz.vn
- **Phone**: 0888.979.809
- **Zalo**: 0888.979.809 