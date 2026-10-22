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

## 🚀 6. CẬP NHẬT PHIÊN BẢN MỚI (18/10/2026): TẠO LỚP, MÃ LỚP CHÍNH XÁC, MÃ PIN RIÊNG & SỬA ĐĂNG NHẬP GIÁO VIÊN

### 1. Quản lý lớp học & Mã PIN bài thi riêng biệt cho từng lớp:
- **Tạo lớp học độc lập:** Giáo viên và Admin có thể tạo lớp học với mã lớp chuẩn xác (VD: `7A1`, `7A2`, `10A1`, `12A3`...), tên lớp, khối lớp, môn học và giáo viên phụ trách.
- **Bài thi & Mã PIN riêng cho từng lớp:** Mỗi lớp được gán một bài thi riêng (tên bài thi, thời gian làm bài, số lượng câu, chế độ Ngân hàng đề hoặc PDF) kèm **Mã PIN bảo mật riêng**.
- **Nhận diện học sinh theo mã lớp chính xác:**
  - Học sinh nhập Họ tên, Mã lớp và Mã PIN phòng thi.
  - Hệ thống kiểm tra mã lớp thời gian thực: Nếu mã lớp tồn tại, hiển thị ngay huy hiệu nhận diện màu xanh với tên lớp, môn thi, bài thi riêng và thời gian làm bài.
  - Nếu học sinh nhập sai mã lớp hoặc mã lớp chưa tạo: Báo lỗi chi tiết, yêu cầu nhập đúng mã lớp do giáo viên cung cấp.
  - Nếu phòng thi của lớp đang đóng: Báo lỗi thông báo phòng thi đang đóng.
  - Nếu nhập sai mã PIN bài thi của lớp: Báo lỗi mã PIN không chính xác.
  - Khi bắt đầu: Học sinh nhận đúng đề thi và cấu hình riêng của lớp đó.
- **Nút tiện ích cho giáo viên:**
  - Sao chép nhanh thông báo thi & link vào phòng thi kèm mã PIN để gửi Zalo/nhóm lớp chỉ với 1 click.
  - Bật/tắt mở thi nhanh tức thời (Toggle Active/Closed).
  - Vào thi thử trực tiếp theo từng lớp.

### 2. Khắc phục toàn diện lỗi đăng nhập Giáo viên:
- **Nguyên nhân trước đây:** 
  - `src/services/api.ts` dùng hardcoded check `window.location.port === '5173'` nên khi chạy ở port khác hoặc không có server, fetch API trả về 404.
  - `vite.config.ts` thiếu proxy tới backend Express port 3000.
  - Chế độ offline fallback chỉ kiểm tra `admin2026`, các tài khoản bộ môn khác (`gv_tin`, `gv_toan`, `gv_ly`...) bị từ chối nếu backend chưa khởi động.
- **Giải pháp đã triển khai:**
  - Cấu hình proxy `/api` và `/socket.io` trong `vite.config.ts` trỏ tới `http://localhost:3000`.
  - Bổ sung cơ chế xác thực offline đa tài khoản từ `getStoredTeachers()` cho phép đăng nhập thành công 100% cả khi online lẫn offline.
  - Bảo mật tuyệt đối giao diện `TeacherLoginModal.tsx`: Đã gỡ bỏ toàn bộ danh sách tài khoản mẫu/mật khẩu thử nghiệm và các nút 1-click đăng nhập nhanh. Ô đăng nhập và mật khẩu để trống hoàn toàn, hỗ trợ nút Hiện/Ẩn mật khẩu (Show/Hide Password) và bảo mật tuyệt đối không để học sinh nhìn thấy mật khẩu của giáo viên.
  - Xử lý trim khoảng trắng tên đăng nhập và mật khẩu ở cả server và client.

### 3. Đưa đề thi Giữa học kì 1 Tin học 6 và cấu hình lớp 6G01 vào hệ thống:
- **Lớp học:** `6G01` (`Lớp 6G01 - Tin Học 6`).
- **Mã PIN phòng thi:** `6001`.
- **Cấu trúc đề thi:**
  - Tổng số: **34 câu hỏi** (Thời gian làm bài: 45 phút).
  - **Phần I (32 câu trắc nghiệm 4 lựa chọn):** Bao quát toàn bộ kiến thức Tin học 6 Giữa học kì 1 (Thông tin & dữ liệu, Lưu trữ và trao đổi thông tin, Máy tính trong hoạt động thông tin, Biểu diễn dữ liệu trong máy tính, Mạng máy tính). Đáp án chính xác theo ma trận chuẩn của đề thi.
  - **Phần II (2 câu trắc nghiệm Đúng / Sai):** Mỗi câu gồm 4 ý $a, b, c, d$, học sinh chọn Đúng hoặc Sai cho từng nhận định độc lập về Biểu diễn dữ liệu & Mạng máy tính.
