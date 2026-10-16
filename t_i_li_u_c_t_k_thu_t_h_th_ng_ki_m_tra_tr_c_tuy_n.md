# Product Requirement & Technical Specification: Online Exam Anti-Cheat System

## 1. Project Overview & Objective
Xây dựng hệ thống web app kiểm tra trực tuyến dành cho học sinh với tính năng quản lý ngân hàng câu hỏi (cho phép giáo viên upload và tuỳ chọn cấu hình tạo đề ngẫu nhiên), cơ chế xáo trộn mã đề động, chống gian lận đa lớp trên trình duyệt và ẩn toàn bộ điểm số đối với học sinh (chỉ giáo viên mới có quyền xem và xuất bảng điểm).

---

## 2. Core Functional Requirements

### 2.1. Quản lý Ngân hàng câu hỏi (Question Bank)
- **Cơ chế nạp dữ liệu (Import):**
  - Hỗ trợ tải lên qua file **JSON** hoặc định dạng văn bản chuẩn hóa (Markdown / Text template) hoặc **Excel (.xlsx)**.
  - Phân loại câu hỏi theo 2 nhóm:
    1. `single_choice`: Trắc nghiệm 4 đáp án A-B-C-D (chọn 1 phương án đúng).
    2. `true_false`: Trắc nghiệm Đúng / Sai (bao gồm cả dạng chùm nhiều ý con a, b, c, d).
  - Gắn thẻ (tag) mức độ/chủ đề (ví dụ: `easy`, `medium`, `hard`, `chapter_1`).

- **Cấu hình Đề thi (Exam Configurator):**
  - Giáo viên chọn tổng số lượng câu hỏi cần lấy ngẫu nhiên từ ngân hàng (ví dụ: lấy $N$ câu từ kho $M$ câu).
  - Cho phép cấu hình tỷ lệ câu hỏi (ví dụ: 15 câu trắc nghiệm A-B-C-D + 5 câu Đúng/Sai).
  - Cài đặt thời gian làm bài (đếm ngược theo phút).
  - Cài đặt ngưỡng vi phạm chống gian lận (ví dụ: chuyển tab quá 3 lần -> tự động nộp bài).

### 2.2. Động cơ Xáo trộn & Sinh Mã đề (Randomization Engine)
- Mỗi học sinh khi bấm vào làm bài sẽ được cấp một `attempt_id` đi kèm với một `seed` ngẫu nhiên.
- Dựa trên `seed`:
  - Lựa chọn tập hợp $N$ câu hỏi từ ngân hàng gốc.
  - Hoán vị thứ tự hiển thị của các câu hỏi (Question Order Shuffling).
  - Hoán vị thứ tự các phương án lựa chọn A, B, C, D (Option Shuffling) bằng thuật toán *Fisher-Yates Shuffle*.
  - Gắn tự động một "Mã đề" (ví dụ: 101, 102, ...) hiển thị trên giao diện làm bài của học sinh để định danh.

### 2.3. Hệ thống Chống gian lận (Anti-Cheating Engine)
- **Theo dõi chuyển Tab & Rời màn hình:**
  - Bắt các sự kiện: `document.visibilitychange`, `window.blur`, `window.focus`.
  - Khi học sinh rời khỏi tab hoặc mở ứng dụng khác:
    - Kích hoạt modal cảnh báo toàn màn hình ngay khi quay lại.
    - Tăng biến đếm `violation_count`.
    - Gửi log vi phạm về server (kèm timestamp và thời gian rời tab).
    - Nếu đạt ngưỡng vi phạm (mặc định: 3 lần), hệ thống lập tức tự động khóa bài thi và chuyển sang trạng thái `FORCE_SUBMITTED`.
- **Khóa thao tác trình duyệt:**
  - Chặn mở menu chuột phải: `contextmenu -> e.preventDefault()`.
  - Chặn sao chép, cắt, dán: các sự kiện `copy`, `cut`, `paste` đều bị vô hiệu hóa.
  - Vô hiệu hóa bôi đen văn bản: thiết lập CSS `user-select: none;`.
  - Chặn phím tắt mở Developer Tools và phím điều hướng hệ thống (`F12`, `Ctrl+Shift+I`, `Ctrl+Shift+C`, `Ctrl+U`, `Ctrl+P`).
