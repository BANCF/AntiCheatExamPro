# 📓 NHẬT KÝ CÔNG VIỆC DỰ ÁN (PROJECT WORK LOG)
# Hệ Thống Thi Trực Tuyến Chống Gian Lận - AntiCheatExamPro

> **Mục đích tài liệu:** Ghi chép chi tiết toàn bộ lịch sử phát triển, các tính năng đã hoàn thiện, kiến trúc hệ thống, danh sách file thay đổi và hướng dẫn vận hành để tra cứu, bàn giao hoặc tiếp tục phát triển sau này.

---

## 📌 1. TỔNG QUAN DỰ ÁN & MÔI TRƯỜNG TRIỂN KHAI

- **Tên dự án:** AntiCheatExamPro (Hệ thống thi trắc nghiệm trực tuyến giám sát thông minh)
- **Công nghệ nền tảng:**
  - **Frontend:** React 19, TypeScript, Tailwind CSS / Lucide Icons, KaTeX (render công thức toán), Canvas Confetti.
  - **Backend:** Node.js, Express, Socket.IO (giám sát thời gian thực), File-based persistent store (`server_data/`).
  - **Công cụ build:** Vite 6, Oxlint.
  - **Triển khai Online:** Vercel (Frontend SPA) + GitHub Repository (`BANCF/AntiCheatExamPro`).
  - **Triển khai Mạng nội bộ (Offline/LAN):** Port 3000 (Express Fullstack) hoặc Port 5173 (Vite Dev Server).

---

## 🗓️ 2. CHI TIẾT CÁC HẠNG MỤC CÔNG VIỆC ĐÃ HOÀN THÀNH

### 🔹 Đợt 1: Khởi tạo lõi phòng thi & Công nghệ chống gian lận (Anti-Cheat Engine)
- **Mục tiêu:** Tạo môi trường thi nghiêm ngặt, ngăn chặn học sinh mở tài liệu hoặc gian lận trên trình duyệt.
- **Các tính năng đã hoàn thành:**
  - **Fullscreen Lockdown:** Bắt buộc vào chế độ toàn màn hình khi bắt đầu làm bài. Nếu thoát toàn màn hình, hệ thống đếm cảnh báo và yêu cầu quay lại ngay.
  - **Chặn phím tắt & chuột phải:** Vô hiệu hóa `F12` (DevTools), `Alt + Tab`, `Ctrl + C`, `Ctrl + V`, `Ctrl + R`, `F5`, chuột phải (Context Menu).
  - **Phát hiện chuyển Tab / Rời màn hình (`visibilitychange`, `blur`):** Bắt ngay lập tức khi học sinh chuyển sang tab khác, mở ứng dụng khác (Zalo, Messenger, ChatGPT...) và cộng dồn số lần vi phạm.
  - **Ngưỡng vi phạm tự động nộp bài:** Giáo viên có thể cài đặt số lần vi phạm tối đa (ví dụ: 3 lần). Vượt quá số lần này, bài thi sẽ bị khóa và tự động nộp bài ngay lập tức.
  - **Đồng hồ đếm ngược thông minh:** Tự động nộp bài khi hết thời gian thi, có âm thanh và hiệu ứng cảnh báo khi còn 5 phút cuối.

---

### 🔹 Đợt 2: Cổng Giáo Viên (Teacher Console) & Ngân hàng câu hỏi Tin học
- **Mục tiêu:** Cho phép giáo viên thiết lập đề thi, quản lý kho câu hỏi và giám sát học sinh.
- **Các tính năng đã hoàn thành:**
  - **Thiết lập kỳ thi linh hoạt (Exam Config):**
    - Đặt tên bài thi, khối lớp, mã đề.
    - Cài đặt thời gian làm bài (15p, 45p, 60p, 90p...).
    - Bật/tắt xáo trộn câu hỏi và xáo trộn thứ tự đáp án.
    - Quy định thời gian mở đề và khóa đề thi.
  - **Ngân hàng câu hỏi Tin học chuyên sâu:**
    - Phân loại rõ ràng theo **Khối lớp** (Lớp 6, 7, 8, 9, 10, 11, 12).
    - Phân loại theo **Kỳ thi** (Giữa kì I, Cuối kì I, Giữa kì II, Cuối kì II).
    - Tích hợp bộ 40+ câu hỏi mẫu Tin học 7 bám sát chương trình (Đề cương Giữa kì I).
    - Hỗ trợ công cụ tìm kiếm câu hỏi theo từ khóa, lọc theo mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).
    - Hỗ trợ nhập đề từ Excel (`Mau_Ngan_Hang_Cau_Hoi.xlsx`), JSON hoặc thêm từng câu hỏi thủ công.

---