- **Tự động trộn đề & chống gian lận:**
  - Mỗi học sinh vào thi với mã `6G01` và PIN `6001` sẽ được phát sinh mã đề ngẫu nhiên (3 chữ số), đảo thứ tự câu hỏi và xáo trộn các phương án trả lời.

### 4. Sửa lỗi F5 văng ra giao diện học sinh & Đảm bảo 100% kết quả nộp bài hiện trong Bảng điểm:
- **Khắc phục lỗi F5 (Refresh) bị văng về giao diện học sinh:**
  - Nguyên nhân: Trước đây `appMode` mặc định đặt lại thành `'student'` mỗi khi tải lại trang và không lưu vết chế độ đang xem vào `sessionStorage` hay URL.
  - Giải pháp: Lưu `sessionStorage.setItem('anticheat_app_mode', 'teacher')` và cập nhật tham số URL `?mode=teacher`. Khởi tạo `appMode` ưu tiên kiểm tra phiên đăng nhập giáo viên và tham số URL. Khi F5, giáo viên ở lại đúng giao diện điều khiển, không bị văng ra phòng thi học sinh.
- **Khắc phục lỗi nộp bài thi thử không hiện kết quả trong Bảng điểm:**
  - Nguyên nhân: `handleSubmitExam` trước đây chỉ lưu bài nộp vào LocalStorage khi API backend báo lỗi, nhưng khi chạy trên hosting tĩnh (như Vercel) hoặc khi server phản hồi rỗng `[]`, hàm làm mới bảng điểm đã ghi đè làm trắng danh sách nộp. Ngoài ra bản ghi nộp bài thiếu trường `exam_title` của lớp làm bộ lọc lớp/bài thi không khớp.
  - Giải pháp:
    1. Khi thí sinh nộp bài, hệ thống **lập tức lưu vĩnh viễn** bản ghi `SubmissionRecord` (đầy đủ `exam_id`, `exam_title` của lớp riêng) vào LocalStorage và State bảng điểm trước khi gửi API.
    2. Nâng cấp cơ chế đồng bộ nền (Polling 3.5s): Áp dụng thuật toán **Merge thông minh (Map theo submission_id)**, tuyệt đối không dùng mảng rỗng `[]` để xóa sạch bài nộp đã có.
    3. Thêm hàm kiểm tra `safeJsonFetch` tránh xung đột phản hồi HTML của Vercel SPA rewrite.

### 5. Khắc phục toàn diện các lỗi hệ thống theo Báo cáo Kiểm định (13 Bugs Resolved):
- **Sửa Bug #1 & #8 (Tính điểm đề PDF/Bank chuẩn xác cho từng lớp trên Vercel):**
  - Tệp: `api/exam/submit.ts`
  - Khắc phục: Tìm kiếm `matchedClass` từ `student_class` và xây dựng `effectiveConfig` hợp nhất cấu hình riêng của lớp với cấu hình toàn cục. Áp dụng `calculateExamScore` với `effectiveConfig` để chấm điểm đúng đáp án PDF và ma trận câu hỏi của từng lớp cụ thể.
- **Sửa Bug #2 & #10 (Khởi tạo và validate tiêu đề bài thi khi Ra Đề Cho Lớp):**
  - Tệp: `src/components/teacher/ClassManagementTab.tsx`
  - Khắc phục: Khởi tạo sẵn `setExamFormTitle(c.examTitle || ...)` khi mở modal "Ra Đề Cho Lớp". Bổ sung validate không cho phép lưu nếu tiêu đề bài thi bị để trống.
- **Sửa Bug #3 (Bổ sung distribution ma trận đề cho các lớp mặc định):**
  - Tệp: `src/data/defaultClasses.ts`
  - Khắc phục: Cung cấp `distribution: { single_choice, true_false }` cụ thể cho các lớp 7A1, 7A2 (8 TN + 2 Đ/S), 10A1 (16 TN + 4 Đ/S), 12A3 (20 TN + 5 Đ/S).
