# 🗺️ StreetHub - Hệ Thống Tra Cứu Tên Đường

Website tĩnh giúp tra cứu thông tin tên đường phố, giúp người dân hiểu được ý nghĩa của tên đường, lịch sử và các thông tin liên quan.

## 📋 Mô Tả Dự Án

StreetHub là một trang web tĩnh được xây dựng bởi **Đoàn Thanh niên xã Tiên Phước**, nhằm mục đích:
- Giúp người dân tra cứu thông tin về các tên đường
- Hiểu rõ ý nghĩa lịch sử, văn hóa đằng sau mỗi tên đường
- Kết nối QR code để truy cập nhanh chóng
- Giáo dục thế hệ trẻ về lịch sử, văn hóa địa phương

## 🚀 Cách Sử Dụng

### Chạy Website

1. **Mở trực tiếp file HTML:**
   - Mở file `index.html` bằng trình duyệt web
   - Website sẽ hoạt động ngay lập tức

2. **Sử dụng Live Server (khuyến nghị):**
   ```bash
   # Nếu bạn có Python
   python -m http.server 8000
   
   # Hoặc sử dụng Node.js
   npx serve
   ```

3. **Truy cập:**
   - Trang chủ: `http://localhost:8000`
   - Trang chi tiết: `http://localhost:8000#/ten-duong`

## 📱 Tích Hợp QR Code

### Cách Tạo QR Code

Để tạo mã QR cho mỗi tên đường, bạn cần:

1. **URL cho mỗi đường:**
   - Đường Huỳnh Thúc Kháng: `https://your-domain.com/#/huynh-thuc-khang`
   - Đường 10/3: `https://your-domain.com/#/10-3`
   - Đường Tôn Đức Thắng: `https://your-domain.com/#/ton-duc-thang`
   - v.v...

2. **Công cụ tạo QR Code:**
   - [QR Code Generator](https://www.qr-code-generator.com/)
   - [QRCode Monkey](https://www.qrcode-monkey.com/)
   - Hoặc sử dụng API: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=YOUR_URL`

3. **Ví dụ tạo QR bằng API:**
   ```
   https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://your-domain.com/#/huynh-thuc-khang
   ```

### Đặt QR Code

- In mã QR và dán tại các biển tên đường
- Kích thước khuyến nghị: 10cm x 10cm trở lên
- Nên có chống nước, chống phai màu

## 📂 Cấu Trúc Dự Án

```
streethub/
├── index.html              # Trang chủ
├── styles.css              # CSS styling
├── app.js                  # JavaScript routing & logic
├── README.md              # File hướng dẫn
└── data/                  # Dữ liệu JSON
    ├── huynh-thuc-khang.json
    ├── 10-3.json
    ├── ton-duc-thang.json
    ├── nga-son.json
    ├── cay-coc.json
    ├── hoang-sa.json
    ├── le-vinh-huy.json
    ├── tran-ngoc-suong.json
    ├── nguyen-dinh-tuu.json
    ├── tran-huynh.json
    ├── tran-quy-cap.json
    ├── ho-truyen.json
    ├── le-co.json
    ├── phan-chau-trinh.json
    ├── dang-thuy-tram.json
    ├── nguyen-du.json
    ├── le-vinh-khanh.json
    └── me-thu.json
```

## 🎨 Tùy Chỉnh

### Thêm Tên Đường Mới

1. Tạo file JSON mới trong thư mục `data/`:
```json
{
  "name": "Đường Tên Mới",
  "image": "URL_ảnh_đường",
  "route": {
    "start": "Điểm đầu",
    "end": "Điểm cuối",
    "length": "X km",
    "width": "Y m"
  },
  "meaning": "Ý nghĩa của tên đường..."
}
```

2. Cập nhật file `app.js`, thêm vào mảng `streets`:
```javascript
{ id: 'ten-duong-moi', name: 'Tên Đường Mới' }
```

### Thay Đổi Màu Sắc

Chỉnh sửa biến CSS trong file `styles.css`:
```css
:root {
    --primary: #6366f1;      /* Màu chủ đạo */
    --secondary: #ec4899;     /* Màu phụ */
    --accent: #14b8a6;        /* Màu nhấn */
}
```

## 🌐 Triển Khai Website

### Hosting Miễn Phí

1. **GitHub Pages:**
   - Push code lên GitHub repository
   - Vào Settings > Pages
   - Chọn branch main và Save
   - URL: `https://username.github.io/streethub`

2. **Netlify:**
   - Kéo thả thư mục vào Netlify Drop
   - Tự động có domain miễn phí

3. **Vercel:**
   - Import từ GitHub
   - Deploy tự động

## 📋 Danh Sách Tên Đường

1. Đường Huỳnh Thúc Kháng
2. Đường 10/3
3. Đường Tôn Đức Thắng
4. Đường Nga Sơn
5. Đường Cây Cốc
6. Đường Hoàng Sa
7. Đường Lê Vĩnh Huy
8. Đường Trần Ngọc Sương
9. Đường Nguyễn Đình Tựu
10. Đường Trần Huỳnh
11. Đường Trần Quý Cáp
12. Đường Hồ Truyền
13. Đường Lê Cơ
14. Đường Phan Châu Trinh
15. Đường Đặng Thùy Trâm
16. Đường Nguyễn Du
17. Đường Lê Vĩnh Khanh
18. Đường Mẹ Thứ

## 🤝 Đóng Góp

Dự án được xây dựng bởi **Đoàn Thanh niên xã Tiên Phước**

Mọi góp ý và đóng góp xin liên hệ qua các kênh chính thức của Đoàn Thanh niên xã.

## 📄 Giấy Phép

Dự án này thuộc về Đoàn Thanh niên xã Tiên Phước.

---

**Kết nối quá khứ - Hiện tại - Tương lai** 🌟