### 🔹 Đợt 3: Bảng điểm, Bảng xếp hạng phân loại & Khắc phục Realtime
- **Mục tiêu:** Xử lý tình trạng bảng điểm bị dồn chung tất cả các lớp/môn và bảng xếp hạng không tự cập nhật.
- **Các tính năng đã hoàn thành:**
  - **Tách riêng Bảng điểm & Xếp hạng theo Bài kiểm tra & Khối lớp:**
    - Có dropdown chọn bài thi cụ thể (ví dụ: *Kiểm tra Giữa kì Tin 7*, *Kiểm tra 15p Toán 8*...).
    - Lọc riêng theo từng lớp học (ví dụ: *Lớp 7A1*, *Lớp 7A2*...).
  - **Bộ lọc sắp xếp thứ tự đa chiều:**
    - 🥇 *Điểm từ cao xuống thấp:* Vinh danh học sinh giỏi, hiển thị huy chương Top 1, Top 2, Top 3.
    - 📉 *Điểm từ thấp lên cao:* Giúp giáo viên nhanh chóng nắm bắt các học sinh bị điểm yếu để phụ đạo.
    - ⏱️ *Theo thời gian nộp bài:* Xem học sinh nào nộp bài sớm nhất, nộp bài muộn nhất.
  - **Khắc phục lỗi BXH không cập nhật (Fix Realtime Auto-Sync):**
    - Tích hợp cơ chế tự động đồng bộ (Polling chu kỳ 3 giây kết hợp WebSocket thông báo).
    - Khi có học sinh nộp bài hoặc vi phạm, màn hình giáo viên tự động hiển thị dữ liệu mới nhất mà **không cần phải bấm F5 tải lại trang**.

---

### 🔹 Đợt 4: Máy tính bỏ túi khoa học ảo (Casio FX-580VN X Mini Pop-up)
- **Mục tiêu:** Cung cấp máy tính ngay trong phòng thi, học sinh không cần mở app ngoài hay dùng điện thoại (tránh vi phạm chuyển tab).
- **Các tính năng đã hoàn thành:**
  - **Giao diện mô phỏng máy tính khoa học mini:**
    - Đầy đủ các phép tính cơ bản ($+, -, \times, \div$) và nâng cao: $\sin, \cos, \tan$, căn bậc hai ($\sqrt{x}$), lũy thừa ($x^y$), logarit ($\log, \ln$), dấu ngoặc $(, )$, số thập phân, phần trăm.
    - Các hằng số khoa học: $\pi$, số Euler ($e$).
    - Nút xóa từng ký tự (DEL) và xóa toàn bộ (AC).
  - **Tính năng tương tác cửa sổ:**
    - Nút bật/tắt máy tính nổi ngay góc phải màn hình thi.
    - Cho phép kéo thả (Drag & Drop) di chuyển vị trí máy tính khắp màn hình.
    - Nút thu gọn (Minimize) để tiết kiệm không gian đọc đề.

---

### 🔹 Đợt 5: Hệ thống phân quyền Giáo viên đa bộ môn (Multi-Teacher RBAC)
- **Mục tiêu:** Cho phép nhiều giáo viên thuộc các bộ môn khác nhau cùng sử dụng hệ thống độc lập, không lẫn đề thi và bảng điểm.
- **Các tính năng đã hoàn thành:**
  - **Phân tách vai trò theo bộ môn:**
    - Giáo viên từng môn: Toán, Tin học, Vật lí, Hóa học, Sinh học, Tiếng Anh.
    - Giáo viên đăng nhập môn nào chỉ xem và quản lý ngân hàng câu hỏi, đề thi và bảng điểm của môn đó.
  - **Tài khoản Quản Trị Viên tối cao (Admin):**
    - Đăng nhập: `admin` / `admin2026`.
    - Xem và kiểm soát toàn bộ bài thi của tất cả các môn trong trường.
    - Tab riêng **Quản lý giáo viên (`TeacherManagementTab`)**:
      - Tạo thêm tài khoản giáo viên mới.
      - Phân công môn học phụ trách.
      - Đổi mật khẩu / Reset mật khẩu cho giáo viên.
      - Bật / Khóa tài khoản giáo viên khi cần.
  - **Modal đăng nhập tiện ích:**
    - Có sẵn các nút chọn nhanh (Quick-fill pills) cho từng bộ môn, giúp giáo viên đăng nhập tức thì không cần gõ bàn phím.

---