- **Sửa Bug #4 (Thứ tự merge lớp học từ máy chủ):**
  - Tệp: `src/App.tsx`
  - Khắc phục: Sắp xếp thứ tự nạp `DEFAULT_CLASSES` -> `prev` (LocalStorage) -> `serverClasses` (Server). Nhờ đó dữ liệu mới nhất từ máy chủ luôn được ưu tiên cập nhật, không bị dữ liệu cũ ở trình duyệt đè lên.
- **Sửa Bug #5 (Loại bỏ Polling trùng lặp gây quá tải):**
  - Tệp: `src/components/teacher/GradebookTab.tsx`
  - Khắc phục: Xóa bỏ interval poll 3s chạy song song trong `GradebookTab.tsx`. Toàn bộ dữ liệu bảng điểm được cập nhật qua polling tập trung tại `App.tsx` và WebSocket realtime.
- **Sửa Bug #6 (Lưu phiên làm bài & Tự động Reconnect trên Vercel Serverless):**
  - Tệp: `api/_storage.ts`, `api/exam/start.ts`, `api/exam/submit.ts`
  - Khắc phục: Bổ sung các hàm lưu trữ phiên thi hoạt động (`saveActiveStudentSession`, `getActiveStudentSession`, `deleteActiveStudentSession`) lưu vào Upstash Redis với TTL tự hủy. Thí sinh bị rớt mạng hoặc tải lại trang sẽ tự động kết nối lại đúng đề thi và thời gian còn lại.
- **Sửa Bug #7 (Bảo toàn ngày tạo createdAt khi cập nhật lớp):**
  - Tệp: `api/classes.ts`
  - Khắc phục: Tra cứu bản ghi lớp học cũ trước khi ghi đè, bảo toàn giá trị `existing.createdAt` nguyên bản.
- **Sửa Bug #9 (Xử lý xóa lớp & bài nộp tương thích 100% Vercel & Express):**
  - Tệp: `vercel.json`, `api/submissions.ts`, `api/classes.ts`, `src/services/api.ts`
  - Khắc phục: Bổ sung rewrite `/api/submissions/:id` -> `/api/submissions?id=:id` trong `vercel.json`. Hỗ trợ trích xuất ID đa năng (URL path segment, query param `?id=...`, JSON body) và thêm `handleCors` cho các API Serverless.
- **Sửa Bug #11 (Hỗ trợ Toggle bỏ chọn đáp án PDF & Đồng bộ văn bản nhanh):**
  - Tệp: `src/components/teacher/ClassManagementTab.tsx`
  - Khắc phục: Trong bảng đáp án PDF của lớp, click lần 2 vào cùng phương án sẽ hủy chọn (Toggle) và tự động cập nhật lại ô chuỗi đáp án nhanh.
- **Sửa Bug #13 (Regex nhận diện đáp án tiếng Việt đa năng):**
  - Tệp: `src/components/teacher/ClassManagementTab.tsx`
  - Khắc phục: Nâng cấp regex `/(?:(?:câu|cau|q|question)\s*)?(\d+)[\s.:-]*([a-dA-D])/giu` hỗ trợ nhận dạng linh hoạt tất cả các biến thể "Câu", "CÂU", "cau", "Q1", "Question 1"...

---

## 🚀 7. KHẮC PHỤC TOÀN DIỆN LỖI RA ĐỀ XONG VÀO LỚP KHÔNG THẤY ĐỀ TRÊN VERCEL (22/10/2026)

### 📌 Nguyên nhân gốc rễ (Root Causes Identified):
1. **Lỗi truyền props phòng thi trong `src/App.tsx` (Bug cốt lõi):**
   - Khi học sinh vào phòng thi (`studentFlow === 'running'`), component `ExamRunner` nhận prop `config={config}` (cấu hình chung toàn cục) thay vì `config={currentSession.effectiveConfig || config}` (cấu hình bài thi riêng của lớp vừa ra).
   - Dẫn đến: Toàn bộ tiêu đề đề thi mới, thời gian thi riêng, chế độ đề PDF/OMR sheet và ma trận câu hỏi riêng của lớp bị ghi đè bởi cấu hình đề chung cũ.
2. **Lỗi đứt gãy đồng bộ giữa Cấu Hình Đề Thi Chung (`ExamConfigTab`) và Lớp Học (`ClassManagementTab`):**
   - Khi giáo viên ra đề ở tab "Cấu Hình Đề Thi", đề thi chỉ lưu vào `config` toàn cục, không tự động cập nhật vào các lớp học hiện có (Lớp 6G01, 7A1, 7A2...). Do đó học sinh vào lớp vẫn hiển thị đề thi cũ của lớp đó.