- **Ép buộc chế độ Toàn màn hình (Enforced Fullscreen):**
  - Yêu cầu học sinh vào chế độ toàn màn hình trước khi bắt đầu tính giờ.
  - Nếu học sinh bấm `Esc` hoặc thu nhỏ: Bật cảnh báo và đếm ngược 10 giây yêu cầu bấm nút quay lại toàn màn hình; nếu quá hạn coi như vi phạm.

### 2.4. Phân quyền Hiển thị Kết quả (Result Visibility & Export)
- **Phía Học sinh (Student View):**
  - Khi học sinh bấm nộp bài (hoặc hết giờ / bị nộp do vi phạm):
  - Hiển thị màn hình thông báo: *"Bạn đã hoàn thành bài kiểm tra thành công. Kết quả sẽ được công bố bởi giáo viên."*
  - **Tuyệt đối không hiển thị:** Điểm số, số câu đúng/sai, lời giải, hay bất kỳ manh mối đáp án nào (ngăn chặn tình trạng học sinh làm trước chụp đáp án chia sẻ cho bạn làm sau).
- **Phía Giáo viên (Teacher Dashboard):**
  - Xem danh sách kết quả tổng hợp của cả lớp:
    - Tên học sinh, Lớp, Mã đề thi.
    - Điểm số (thang điểm 10 quy đổi tự động).
    - Thời gian bắt đầu, thời gian nộp bài.
    - Số lần vi phạm / chuyển tab (kèm nhãn cảnh báo đỏ nếu bị Force Submitted).
  - Tính năng **Xuất Excel (Export to .xlsx)**: Xuất toàn bộ bảng điểm để phục vụ vào sổ điểm học tập.

---

## 3. Data Schema & Contracts

### 3.1. Cấu trúc Ngân hàng câu hỏi (Import Format - JSON)
```json
[
  {
    "id": "q1",
    "type": "single_choice",
    "prompt": "Hệ điều hành nào sau đây là mã nguồn mở?",
    "options": [
      { "id": "opt_1", "text": "Linux", "is_correct": true },
      { "id": "opt_2", "text": "Windows", "is_correct": false },
      { "id": "opt_3", "text": "macOS", "is_correct": false },
      { "id": "opt_4", "text": "iOS", "is_correct": false }
    ],
    "tags": ["tin_hoc_10", "easy"]
  },
  {
    "id": "q2",
    "type": "true_false",
    "prompt": "Cho biết tính Đúng / Sai của các nhận định sau về giao thức mạng:",
    "items": [
      { "id": "sub_1", "text": "HTTP truyền thông tin dưới dạng mã hóa.", "is_correct": false },
      { "id": "sub_2", "text": "HTTPS sử dụng SSL/TLS để bảo mật đường truyền.", "is_correct": true },
      { "id": "sub_3", "text": "FTP được dùng phổ biến để truyền tập tin qua mạng.", "is_correct": true },
      { "id": "sub_4", "text": "Mỗi thiết bị trên Internet chỉ có thể có địa chỉ MAC mà không cần IP.", "is_correct": false }
    ],
    "tags": ["tin_hoc_10", "medium"]
  }
]
```

### 3.2. Cấu trúc Cấu hình Đề thi (Exam Config)
```json
{
  "exam_id": "exam_midterm_101",
  "title": "Kiểm tra Giữa kỳ Môn Tin Học",
  "duration_minutes": 45,
  "max_violations_allowed": 3,
  "total_questions_to_pick": 20,
  "distribution": {
    "single_choice": 16,
    "true_false": 4
  }
}
```

### 3.3. Dữ liệu nộp bài & Bảng điểm (Submission Record)
```json
{
  "submission_id": "sub_883192",
  "student_name": "Nguyễn Văn A",
  "student_class": "10A1",
  "assigned_code": "103",
  "start_time": "2026-10-16T08:00:00Z",
  "submit_time": "2026-10-16T08:42:15Z",
  "status": "SUBMITTED", // hoặc "FORCE_SUBMITTED"
  "violation_count": 1,
  "violations_log": [
    { "timestamp": "2026-10-16T08:23:10Z", "type": "TAB_SWITCH", "duration": 5 }
  ],
  "student_answers": {
    "q1": "opt_1",
    "q2": { "sub_1": false, "sub_2": true, "sub_3": true, "sub_4": false }
  },
  "calculated_score": 9.5
}
```