### 🔹 Đợt 6: Hỗ trợ hiển thị Công thức Toán học chuẩn LaTeX (KaTeX Integration)
- **Mục tiêu:** Hiển thị công thức Toán, Lí, Hóa phức tạp (phân số, tích phân, căn thức, ma trận, ký hiệu hóa học) chuẩn xác, thẩm mỹ cao.
- **Các tính năng đã hoàn thành:**
  - Tích hợp thư viện KaTeX siêu nhẹ và tải font toán học chuẩn.
  - Tạo component chuyên dụng `MathRenderer.tsx`:
    - Tự động quét và biên dịch cú pháp `$ công_thức $` (dạng inline) và `$$ công_thức $$` (dạng khối căn giữa).
    - Áp dụng trên toàn bộ: Tiêu đề đề thi, nội dung câu hỏi, 4 phương án đáp án A-B-C-D, lời giải thích và ngân hàng đề.
    - Cơ chế an toàn (Fallback): Nếu giáo viên gõ sai cú pháp LaTeX, hệ thống vẫn hiển thị chuỗi gốc rõ ràng, không làm gián đoạn bài thi.

---

### 🔹 Đợt 7: Chế độ thi bằng file PDF gốc + Phiếu trả lời trắc nghiệm (Split-Screen OMR Mode)
- **Mục tiêu:** Thầy cô môn Toán, Lí, Hóa thường có sẵn đề thi PDF gồm nhiều hình vẽ, đồ thị và công thức phức tạp. Tính năng này giúp thầy cô tổ chức thi ngay mà không cần tốn thời gian gõ lại từng câu vào máy.
- **Các tính năng đã hoàn thành:**
  - **Dành cho Giáo viên khi tạo đề thi:**
    - Chuyển đổi giữa 2 chế độ: *Trắc nghiệm trực tuyến chuẩn* hoặc *Chế độ Đề thi PDF kèm phiếu trắc nghiệm*.
    - Tải trực tiếp file đề thi `.pdf` lên hệ thống.
    - Ô nhập chuỗi đáp án nhanh thông minh: Giáo viên chỉ cần dán một chuỗi (ví dụ: `1A 2B 3C 4D 5A 6B 7C...`), hệ thống tự động bóc tách thành bảng đáp án chuẩn trong 1 giây.
  - **Dành cho Học sinh khi làm bài (Giao diện Split-Screen hiện đại):**
    - **Nửa màn hình bên trái:** Trình đọc file PDF tương tác: Hỗ trợ cuộn trang, phóng to, thu nhỏ, vừa vặn trang màn hình.
    - **Nửa màn hình bên phải:** Phiếu trả lời trắc nghiệm điện tử (OMR Sheet):
      - Danh sách các câu hỏi 1, 2, 3... kèm 4 nút tròn tô đáp án A, B, C, D to rõ, trực quan.
      - Nút đánh dấu câu hỏi cần xem lại (Flag review).
      - Thanh trạng thái tiến độ đếm số câu đã làm / tổng số câu (ví dụ: Đã làm 35/40 câu).
  - **Tự động chấm điểm:** Hệ thống tự động so khớp các nút tô của học sinh với chuỗi đáp án của giáo viên và tính điểm chính xác tuyệt đối ngay khi nộp bài.

---

### 🔹 Đợt 8: Nâng cấp Backend, Tối ưu Build, Deploy Vercel & GitHub
- **Mục tiêu:** Đảm bảo hệ thống tải được các file PDF dung lượng lớn và vận hành mượt mà cả online lẫn offline.
- **Các tính năng đã hoàn thành:**
  - Nâng giới hạn kích thước nhận dữ liệu của Backend Express lên **50MB** (`express.json({ limit: '50mb' })`).
  - Cấu hình file `vercel.json` định tuyến SPA (Single Page Application) phục vụ triển khai Frontend lên Vercel.
  - Đóng gói (Build) kiểm tra toàn bộ mã nguồn với Vite: Không có lỗi biên dịch TypeScript hay Linting.
  - Commit toàn bộ 27 tệp tin và đẩy lên GitHub Repository: `origin/main` (`ee518ef`).

---

## 📁 3. DANH SÁCH CÁC TỆP TIN QUAN TRỌNG ĐÃ TẠO & CHỈNH SỬA