3. **Lỗi Serverless Vercel `FUNCTION_INVOCATION_FAILED` (HTTP 500):**
   - Các file trong `api/` là TypeScript thuần import trực tiếp `../src/types/exam` và `../src/data/defaultClasses`. Trên Vercel runtime (Node.js ESM), việc import không có đuôi file `.js` và truy cập file ngoài thư mục `api/` gây lỗi `ERR_MODULE_NOT_FOUND` khiến toàn bộ API `/api/classes`, `/api/health`, `/api/exam/start` bị lỗi 500.
   - Do đó, mọi lớp học mới hoặc đề thi mới ra không lưu được lên máy chủ mà chỉ nằm trong LocalStorage của máy giáo viên.
4. **Mất cấu hình bài thi khi F5 tải lại trang:**
   - Cơ chế khôi phục phiên thi (`getStoredActiveSession`) chỉ lưu các trường cơ bản, thiếu `effective_config` nên khi học sinh F5 bị quay về đề chung.

### 🛠️ Các giải pháp đã triển khai & hoàn thành:
1. **Sửa truyền prop `ExamRunner` & Lưu phiên làm bài (`src/App.tsx`, `src/types/exam.ts`):**
   - Truyền `config={currentSession.effectiveConfig || config}` cho `ExamRunner`.
   - Bổ sung `effective_config` và `exam_title` vào `ExamSessionState` để học sinh F5 vẫn giữ nguyên 100% đề thi của lớp.
2. **Đồng bộ 2 chiều giữa Đề Thi Chung và Đề Của Từng Lớp:**
   - Trong `ExamConfigTab.tsx`: Bổ sung tính năng "Đồng bộ đề này cho:" (Tất cả các lớp hoặc lớp cụ thể). Khi giáo viên bấm lưu đề, hệ thống lập tức cập nhật đề vào các lớp học tương ứng.
   - Trong `ClassManagementTab.tsx`: Bổ sung nút "Lấy cấu hình từ Đề Thi Chung" ngay trong modal Ra Đề Cho Lớp để giáo viên sao chép đề chung sang lớp chỉ với 1 click.
3. **Đóng gói độc lập toàn bộ Vercel Serverless Functions (`scripts/build-api.mjs`, `package.json`):**
   - Xây dựng quy trình build tự động với `esbuild` đóng gói toàn bộ 9 endpoint API thành các file `.js` ESM độc lập trong `api/` (inlined mọi dependencies, xử lý CORS, bọc `try/catch` an toàn 100%).
   - Kiểm thử native Node.js: Toàn bộ API `/api/classes`, `/api/health`, `/api/config` phản hồi HTTP 200 JSON chuẩn xác.
4. **Tối ưu trải nghiệm vào phòng thi của học sinh (`src/components/student/ExamLobby.tsx`):**
   - Bổ sung thanh chọn nhanh mã lớp (Quick-select class pills) ngay dưới ô nhập mã lớp, hiển thị trực quan các lớp đang mở (`6ONTAP`, `6G01`, `7A1`...) giúp học sinh và giáo viên click vào lớp thi thử tức thì mà không cần gõ phím.

---

## 🚀 8. KHẮC PHỤC LỖI TÍNH ĐIỂM & TRIỂN KHAI CƠ CHẾ SETUP ĐIỂM THEO TỪNG PHẦN (22/10/2026)

### 📌 Nguyên nhân sự cố hiển thị sai điểm (3.14 điểm & 33 / 105):
1. **Lỗi rò rỉ toàn bộ ngân hàng câu hỏi vào bài chấm:**
   - Khi học sinh làm bài thi từ Serverless API, server trả về `sanitizedQuestions`, nhưng biến câu hỏi gốc `pickedOriginalQuestions` ở client bị rỗng.
   - Khi nộp bài (`handleSubmitExam` trong `src/App.tsx`), hệ thống lấy fallback là toàn bộ 105 câu hỏi trong ngân hàng (`bank`).
   - Hàm chấm điểm lặp qua cả 105 câu của ngân hàng làm mẫu số (`totalPossiblePoints = 105`). Học sinh làm đề 40 câu của lớp 6G2, đúng được 33 câu, hệ thống chia cho 105 câu của ngân hàng $\to$ ra **3.14 điểm** (thay vì 8.25 điểm)!
2. **Điểm số mỗi câu bị gán cứng (+1.0 điểm/câu):**
   - Modal chi tiết bài làm (`GradebookTab.tsx`) gán cứng chữ `(+1.0 điểm)`.