---

## 4. UI/UX Layout Specification

### 4.1. Trang Giáo viên (Teacher Console)
1. **Tab 1 - Ngân hàng đề (Question Bank):**
   - Vùng kéo thả file (Drag & Drop) file JSON/Excel.
   - Bảng xem trước danh sách câu hỏi đã tải lên, bộ lọc phân loại.
2. **Tab 2 - Thiết lập đề thi (Configurator):**
   - Bộ chọn số lượng câu, tỷ lệ các dạng câu hỏi, thời gian làm bài, số lần vi phạm tối đa.
   - Nút *"Sinh link làm bài thi"* (kèm mã PIN phòng thi nếu cần).
3. **Tab 3 - Bảng kết quả (Gradebook):**
   - Bảng trực quan: Họ tên, Lớp, Mã đề, Điểm số, Cột cảnh báo vi phạm.
   - Nút hành động: `Export to Excel (.xlsx)`.

### 4.2. Trang Học sinh (Exam Room)
- **Màn hình Chờ (Lobby):**
  - Nhập Tên, Lớp. Đọc nội quy (Quy định chống chuyển tab, yêu cầu bật fullscreen).
  - Nút: *"Bắt đầu làm bài"*.
- **Màn hình Làm bài (In-Exam):**
  - Header: Đồng hồ đếm ngược (đổi màu vàng khi còn dưới 5 phút, màu đỏ khi còn dưới 1 phút); Hiển thị Mã đề; Nút nộp bài.
  - Sidebar bên phải: Bảng ma trận số câu hỏi (đã làm tô xanh, chưa làm để xám).
  - Vùng trung tâm: Hiển thị nội dung câu hỏi, danh sách radio button (với A-B-C-D) hoặc bảng nút True/False cho từng ý.
  - Tự động lưu đáp án (`auto-save`) mỗi khi học sinh tích chọn.
- **Màn hình Hoàn thành (Completion):**
  - Card cảm ơn đơn giản, thông báo bài đã được ghi nhận. Không chứa bất kỳ dữ liệu điểm số nào.

---

## 5. Security & Technical Constraints for Implementation
1. **Chấm điểm độc lập tại Backend / Protected Handler:**
   - Client của học sinh **không được lưu trữ đáp án đúng (`is_correct`)** trong payload JSON tải về máy.
   - Toàn bộ mảng đáp án đúng phải được bóc tách trước khi trả câu hỏi về cho học sinh, chỉ giữ lại trên máy chủ hoặc trong local state được mã hóa an toàn.
2. **Local Storage Backup:**
   - Lưu trữ tạm trạng thái bài làm của học sinh vào `localStorage` kèm thời gian hết hạn để nếu lỡ mất kết nối mạng, học sinh F5 vẫn khôi phục được trạng thái mà không mất bài làm.
3. **Thư viện đề xuất:**
   - Frontend: React / Vue 3 + Tailwind CSS + Lucide Icons.
   - Xử lý file Excel: `xlsx` (SheetJS).
   - Random/Shuffle: Thuật toán Fisher-Yates kết hợp seedable PRNG (như `seedrandom`).

---

## 6. Implementation Checklist for AI Agent
- [ ] Xây dựng parser đọc file ngân hàng câu hỏi (JSON schema validation).
- [ ] Viết hàm `generateExam(seed, bank, config)` thực hiện sampling câu hỏi và shuffle đáp án.
- [ ] Tạo module `useAntiCheat` hooks quản lý toàn màn hình, chặn sự kiện phím/chuột và theo dõi `document.visibilityState`.
- [ ] Dựng giao diện làm bài thi Responsive, hiển thị rõ ràng câu hỏi đơn và câu hỏi chùm True/False.
- [ ] Xây dựng màn hình hoàn thành ẩn điểm cho học sinh.
- [ ] Xây dựng bảng điều khiển giáo viên với chức năng chấm điểm và trích xuất bảng điểm ra file Excel.