| Tệp tin | Vai trò & Chức năng chính |
| :--- | :--- |
| `src/components/common/MathRenderer.tsx` | Component hiển thị công thức toán học KaTeX (LaTeX). |
| `src/components/student/ExamRunner.tsx` | Phòng thi của học sinh: Fullscreen lockdown, Anti-cheat, Split-Screen PDF, OMR Sheet, Máy tính Casio. |
| `src/components/teacher/TeacherConsole.tsx` | Khung điều khiển chính của Giáo viên: Header phân quyền môn, nút đăng xuất, chuyển tab. |
| `src/components/teacher/TeacherLoginModal.tsx` | Hộp thoại đăng nhập Giáo viên có các nút chọn nhanh tài khoản mẫu. |
| `src/components/teacher/TeacherManagementTab.tsx` | Tab quản lý giáo viên dành riêng cho tài khoản Admin (Thêm/Sửa/Đổi pass/Khóa). |
| `src/components/teacher/ExamConfigTab.tsx` | Cấu hình đề thi: Tải lên đề PDF, nhập nhanh chuỗi đáp án trắc nghiệm, thời gian thi. |
| `src/components/teacher/QuestionBankTab.tsx` | Ngân hàng đề: Bộ lọc Khối lớp (6-12), Kỳ thi (Giữa kì/Cuối kì), môn học. |
| `src/components/teacher/GradebookTab.tsx` | Bảng điểm & Bảng xếp hạng: Lọc theo Bài thi, Lớp, sắp xếp đa chiều, đồng bộ tự động. |
| `src/types/exam.ts` | Khai báo kiểu dữ liệu: User, Teacher, ExamConfig, PDFExam, OMRAnswer, Question. |
| `src/services/api.ts` | Client API gọi sang server: Quản lý giáo viên, lưu đề thi PDF, cập nhật điểm số. |
| `server/index.ts` | Server Express & Socket.IO: Nâng payload 50MB, định tuyến API, giám sát realtime. |
| `server/store.ts` | Bộ nhớ lưu trữ dữ liệu bền vững: Lưu tài khoản giáo viên, ngân hàng câu hỏi, bài nộp. |
| `LINK_VAO_WEB.md` | Tài liệu hướng dẫn truy cập nhanh hệ thống, thông tin IP mạng LAN và danh sách tài khoản. |
| `vercel.json` | Cấu hình Vercel rewrite cho SPA React. |

---

## 🔑 4. DANH SÁCH TÀI KHOẢN MẪU & MẬT KHẨU

| Bộ Môn | Tên đăng nhập | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| 🛡️ **Quản trị viên (Admin)** | `admin` | `admin2026` | Toàn quyền tất cả môn, quản lý tài khoản giáo viên |
| 💻 **Giáo viên Tin học** | `gv_tin` | `tin2026` | Quản lý đề và bảng điểm môn Tin |
| 📐 **Giáo viên Toán học** | `gv_toan` | `toan2026` | Quản lý đề và bảng điểm môn Toán |
| ⚡ **Giáo viên Vật lí** | `gv_ly` | `ly2026` | Quản lý đề và bảng điểm môn Vật lí |
| 🧪 **Giáo viên Hóa học** | `gv_hoa` | `hoa2026` | Quản lý đề và bảng điểm môn Hóa học |
| 🧬 **Giáo viên Sinh học** | `gv_sinh` | `sinh2026` | Quản lý đề và bảng điểm môn Sinh học |

---

## 🛠️ 5. HƯỚNG DẪN CÁC LỆNH VẬN HÀNH THƯỜNG DÙNG

1. **Khởi chạy hệ thống Fullstack cục bộ (Khuyên dùng khi tổ chức thi):**
   ```bash
   npm run build
   npx tsx server/index.ts
   ```
   - Học sinh vào thi: `http://localhost:3000` hoặc `http://<IP_LAN>:3000`
   - Giáo viên vào bảng điều khiển: `http://localhost:3000/?mode=teacher`

2. **Chạy chế độ phát triển (Hot-Reload):**
   ```bash
   npm run dev
   ```

3. **Kiểm tra lỗi mã nguồn (Lint & Typecheck):**
   ```bash
   npx oxlint
   npx tsc --noEmit
   ```

4. **Đồng bộ cập nhật lên GitHub & Vercel:**
   ```bash
   git add .
   git commit -m "nội dung cập nhật"
   git push origin main
   ```

---

## 💡 6. KẾ HOẠCH NÂNG CẤP TIẾP THEO (GỢI Ý)

- [ ] **AI Hỗ Trợ Tạo Đề:** Cho phép giáo viên dán văn bản thô hoặc ảnh chụp đề thi để AI tự động trích xuất thành câu hỏi trắc nghiệm kèm công thức KaTeX.
- [ ] **Chụp ảnh giám sát qua Webcam:** Chụp ảnh khuôn mặt học sinh ngẫu nhiên định kỳ trong ca thi để phát hiện người thi hộ.
- [ ] **Xuất báo cáo PDF/Excel:** Bổ sung nút bấm xuất toàn bộ bảng điểm lớp học ra file Excel mẫu chuẩn của Bộ Giáo dục & Đào tạo.
- [ ] **Ngân hàng đề thi chung toàn trường:** Chia sẻ kho đề thi giữa các giáo viên cùng bộ môn để tái sử dụng.

---
*Nhật ký được cập nhật lần cuối vào: 17/10/2026 bởi Đội ngũ Phát triển AntiCheatExamPro.*
