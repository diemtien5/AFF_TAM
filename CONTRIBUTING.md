# Contributing to FinZ.vn

Cảm ơn bạn đã quan tâm đến việc đóng góp cho FinZ.vn! Dưới đây là hướng dẫn để bạn có thể tham gia phát triển dự án.

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- Node.js 18+
- npm hoặc pnpm
- Git

### Cài đặt

1. Fork dự án
2. Clone repository về máy:
   ```bash
   git clone https://github.com/your-username/AFF.git
   cd AFF
   ```

3. Cài đặt dependencies:
   ```bash
   npm install
   # hoặc
   pnpm install
   ```

4. Tạo file `.env.local`:
   ```bash
   cp env.example .env.local
   # Chỉnh sửa file .env.local với thông tin Supabase của bạn
   ```

5. Chạy dự án:
   ```bash
   npm run dev
   ```

## 📝 Quy trình đóng góp

### 1. Tạo Issue

Trước khi bắt đầu làm việc, hãy tạo issue để thảo luận về thay đổi bạn muốn thực hiện.

### 2. Tạo Branch

Tạo branch mới từ `main`:

```bash
git checkout -b feature/your-feature-name
# hoặc
git checkout -b fix/your-bug-fix
```

### 3. Commit Changes

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add new loan package feature"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "docs: update README with new instructions"
```

### 4. Push và tạo Pull Request

```bash
git push origin feature/your-feature-name
```

Sau đó tạo Pull Request trên GitHub.

## 🎨 Coding Standards

### TypeScript

- Sử dụng TypeScript cho tất cả file mới
- Định nghĩa types/interfaces trong `types/` directory
- Sử dụng strict mode

### Styling

- Sử dụng Tailwind CSS
- Tuân thủ design system của shadcn/ui
- Responsive design cho mọi thiết bị

### Components

- Sử dụng functional components với hooks
- Tách logic phức tạp thành custom hooks
- Props interface cho mọi component

### File Structure

```
components/
├── ui/           # shadcn/ui components
├── feature/      # Feature-specific components
└── shared/       # Shared components

hooks/
├── use-feature.ts # Custom hooks

types/
└── index.ts      # Type definitions

lib/
├── utils.ts      # Utility functions
└── constants.ts  # Constants
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## 📚 Documentation

- Cập nhật README.md khi cần thiết
- Thêm comments cho code phức tạp
- Cập nhật CHANGELOG.md cho breaking changes

## 🔄 Review Process

1. **Code Review**: Tất cả PR sẽ được review bởi maintainers
2. **CI/CD**: PR phải pass tất cả tests và checks
3. **Approval**: Cần ít nhất 1 approval để merge

## 🐛 Bug Reports

Khi báo cáo bug, hãy bao gồm:

- Mô tả chi tiết về bug
- Steps to reproduce
- Expected behavior
- Screenshots (nếu có)
- Environment information

## 💡 Feature Requests

Khi đề xuất tính năng mới:

- Mô tả chi tiết về tính năng
- Use cases
- Implementation suggestions
- Screenshots/mockups (nếu có)

## 📞 Liên hệ

- **Email**: contact@finz.vn
- **Phone**: 0888.979.809
- **Zalo**: 0888.979.809

## 📄 License

Bằng việc đóng góp, bạn đồng ý rằng đóng góp của bạn sẽ được phát hành dưới MIT License. 