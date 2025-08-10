# Changelog

Tất cả các thay đổi quan trọng của dự án sẽ được ghi lại trong file này.

## [1.0.0] - 2024-12-19

### Added
- 🎉 Phát hành phiên bản đầu tiên
- ✨ Nền tảng affiliate hoàn chỉnh cho thẻ tín dụng và khoản vay
- 🏦 Quản lý sản phẩm (thêm, sửa, xóa gói vay)
- 👨‍💼 Thông tin tư vấn viên với liên hệ
- 📊 Thống kê trực quan với biểu đồ
- 🔗 Quản lý liên kết navbar
- 📱 Responsive design cho mọi thiết bị
- 🔐 Hệ thống admin với authentication
- 🎨 UI/UX hiện đại với shadcn/ui
- 📈 SEO optimization
- 🚀 Performance optimization

### Technical
- ⚡ Next.js 14 với App Router
- 🔷 TypeScript support
- 🎨 Tailwind CSS + shadcn/ui
- 🗄️ Supabase integration
- 📊 Recharts cho biểu đồ
- 🔄 Custom hooks cho state management
- 📝 Comprehensive documentation

### Security
- 🔒 Environment variables protection
- 🛡️ Input validation
- 🔐 Secure admin authentication

## [0.1.0] - 2024-12-18

### Added
- 🏗️ Project structure setup
- 📦 Dependencies installation
- 🎨 Basic UI components
- 🗄️ Database schema design
- 🔗 Supabase integration

---

## Cách sử dụng

### Semantic Versioning

Dự án này tuân theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Commit Convention

Chúng tôi sử dụng [Conventional Commits](https://www.conventionalcommits.org/) cho commit messages:

- `feat:` tính năng mới
- `fix:` sửa lỗi
- `docs:` thay đổi documentation
- `style:` thay đổi không ảnh hưởng đến code
- `refactor:` refactor code
- `test:` thêm hoặc sửa test
- `chore:` thay đổi build process hoặc tools

### Release Process

1. Tạo branch mới cho release
2. Cập nhật version trong `package.json`
3. Cập nhật `CHANGELOG.md`
4. Tạo pull request
5. Merge và tag release 