3. **Chưa có cấu hình setup điểm theo từng phần:**
   - Giáo viên chưa có chỗ để nhập điểm cho Phần I (Trắc nghiệm) và Phần II (Đúng/Sai), và chưa có logic tự động chia đều điểm cho các câu trong phần đó.

### 🛠️ Các giải pháp đã triển khai & hoàn thành:
1. **Cập nhật Model Dữ Liệu (`src/types/exam.ts`):**
   - Bổ sung `single_choice_points`, `true_false_points`, `pdf_total_points` vào `ExamDistribution` và `ExamConfig`.
   - Bổ sung `correct_answers_count`, `per_question_scores`, `per_question_max_points` vào `SubmissionRecord`.
2. **Nâng cấp Động cơ tính điểm (`src/utils/randomEngine.ts`):**
   - Nâng cấp `calculateExamScore` tự động phân bổ điểm theo từng phần do giáo viên cài đặt.
   - **Tự động chia đều điểm cho các câu hỏi trong phần:**
     - Phần I (Trắc nghiệm): $\text{Điểm mỗi câu} = \frac{\text{Tổng điểm Phần I}}{\text{Số câu Trắc nghiệm}}$ (VD: 28 câu = 7.0 điểm $\to$ 0.25 đ/câu).
     - Phần II (Đúng / Sai): $\text{Điểm mỗi câu} = \frac{\text{Tổng điểm Phần II}}{\text{Số câu Đúng/Sai}}$ (VD: 4 câu = 4.0 điểm $\to$ 1.0 đ/câu).
     - Chấm điểm câu Đúng/Sai chuẩn theo Quy chế thi Bộ GD&ĐT 2025: Đúng 1 ý = 10%, 2 ý = 25%, 3 ý = 50%, 4 ý = 100%.
   - Lọc an toàn chỉ chấm trên đúng các câu hỏi có trong bài thi của học sinh, loại bỏ hoàn toàn việc lấy 105 câu ngân hàng.
3. **Sửa lỗi khôi phục & Nộp bài thi (`src/App.tsx`):**
   - Trong `handleStartExam`: Reconstruct chính xác `pickedOriginalQuestions` từ danh sách `sanitizedQuestions` đối chiếu với ngân hàng.
   - Trong `handleSubmitExam`: Bảo đảm `originalToGrade` chỉ chứa đúng các câu hỏi của bài thi.
4. **Giao diện Cài đặt Điểm trực quan cho Giáo viên (`ExamConfigTab.tsx` & `ClassManagementTab.tsx`):**
   - Thêm ô nhập số điểm cho Phần I và Phần II, kèm huy hiệu tính toán tự động `⚡ Tự động chia: X điểm / câu`.
   - Bổ sung thanh tổng kết điểm trực quan: `Tổng điểm bài thi: 10.0 / 10.0 điểm ✓ Chuẩn thang 10 Bộ GD&ĐT` kèm nút tự cân đối về 10 điểm.
   - Thêm các mẫu đề nhanh: `28 TN (7đ) + 4 Đ/S (3đ)` hoặc `40 TN (10đ)`.
5. **Giao diện Hiển thị Điểm Học sinh & Giáo viên (`ExamRunner.tsx` & `GradebookTab.tsx` & `excelHelper.ts`):**
   - Trong phòng thi: Tiêu đề câu hỏi hiển thị rõ ràng số điểm của câu (VD: `(0.25 điểm)`).
   - Trong Bảng điểm giáo viên: Thẻ thống kê hiển thị chuẩn `Điểm đạt (Thang 10): 8.25 / 10.0 (33 / 40 câu đúng)`.
   - Thẻ từng câu hỏi trong bài làm hiển thị đúng điểm đạt được: `✓ ĐÚNG (+0.25đ)` hoặc `✓ ĐÚNG (+1.00đ)`.
   - File Excel xuất điểm chuẩn theo thang 10 kèm số câu đúng trên tổng số câu.
6. **Đồng bộ Backend Serverless API (`api_src/exam/start.ts` & `api_src/exam/submit.ts`):**
   - API trả về `seed` cho client và chấm điểm lưu vào Redis đúng chuẩn thang 10.
   - Biên dịch thành công 9 file bundle ESM trong `api/` bằng `esbuild`.

---

*Nhật ký được cập nhật lần cuối vào: 22/10/2026 bởi Đội ngũ Phát triển AntiCheatExamPro.*

