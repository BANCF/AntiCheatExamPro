# 🌐 Danh Sách Đường Link Truy Cập Hệ Thống AntiCheatExamPro

> **Địa chỉ IP máy chủ hiện tại trong mạng LAN:** `192.168.1.7`

---

## 📌 1. Truy Cập Trên Chính Máy Tính Này (Localhost)

| Đối Tượng | Đường Link Truy Cập | Ghi Chú |
| :--- | :--- | :--- |
| 🎓 **Học sinh (Làm bài thi)** | [http://localhost:3000/](http://localhost:3000/) *(chạy qua server)*<br>hoặc [http://localhost:5173/](http://localhost:5173/) *(chạy qua vite dev)* | Mặc định vào thẳng giao diện phòng thi & quy chế |
| 👨‍🏫 **Giáo viên (Bảng điều khiển)** | [http://localhost:3000/?mode=teacher](http://localhost:3000/?mode=teacher)<br>hoặc [http://localhost:5173/?mode=teacher](http://localhost:5173/?mode=teacher) | Yêu cầu nhập mật khẩu giáo viên |

---

## 🏫 2. Cho Máy Học Sinh / Điện Thoại / Máy Tính Bảng Trong Cùng Mạng Wi-Fi (LAN)

| Đối Tượng | Đường Link Truy Cập | Mô Tả |
| :--- | :--- | :--- |
| 📱 **Học sinh vào thi** | `http://192.168.1.7:3000/` | Gửi link này cho học sinh trong phòng học |
| 💻 **Giáo viên giám thị từ xa** | `http://192.168.1.7:3000/?mode=teacher` | Giám sát qua điện thoại hoặc máy khác |

*(Lưu ý: Nếu IP máy tính của bạn thay đổi khi đổi mạng Wi-Fi, hãy chạy lệnh `ipconfig` trong terminal để lấy IPv4 mới).*

---

## 🔑 3. Danh Sách Tài Khoản Giáo Viên Bộ Môn & Mật Khẩu

Hệ thống đã hỗ trợ **Phân quyền đa giáo viên (Multi-Teacher RBAC)**. Mỗi giáo viên chỉ quản lý môn của mình, không bị lẫn lộn dữ liệu:

| Bộ Môn | Tên Đăng Nhập | Mật Khẩu | Quyền Hạn |
| :--- | :--- | :--- | :--- |
| 🛡️ **Quản Trị Viên (Admin)** | `admin` | `admin2026` | Toàn quyền tất cả các môn, quản lý và tạo tài khoản giáo viên mới |
| 💻 **GV Tin Học** | `gv_tin` | `tin2026` | Quản lý ngân hàng đề, tạo phòng thi & bảng điểm môn Tin |
| 📐 **GV Toán Học** | `gv_toan` | `toan2026` | Quản lý ngân hàng đề, tạo phòng thi & bảng điểm môn Toán |
| ⚡ **GV Vật Lí** | `gv_ly` | `ly2026` | Quản lý ngân hàng đề, tạo phòng thi & bảng điểm môn Vật lí |
| 🧪 **GV Hóa Học** | `gv_hoa` | `hoa2026` | Quản lý ngân hàng đề, tạo phòng thi & bảng điểm môn Hóa học |
| 🧬 **GV Sinh Học** | `gv_sinh` | `sinh2026` | Quản lý ngân hàng đề, tạo phòng thi & bảng điểm môn Sinh học |

*(Ghi chú: Tại màn hình đăng nhập giáo viên, bạn có thể bấm vào các nút chọn nhanh để đăng nhập ngay mà không cần gõ phím).*

---

## 🌟 4. Các Tính Năng Đột Phá Vừa Được Nâng Cấp

1. **Hiển thị Công thức Toán KaTeX (LaTeX)**: Tự động hiển thị công thức đẹp mắt, sắc nét khi gõ `$ công_thức $` hoặc `$$ công_thức $$` cho cả câu hỏi, đáp án và ngân hàng đề.
2. **Chế độ Thi Đề PDF Gốc + Phiếu Trả Lời Trắc Nghiệm (Split-Screen)**: Thầy cô chỉ cần tải lên 1 file PDF đề thi có sẵn (Toán/Lí/Hóa/Sinh giữ nguyên 100% hình ảnh đồ thị, font chữ) và dán dòng đáp án nhanh (`1A 2B 3C...`). Màn hình học sinh tự động chia đôi: bên trái đọc PDF, bên phải là phiếu trả lời trắc nghiệm điện tử.
3. **Máy Tính Bỏ Túi Ảo (Casio FX-580VN X Mini)**: Bật/tắt ngay trên màn hình làm bài, học sinh thoải mái tính toán $\sin, \cos, \tan, \sqrt{x}, \log$ mà không cần mở phần mềm ngoài (tránh vi phạm chuyển tab).
4. **Bảng Điều Khiển Quản Lý Giáo Viên (Dành riêng cho Admin)**: Cho phép thêm, sửa, phân công bộ môn và đặt lại mật khẩu cho các giáo viên trong trường.

---

## 🚀 5. Cách Khởi Động Hệ Thống

Mở Terminal (PowerShell hoặc Command Prompt) tại thư mục dự án và chọn 1 trong 2 cách:

### Cách 1: Chạy Fullstack Bản Đầy Đủ (Khuyến Nghị Khi Tổ Chức Thi)
Chạy cả giao diện web lẫn máy chủ thời gian thực (Realtime Socket.IO) trên cổng **3000**:
```bash
npm run build
npm run server
```
👉 Sau đó mở trình duyệt vào: [http://localhost:3000/](http://localhost:3000/)

### Cách 2: Chạy Chế Độ Phát Triển (Dev)
Nếu đang chỉnh sửa giao diện nhanh:
- **Terminal 1 (Backend):**
  ```bash
  npm run server
  ```
- **Terminal 2 (Frontend Vite):**
  ```bash
  npm run dev
  ```
👉 Mở trình duyệt vào: [http://localhost:5173/](http://localhost:5173/)

---

## ⚡ 5. Chạy Online Bằng Vercel & Cloud

### A. Triển khai Giao diện Web lên Vercel (Miễn phí, 2 phút)
Dự án đã được tạo sẵn file cấu hình `vercel.json`.

**Cách 1: Triển khai trực tiếp qua GitHub (Khuyên dùng)**
1. Đẩy code lên GitHub:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push
   ```
2. Mở [vercel.com](https://vercel.com) -> Đăng nhập bằng GitHub -> Bấm **Add New...** -> **Project**.
3. Chọn repository `AntiCheatExamPro` -> Bấm **Deploy**.
4. Vercel sẽ tự động build và cấp cho bạn một link online HTTPS miễn phí (ví dụ: `https://anticheat-exam.vercel.app`).

**Cách 2: Triển khai bằng Vercel CLI từ máy tính**
```bash
npx vercel
```
*(Làm theo hướng dẫn trên màn hình, nhấn Enter để chọn cấu hình mặc định).*

---

### ⚠️ Lưu ý quan trọng về tính năng Realtime khi dùng Vercel:
- **Làm bài thi & Chống gian lận:** Hoạt động 100% độc lập trên Vercel (học sinh ở bất cứ đâu có mạng đều vào thi, tự xáo trộn mã đề, chống chuyển tab, toàn màn hình).
- **Bảng giám thị Live & Lưu điểm tập trung:** Vercel là nền tảng Serverless (không hỗ trợ WebSocket Socket.IO liên tục lâu dài). 
  - Nếu bạn muốn dùng **Bảng giám thị thời gian thực (Live Proctoring)** và **lưu kết quả thi của tất cả học sinh vào một nơi**: bạn chỉ cần deploy phần server (Node.js) lên [Render.com](https://render.com) (miễn phí), sau đó thêm biến môi trường trên Vercel:
    `VITE_API_URL=https://dia-chi-backend-cua-ban.onrender.com`
  - Hoặc nếu tổ chức thi ngay tại trường/lớp: chỉ cần mở máy giáo viên chạy `npm run server` và dùng Cloudflare Tunnel:
    ```bash
    npx cloudflared tunnel --url http://localhost:3000
    ```

