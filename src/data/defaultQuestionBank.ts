import { Question, ExamConfig } from '../types/exam';

export const DEFAULT_QUESTION_BANK: Question[] = [
  {
    "id": "q_tin7_1",
    "type": "single_choice",
    "prompt": "Thiết bị vào - ra đóng vai trò gì trong hệ thống máy tính?",
    "options": [
      {
        "id": "opt_1_a",
        "text": "Chỉ xử lí dữ liệu bên trong máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_1_b",
        "text": "Giúp máy tính trao đổi dữ liệu với thế giới bên ngoài.",
        "is_correct": true
      },
      {
        "id": "opt_1_c",
        "text": "Chỉ cung cấp nguồn điện cho máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_1_d",
        "text": "Điều khiển toàn bộ hoạt động của phần mềm.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_2",
    "type": "single_choice",
    "prompt": "Thiết bị nào sau đây dùng để tiếp nhận thông tin và chuyển vào máy tính (thiết bị vào)?",
    "options": [
      {
        "id": "opt_2_a",
        "text": "Bàn phím, chuột, micro.",
        "is_correct": true
      },
      {
        "id": "opt_2_b",
        "text": "Màn hình, máy in, loa.",
        "is_correct": false
      },
      {
        "id": "opt_2_c",
        "text": "Bộ xử lí trung tâm (CPU).",
        "is_correct": false
      },
      {
        "id": "opt_2_d",
        "text": "Máy chiếu, tai nghe.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_3",
    "type": "single_choice",
    "prompt": "Thiết bị nào sau đây nhận thông tin từ máy tính đưa ra bên ngoài (thiết bị ra)?",
    "options": [
      {
        "id": "opt_3_a",
        "text": "Chuột, bàn phím.",
        "is_correct": false
      },
      {
        "id": "opt_3_b",
        "text": "Máy in, loa, màn hình.",
        "is_correct": true
      },
      {
        "id": "opt_3_c",
        "text": "Micro, máy quét.",
        "is_correct": false
      },
      {
        "id": "opt_3_d",
        "text": "Ổ đĩa cứng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_4",
    "type": "single_choice",
    "prompt": "Máy chiếu thuộc loại thiết bị nào?",
    "options": [
      {
        "id": "opt_4_a",
        "text": "Thiết bị vào.",
        "is_correct": false
      },
      {
        "id": "opt_4_b",
        "text": "Thiết bị ra.",
        "is_correct": true
      },
      {
        "id": "opt_4_c",
        "text": "Thiết bị lưu trữ.",
        "is_correct": false
      },
      {
        "id": "opt_4_d",
        "text": "Thiết bị xử lí.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_5",
    "type": "single_choice",
    "prompt": "Micro làm việc với dạng thông tin nào?",
    "options": [
      {
        "id": "opt_5_a",
        "text": "Văn bản.",
        "is_correct": false
      },
      {
        "id": "opt_5_b",
        "text": "Hình ảnh.",
        "is_correct": false
      },
      {
        "id": "opt_5_c",
        "text": "Âm thanh.",
        "is_correct": true
      },
      {
        "id": "opt_5_d",
        "text": "Video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_6",
    "type": "single_choice",
    "prompt": "Thiết bị nào vừa là thiết bị vào vừa là thiết bị ra?",
    "options": [
      {
        "id": "opt_6_a",
        "text": "Màn hình máy tính thông thường.",
        "is_correct": false
      },
      {
        "id": "opt_6_b",
        "text": "Bàn phím.",
        "is_correct": false
      },
      {
        "id": "opt_6_c",
        "text": "Màn hình cảm ứng (touch screen).",
        "is_correct": true
      },
      {
        "id": "opt_6_d",
        "text": "Loa thường.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_7",
    "type": "single_choice",
    "prompt": "Tấm cảm ứng (touchpad) trên máy tính xách tay có chức năng giống với thiết bị nào?",
    "options": [
      {
        "id": "opt_7_a",
        "text": "Màn hình.",
        "is_correct": false
      },
      {
        "id": "opt_7_b",
        "text": "Chuột máy tính.",
        "is_correct": true
      },
      {
        "id": "opt_7_c",
        "text": "Bàn phím.",
        "is_correct": false
      },
      {
        "id": "opt_7_d",
        "text": "Máy in.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_8",
    "type": "single_choice",
    "prompt": "Thao tác nào sau đây là thao tác tắt máy tính an toàn, đúng cách?",
    "options": [
      {
        "id": "opt_8_a",
        "text": "Rút phích cắm điện đột ngột.",
        "is_correct": false
      },
      {
        "id": "opt_8_b",
        "text": "Nhấn giữ nút nguồn (Power) vài giây.",
        "is_correct": false
      },
      {
        "id": "opt_8_c",
        "text": "Sử dụng nút lệnh Shut down của hệ điều hành.",
        "is_correct": true
      },
      {
        "id": "opt_8_d",
        "text": "Tắt công tắc màn hình rồi rút điện.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_9",
    "type": "single_choice",
    "prompt": "Để đảm bảo an toàn điện và tránh hỏng thiết bị, việc kết nối dây nguồn cho máy tính nên được thực hiện khi nào?",
    "options": [
      {
        "id": "opt_9_a",
        "text": "Trước khi cắm tất cả các thiết bị khác.",
        "is_correct": false
      },
      {
        "id": "opt_9_b",
        "text": "Cắm đan xen trong quá trình kết nối các thiết bị.",
        "is_correct": false
      },
      {
        "id": "opt_9_c",
        "text": "Sau khi đã kết nối các thiết bị (chuột, bàn phím, màn hình...) xong.",
        "is_correct": true
      },
      {
        "id": "opt_9_d",
        "text": "Chỉ cần cắm dây nguồn, không cần quan tâm thứ tự.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_10",
    "type": "single_choice",
    "prompt": "Nếu cố gắng cắm đầu nối dây màn hình vào sai cổng, hậu quả có thể là gì?",
    "options": [
      {
        "id": "opt_10_a",
        "text": "Màn hình sẽ hiển thị đẹp hơn.",
        "is_correct": false
      },
      {
        "id": "opt_10_b",
        "text": "Máy tính tự động điều chỉnh cho phù hợp.",
        "is_correct": false
      },
      {
        "id": "opt_10_c",
        "text": "Sẽ không lắp được hoặc có thể làm hỏng đầu nối.",
        "is_correct": true
      },
      {
        "id": "opt_10_d",
        "text": "Máy tính tự động tắt nguồn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_11",
    "type": "single_choice",
    "prompt": "Việc làm nào sau đây KHÔNG NÊN thực hiện khi sử dụng máy tính?",
    "options": [
      {
        "id": "opt_11_a",
        "text": "Giữ bàn tay khô, sạch khi dùng máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_11_b",
        "text": "Để đồ uống gần chuột, bàn phím.",
        "is_correct": true
      },
      {
        "id": "opt_11_c",
        "text": "Đọc kĩ hướng dẫn sử dụng thiết bị.",
        "is_correct": false
      },
      {
        "id": "opt_11_d",
        "text": "Gõ phím dứt khoát nhưng nhẹ nhàng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_12",
    "type": "single_choice",
    "prompt": "Tại sao không nên chạm vào phần kim loại của máy tính khi đang cắm điện hoặc lau dọn chưa rút điện?",
    "options": [
      {
        "id": "opt_12_a",
        "text": "Làm trầy xước máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_12_b",
        "text": "Dễ gây ra giật điện, không an toàn.",
        "is_correct": true
      },
      {
        "id": "opt_12_c",
        "text": "Làm máy tính chạy chậm đi.",
        "is_correct": false
      },
      {
        "id": "opt_12_d",
        "text": "Làm mất dữ liệu trong máy.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_1_thiet_bi_vao_ra",
      "phan_cung"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_13",
    "type": "single_choice",
    "prompt": "Hệ điều hành là gì?",
    "options": [
      {
        "id": "opt_13_a",
        "text": "Là một loại thiết bị phần cứng của máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_13_b",
        "text": "Là phần mềm ứng dụng dùng để gõ văn bản.",
        "is_correct": false
      },
      {
        "id": "opt_13_c",
        "text": "Là phần mềm hệ thống quản lí, điều khiển hoạt động chung của máy tính và quản lí dữ liệu.",
        "is_correct": true
      },
      {
        "id": "opt_13_d",
        "text": "Là trang web dùng để tìm kiếm thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_14",
    "type": "single_choice",
    "prompt": "Phần mềm nào sau đây LÀ một hệ điều hành?",
    "options": [
      {
        "id": "opt_14_a",
        "text": "Microsoft Word.",
        "is_correct": false
      },
      {
        "id": "opt_14_b",
        "text": "Windows 10.",
        "is_correct": true
      },
      {
        "id": "opt_14_c",
        "text": "Google Chrome.",
        "is_correct": false
      },
      {
        "id": "opt_14_d",
        "text": "Zalo.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_15",
    "type": "single_choice",
    "prompt": "Chức năng nào sau đây KHÔNG phải là chức năng cơ bản của hệ điều hành?",
    "options": [
      {
        "id": "opt_15_a",
        "text": "Quản lí các thiết bị và dữ liệu của máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_15_b",
        "text": "Cung cấp môi trường trao đổi thông tin (giao diện) giữa người và máy.",
        "is_correct": false
      },
      {
        "id": "opt_15_c",
        "text": "Trực tiếp chỉnh sửa hiệu ứng của một bức ảnh nghệ thuật.",
        "is_correct": true
      },
      {
        "id": "opt_15_d",
        "text": "Cung cấp môi trường cho phép chạy các phần mềm ứng dụng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_16",
    "type": "single_choice",
    "prompt": "Phần mềm ứng dụng có đặc điểm gì?",
    "options": [
      {
        "id": "opt_16_a",
        "text": "Quản lí phần cứng máy tính trực tiếp.",
        "is_correct": false
      },
      {
        "id": "opt_16_b",
        "text": "Giúp con người thực hiện những công việc cụ thể (soạn văn bản, nghe nhạc...).",
        "is_correct": true
      },
      {
        "id": "opt_16_c",
        "text": "Phải cài đặt đầu tiên để máy tính hoạt động được.",
        "is_correct": false
      },
      {
        "id": "opt_16_d",
        "text": "Là phần mềm không bao giờ bị lỗi.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_17",
    "type": "single_choice",
    "prompt": "Mối quan hệ giữa hệ điều hành và phần mềm ứng dụng là gì?",
    "options": [
      {
        "id": "opt_17_a",
        "text": "Phần mềm ứng dụng chạy trong môi trường do hệ điều hành tạo ra.",
        "is_correct": true
      },
      {
        "id": "opt_17_b",
        "text": "Hệ điều hành chạy bên trong phần mềm ứng dụng.",
        "is_correct": false
      },
      {
        "id": "opt_17_c",
        "text": "Cả hai hoạt động độc lập, không liên quan đến nhau.",
        "is_correct": false
      },
      {
        "id": "opt_17_d",
        "text": "Phần mềm ứng dụng có chức năng điều khiển hệ điều hành.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_2_phan_mem_may_tinh",
      "he_dieu_hanh"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_18",
    "type": "single_choice",
    "prompt": "Tệp có phần mở rộng '.docx' hoặc '.doc' thường chứa dữ liệu thuộc loại nào?",
    "options": [
      {
        "id": "opt_18_a",
        "text": "Âm thanh.",
        "is_correct": false
      },
      {
        "id": "opt_18_b",
        "text": "Hình ảnh.",
        "is_correct": false
      },
      {
        "id": "opt_18_c",
        "text": "Văn bản.",
        "is_correct": true
      },
      {
        "id": "opt_18_d",
        "text": "Video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_19",
    "type": "single_choice",
    "prompt": "Để nhận biết một tệp thuộc loại gì và dùng phần mềm nào để mở, hệ điều hành thường dựa vào đâu?",
    "options": [
      {
        "id": "opt_19_a",
        "text": "Kích thước của tệp.",
        "is_correct": false
      },
      {
        "id": "opt_19_b",
        "text": "Ngày tạo tệp.",
        "is_correct": false
      },
      {
        "id": "opt_19_c",
        "text": "Phần mở rộng của tên tệp.",
        "is_correct": true
      },
      {
        "id": "opt_19_d",
        "text": "Tên người tạo ra tệp.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_20",
    "type": "single_choice",
    "prompt": "Tệp nào sau đây có thể là một tệp hình ảnh?",
    "options": [
      {
        "id": "opt_20_a",
        "text": "Baicacao.mp3",
        "is_correct": false
      },
      {
        "id": "opt_20_b",
        "text": "PhaoHoa.jpg",
        "is_correct": true
      },
      {
        "id": "opt_20_c",
        "text": "TapLamVan.doc",
        "is_correct": false
      },
      {
        "id": "opt_20_d",
        "text": "Game.exe",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_21",
    "type": "single_choice",
    "prompt": "Tại sao nên phân loại dữ liệu và lưu trữ theo trật tự thư mục, đặt tên rõ ràng?",
    "options": [
      {
        "id": "opt_21_a",
        "text": "Để máy tính chạy nhanh hơn.",
        "is_correct": false
      },
      {
        "id": "opt_21_b",
        "text": "Để máy tính không bị nhiễm virus.",
        "is_correct": false
      },
      {
        "id": "opt_21_c",
        "text": "Để dễ dàng, nhanh chóng tìm kiếm và truy cập lại khi cần.",
        "is_correct": true
      },
      {
        "id": "opt_21_d",
        "text": "Để phần mềm ứng dụng hoạt động chính xác hơn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_22",
    "type": "single_choice",
    "prompt": "Tệp chương trình máy tính trong hệ điều hành Windows thường có phần mở rộng nào?",
    "options": [
      {
        "id": "opt_22_a",
        "text": ".mp3, .mp4",
        "is_correct": false
      },
      {
        "id": "opt_22_b",
        "text": ".doc, .docx",
        "is_correct": false
      },
      {
        "id": "opt_22_c",
        "text": ".exe, .com, .bat, .msi",
        "is_correct": true
      },
      {
        "id": "opt_22_d",
        "text": ".jpg, .png",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_23",
    "type": "single_choice",
    "prompt": "Nếu em nhìn thấy một tệp có đuôi '.exe' trong ổ đĩa hệ thống và không biết rõ về nó, em NÊN làm gì?",
    "options": [
      {
        "id": "opt_23_a",
        "text": "Lập tức xoá nó để giải phóng bộ nhớ.",
        "is_correct": false
      },
      {
        "id": "opt_23_b",
        "text": "Không nên xoá hay di chuyển vì đó có thể là tệp hệ thống/chương trình cần thiết.",
        "is_correct": true
      },
      {
        "id": "opt_23_c",
        "text": "Đổi đuôi tệp thành '.txt' để dễ đọc.",
        "is_correct": false
      },
      {
        "id": "opt_23_d",
        "text": "Tải lên mạng xã hội chia sẻ cho bạn bè.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_24",
    "type": "single_choice",
    "prompt": "Sao lưu dữ liệu là thao tác nào sau đây?",
    "options": [
      {
        "id": "opt_24_a",
        "text": "Đổi tên toàn bộ thư mục trong máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_24_b",
        "text": "Tạo ra bản sao các tệp/thư mục và lưu chúng lên một thiết bị lưu trữ khác.",
        "is_correct": true
      },
      {
        "id": "opt_24_c",
        "text": "Xoá dữ liệu gốc và chỉ giữ lại một phiên bản duy nhất.",
        "is_correct": false
      },
      {
        "id": "opt_24_d",
        "text": "Đăng tải dữ liệu lên mạng để mọi người cùng xem.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_25",
    "type": "single_choice",
    "prompt": "Nhược điểm của sao lưu cục bộ (lưu trên ổ cứng ngoài, USB để cùng chỗ với máy tính) là gì?",
    "options": [
      {
        "id": "opt_25_a",
        "text": "Khôi phục dữ liệu rất chậm.",
        "is_correct": false
      },
      {
        "id": "opt_25_b",
        "text": "Chi phí rất cao.",
        "is_correct": false
      },
      {
        "id": "opt_25_c",
        "text": "Nếu rủi ro làm mất cả máy tính lẫn USB (ví dụ hỏa hoạn, mất cắp) thì bản sao cũng bị mất theo.",
        "is_correct": true
      },
      {
        "id": "opt_25_d",
        "text": "Không thể lưu được các tệp dung lượng lớn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_26",
    "type": "single_choice",
    "prompt": "Sao lưu từ xa (như lưu trữ trên công nghệ đám mây) có ưu điểm gì nổi bật?",
    "options": [
      {
        "id": "opt_26_a",
        "text": "Không cần kết nối Internet vẫn sao lưu được.",
        "is_correct": false
      },
      {
        "id": "opt_26_b",
        "text": "An toàn hơn khi máy tính gốc bị hỏng vật lí hoặc thất lạc, có thể truy cập từ máy tính khác có Internet.",
        "is_correct": true
      },
      {
        "id": "opt_26_c",
        "text": "Không bao giờ sợ bị tin tặc tấn công.",
        "is_correct": false
      },
      {
        "id": "opt_26_d",
        "text": "Tốc độ truyền tải luôn nhanh hơn so với copy ra USB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_27",
    "type": "single_choice",
    "prompt": "Mật khẩu (password) nào sau đây được coi là một mật khẩu MẠNH?",
    "options": [
      {
        "id": "opt_27_a",
        "text": "12345678",
        "is_correct": false
      },
      {
        "id": "opt_27_b",
        "text": "HaNoi2023",
        "is_correct": false
      },
      {
        "id": "opt_27_c",
        "text": "2n#M1nhKhoa",
        "is_correct": true
      },
      {
        "id": "opt_27_d",
        "text": "nguyenvanA",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_28",
    "type": "single_choice",
    "prompt": "Phần mềm nào sau đây được sử dụng để phát hiện và tiêu diệt phần mềm độc hại (virus)?",
    "options": [
      {
        "id": "opt_28_a",
        "text": "Microsoft PowerPoint.",
        "is_correct": false
      },
      {
        "id": "opt_28_b",
        "text": "Google Chrome.",
        "is_correct": false
      },
      {
        "id": "opt_28_c",
        "text": "Windows Defender, Kaspersky, Bkav.",
        "is_correct": true
      },
      {
        "id": "opt_28_d",
        "text": "File Explorer.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_29",
    "type": "single_choice",
    "prompt": "Trong Windows 10, ứng dụng nào giúp quản lí tệp và thư mục (tạo, đổi tên, sao chép, di chuyển, xoá...)?",
    "options": [
      {
        "id": "opt_29_a",
        "text": "Microsoft Paint.",
        "is_correct": false
      },
      {
        "id": "opt_29_b",
        "text": "File Explorer.",
        "is_correct": true
      },
      {
        "id": "opt_29_c",
        "text": "Control Panel.",
        "is_correct": false
      },
      {
        "id": "opt_29_d",
        "text": "Task Manager.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_30",
    "type": "single_choice",
    "prompt": "Để tạo một thư mục mới trên màn hình nền (Desktop), thao tác nào là ĐÚNG?",
    "options": [
      {
        "id": "opt_30_a",
        "text": "Nháy đúp chuột trái -> chọn New -> Folder.",
        "is_correct": false
      },
      {
        "id": "opt_30_b",
        "text": "Nháy nút phải chuột -> chọn New -> Folder.",
        "is_correct": true
      },
      {
        "id": "opt_30_c",
        "text": "Nháy chuột trái -> chọn View -> Folder.",
        "is_correct": false
      },
      {
        "id": "opt_30_d",
        "text": "Kéo thả chuột từ góc này sang góc kia của màn hình.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_31",
    "type": "single_choice",
    "prompt": "Lệnh nào dùng để đổi tên một thư mục hoặc tệp đã chọn?",
    "options": [
      {
        "id": "opt_31_a",
        "text": "Copy.",
        "is_correct": false
      },
      {
        "id": "opt_31_b",
        "text": "Paste.",
        "is_correct": false
      },
      {
        "id": "opt_31_c",
        "text": "Delete.",
        "is_correct": false
      },
      {
        "id": "opt_31_d",
        "text": "Rename.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_32",
    "type": "single_choice",
    "prompt": "Thao tác sử dụng cặp lệnh 'Copy' và 'Paste' đối với một tệp sẽ dẫn đến kết quả gì?",
    "options": [
      {
        "id": "opt_32_a",
        "text": "Tệp gốc bị xoá đi.",
        "is_correct": false
      },
      {
        "id": "opt_32_b",
        "text": "Tệp gốc bị di chuyển sang vị trí mới.",
        "is_correct": false
      },
      {
        "id": "opt_32_c",
        "text": "Tạo ra một bản sao của tệp tại vị trí mới, tệp gốc vẫn giữ nguyên.",
        "is_correct": true
      },
      {
        "id": "opt_32_d",
        "text": "Tệp gốc bị đổi tên.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_3_quan_li_du_lieu",
      "tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_33",
    "type": "single_choice",
    "prompt": "Các kênh trao đổi thông tin phổ biến trên Internet hiện nay bao gồm những gì?",
    "options": [
      {
        "id": "opt_33_a",
        "text": "Chỉ có thư điện tử (email).",
        "is_correct": false
      },
      {
        "id": "opt_33_b",
        "text": "Thư điện tử, diễn đàn (Forum), mạng xã hội.",
        "is_correct": true
      },
      {
        "id": "opt_33_c",
        "text": "Điện báo, bưu điện truyền thống.",
        "is_correct": false
      },
      {
        "id": "opt_33_d",
        "text": "Chỉ có diễn đàn thảo luận.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_34",
    "type": "single_choice",
    "prompt": "Mạng xã hội là gì?",
    "options": [
      {
        "id": "opt_34_a",
        "text": "Là mạng kết nối các máy tính trong một trường học bằng dây cáp.",
        "is_correct": false
      },
      {
        "id": "opt_34_b",
        "text": "Là phần mềm hệ thống giúp máy tính hoạt động.",
        "is_correct": false
      },
      {
        "id": "opt_34_c",
        "text": "Là một cộng đồng trực tuyến để mọi người có thể tương tác, giao tiếp với nhau.",
        "is_correct": true
      },
      {
        "id": "opt_34_d",
        "text": "Là một thư viện điện tử chỉ chứa sách kĩ thuật số.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_35",
    "type": "single_choice",
    "prompt": "Mục đích chính của mạng xã hội Facebook hoặc Zalo là gì?",
    "options": [
      {
        "id": "opt_35_a",
        "text": "Chia sẻ video kĩ thuật cao là chủ yếu.",
        "is_correct": false
      },
      {
        "id": "opt_35_b",
        "text": "Thảo luận các bài toán giải tích chuyên sâu.",
        "is_correct": false
      },
      {
        "id": "opt_35_c",
        "text": "Giao lưu kết nối bạn bè, chia sẻ hình ảnh, suy nghĩ cá nhân.",
        "is_correct": true
      },
      {
        "id": "opt_35_d",
        "text": "Quản lí tệp tin trong máy tính nội bộ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_36",
    "type": "single_choice",
    "prompt": "Mạng xã hội YouTube tập trung chủ yếu vào việc chia sẻ loại dữ liệu nào?",
    "options": [
      {
        "id": "opt_36_a",
        "text": "Văn bản Word.",
        "is_correct": false
      },
      {
        "id": "opt_36_b",
        "text": "Hình ảnh (Ảnh chụp tĩnh).",
        "is_correct": false
      },
      {
        "id": "opt_36_c",
        "text": "Video.",
        "is_correct": true
      },
      {
        "id": "opt_36_d",
        "text": "Tệp thực thi chương trình.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_37",
    "type": "single_choice",
    "prompt": "Tính năng nào sau đây KHÔNG phải là chức năng phổ biến của mạng xã hội?",
    "options": [
      {
        "id": "opt_37_a",
        "text": "Gửi tin nhắn riêng tư.",
        "is_correct": false
      },
      {
        "id": "opt_37_b",
        "text": "Đăng ảnh, video.",
        "is_correct": false
      },
      {
        "id": "opt_37_c",
        "text": "Viết chương trình điều khiển phần cứng máy tính.",
        "is_correct": true
      },
      {
        "id": "opt_37_d",
        "text": "Bình luận (comment) trên bài đăng của bạn bè.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_38",
    "type": "single_choice",
    "prompt": "Độ tuổi tối thiểu thường được quy định để lập tài khoản trên nhiều mạng xã hội phổ biến (như Facebook) là bao nhiêu?",
    "options": [
      {
        "id": "opt_38_a",
        "text": "6 tuổi.",
        "is_correct": false
      },
      {
        "id": "opt_38_b",
        "text": "10 tuổi.",
        "is_correct": false
      },
      {
        "id": "opt_38_c",
        "text": "13 tuổi.",
        "is_correct": true
      },
      {
        "id": "opt_38_d",
        "text": "18 tuổi.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_39",
    "type": "single_choice",
    "prompt": "Việc sử dụng mạng xã hội để đăng thông tin đe dọa, bắt nạt người khác là hành vi:",
    "options": [
      {
        "id": "opt_39_a",
        "text": "Được khuyến khích để tăng tương tác.",
        "is_correct": false
      },
      {
        "id": "opt_39_b",
        "text": "Sai trái, vi phạm quy tắc sử dụng và có thể vi phạm pháp luật.",
        "is_correct": true
      },
      {
        "id": "opt_39_c",
        "text": "Bình thường, thể hiện cá tính riêng.",
        "is_correct": false
      },
      {
        "id": "opt_39_d",
        "text": "Chỉ mang tính chất giải trí, không có hậu quả.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_40",
    "type": "single_choice",
    "prompt": "Nếu em bắt gặp một thông tin 'sốc' trên mạng nhưng chưa được kiểm chứng, việc làm ĐÚNG đắn là gì?",
    "options": [
      {
        "id": "opt_40_a",
        "text": "Lập tức chia sẻ ngay để cảnh báo mọi người.",
        "is_correct": false
      },
      {
        "id": "opt_40_b",
        "text": "Thêm bình luận kích động vào bài viết.",
        "is_correct": false
      },
      {
        "id": "opt_40_c",
        "text": "Không chia sẻ vội, tìm hiểu kĩ tính xác thực của thông tin từ các nguồn chính thống.",
        "is_correct": true
      },
      {
        "id": "opt_40_d",
        "text": "Sao chép và đăng lại trên trang cá nhân của mình xem như là thông tin của mình.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_41",
    "type": "single_choice",
    "prompt": "Khi sử dụng mạng xã hội, để đảm bảo an toàn thông tin cá nhân, em NÊN làm gì?",
    "options": [
      {
        "id": "opt_41_a",
        "text": "Công khai mật khẩu để bạn bè cùng sử dụng chung.",
        "is_correct": false
      },
      {
        "id": "opt_41_b",
        "text": "Để chế độ công khai (Public) toàn bộ thông tin ngày tháng năm sinh, số điện thoại, địa chỉ nhà.",
        "is_correct": false
      },
      {
        "id": "opt_41_c",
        "text": "Chỉ kết bạn và trò chuyện với người mà em thực sự quen biết và tin tưởng.",
        "is_correct": true
      },
      {
        "id": "opt_41_d",
        "text": "Đăng tải mọi hoạt động, lịch trình di chuyển chi tiết hàng ngày của bản thân lên mạng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_42",
    "type": "single_choice",
    "prompt": "Bạn B chụp ảnh đề thi chia sẻ lên mạng xã hội nhờ giải hộ trong giờ kiểm tra. Hành vi này:",
    "options": [
      {
        "id": "opt_42_a",
        "text": "Là hành vi vi phạm nghiêm trọng quy chế thi và pháp luật.",
        "is_correct": true
      },
      {
        "id": "opt_42_b",
        "text": "Là cách trao đổi thông tin nhanh chóng, sáng tạo.",
        "is_correct": false
      },
      {
        "id": "opt_42_c",
        "text": "Được khuyến khích vì giúp học sinh học hỏi lẫn nhau.",
        "is_correct": false
      },
      {
        "id": "opt_42_d",
        "text": "Chỉ bị nhắc nhở nhẹ nhàng vì đó là quyền cá nhân.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_43",
    "type": "single_choice",
    "prompt": "Để chia sẻ một bức ảnh lên trang Facebook cá nhân, em sẽ sử dụng chức năng nào trong mục tạo bài viết?",
    "options": [
      {
        "id": "opt_43_a",
        "text": "Tìm kiếm bạn bè.",
        "is_correct": false
      },
      {
        "id": "opt_43_b",
        "text": "Ảnh/Video.",
        "is_correct": true
      },
      {
        "id": "opt_43_c",
        "text": "Video trực tiếp.",
        "is_correct": false
      },
      {
        "id": "opt_43_d",
        "text": "Tạo nhóm mới.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_44",
    "type": "single_choice",
    "prompt": "Thao tác nào dùng để di chuyển một thư mục/tệp (cắt từ chỗ cũ sang chỗ mới)?",
    "options": [
      {
        "id": "opt_44_a",
        "text": "Copy và Paste.",
        "is_correct": false
      },
      {
        "id": "opt_44_b",
        "text": "Cut và Paste.",
        "is_correct": true
      },
      {
        "id": "opt_44_c",
        "text": "Delete và Paste.",
        "is_correct": false
      },
      {
        "id": "opt_44_d",
        "text": "Rename và Cut.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bai_4_mang_xa_hoi",
      "internet_an_toan"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_45",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Thiết bị vào - ra':",
    "items": [
      {
        "id": "sub_45_a",
        "text": "Thiết bị vào giúp con người nhập thông tin vào máy tính, ví dụ như bàn phím, micro.",
        "is_correct": true
      },
      {
        "id": "sub_45_b",
        "text": "Máy in và loa là các thiết bị vào, giúp máy tính thu nhận hình ảnh và âm thanh từ môi trường.",
        "is_correct": false
      },
      {
        "id": "sub_45_c",
        "text": "Màn hình cảm ứng vừa đóng vai trò thiết bị ra (hiển thị), vừa đóng vai trò thiết bị vào (nhận thao tác chạm).",
        "is_correct": true
      },
      {
        "id": "sub_45_d",
        "text": "Loa thông minh chỉ có chức năng phát âm thanh, không thể kết nối Internet hay nhận lệnh bằng giọng nói.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_46",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Sử dụng máy tính an toàn':",
    "items": [
      {
        "id": "sub_46_a",
        "text": "Cần cấp nguồn điện cho máy tính ngay lập tức trước khi cắm dây cáp màn hình hay bàn phím.",
        "is_correct": false
      },
      {
        "id": "sub_46_b",
        "text": "Cắm nhầm cổng kết nối (ví dụ đầu cắm không phải USB cố cắm vào cổng USB) có thể gây chập điện hỏng thiết bị.",
        "is_correct": true
      },
      {
        "id": "sub_46_c",
        "text": "Nên tắt máy tính bằng lệnh Shut down của hệ điều hành thay vì ngắt nguồn điện trực tiếp.",
        "is_correct": true
      },
      {
        "id": "sub_46_d",
        "text": "Không nên rút dây điện khi lau dọn máy tính vì cần bật máy để xem lau đã sạch chưa.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_47",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Hệ điều hành và Phần mềm ứng dụng':",
    "items": [
      {
        "id": "sub_47_a",
        "text": "Hệ điều hành phải được cài đặt đầu tiên để máy tính có thể hoạt động.",
        "is_correct": true
      },
      {
        "id": "sub_47_b",
        "text": "Microsoft Word và Excel là các hệ điều hành phổ biến nhất hiện nay.",
        "is_correct": false
      },
      {
        "id": "sub_47_c",
        "text": "Điện thoại thông minh (smartphone) không cần hệ điều hành, nó chỉ cần phần mềm ứng dụng để chạy.",
        "is_correct": false
      },
      {
        "id": "sub_47_d",
        "text": "Phần mở rộng của tệp (ví dụ .docx, .mp3) giúp hệ điều hành nhận diện loại tệp và chọn phần mềm mở tương ứng.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_48",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Quản lí và bảo vệ dữ liệu':",
    "items": [
      {
        "id": "sub_48_a",
        "text": "Khi đặt tên tệp và thư mục, nên đặt tên tuỳ ý, không liên quan đến nội dung để bảo mật thông tin.",
        "is_correct": false
      },
      {
        "id": "sub_48_b",
        "text": "Các tệp có phần mở rộng .exe, .com thường là tệp chương trình, không nên tự ý xoá hay di chuyển.",
        "is_correct": true
      },
      {
        "id": "sub_48_c",
        "text": "Sao lưu dữ liệu lên công nghệ đám mây (Internet) giúp dữ liệu an toàn ngay cả khi máy tính vật lí bị hỏng.",
        "is_correct": true
      },
      {
        "id": "sub_48_d",
        "text": "Một mật khẩu mạnh chỉ cần chứa duy nhất các con số liên tiếp (như 12345678) cho dễ nhớ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_49",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Mạng xã hội':",
    "items": [
      {
        "id": "sub_49_a",
        "text": "Mạng xã hội là một cộng đồng trực tuyến nơi mọi người có thể tương tác, chia sẻ thông tin với nhau.",
        "is_correct": true
      },
      {
        "id": "sub_49_b",
        "text": "Mọi website trên Internet (kể cả trang đọc báo điện tử 1 chiều) đều được gọi là mạng xã hội.",
        "is_correct": false
      },
      {
        "id": "sub_49_c",
        "text": "Khi tham gia mạng xã hội, người dùng có thể gửi tin nhắn, bình luận hoặc chia sẻ ảnh, video.",
        "is_correct": true
      },
      {
        "id": "sub_49_d",
        "text": "Vì mạng xã hội là thế giới ảo, mọi người có thể tự do phát ngôn, lăng mạ người khác mà không phải chịu trách nhiệm.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_50",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Quy tắc an toàn trên mạng Internet':",
    "items": [
      {
        "id": "sub_50_a",
        "text": "Việc đăng tải các thông tin giả mạo, sai sự thật trên mạng xã hội là hành vi bị cấm và có thể bị phạt.",
        "is_correct": true
      },
      {
        "id": "sub_50_b",
        "text": "Bất kì ai, ở mọi lứa tuổi, kể cả dưới 10 tuổi đều được phép tự do lập tài khoản Facebook mà không có giới hạn nào.",
        "is_correct": false
      },
      {
        "id": "sub_50_c",
        "text": "Khi nhận được một yêu cầu kết bạn từ một tài khoản hoàn toàn xa lạ, em nên chấp nhận ngay để có thêm nhiều bạn.",
        "is_correct": false
      },
      {
        "id": "sub_50_d",
        "text": "Mạng xã hội có tính hai mặt (tốt và xấu), chúng ta cần tìm hiểu kĩ và sử dụng đúng mục đích.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "dung_sai_chum",
      "on_tap_giua_ki_1"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin10_gk1_1",
    "type": "single_choice",
    "grade": "Lớp 10",
    "subject": "Tin học",
    "term": "Giữa kì I",
    "prompt": "Hệ đếm nhị phân (Binary system) sử dụng các kí số nào sau đây để biểu diễn dữ liệu trong máy tính?",
    "options": [
      {
        "id": "opt_t10_1_a",
        "text": "Chỉ gồm hai kí số 0 và 1",
        "is_correct": true
      },
      {
        "id": "opt_t10_1_b",
        "text": "Các kí số từ 0 đến 9",
        "is_correct": false
      },
      {
        "id": "opt_t10_1_c",
        "text": "Các kí số từ 0 đến 7",
        "is_correct": false
      },
      {
        "id": "opt_t10_1_d",
        "text": "Gồm 0, 1 và các chữ cái A đến F",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_10",
      "bieu_dien_thong_tin",
      "nhi_phan"
    ]
  },
  {
    "id": "q_tin10_ck1_2",
    "type": "single_choice",
    "grade": "Lớp 10",
    "subject": "Tin học",
    "term": "Cuối kì I",
    "prompt": "Trong ngôn ngữ lập trình Python, hàm nào sau đây được sử dụng để xuất dữ liệu ra màn hình?",
    "options": [
      {
        "id": "opt_t10_2_a",
        "text": "print()",
        "is_correct": true
      },
      {
        "id": "opt_t10_2_b",
        "text": "input()",
        "is_correct": false
      },
      {
        "id": "opt_t10_2_c",
        "text": "echo()",
        "is_correct": false
      },
      {
        "id": "opt_t10_2_d",
        "text": "output()",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_10",
      "lap_trinh_python",
      "cuoi_ki_1"
    ]
  },
  {
    "id": "q_tin8_gk1_3",
    "type": "single_choice",
    "grade": "Lớp 8",
    "subject": "Tin học",
    "term": "Giữa kì I",
    "prompt": "Thông tin trong môi trường số có đặc điểm nổi bật nào sau đây?",
    "options": [
      {
        "id": "opt_t8_3_a",
        "text": "Dễ dàng sao chép, lan truyền nhanh chóng và khó thu hồi triệt để",
        "is_correct": true
      },
      {
        "id": "opt_t8_3_b",
        "text": "Hoàn toàn bảo mật và không bao giờ bị rò rỉ",
        "is_correct": false
      },
      {
        "id": "opt_t8_3_c",
        "text": "Chỉ lưu trữ được trên giấy và sách vở in truyền thống",
        "is_correct": false
      },
      {
        "id": "opt_t8_3_d",
        "text": "Không thể chia sẻ qua mạng Internet",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_8",
      "thong_tin_so",
      "giua_ki_1"
    ]
  },
  {
    "id": "q_tin9_gk1_4",
    "type": "true_false",
    "grade": "Lớp 9",
    "subject": "Tin học",
    "term": "Giữa kì I",
    "prompt": "Xét tính Đúng / Sai của các khẳng định sau về mạng máy tính và an toàn thông tin:",
    "items": [
      {
        "id": "sub_t9_4_a",
        "text": "Mạng LAN là mạng kết nối các máy tính trong phạm vi hẹp như trường học, văn phòng.",
        "is_correct": true
      },
      {
        "id": "sub_t9_4_b",
        "text": "Địa chỉ IP là định danh duy nhất của mỗi thiết bị khi tham gia vào mạng Internet.",
        "is_correct": true
      },
      {
        "id": "sub_t9_4_c",
        "text": "Cáp mạng xoắn đôi (UTP) là phương tiện truyền dẫn không dây.",
        "is_correct": false
      },
      {
        "id": "sub_t9_4_d",
        "text": "Trang web có giao thức https:// giúp mã hóa bảo mật thông tin tốt hơn http://.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_9",
      "mang_may_tinh",
      "dung_sai"
    ]
  },
  {
    "id": "q_tin7_ck1_5",
    "type": "single_choice",
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên",
    "prompt": "Trong phần mềm bảng tính điện tử (MS Excel), cú pháp hàm nào sau đây dùng để tính tổng các ô từ A1 đến A5?",
    "options": [
      {
        "id": "opt_t7_ck1_a",
        "text": "=SUM(A1:A5)",
        "is_correct": true
      },
      {
        "id": "opt_t7_ck1_b",
        "text": "=AVERAGE(A1:A5)",
        "is_correct": false
      },
      {
        "id": "opt_t7_ck1_c",
        "text": "=TOTAL(A1..A5)",
        "is_correct": false
      },
      {
        "id": "opt_t7_ck1_d",
        "text": "=COUNT(A1:A5)",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "bang_tinh_excel",
      "cuoi_ki_1"
    ]
  },
  {
    "id": "q_tin6_ot_1",
    "type": "single_choice",
    "prompt": "Thông tin là gì?",
    "options": [
      {
        "id": "opt_t6_ot_1_a",
        "text": "Những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_1_b",
        "text": "Các con số, chữ viết và hình ảnh trên trang giấy.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_1_c",
        "text": "Bất kì vật thể nào xung quanh chúng ta.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_1_d",
        "text": "Các thiết bị điện tử có khả năng lưu trữ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_2",
    "type": "single_choice",
    "prompt": "Dữ liệu là gì?",
    "options": [
      {
        "id": "opt_t6_ot_2_a",
        "text": "Sự hiểu biết của con người.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_2_b",
        "text": "Thông tin được ghi lên vật mang tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_2_c",
        "text": "Quá trình thu nhận và xử lí thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_2_d",
        "text": "Các thiết bị dùng để kết nối mạng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_3",
    "type": "single_choice",
    "prompt": "Vật mang tin là gì?",
    "options": [
      {
        "id": "opt_t6_ot_3_a",
        "text": "Những gì đem lại hiểu biết cho con người.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_3_b",
        "text": "Các thiết bị đầu cuối trong mạng máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_3_c",
        "text": "Phương tiện được dùng để lưu trữ và truyền tải thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_3_d",
        "text": "Các phần mềm giúp máy tính hoạt động.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_4",
    "type": "single_choice",
    "prompt": "Dữ liệu được thể hiện dưới những dạng cơ bản nào?",
    "options": [
      {
        "id": "opt_t6_ot_4_a",
        "text": "Chỉ văn bản và con số.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_4_b",
        "text": "Chỉ hình ảnh và âm thanh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_4_c",
        "text": "Âm thanh, hình ảnh, văn bản và các con số.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_4_d",
        "text": "Các thiết bị phần cứng của máy tính.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_5",
    "type": "single_choice",
    "prompt": "Nhận định nào sau đây đúng về mối quan hệ giữa thông tin và dữ liệu?",
    "options": [
      {
        "id": "opt_t6_ot_5_a",
        "text": "Thông tin và dữ liệu là một, không có sự khác biệt.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_5_b",
        "text": "Thông tin được ghi lên vật mang tin trở thành dữ liệu.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_5_c",
        "text": "Thông tin luôn nằm trong máy tính, còn dữ liệu ở ngoài đời thực.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_5_d",
        "text": "Dữ liệu chỉ có ý nghĩa đối với máy tính, không có ý nghĩa đối với con người.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_6",
    "type": "single_choice",
    "prompt": "Sự hiểu biết mà thông tin đem lại luôn phụ thuộc vào yếu tố nào?",
    "options": [
      {
        "id": "opt_t6_ot_6_a",
        "text": "Tốc độ của máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_6_b",
        "text": "Độ lớn của vật mang tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_6_c",
        "text": "Người tiếp nhận thông tin đó.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_6_d",
        "text": "Dãy bit biểu diễn thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_7",
    "type": "single_choice",
    "prompt": "Khi đi trên đường, bạn Minh thấy đèn giao thông chuyển sang màu đỏ nên dừng lại. Trong trường hợp này, 'đèn giao thông chuyển màu đỏ' đóng vai trò là gì?",
    "options": [
      {
        "id": "opt_t6_ot_7_a",
        "text": "Thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_7_b",
        "text": "Dữ liệu.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_7_c",
        "text": "Quá trình xử lí.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_7_d",
        "text": "Bộ nhớ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_8",
    "type": "single_choice",
    "prompt": "Từ việc thấy đèn đỏ, bạn Minh biết rằng mình 'phải dừng xe lại để đảm bảo an toàn'. Điều mà Minh biết được gọi là gì?",
    "options": [
      {
        "id": "opt_t6_ot_8_a",
        "text": "Thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_8_b",
        "text": "Dữ liệu.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_8_c",
        "text": "Vật mang tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_8_d",
        "text": "Thiết bị vào.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_9",
    "type": "single_choice",
    "prompt": "Trong tình huống bạn An xem mục dự báo thời tiết trên tivi, chiếc tivi đóng vai trò là gì?",
    "options": [
      {
        "id": "opt_t6_ot_9_a",
        "text": "Thiết bị kết nối mạng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_9_b",
        "text": "Dữ liệu thời tiết.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_9_c",
        "text": "Vật mang tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_9_d",
        "text": "Bộ xử lí thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_10",
    "type": "single_choice",
    "prompt": "Phát biểu: 'Theo bảng thống kê, tháng 6 Đà Nẵng ít mưa nhất so với Hà Nội, Huế' là:",
    "options": [
      {
        "id": "opt_t6_ot_10_a",
        "text": "Vật mang tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_10_b",
        "text": "Dữ liệu.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_10_c",
        "text": "Bộ nhớ.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_10_d",
        "text": "Thông tin.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_11",
    "type": "single_choice",
    "prompt": "Một em bé 3 tuổi nhìn thấy dòng chữ 'CẤM LỬA' trên biển cảnh báo nhưng không hiểu ý nghĩa. Đối với em bé, dòng chữ đó là:",
    "options": [
      {
        "id": "opt_t6_ot_11_a",
        "text": "Thông tin quan trọng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_11_b",
        "text": "Dữ liệu nhưng không đem lại thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_11_c",
        "text": "Vật mang tin vô hình.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_11_d",
        "text": "Bộ xử lí thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_12",
    "type": "single_choice",
    "prompt": "Quá trình xử lí thông tin của con người gồm bao nhiêu hoạt động cơ bản?",
    "options": [
      {
        "id": "opt_t6_ot_12_a",
        "text": "2 hoạt động.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_12_b",
        "text": "3 hoạt động.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_12_c",
        "text": "4 hoạt động.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_12_d",
        "text": "5 hoạt động.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_13",
    "type": "single_choice",
    "prompt": "Các hoạt động cơ bản của quá trình xử lí thông tin theo thứ tự hợp lí thường là:",
    "options": [
      {
        "id": "opt_t6_ot_13_a",
        "text": "Lưu trữ -> Xử lí -> Truyền -> Thu nhận.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_13_b",
        "text": "Thu nhận -> Lưu trữ -> Xử lí -> Truyền.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_13_c",
        "text": "Xử lí -> Thu nhận -> Lưu trữ -> Truyền.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_13_d",
        "text": "Truyền -> Xử lí -> Thu nhận -> Lưu trữ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_14",
    "type": "single_choice",
    "prompt": "Máy tính gồm bao nhiêu thành phần chính để thực hiện các hoạt động xử lí thông tin?",
    "options": [
      {
        "id": "opt_t6_ot_14_a",
        "text": "3 (Thiết bị vào, thiết bị ra, phần mềm).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_14_b",
        "text": "4 (Thiết bị vào, bộ nhớ, bộ xử lí, thiết bị ra).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_14_c",
        "text": "2 (Phần cứng, Phần mềm).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_14_d",
        "text": "5 (Bàn phím, chuột, CPU, màn hình, máy in).",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_15",
    "type": "single_choice",
    "prompt": "Trong máy tính, thiết bị nào sau đây dùng để thu nhận thông tin (thiết bị vào)?",
    "options": [
      {
        "id": "opt_t6_ot_15_a",
        "text": "Bàn phím, chuột, máy quét.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_15_b",
        "text": "Màn hình, máy in, loa.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_15_c",
        "text": "Bộ xử lí (CPU).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_15_d",
        "text": "Đĩa cứng, đĩa quang, thẻ nhớ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_16",
    "type": "single_choice",
    "prompt": "Bộ nhớ trong máy tính thực hiện chức năng gì?",
    "options": [
      {
        "id": "opt_t6_ot_16_a",
        "text": "Thu nhận thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_16_b",
        "text": "Xử lí thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_16_c",
        "text": "Truyền thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_16_d",
        "text": "Lưu trữ thông tin.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_17",
    "type": "single_choice",
    "prompt": "Bộ phận nào được ví như 'bộ não' của máy tính, đóng vai trò xử lí thông tin?",
    "options": [
      {
        "id": "opt_t6_ot_17_a",
        "text": "Bộ nhớ (RAM, Ổ cứng).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_17_b",
        "text": "Bộ xử lí (CPU).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_17_c",
        "text": "Thiết bị vào (Bàn phím, chuột).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_17_d",
        "text": "Thiết bị ra (Màn hình).",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_18",
    "type": "single_choice",
    "prompt": "Thiết bị ra của máy tính (như màn hình, máy in) tương ứng với hoạt động nào trong quá trình xử lí thông tin?",
    "options": [
      {
        "id": "opt_t6_ot_18_a",
        "text": "Thu nhận thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_18_b",
        "text": "Xử lí thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_18_c",
        "text": "Truyền/chia sẻ thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_18_d",
        "text": "Lưu trữ thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_19",
    "type": "single_choice",
    "prompt": "Việc em chép bài trên bảng vào vở là hoạt động nào trong quá trình xử lí thông tin?",
    "options": [
      {
        "id": "opt_t6_ot_19_a",
        "text": "Thu nhận thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_19_b",
        "text": "Xử lí thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_19_c",
        "text": "Lưu trữ thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_19_d",
        "text": "Truyền thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_20",
    "type": "single_choice",
    "prompt": "Em đang nghe chương trình ca nhạc trên đài phát thanh. Hoạt động nghe ca nhạc này là:",
    "options": [
      {
        "id": "opt_t6_ot_20_a",
        "text": "Thu nhận thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_20_b",
        "text": "Xử lí thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_20_c",
        "text": "Truyền thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_20_d",
        "text": "Lưu trữ thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_21",
    "type": "single_choice",
    "prompt": "Não của cầu thủ phân tích vị trí thủ môn để sút bóng vào góc khung thành hở nhất. Đây là hoạt động:",
    "options": [
      {
        "id": "opt_t6_ot_21_a",
        "text": "Thu nhận thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_21_b",
        "text": "Lưu trữ thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_21_c",
        "text": "Xử lí thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_21_d",
        "text": "Truyền thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_22",
    "type": "single_choice",
    "prompt": "Việc em thuyết trình chủ đề tình bạn trước toàn lớp thuộc hoạt động nào?",
    "options": [
      {
        "id": "opt_t6_ot_22_a",
        "text": "Thu nhận thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_22_b",
        "text": "Truyền thông tin.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_22_c",
        "text": "Xử lí thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_22_d",
        "text": "Bộ nhớ thông tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_23",
    "type": "single_choice",
    "prompt": "Đặc điểm nào sau đây KHÔNG phải là ưu điểm của máy tính so với con người khi xử lí thông tin?",
    "options": [
      {
        "id": "opt_t6_ot_23_a",
        "text": "Tính toán với tốc độ cao, chính xác.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_23_b",
        "text": "Làm việc liên tục bền bỉ ngày đêm.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_23_c",
        "text": "Có khả năng tự tư duy, sáng tạo ra ý tưởng mới như con người.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_23_d",
        "text": "Lưu trữ được lượng thông tin khổng lồ trong không gian nhỏ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_24",
    "type": "single_choice",
    "prompt": "Thông tin trong máy tính thông dụng hiện nay được biểu diễn bằng các kí hiệu nào?",
    "options": [
      {
        "id": "opt_t6_ot_24_a",
        "text": "Các số từ 0 đến 9.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_24_b",
        "text": "Các chữ cái từ A đến Z.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_24_c",
        "text": "Hai kí hiệu 0 và 1.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_24_d",
        "text": "Hệ thống các mã vạch.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_25",
    "type": "single_choice",
    "prompt": "Đơn vị nhỏ nhất để lưu trữ thông tin trong máy tính là gì?",
    "options": [
      {
        "id": "opt_t6_ot_25_a",
        "text": "Byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_25_b",
        "text": "Bit.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_25_c",
        "text": "Kilobyte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_25_d",
        "text": "Megabyte.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_26",
    "type": "single_choice",
    "prompt": "1 Byte có giá trị bằng bao nhiêu bit?",
    "options": [
      {
        "id": "opt_t6_ot_26_a",
        "text": "2 bit.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_26_b",
        "text": "8 bit.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_26_c",
        "text": "10 bit.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_26_d",
        "text": "1024 bit.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_27",
    "type": "single_choice",
    "prompt": "Dãy bit là gì?",
    "options": [
      {
        "id": "opt_t6_ot_27_a",
        "text": "Dãy gồm các số từ 0 đến 9.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_27_b",
        "text": "Dãy gồm các kí tự bảng chữ cái.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_27_c",
        "text": "Dãy gồm những kí hiệu 0 và 1.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_27_d",
        "text": "Bảng mã văn bản nội bộ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_28",
    "type": "single_choice",
    "prompt": "1 Kilobyte (KB) xấp xỉ bằng bao nhiêu byte?",
    "options": [
      {
        "id": "opt_t6_ot_28_a",
        "text": "1 nghìn byte.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_28_b",
        "text": "1 triệu byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_28_c",
        "text": "1 tỉ byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_28_d",
        "text": "1 nghìn tỉ byte.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_29",
    "type": "single_choice",
    "prompt": "Trong các đơn vị đo dung lượng thông tin sau, đơn vị nào lớn nhất?",
    "options": [
      {
        "id": "opt_t6_ot_29_a",
        "text": "Byte (B).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_29_b",
        "text": "Megabyte (MB).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_29_c",
        "text": "Gigabyte (GB).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_29_d",
        "text": "Terabyte (TB).",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_30",
    "type": "single_choice",
    "prompt": "Hình ảnh kĩ thuật số trong máy tính được cấu tạo từ đâu?",
    "options": [
      {
        "id": "opt_t6_ot_30_a",
        "text": "Các đường thẳng và đường cong.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_30_b",
        "text": "Các mảnh ghép vật lí.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_30_c",
        "text": "Các điểm ảnh (pixel).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_30_d",
        "text": "Các mã màu nước.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_31",
    "type": "single_choice",
    "prompt": "Để máy tính có thể xử lí được văn bản, hình ảnh, âm thanh, tất cả các dữ liệu này cần được:",
    "options": [
      {
        "id": "opt_t6_ot_31_a",
        "text": "In ra giấy.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_31_b",
        "text": "Chuyển đổi thành dãy bit.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_31_c",
        "text": "Chuyển thành ngôn ngữ Tiếng Việt.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_31_d",
        "text": "Phân loại theo thư mục riêng biệt.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_32",
    "type": "single_choice",
    "prompt": "Một thẻ nhớ có dung lượng 16 GB, một bức ảnh chụp có dung lượng khoảng 12 MB. Thẻ nhớ đó chứa được khoảng bao nhiêu bức ảnh? (Biết 1 GB = 1024 MB)",
    "options": [
      {
        "id": "opt_t6_ot_32_a",
        "text": "Khoảng 133 bức ảnh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_32_b",
        "text": "Khoảng 1024 bức ảnh.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_32_c",
        "text": "Khoảng 1365 bức ảnh.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_32_d",
        "text": "Khoảng 2048 bức ảnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_33",
    "type": "single_choice",
    "prompt": "Dữ liệu được lưu trữ trên đĩa quang (CD, DVD) hoặc thẻ nhớ được xếp vào thành phần nào của hệ thống xử lí thông tin máy tính?",
    "options": [
      {
        "id": "opt_t6_ot_33_a",
        "text": "Bộ nhớ trong.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_33_b",
        "text": "Bộ nhớ ngoài (Thiết bị lưu trữ thông tin).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_33_c",
        "text": "Thiết bị vào.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_33_d",
        "text": "Bộ xử lí.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_34",
    "type": "single_choice",
    "prompt": "Kí tự 'A' được mã hoá trong máy tính thành dãy 01000001. Dãy này có độ dài là bao nhiêu?",
    "options": [
      {
        "id": "opt_t6_ot_34_a",
        "text": "1 bit.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_34_b",
        "text": "8 bit (1 byte).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_34_c",
        "text": "8 byte.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_34_d",
        "text": "1 KB.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_35",
    "type": "single_choice",
    "prompt": "Mạng máy tính là gì?",
    "options": [
      {
        "id": "opt_t6_ot_35_a",
        "text": "Tập hợp các thiết bị điện tử trong một căn nhà.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_35_b",
        "text": "Hai hay nhiều máy tính và các thiết bị được kết nối để truyền thông tin cho nhau.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_35_c",
        "text": "Mạng lưới đường bộ nối các thành phố.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_35_d",
        "text": "Phần mềm giúp máy tính kết nối Internet.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_36",
    "type": "single_choice",
    "prompt": "Các thành phần chính của một mạng máy tính bao gồm:",
    "options": [
      {
        "id": "opt_t6_ot_36_a",
        "text": "Các thiết bị đầu cuối, các thiết bị kết nối và phần mềm mạng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_36_b",
        "text": "Bàn phím, chuột, màn hình và hệ điều hành.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_36_c",
        "text": "Dây cáp mạng, điện thoại di động và máy in.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_36_d",
        "text": "Mạng có dây và mạng không dây.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_37",
    "type": "single_choice",
    "prompt": "Thiết bị nào sau đây được gọi là thiết bị đầu cuối trong mạng máy tính?",
    "options": [
      {
        "id": "opt_t6_ot_37_a",
        "text": "Bộ chia (Hub).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_37_b",
        "text": "Bộ định tuyến (Router).",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_37_c",
        "text": "Dây dẫn cáp mạng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_37_d",
        "text": "Máy tính để bàn, điện thoại thông minh, máy in.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_38",
    "type": "single_choice",
    "prompt": "Thiết bị nào sau đây đóng vai trò là thiết bị kết nối trong mạng máy tính?",
    "options": [
      {
        "id": "opt_t6_ot_38_a",
        "text": "Máy tính để bàn.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_38_b",
        "text": "Bộ chuyển mạch (Switch), Bộ định tuyến (Router).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_38_c",
        "text": "Tai nghe không dây.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_38_d",
        "text": "Hệ điều hành máy tính.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_39",
    "type": "single_choice",
    "prompt": "Phần mềm mạng có vai trò gì trong mạng máy tính?",
    "options": [
      {
        "id": "opt_t6_ot_39_a",
        "text": "Duy trì quy tắc, điều khiển quá trình truyền dữ liệu trên mạng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_39_b",
        "text": "Là thiết bị vật lí để truyền tín hiệu không dây.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_39_c",
        "text": "Là nơi người dùng thao tác lưu trữ trực tiếp.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_39_d",
        "text": "Cung cấp nguồn điện cho các máy tính trong mạng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_40",
    "type": "single_choice",
    "prompt": "Một trong những ưu điểm nổi bật của kết nối mạng không dây so với mạng có dây là gì?",
    "options": [
      {
        "id": "opt_t6_ot_40_a",
        "text": "Không thể bị ảnh hưởng bởi nhiễu sóng hoặc thời tiết.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_40_b",
        "text": "Thiết bị có thể linh hoạt thay đổi vị trí mà vẫn duy trì kết nối mạng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_40_c",
        "text": "Luôn luôn miễn phí cước sử dụng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_40_d",
        "text": "Tốc độ truyền tải luôn cao hơn mạng có dây trong mọi hoàn cảnh.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_41",
    "type": "single_choice",
    "prompt": "Việc 5 máy tính trong phòng làm việc cùng chia sẻ để dùng chung một chiếc máy in minh hoạ cho lợi ích nào của mạng máy tính?",
    "options": [
      {
        "id": "opt_t6_ot_41_a",
        "text": "Trao đổi dữ liệu.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_41_b",
        "text": "Liên lạc với nhau.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_41_c",
        "text": "Dùng chung các thiết bị trên mạng.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_41_d",
        "text": "Truy cập Internet tốc độ cao.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_42",
    "type": "single_choice",
    "prompt": "Bạn Khoa gửi một tệp báo cáo bằng Word từ máy tính của mình sang máy tính của bạn An. Đây là tính năng gì của mạng máy tính?",
    "options": [
      {
        "id": "opt_t6_ot_42_a",
        "text": "Dùng chung thiết bị.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_42_b",
        "text": "Điều khiển thiết bị kết nối.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_42_c",
        "text": "Trao đổi dữ liệu.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_42_d",
        "text": "Bảo mật dữ liệu mạng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_43",
    "type": "single_choice",
    "prompt": "Đường truyền dữ liệu 'không nhìn thấy' thường sử dụng công nghệ nào để truyền tín hiệu?",
    "options": [
      {
        "id": "opt_t6_ot_43_a",
        "text": "Dây cáp quang.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_43_b",
        "text": "Dây cáp đồng.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_43_c",
        "text": "Sóng vô tuyến (wifi, bluetooth...).",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_43_d",
        "text": "Sóng siêu âm.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_44",
    "type": "single_choice",
    "prompt": "Trường học cung cấp điểm truy cập mạng (Access Point) tại thư viện để học sinh dùng điện thoại tra cứu. Đây là ứng dụng của loại mạng nào?",
    "options": [
      {
        "id": "opt_t6_ot_44_a",
        "text": "Mạng có dây cục bộ.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_44_b",
        "text": "Mạng không dây.",
        "is_correct": true
      },
      {
        "id": "opt_t6_ot_44_c",
        "text": "Mạng viễn thông cố định.",
        "is_correct": false
      },
      {
        "id": "opt_t6_ot_44_d",
        "text": "Mạng lưới đường sắt.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_45",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Thông tin và dữ liệu':",
    "items": [
      {
        "id": "sub_t6_ot_45_a",
        "text": "Thông tin là những gì đem lại hiểu biết cho con người về thế giới xung quanh.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_45_b",
        "text": "Dữ liệu là thông tin được ghi lên vật mang tin.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_45_c",
        "text": "Mọi dữ liệu (ví dụ như bản tin thời tiết) đều mang lại thông tin cho tất cả mọi đối tượng tiếp nhận bất kể độ tuổi hay trình độ.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_45_d",
        "text": "Tấm bảng ghi giá vé xe là dữ liệu, còn chữ viết trên đó là vật mang tin.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_1_thong_tin_va_du_lieu"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_46",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Quá trình xử lí thông tin của con người':",
    "items": [
      {
        "id": "sub_t6_ot_46_a",
        "text": "Quá trình xử lí thông tin của con người chỉ gồm 3 hoạt động cơ bản: thu nhận, xử lí và truyền thông tin.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_46_b",
        "text": "Ở hoạt động thu nhận thông tin, con người nhận thông tin từ thế giới bên ngoài nhờ vào các giác quan.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_46_c",
        "text": "Thông tin chỉ được lưu trữ trong bộ não con người, không thể lưu trữ bằng cách ghi chép ra ngoài.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_46_d",
        "text": "Việc bộ não liên kết các thông tin đã có, so sánh, phân tích để đưa ra kết luận được gọi là hoạt động xử lí thông tin.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_47",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Xử lí thông tin trong máy tính':",
    "items": [
      {
        "id": "sub_t6_ot_47_a",
        "text": "Bàn phím, chuột máy tính đóng vai trò là các thiết bị thu nhận thông tin (thiết bị vào).",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_47_b",
        "text": "Màn hình máy tính có chức năng phân tích, xử lí thông tin giống như bộ não của con người.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_47_c",
        "text": "Máy tính có ưu điểm vượt trội là tính toán với tốc độ rất cao, chính xác và có thể làm việc bền bỉ.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_47_d",
        "text": "Khác với con người, máy tính hiện nay có thể dễ dàng thu nhận trực tiếp thông tin về mùi vị nhờ bộ xử lí CPU.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_2_xu_li_thong_tin"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_48",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Biểu diễn và đo lượng thông tin trong máy tính':",
    "items": [
      {
        "id": "sub_t6_ot_48_a",
        "text": "Trong máy tính, mọi loại thông tin (văn bản, hình ảnh, âm thanh) đều được chuyển thành dãy các kí hiệu 0 và 1.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_48_b",
        "text": "Bit là đơn vị lớn nhất dùng để đo dung lượng thông tin.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_48_c",
        "text": "Trong biểu diễn hình ảnh đen trắng, mỗi điểm ảnh (pixel) bắt buộc phải dùng 8 bit để biểu diễn.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_48_d",
        "text": "Đơn vị 1 Kilobyte (KB) có giá trị xấp xỉ 1 nghìn byte (chính xác là 1024 byte).",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_3_thong_tin_trong_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_49",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Mạng máy tính':",
    "items": [
      {
        "id": "sub_t6_ot_49_a",
        "text": "Mạng máy tính là mạng lưới gồm hai hay nhiều máy tính và thiết bị được kết nối để truyền thông tin cho nhau.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_49_b",
        "text": "Lợi ích của mạng máy tính chỉ dừng lại ở việc dùng chung máy in, không thể trao đổi các tệp tin qua lại.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_49_c",
        "text": "Việc chia sẻ dữ liệu qua mạng giúp người dùng dễ dàng gửi một tệp ảnh cho nhau mà không cần chép qua USB.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_49_d",
        "text": "Phần mềm mạng có vai trò như luật lệ giao thông, giúp điều khiển quá trình truyền dữ liệu.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin6_ot_50",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về 'Thành phần mạng và kết nối mạng':",
    "items": [
      {
        "id": "sub_t6_ot_50_a",
        "text": "Máy tính để bàn, điện thoại di động thông minh được xếp vào nhóm thiết bị đầu cuối của mạng máy tính.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_50_b",
        "text": "Bộ định tuyến (Router) và Điểm truy cập không dây (Access Point) là các thiết bị kết nối.",
        "is_correct": true
      },
      {
        "id": "sub_t6_ot_50_c",
        "text": "Sử dụng mạng có dây sẽ tránh được hoàn toàn các sự cố như đứt dây do chuột cắn hay mưa bão so với mạng không dây.",
        "is_correct": false
      },
      {
        "id": "sub_t6_ot_50_d",
        "text": "Mạng không dây giúp các thiết bị (như điện thoại, laptop) có thể linh hoạt thay đổi vị trí mà vẫn duy trì được kết nối mạng.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_6",
      "on_tap_thuong_xuyen",
      "bai_4_mang_may_tinh"
    ],
    "grade": "Lớp 6",
    "subject": "Tin học",
    "term": "Ôn tập thường xuyên"
  },
  {
    "id": "q_tin7_gk1_1",
    "type": "single_choice",
    "prompt": "Thiết bị vào - ra đóng vai trò gì trong hệ thống máy tính?",
    "options": [
      {
        "id": "opt_t7_gk1_1_a",
        "text": "Chỉ cung cấp nguồn điện cho máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_1_b",
        "text": "Điều khiển toàn bộ hoạt động của phần mềm.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_1_c",
        "text": "Giúp máy tính trao đổi dữ liệu với thế giới bên ngoài.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_1_d",
        "text": "Chỉ xử lí dữ liệu bên trong máy tính.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_2",
    "type": "single_choice",
    "prompt": "Thiết bị nào sau đây dùng để tiếp nhận thông tin và chuyển vào máy tính (thiết bị vào)?",
    "options": [
      {
        "id": "opt_t7_gk1_2_a",
        "text": "Bộ xử lí trung tâm (CPU).",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_2_b",
        "text": "Bàn phím, chuột, micro.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_2_c",
        "text": "Màn hình, máy in, loa.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_2_d",
        "text": "Máy chiếu, tai nghe.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_3",
    "type": "single_choice",
    "prompt": "Thiết bị nào sau đây nhận thông tin từ máy tính đưa ra bên ngoài (thiết bị ra)?",
    "options": [
      {
        "id": "opt_t7_gk1_3_a",
        "text": "Ổ đĩa cứng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_3_b",
        "text": "Micro, máy quét.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_3_c",
        "text": "Máy in, loa, màn hình.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_3_d",
        "text": "Chuột, bàn phím.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_4",
    "type": "single_choice",
    "prompt": "Máy chiếu thuộc loại thiết bị nào?",
    "options": [
      {
        "id": "opt_t7_gk1_4_a",
        "text": "Thiết bị ra.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_4_b",
        "text": "Thiết bị xử lí.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_4_c",
        "text": "Thiết bị vào.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_4_d",
        "text": "Thiết bị lưu trữ.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_5",
    "type": "single_choice",
    "prompt": "Hệ điều hành là gì?",
    "options": [
      {
        "id": "opt_t7_gk1_5_a",
        "text": "Là một loại thiết bị phần cứng của máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_5_b",
        "text": "Là phần mềm hệ thống quản lí, điều khiển hoạt động chung của máy tính và quản lí dữ liệu.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_5_c",
        "text": "Là trang web dùng để tìm kiếm thông tin.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_5_d",
        "text": "Là phần mềm ứng dụng dùng để gõ văn bản.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_6",
    "type": "single_choice",
    "prompt": "Phần mềm nào sau đây LÀ một hệ điều hành?",
    "options": [
      {
        "id": "opt_t7_gk1_6_a",
        "text": "Zalo.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_6_b",
        "text": "Google Chrome.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_6_c",
        "text": "Microsoft Word.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_6_d",
        "text": "Windows 10.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_7",
    "type": "single_choice",
    "prompt": "Chức năng nào sau đây KHÔNG phải là chức năng cơ bản của hệ điều hành?",
    "options": [
      {
        "id": "opt_t7_gk1_7_a",
        "text": "Trực tiếp chỉnh sửa hiệu ứng của một bức ảnh nghệ thuật.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_7_b",
        "text": "Cung cấp môi trường trao đổi thông tin (giao diện) giữa người và máy.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_7_c",
        "text": "Quản lí các thiết bị và dữ liệu của máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_7_d",
        "text": "Cung cấp môi trường cho phép chạy các phần mềm ứng dụng.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_8",
    "type": "single_choice",
    "prompt": "Phần mềm ứng dụng có đặc điểm gì?",
    "options": [
      {
        "id": "opt_t7_gk1_8_a",
        "text": "Phải cài đặt đầu tiên để máy tính hoạt động được.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_8_b",
        "text": "Giúp con người thực hiện những công việc cụ thể (soạn văn bản, nghe nhạc...).",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_8_c",
        "text": "Là phần mềm không bao giờ bị lỗi.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_8_d",
        "text": "Quản lí phần cứng máy tính trực tiếp.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_9",
    "type": "single_choice",
    "prompt": "Tệp có phần mở rộng '.docx' hoặc '.doc' thường chứa dữ liệu thuộc loại nào?",
    "options": [
      {
        "id": "opt_t7_gk1_9_a",
        "text": "Hình ảnh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_9_b",
        "text": "Văn bản.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_9_c",
        "text": "Âm thanh.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_9_d",
        "text": "Video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_10",
    "type": "single_choice",
    "prompt": "Để nhận biết một tệp thuộc loại gì và dùng phần mềm nào để mở, hệ điều hành thường dựa vào đâu?",
    "options": [
      {
        "id": "opt_t7_gk1_10_a",
        "text": "Ngày tạo tệp.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_10_b",
        "text": "Tên người tạo ra tệp.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_10_c",
        "text": "Phần mở rộng của tên tệp.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_10_d",
        "text": "Kích thước của tệp.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_11",
    "type": "single_choice",
    "prompt": "Tệp chương trình máy tính trong hệ điều hành Windows thường có phần mở rộng nào?",
    "options": [
      {
        "id": "opt_t7_gk1_11_a",
        "text": ".exe, .com, .bat, .msi",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_11_b",
        "text": ".jpg, .png",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_11_c",
        "text": ".mp3, .mp4",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_11_d",
        "text": ".doc, .docx",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_12",
    "type": "single_choice",
    "prompt": "Trong Windows 10, ứng dụng nào giúp quản lí tệp và thư mục (tạo, đổi tên, sao chép, di chuyển, xoá...)?",
    "options": [
      {
        "id": "opt_t7_gk1_12_a",
        "text": "Microsoft Paint.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_12_b",
        "text": "File Explorer.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_12_c",
        "text": "Control Panel.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_12_d",
        "text": "Task Manager.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_13",
    "type": "single_choice",
    "prompt": "Các kênh trao đổi thông tin phổ biến trên Internet hiện nay bao gồm những gì?",
    "options": [
      {
        "id": "opt_t7_gk1_13_a",
        "text": "Chỉ có diễn đàn thảo luận.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_13_b",
        "text": "Chỉ có thư điện tử (email).",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_13_c",
        "text": "Thư điện tử, diễn đàn (Forum), mạng xã hội.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_13_d",
        "text": "Điện báo, bưu điện truyền thống.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_14",
    "type": "single_choice",
    "prompt": "Mạng xã hội là gì?",
    "options": [
      {
        "id": "opt_t7_gk1_14_a",
        "text": "Là mạng kết nối các máy tính trong một trường học bằng dây cáp.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_14_b",
        "text": "Là một thư viện điện tử chỉ chứa sách kĩ thuật số.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_14_c",
        "text": "Là phần mềm hệ thống giúp máy tính hoạt động.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_14_d",
        "text": "Là một cộng đồng trực tuyến để mọi người có thể tương tác, giao tiếp với nhau.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_15",
    "type": "single_choice",
    "prompt": "Mục đích chính của mạng xã hội Facebook hoặc Zalo là gì?",
    "options": [
      {
        "id": "opt_t7_gk1_15_a",
        "text": "Chia sẻ video kĩ thuật cao là chủ yếu.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_15_b",
        "text": "Quản lí tệp tin trong máy tính nội bộ.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_15_c",
        "text": "Giao lưu kết nối bạn bè, chia sẻ hình ảnh, suy nghĩ cá nhân.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_15_d",
        "text": "Thảo luận các bài toán giải tích chuyên sâu.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_16",
    "type": "single_choice",
    "prompt": "Mạng xã hội YouTube tập trung chủ yếu vào việc chia sẻ loại dữ liệu nào?",
    "options": [
      {
        "id": "opt_t7_gk1_16_a",
        "text": "Tệp thực thi chương trình.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_16_b",
        "text": "Video.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_16_c",
        "text": "Hình ảnh (Ảnh chụp tĩnh).",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_16_d",
        "text": "Văn bản Word.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_17",
    "type": "single_choice",
    "prompt": "Thiết bị nào vừa là thiết bị vào vừa là thiết bị ra?",
    "options": [
      {
        "id": "opt_t7_gk1_17_a",
        "text": "Màn hình máy tính thông thường.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_17_b",
        "text": "Bàn phím.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_17_c",
        "text": "Màn hình cảm ứng (touch screen).",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_17_d",
        "text": "Loa thường.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_18",
    "type": "single_choice",
    "prompt": "Thao tác nào sau đây là thao tác tắt máy tính an toàn, đúng cách?",
    "options": [
      {
        "id": "opt_t7_gk1_18_a",
        "text": "Nhấn giữ nút nguồn (Power) vài giây.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_18_b",
        "text": "Rút phích cắm điện đột ngột.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_18_c",
        "text": "Tắt công tắc màn hình rồi rút điện.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_18_d",
        "text": "Sử dụng nút lệnh Shut down của hệ điều hành.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_19",
    "type": "single_choice",
    "prompt": "Tại sao không nên chạm vào phần kim loại của máy tính khi đang cắm điện hoặc lau dọn chưa rút điện?",
    "options": [
      {
        "id": "opt_t7_gk1_19_a",
        "text": "Làm mất dữ liệu trong máy.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_19_b",
        "text": "Làm trầy xước máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_19_c",
        "text": "Làm máy tính chạy chậm đi.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_19_d",
        "text": "Dễ gây ra giật điện, không an toàn.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_1_thiet_bi_vao_ra"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_20",
    "type": "single_choice",
    "prompt": "Mối quan hệ giữa hệ điều hành và phần mềm ứng dụng là gì?",
    "options": [
      {
        "id": "opt_t7_gk1_20_a",
        "text": "Phần mềm ứng dụng chạy trong môi trường do hệ điều hành tạo ra.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_20_b",
        "text": "Hệ điều hành chạy bên trong phần mềm ứng dụng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_20_c",
        "text": "Cả hai hoạt động độc lập, không liên quan đến nhau.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_20_d",
        "text": "Phần mềm ứng dụng có chức năng điều khiển hệ điều hành.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_2_he_dieu_hanh_va_phan_mem"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_21",
    "type": "single_choice",
    "prompt": "Tại sao nên phân loại dữ liệu và lưu trữ theo trật tự thư mục, đặt tên rõ ràng?",
    "options": [
      {
        "id": "opt_t7_gk1_21_a",
        "text": "Để máy tính chạy nhanh hơn.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_21_b",
        "text": "Để dễ dàng, nhanh chóng tìm kiếm và truy cập lại khi cần.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_21_c",
        "text": "Để phần mềm ứng dụng hoạt động chính xác hơn.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_21_d",
        "text": "Để máy tính không bị nhiễm virus.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_22",
    "type": "single_choice",
    "prompt": "Sao lưu dữ liệu là thao tác nào sau đây?",
    "options": [
      {
        "id": "opt_t7_gk1_22_a",
        "text": "Xoá dữ liệu gốc và chỉ giữ lại một phiên bản duy nhất.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_22_b",
        "text": "Tạo ra bản sao các tệp/thư mục và lưu chúng lên một thiết bị lưu trữ khác.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_22_c",
        "text": "Đổi tên toàn bộ thư mục trong máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_22_d",
        "text": "Đăng tải dữ liệu lên mạng để mọi người cùng xem.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_23",
    "type": "single_choice",
    "prompt": "Nhược điểm của sao lưu cục bộ (lưu trên ổ cứng ngoài, USB để cùng chỗ với máy tính) là gì?",
    "options": [
      {
        "id": "opt_t7_gk1_23_a",
        "text": "Khôi phục dữ liệu rất chậm.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_23_b",
        "text": "Chi phí rất cao.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_23_c",
        "text": "Nếu rủi ro làm mất cả máy tính lẫn USB (ví dụ hỏa hoạn, mất cắp) thì bản sao cũng bị mất theo.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_23_d",
        "text": "Không thể lưu được các tệp dung lượng lớn.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_24",
    "type": "single_choice",
    "prompt": "Lệnh nào dùng để đổi tên một thư mục hoặc tệp đã chọn?",
    "options": [
      {
        "id": "opt_t7_gk1_24_a",
        "text": "Paste.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_24_b",
        "text": "Delete.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_24_c",
        "text": "Rename.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_24_d",
        "text": "Copy.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_25",
    "type": "single_choice",
    "prompt": "Thao tác sử dụng cặp lệnh 'Copy' và 'Paste' đối với một tệp sẽ dẫn đến kết quả gì?",
    "options": [
      {
        "id": "opt_t7_gk1_25_a",
        "text": "Tệp gốc bị đổi tên.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_25_b",
        "text": "Tệp gốc bị di chuyển sang vị trí mới.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_25_c",
        "text": "Tệp gốc bị xoá đi.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_25_d",
        "text": "Tạo ra một bản sao của tệp tại vị trí mới, tệp gốc vẫn giữ nguyên.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_26",
    "type": "single_choice",
    "prompt": "Tính năng nào sau đây KHÔNG phải là chức năng phổ biến của mạng xã hội?",
    "options": [
      {
        "id": "opt_t7_gk1_26_a",
        "text": "Viết chương trình điều khiển phần cứng máy tính.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_26_b",
        "text": "Gửi tin nhắn riêng tư.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_26_c",
        "text": "Bình luận (comment) trên bài đăng của bạn bè.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_26_d",
        "text": "Đăng ảnh, video.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_27",
    "type": "single_choice",
    "prompt": "Nếu em bắt gặp một thông tin 'sốc' trên mạng nhưng chưa được kiểm chứng, việc làm ĐÚNG đắn là gì?",
    "options": [
      {
        "id": "opt_t7_gk1_27_a",
        "text": "Sao chép và đăng lại trên trang cá nhân của mình xem như là thông tin của mình.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_27_b",
        "text": "Lập tức chia sẻ ngay để cảnh báo mọi người.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_27_c",
        "text": "Thêm bình luận kích động vào bài viết.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_27_d",
        "text": "Không chia sẻ vội, tìm hiểu kĩ tính xác thực của thông tin từ các nguồn chính thống.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_28",
    "type": "single_choice",
    "prompt": "Thao tác nào dùng để di chuyển một thư mục/tệp (cắt từ chỗ cũ sang chỗ mới)?",
    "options": [
      {
        "id": "opt_t7_gk1_28_a",
        "text": "Cut và Paste.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_28_b",
        "text": "Delete và Paste.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_28_c",
        "text": "Copy và Paste.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_28_d",
        "text": "Rename và Cut.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_29",
    "type": "single_choice",
    "prompt": "Nếu em nhìn thấy một tệp có đuôi '.exe' trong ổ đĩa hệ thống và không biết rõ về nó, em NÊN làm gì?",
    "options": [
      {
        "id": "opt_t7_gk1_29_a",
        "text": "Lập tức xoá nó để giải phóng bộ nhớ.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_29_b",
        "text": "Đổi đuôi tệp thành '.txt' để dễ đọc.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_29_c",
        "text": "Không nên xoá hay di chuyển vì đó có thể là tệp hệ thống/chương trình cần thiết.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_29_d",
        "text": "Tải lên mạng xã hội chia sẻ cho bạn bè.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_30",
    "type": "single_choice",
    "prompt": "Khi sử dụng mạng xã hội, để đảm bảo an toàn thông tin cá nhân, em NÊN làm gì?",
    "options": [
      {
        "id": "opt_t7_gk1_30_a",
        "text": "Để chế độ công khai (Public) toàn bộ thông tin cá nhân.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_30_b",
        "text": "Chỉ kết bạn và trò chuyện với người mà em thực sự quen biết và tin tưởng.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_30_c",
        "text": "Đăng tải chi tiết mọi lịch trình di chuyển hàng ngày của bản thân lên mạng.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_30_d",
        "text": "Công khai mật khẩu để bạn bè cùng sử dụng chung.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_31",
    "type": "single_choice",
    "prompt": "Bạn An cắm USB vào máy tính để copy bài nhưng không thấy hiện lên, bực mình An liền rút USB ra ngay lập tức mà không sử dụng chức năng Eject (Ngắt kết nối an toàn). Việc làm này có nguy cơ gì lớn nhất?",
    "options": [
      {
        "id": "opt_t7_gk1_31_a",
        "text": "Làm lỗi cấu trúc, gây mất mát hoặc hỏng dữ liệu trong USB.",
        "is_correct": true
      },
      {
        "id": "opt_t7_gk1_31_b",
        "text": "Làm máy tính bị tắt nguồn đột ngột.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_31_c",
        "text": "Làm hỏng vĩnh viễn các cổng cắm USB của máy tính.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_31_d",
        "text": "Tự động chia sẻ dữ liệu USB lên mạng Internet.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_32",
    "type": "single_choice",
    "prompt": "Nhóm của em đang làm một dự án và muốn tạo một thư mục lưu trữ tài liệu chung để tất cả thành viên có thể truy cập, xem và chỉnh sửa từ xa mọi lúc mọi nơi. Biện pháp lưu trữ nào là TỐT NHẤT?",
    "options": [
      {
        "id": "opt_t7_gk1_32_a",
        "text": "Lưu ở ổ đĩa C của trưởng nhóm.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_32_b",
        "text": "Ghi ra đĩa CD rồi phát cho từng người trong nhóm.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_32_c",
        "text": "Lưu vào một chiếc USB và chuyền tay nhau luân phiên mượn.",
        "is_correct": false
      },
      {
        "id": "opt_t7_gk1_32_d",
        "text": "Lưu trên các dịch vụ lưu trữ đám mây như Google Drive, OneDrive.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_tf_1",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về quy tắc tham gia mạng xã hội và sử dụng Internet an toàn:",
    "items": [
      {
        "id": "sub_t7_gk1_1_a",
        "text": "Việc đăng tải, chia sẻ các thông tin giả mạo, sai sự thật trên mạng xã hội là hành vi bị pháp luật nghiêm cấm.",
        "is_correct": true
      },
      {
        "id": "sub_t7_gk1_1_b",
        "text": "Bất kì ai, ở mọi lứa tuổi kể cả dưới 10 tuổi đều được phép tự do lập tài khoản Facebook mà không có giới hạn nào.",
        "is_correct": false
      },
      {
        "id": "sub_t7_gk1_1_c",
        "text": "Khi nhận được một yêu cầu kết bạn từ một tài khoản hoàn toàn xa lạ, em nên chấp nhận ngay để mở rộng giao tiếp.",
        "is_correct": false
      },
      {
        "id": "sub_t7_gk1_1_d",
        "text": "Mạng xã hội là con dao hai lưỡi (có cả mặt tốt và mặt xấu), học sinh cần tìm hiểu kĩ và sử dụng đúng mục đích học tập, giao lưu lành mạnh.",
        "is_correct": true
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "dung_sai_chum",
      "bai_4_mang_xa_hoi_va_internet"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin7_gk1_tf_2",
    "type": "true_false",
    "prompt": "Đọc tình huống sau: “Bạn Khoa mang máy tính xách tay ra quán cà phê để hoàn thành dự án Tin học. Trong lúc làm việc, Khoa thấy một chiếc USB lạ ai đó bỏ quên trên bàn liền cắm vào máy để xem thử nội dung, đồng thời Khoa kết nối vào wifi công cộng không mật khẩu để đăng nhập tài khoản cá nhân tải tài liệu. Do vội vã lấy đồ, Khoa vô tình làm đổ một chút nước ra cạnh máy tính.” Đánh giá các hành vi của Khoa:",
    "items": [
      {
        "id": "sub_t7_gk1_2_a",
        "text": "Việc cắm chiếc USB lạ nhặt được vào máy tính là hoàn toàn an toàn nếu Khoa chưa nháy đúp mở các tệp tin bên trong.",
        "is_correct": false
      },
      {
        "id": "sub_t7_gk1_2_b",
        "text": "Đăng nhập tài khoản cá nhân, mật khẩu qua mạng wifi công cộng không có mã hóa (không mật khẩu) có rủi ro bị tin tặc đánh cắp thông tin.",
        "is_correct": true
      },
      {
        "id": "sub_t7_gk1_2_c",
        "text": "Khoa cần lau tay khô, nhanh chóng thấm vùng nước bị đổ và cách li nguồn nước để tránh nước ngấm vào khe tản nhiệt hay cổng cắm gây chập cháy.",
        "is_correct": true
      },
      {
        "id": "sub_t7_gk1_2_d",
        "text": "Để bài tập dự án được an toàn tuyệt đối, Khoa chỉ cần làm xong và lưu nó duy nhất trên màn hình Desktop của máy tính xách tay đó.",
        "is_correct": false
      }
    ],
    "tags": [
      "tin_hoc_7",
      "de_thi_giua_ki_1",
      "dung_sai_chum",
      "an_toan_may_tinh_va_du_lieu"
    ],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
  }
];

export const DEFAULT_EXAM_CONFIG: ExamConfig = {
  exam_id: "exam_tin7_giuaki1",
  title: "Đề Cương Ôn Tập Giữa Học Kì I - Môn Tin Học 7",
  duration_minutes: 45,
  max_violations_allowed: 3,
  total_questions_to_pick: 20,
  distribution: {
    single_choice: 16,
    true_false: 4
  },
  access_pin: "",
  teacher_password: "admin2026",
  variants_count: 12,
  base_code: 101,
  session_salt: 2026
};
