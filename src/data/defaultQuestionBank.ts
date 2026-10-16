import { Question } from '../types/exam';

export const DEFAULT_QUESTION_BANK: Question[] = [
  {
    id: "q1",
    type: "single_choice",
    prompt: "Hệ điều hành nào sau đây là hệ điều hành mã nguồn mở hoàn toàn miễn phí và được sử dụng rộng rãi trên các máy chủ?",
    options: [
      { id: "opt_1_1", text: "Linux (Ubuntu / Debian)", is_correct: true },
      { id: "opt_1_2", text: "Microsoft Windows 11", is_correct: false },
      { id: "opt_1_3", text: "Apple macOS Sonoma", is_correct: false },
      { id: "opt_1_4", text: "Apple iOS", is_correct: false }
    ],
    tags: ["tin_hoc_10", "easy", "he_dieu_hanh"]
  },
  {
    id: "q2",
    type: "single_choice",
    prompt: "Giao thức truyền thông nào sau đây bảo mật dữ liệu web bằng cách mã hóa dữ liệu truyền tải thông qua chứng chỉ SSL/TLS?",
    options: [
      { id: "opt_2_1", text: "HTTPS (Port 443)", is_correct: true },
      { id: "opt_2_2", text: "HTTP (Port 80)", is_correct: false },
      { id: "opt_2_3", text: "FTP (Port 21)", is_correct: false },
      { id: "opt_2_4", text: "Telnet (Port 23)", is_correct: false }
    ],
    tags: ["mang_may_tinh", "medium", "bao_mat"]
  },
  {
    id: "q3",
    type: "single_choice",
    prompt: "Thiết bị mạng nào sau đây hoạt động ở Tầng mạng (Network Layer - Layer 3) trong mô hình OSI và có nhiệm vụ định tuyến gói tin giữa các mạng khác nhau?",
    options: [
      { id: "opt_3_1", text: "Router (Bộ định tuyến)", is_correct: true },
      { id: "opt_3_2", text: "Switch Layer 2 (Bộ chuyển mạch)", is_correct: false },
      { id: "opt_3_3", text: "Hub (Bộ tập trung)", is_correct: false },
      { id: "opt_3_4", text: "Repeater (Bộ lặp tín hiệu)", is_correct: false }
    ],
    tags: ["mang_may_tinh", "medium", "phan_cung"]
  },
  {
    id: "q4",
    type: "single_choice",
    prompt: "Trong ngôn ngữ lập trình Python, cấu trúc dữ liệu nào sau đây là 'immutable' (không thể thay đổi giá trị của phần tử sau khi khởi tạo)?",
    options: [
      { id: "opt_4_1", text: "Tuple", is_correct: true },
      { id: "opt_4_2", text: "List", is_correct: false },
      { id: "opt_4_3", text: "Dictionary", is_correct: false },
      { id: "opt_4_4", text: "Set", is_correct: false }
    ],
    tags: ["lap_trinh", "easy", "python"]
  },
  {
    id: "q5",
    type: "single_choice",
    prompt: "Bộ nhớ RAM (Random Access Memory) trong máy tính có đặc điểm cơ bản nào sau đây?",
    options: [
      { id: "opt_5_1", text: "Dữ liệu bị xóa sạch hoàn toàn khi mất nguồn điện (Volatile Memory)", is_correct: true },
      { id: "opt_5_2", text: "Dữ liệu được lưu trữ vĩnh viễn không phụ thuộc nguồn điện", is_correct: false },
      { id: "opt_5_3", text: "Tốc độ đọc ghi chậm hơn rất nhiều so với ổ đĩa cứng HDD", is_correct: false },
      { id: "opt_5_4", text: "Chỉ cho phép đọc dữ liệu, tuyệt đối không thể ghi", is_correct: false }
    ],
    tags: ["phan_cung", "easy", "tin_hoc_10"]
  },
  {
    id: "q6",
    type: "single_choice",
    prompt: "Hành động nào sau đây là biện pháp phòng chống tấn công lừa đảo (Phishing) hiệu quả nhất cho người dùng trực tuyến?",
    options: [
      { id: "opt_6_1", text: "Kiểm tra kỹ tên miền URL và bật xác thực 2 bước (2FA) cho mọi tài khoản", is_correct: true },
      { id: "opt_6_2", text: "Bấm ngay vào các liên kết nhận quà miễn phí trong email lạ", is_correct: false },
      { id: "opt_6_3", text: "Sử dụng chung một mật khẩu đơn giản cho tất cả các trang web", is_correct: false },
      { id: "opt_6_4", text: "Tắt phần mềm diệt virus và tường lửa để tải file nhanh hơn", is_correct: false }
    ],
    tags: ["bao_mat", "easy", "an_toan_thong_tin"]
  },
  {
    id: "q7",
    type: "single_choice",
    prompt: "Độ phức tạp thời gian trung bình (Average Time Complexity) của thuật toán sắp xếp nhanh (Quick Sort) là bao nhiêu?",
    options: [
      { id: "opt_7_1", text: "O(n log n)", is_correct: true },
      { id: "opt_7_2", text: "O(n^2)", is_correct: false },
      { id: "opt_7_3", text: "O(n)", is_correct: false },
      { id: "opt_7_4", text: "O(log n)", is_correct: false }
    ],
    tags: ["thuat_toan", "hard", "cau_truc_du_lieu"]
  },
  {
    id: "q8",
    type: "single_choice",
    prompt: "Trong cơ sở dữ liệu quan hệ (RDBMS), khóa chính (Primary Key) của một bảng phải thỏa mãn điều kiện nào sau đây?",
    options: [
      { id: "opt_8_1", text: "Giá trị là duy nhất và không được phép chứa giá trị NULL", is_correct: true },
      { id: "opt_8_2", text: "Có thể trùng lặp nhưng không được phép NULL", is_correct: false },
      { id: "opt_8_3", text: "Có thể chứa giá trị NULL nếu bảng chưa có dữ liệu", is_correct: false },
      { id: "opt_8_4", text: "Bắt buộc phải là kiểu số nguyên tự tăng", is_correct: false }
    ],
    tags: ["csdl", "medium", "sql"]
  },
  {
    id: "q9",
    type: "single_choice",
    prompt: "Địa chỉ IPv4 chuẩn có độ dài là bao nhiêu bit?",
    options: [
      { id: "opt_9_1", text: "32 bit (gồm 4 byte cách nhau bởi dấu chấm)", is_correct: true },
      { id: "opt_9_2", text: "64 bit", is_correct: false },
      { id: "opt_9_3", text: "128 bit", is_correct: false },
      { id: "opt_9_4", text: "16 bit", is_correct: false }
    ],
    tags: ["mang_may_tinh", "easy", "tin_hoc_10"]
  },
  {
    id: "q10",
    type: "single_choice",
    prompt: "Tập tin có phần mở rộng '.docx' thuộc định dạng chuẩn của phần mềm văn phòng nào?",
    options: [
      { id: "opt_10_1", text: "Microsoft Word", is_correct: true },
      { id: "opt_10_2", text: "Microsoft Excel", is_correct: false },
      { id: "opt_10_3", text: "Microsoft PowerPoint", is_correct: false },
      { id: "opt_10_4", text: "Adobe Photoshop", is_correct: false }
    ],
    tags: ["tin_hoc_10", "easy", "van_phong"]
  },
  {
    id: "q11",
    type: "single_choice",
    prompt: "Hàm băm một chiều (Cryptographic Hash Function) như SHA-256 có tính chất đặc trưng nào?",
    options: [
      { id: "opt_11_1", text: "Không thể giải mã ngược lại chuỗi gốc ban đầu từ giá trị băm (Pre-image resistance)", is_correct: true },
      { id: "opt_11_2", text: "Dễ dàng giải mã ngược bằng khóa bí mật", is_correct: false },
      { id: "opt_11_3", text: "Chuỗi đầu ra có độ dài phụ thuộc vào độ dài chuỗi đầu vào", is_correct: false },
      { id: "opt_11_4", text: "Hai chuỗi đầu vào khác nhau luôn tạo ra giá trị băm giống nhau", is_correct: false }
    ],
    tags: ["bao_mat", "hard", "ma_hoa"]
  },
  {
    id: "q12",
    type: "single_choice",
    prompt: "Phát biểu nào sau đây đúng về điện toán đám mây (Cloud Computing)?",
    options: [
      { id: "opt_12_1", text: "Cung cấp tài nguyên tính toán theo nhu cầu (On-demand) qua mạng Internet", is_correct: true },
      { id: "opt_12_2", text: "Bắt buộc người dùng phải tự trang bị và bảo trì toàn bộ phần cứng tại chỗ", is_correct: false },
      { id: "opt_12_3", text: "Chỉ hoạt động được khi có mạng LAN nội bộ, không hỗ trợ Internet", is_correct: false },
      { id: "opt_12_4", text: "Không thể mở rộng hoặc thu hẹp dung lượng lưu trữ", is_correct: false }
    ],
    tags: ["cong_nghe", "easy", "cloud"]
  },
  {
    id: "q13",
    type: "single_choice",
    prompt: "Trong biểu diễn số nhị phân, số nhị phân 1101 tương đương với giá trị nào trong hệ thập phân (cơ số 10)?",
    options: [
      { id: "opt_13_1", text: "13", is_correct: true },
      { id: "opt_13_2", text: "11", is_correct: false },
      { id: "opt_13_3", text: "15", is_correct: false },
      { id: "opt_13_4", text: "9", is_correct: false }
    ],
    tags: ["tin_hoc_10", "easy", "nhi_phan"]
  },
  {
    id: "q14",
    type: "single_choice",
    prompt: "Kỹ thuật nào sau đây được sử dụng để kiểm thử hiệu năng và độ tin cậy của phần mềm trước khi phát hành chính thức?",
    options: [
      { id: "opt_14_1", text: "Stress Testing & Load Testing", is_correct: true },
      { id: "opt_14_2", text: "Phishing Attack", is_correct: false },
      { id: "opt_14_3", text: "Data Scrapping", is_correct: false },
      { id: "opt_14_4", text: "SQL Injection", is_correct: false }
    ],
    tags: ["kiem_thu", "medium", "cong_nghe"]
  },
  {
    id: "q15",
    type: "single_choice",
    prompt: "Trong CSS, thuộc tính nào được dùng để kiểm soát việc người dùng có thể bôi đen (chọn) văn bản hay không?",
    options: [
      { id: "opt_15_1", text: "user-select", is_correct: true },
      { id: "opt_15_2", text: "pointer-events", is_correct: false },
      { id: "opt_15_3", text: "text-decoration", is_correct: false },
      { id: "opt_15_4", text: "content-visibility", is_correct: false }
    ],
    tags: ["lap_trinh_web", "easy", "css"]
  },
  {
    id: "q16",
    type: "single_choice",
    prompt: "Sự kiện JavaScript nào được kích hoạt khi trạng thái hiển thị của tab thay đổi (học sinh chuyển tab hoặc thu nhỏ trình duyệt)?",
    options: [
      { id: "opt_16_1", text: "document.visibilitychange", is_correct: true },
      { id: "opt_16_2", text: "window.onresize", is_correct: false },
      { id: "opt_16_3", text: "document.onkeydown", is_correct: false },
      { id: "opt_16_4", text: "window.onscroll", is_correct: false }
    ],
    tags: ["lap_trinh_web", "medium", "javascript"]
  },
  {
    id: "q17",
    type: "single_choice",
    prompt: "Thuật toán xáo trộn mảng ngẫu nhiên công bằng nhất với độ phức tạp thời gian O(n) là gì?",
    options: [
      { id: "opt_17_1", text: "Fisher-Yates Shuffle (Knuth Shuffle)", is_correct: true },
      { id: "opt_17_2", text: "Bubble Sort", is_correct: false },
      { id: "opt_17_3", text: "Dijkstra Algorithm", is_correct: false },
      { id: "opt_17_4", text: "Binary Search", is_correct: false }
    ],
    tags: ["thuat_toan", "medium", "toan_tin"]
  },
  {
    id: "q18",
    type: "single_choice",
    prompt: "Cổng mặc định (Default Port) của dịch vụ cơ sở dữ liệu MySQL là cổng nào?",
    options: [
      { id: "opt_18_1", text: "3306", is_correct: true },
      { id: "opt_18_2", text: "5432", is_correct: false },
      { id: "opt_18_3", text: "8080", is_correct: false },
      { id: "opt_18_4", text: "27017", is_correct: false }
    ],
    tags: ["csdl", "easy", "sql"]
  },

  // ---------------- TRUE / FALSE QUESTIONS (CHÙM NHIỀU Ý CON) ----------------
  {
    id: "q19",
    type: "true_false",
    prompt: "Cho biết tính Đúng / Sai của các nhận định sau về giao thức mạng và mô hình truyền thông Internet:",
    items: [
      { id: "sub_19_1", text: "HTTP truyền tải văn bản thuần (plaintext), kẻ tấn công có thể đọc trộm dữ liệu trên đường truyền.", is_correct: true },
      { id: "sub_19_2", text: "HTTPS sử dụng giao thức mã hóa SSL/TLS để bảo mật thông tin tài khoản và mật khẩu.", is_correct: true },
      { id: "sub_19_3", text: "Giao thức FTP được thiết kế chuyên biệt để gửi thư điện tử giữa các máy chủ email.", is_correct: false },
      { id: "sub_19_4", text: "Mỗi thiết bị kết nối vào mạng Internet chỉ cần địa chỉ MAC vật lý là có thể giao tiếp toàn cầu mà không cần địa chỉ IP.", is_correct: false }
    ],
    tags: ["tin_hoc_10", "medium", "mang_may_tinh"]
  },
  {
    id: "q20",
    type: "true_false",
    prompt: "Xem xét các nhận định sau về an toàn thông tin, bảo mật mật khẩu và phòng chống mã độc:",
    items: [
      { id: "sub_20_1", text: "Mật khẩu mạnh nên có độ dài tối thiểu 8-12 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt.", is_correct: true },
      { id: "sub_20_2", text: "Bật xác thực đa yếu tố (MFA/2FA) giúp tài khoản an toàn hơn ngay cả khi mật khẩu bị lộ.", is_correct: true },
      { id: "sub_20_3", text: "Tất cả các tệp đính kèm có đuôi .exe hoặc .scr gửi từ người lạ qua email đều tuyệt đối an toàn và nên chạy ngay.", is_correct: false },
      { id: "sub_20_4", text: "Phần mềm Ransomware (mã độc tống tiền) chỉ lây nhiễm trên máy tính Windows, không bao giờ ảnh hưởng tới máy chủ Linux hay dữ liệu đám mây.", is_correct: false }
    ],
    tags: ["bao_mat", "easy", "an_toan_thong_tin"]
  },
  {
    id: "q21",
    type: "true_false",
    prompt: "Đánh giá tính Đúng / Sai của các phát biểu liên quan đến phần cứng máy tính và bộ vi xử lý (CPU):",
    items: [
      { id: "sub_21_1", text: "CPU (Central Processing Unit) được ví như bộ não của máy tính, đảm nhiệm xử lý lệnh và phép tính số học/logic.", is_correct: true },
      { id: "sub_21_2", text: "Bộ nhớ Cache trên CPU có tốc độ truy xuất nhanh hơn bộ nhớ RAM chính nhưng dung lượng nhỏ hơn nhiều.", is_correct: true },
      { id: "sub_21_3", text: "Ổ cứng thể rắn SSD có tốc độ đọc ghi dữ liệu chậm hơn nhiều so với ổ đĩa từ HDD truyền thống.", is_correct: false },
      { id: "sub_21_4", text: "ROM (Read Only Memory) là bộ nhớ lưu trữ tạm thời, dữ liệu sẽ mất hoàn toàn khi tắt máy.", is_correct: false }
    ],
    tags: ["phan_cung", "medium", "tin_hoc_10"]
  },
  {
    id: "q22",
    type: "true_false",
    prompt: "Đánh giá tính Đúng / Sai của các phát biểu về thuật toán và cấu trúc dữ liệu cơ bản:",
    items: [
      { id: "sub_22_1", text: "Ngăn xếp (Stack) hoạt động theo nguyên lý LIFO (Last In First Out - Vào sau Ra trước).", is_correct: true },
      { id: "sub_22_2", text: "Hàng đợi (Queue) hoạt động theo nguyên lý FIFO (First In First Out - Vào trước Ra trước).", is_correct: true },
      { id: "sub_22_3", text: "Tìm kiếm nhị phân (Binary Search) có thể áp dụng hiệu quả trên một mảng chưa được sắp xếp thứ tự.", is_correct: false },
      { id: "sub_22_4", text: "Độ phức tạp thời gian tốt nhất của thuật toán sắp xếp nổi bọt (Bubble Sort) trên mảng đã sắp xếp sẵn là O(n^3).", is_correct: false }
    ],
    tags: ["thuat_toan", "hard", "cau_truc_du_lieu"]
  },
  {
    id: "q23",
    type: "true_false",
    prompt: "Cho các khẳng định sau về bản quyền phần mềm và đạo đức trong không gian mạng:",
    items: [
      { id: "sub_23_1", text: "Sử dụng phần mềm bẻ khóa (crack) tiềm ẩn rủi ro cao bị cài cắm mã độc và vi phạm pháp luật sở hữu trí tuệ.", is_correct: true },
      { id: "sub_23_2", text: "Phần mềm nguồn mở (Open Source) thường đi kèm giấy phép (MIT, Apache, GPL) cho phép người dùng xem và cải tiến mã nguồn.", is_correct: true },
      { id: "sub_23_3", text: "Mọi nội dung hình ảnh tìm thấy trên Google Images đều là tài sản miễn phí hoàn toàn, được tự do thương mại hóa mà không cần xin phép.", is_correct: false },
      { id: "sub_23_4", text: "Tạo tài khoản mạo danh người khác trên mạng xã hội để đăng tải tin đồn thất thiệt không vi phạm pháp luật nếu dùng nick ảo.", is_correct: false }
    ],
    tags: ["dao_duc_so", "easy", "phap_luat"]
  },
  {
    id: "q24",
    type: "true_false",
    prompt: "Đánh giá tính Đúng / Sai của các phát biểu về cơ chế chống gian lận trong kiểm tra trực tuyến trên trình duyệt web:",
    items: [
      { id: "sub_24_1", text: "Sự kiện visibilitychange cho phép phát hiện học sinh chuyển sang tab khác hoặc thu nhỏ cửa sổ trình duyệt.", is_correct: true },
      { id: "sub_24_2", text: "Bóc tách trường is_correct khỏi payload trả về client giúp ngăn học sinh mở Developer Tools để soi đáp án.", is_correct: true },
      { id: "sub_24_3", text: "Trình duyệt web cho phép ứng dụng JavaScript cấm vĩnh viễn người dùng bấm phím tắt phần cứng như nút tắt nguồn máy tính.", is_correct: false },
      { id: "sub_24_4", text: "Xáo trộn ngẫu nhiên thứ tự câu hỏi và phương án A-B-C-D giúp giảm thiểu việc học sinh chép bài nhau trong cùng phòng.", is_correct: true }
    ],
    tags: ["bao_mat", "medium", "anti_cheat"]
  }
];

export const DEFAULT_EXAM_CONFIG = {
  exam_id: "exam_tin10_midterm",
  title: "Kiểm tra Giữa kỳ Môn Tin Học & An Toàn Số",
  duration_minutes: 20, // 20 minutes
  max_violations_allowed: 3,
  total_questions_to_pick: 10,
  distribution: {
    single_choice: 7,
    true_false: 3
  },
  access_pin: "2026"
};
