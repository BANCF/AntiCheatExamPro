# 🛡️ AntiCheatExamPro - Hệ Thống Kiểm Tra Trực Tuyến Chống Gian Lận Đa Lớp

> **Hệ thống web app kiểm tra trực tuyến toàn diện dành cho trường học:** Quản lý ngân hàng câu hỏi, xáo trộn mã đề động (Fisher-Yates), cơ chế chống gian lận đa lớp trên trình duyệt, bảng giám thị thời gian thực (Live Proctoring Dashboard qua WebSocket), bảo mật ẩn 100% điểm số với thí sinh và hỗ trợ xuất bảng điểm Excel (.xlsx).

[![GitHub Repo](https://img.shields.io/badge/GitHub-BANCF%2FAntiCheatExamPro-blue?logo=github)](https://github.com/BANCF/AntiCheatExamPro)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express)](https://expressjs.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socketdotio)](https://socket.io)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## 🌟 Tính Năng Nổi Bật (Core Features)

### 1. 🔀 Động Cơ Xáo Trộn & Sinh Mã Đề (Randomization Engine)
- **Thuật toán Fisher-Yates kết hợp PRNG Mulberry32**: Mỗi thí sinh được cấp một `seed` ngẫu nhiên để chọn ngẫu nhiên $N$ câu hỏi từ kho $M$ câu theo tỷ lệ phân bổ.
- **Hoán vị 2 lớp**: Xáo trộn thứ tự câu hỏi và xáo trộn vị trí các phương án A-B-C-D.
- **Tự sinh Mã Đề Thi**: Gắn mã đề (VD: `102`, `434`, ...) trên giao diện thí sinh.
- **Bảo mật tuyệt đối**: Toàn bộ mảng đáp án đúng (`is_correct`) được bóc tách sạch sẽ tại Server trước khi gửi câu hỏi về client (chống soi DevTools).

### 2. 🚨 Hệ Thống Chống Gian Lận Đa Lớp (Anti-Cheat Engine)
- **Theo dõi chuyển Tab & Rời màn hình**:
  - Bắt các sự kiện `document.visibilitychange`, `window.blur`, `window.focus`.
  - Cảnh báo toàn màn hình ngay khi thí sinh quay lại, đếm số lần vi phạm `violation_count`.
  - **Tự động thu bài (`FORCE_SUBMITTED`)**: Khi chạm ngưỡng vi phạm cấu hình (mặc định 3 lần).
- **Khóa thao tác trình duyệt**:
  - Chặn menu chuột phải (`contextmenu`).
  - Chặn sao chép, cắt, dán (`copy`, `cut`, `paste`).
  - Vô hiệu hóa bôi đen văn bản (`user-select: none`).
  - Chặn phím tắt nhà phát triển & hệ thống (`F12`, `Ctrl+Shift+I/J/C`, `Ctrl+U`, `Ctrl+P`, `Ctrl+S`).
- **Ép buộc Toàn màn hình (Enforced Fullscreen)**:
  - Yêu cầu toàn màn hình trước khi bắt đầu tính giờ.
  - Khi thoát toàn màn hình: Đếm ngược 10 giây yêu cầu quay lại; quá hạn coi như vi phạm.

### 3. 📡 Bảng Giám Thị Trực Tiếp Thời Gian Thực (Live Proctoring Dashboard)
- **Công nghệ Socket.IO WebSocket**: Kết nối 2 chiều giữa giáo viên và học sinh theo thời gian thực.
- **Thẻ Thí Sinh Trực Tiếp (Live Student Cards)**:
  - Theo dõi danh sách học sinh đang online trong phòng thi.
  - Thanh tiến độ câu hỏi (VD: *8/10 câu*) và đồng hồ đếm ngược trực tiếp.
  - Cảnh báo nhấp nháy đỏ ngay khi có học sinh vừa chuyển tab hoặc rời màn hình.
- **Điều khiển từ xa (Remote Actions)**:
  - 📢 **Gửi cảnh báo tức thì**: Gửi tin nhắn pop-up trực tiếp lên màn hình thí sinh.
  - ⏱️ **+5 Phút bù giờ**: Cộng thời gian thi tức thì cho học sinh gặp sự cố mạng.
  - 🚫 **Đình chỉ thi từ xa**: Khóa bài và thu bài ngay lập tức khi phát hiện gian lận nghiêm trọng.
  - 🎙️ **Phát thanh toàn phòng thi**: Gửi thông báo broadcast tới toàn bộ thí sinh.
  - 🔔 **Âm thanh cảnh báo**: Phát tiếng bíp cảnh báo (Web Audio API) khi có vi phạm mới.

### 4. 📚 Quản Lý Ngân Hàng Đề & Thiết Lập Phòng Thi
- **Nhập dữ liệu linh hoạt**: Tải lên qua file **Excel (.xlsx)** hoặc **JSON** chuẩn hóa.
- **Cung cấp tệp mẫu**: Nút tải file mẫu Excel và JSON trực tiếp trên giao diện.
- **Hỗ trợ 2 dạng câu hỏi**:
  1. `single_choice`: Trắc nghiệm 4 đáp án A-B-C-D (chọn 1 phương án đúng).
  2. `true_false`: Trắc nghiệm Đúng/Sai (chùm nhiều ý con a, b, c, d).
- **Bộ lọc thông minh**: Lọc câu hỏi theo từ khóa, dạng câu hỏi và nhãn tag chủ đề.

### 5. 📊 Bảng Điểm & Trích Xuất Excel (Gradebook)
- **Chấm điểm độc lập tại Backend**: Thang điểm 10 quy đổi tự động.
- **Ẩn điểm số với học sinh**: Thí sinh sau khi nộp bài chỉ nhận màn hình cảm ơn kèm mã biên nhận, tuyệt đối không thấy điểm số hay đáp án.
- **Nhật ký vi phạm chi tiết (Audit Log)**: Ghi lại từng mốc thời gian rời tab và số giây ra ngoài của từng thí sinh.
- **Xuất bảng điểm Excel (.xlsx)**: Sử dụng SheetJS xuất danh sách lớp, điểm số, trạng thái nộp bài và tóm tắt vi phạm.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express 5, Socket.IO, TypeScript (`tsx`).
- **Xử lý Excel**: `xlsx` (SheetJS).
- **Random / Crypto**: Fisher-Yates Shuffle + PRNG Mulberry32.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Hệ Thống

### 1. Cài đặt Dependencies
```bash
git clone https://github.com/BANCF/AntiCheatExamPro.git
cd AntiCheatExamPro
npm install
```

### 2. Chạy Fullstack Server (Khuyến nghị)
Chạy cả Backend API, Socket.IO và phục vụ Giao diện Web trên cổng **3000**:
```bash
npm run build
npm run server
```
Truy cập:
- **Giáo viên**: `http://localhost:3000/`
- **Học sinh**: `http://localhost:3000/?mode=exam`

### 3. Chạy chế độ Phát triển (Dev Mode)
Chạy Vite Dev Server với Hot-Module-Replacement:
```bash
npm run dev
```
(Mặc định chạy tại `http://localhost:5173/`)

---

## 📂 Cấu Trúc Thư Mục (Project Structure)

```
AntiCheatExamPro/
├── server/                    # Backend API & WebSocket Server
│   ├── index.ts               # Express 5 + Socket.IO Server
│   └── store.ts               # In-memory Store & Local Persistence
├── src/
│   ├── components/
│   │   ├── student/           # Giao diện học sinh
│   │   │   ├── ExamLobby.tsx     # Màn hình chờ & nội quy
│   │   │   ├── ExamRunner.tsx    # Màn hình làm bài & ma trận câu hỏi
│   │   │   └── ExamCompleted.tsx # Màn hình nộp bài ẩn điểm
│   │   └── teacher/           # Giao diện giáo viên
│   │       ├── TeacherConsole.tsx   # Dashboard tổng hợp
│   │       ├── LiveProctoringTab.tsx# Bảng giám thị thời gian thực
│   │       ├── QuestionBankTab.tsx  # Quản lý ngân hàng đề & Excel
│   │       ├── ExamConfigTab.tsx    # Cấu hình đề thi & xáo trộn
│   │       └── GradebookTab.tsx     # Bảng điểm & xuất file .xlsx
│   ├── data/
│   │   └── defaultQuestionBank.ts # 24 câu hỏi mẫu phong phú
│   ├── hooks/
│   │   └── useAntiCheat.ts    # Hook chống gian lận đa lớp
│   ├── services/
│   │   ├── api.ts             # REST API Client
│   │   └── socket.ts          # Socket.IO Client
│   ├── types/
│   │   └── exam.ts            # Type definitions & Schemas
│   ├── utils/
│   │   ├── excelHelper.ts     # Trình đọc/xuất Excel & JSON
│   │   ├── randomEngine.ts    # Động cơ Fisher-Yates & chấm điểm
│   │   └── storage.ts         # LocalStorage backup
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
└── package.json
```

---

## 📄 Bản Quyền
Dự án được xây dựng và phát triển bởi [BANCF](https://github.com/BANCF).
