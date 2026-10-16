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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    "term": "Giữa kì I"
  },
  {
    "id": "q_tin10_gk1_1",
    "type": "single_choice",
    "grade": "Lớp 10",
    "subject": "Tin học",
    "term": "Giữa kì I",
    "prompt": "Hệ đếm nhị phân (Binary system) sử dụng các kí số nào sau đây để biểu diễn dữ liệu trong máy tính?",
    "options": [
      { "id": "opt_t10_1_a", "text": "Chỉ gồm hai kí số 0 và 1", "is_correct": true },
      { "id": "opt_t10_1_b", "text": "Các kí số từ 0 đến 9", "is_correct": false },
      { "id": "opt_t10_1_c", "text": "Các kí số từ 0 đến 7", "is_correct": false },
      { "id": "opt_t10_1_d", "text": "Gồm 0, 1 và các chữ cái A đến F", "is_correct": false }
    ],
    "tags": ["tin_hoc_10", "bieu_dien_thong_tin", "nhi_phan"]
  },
  {
    "id": "q_tin10_ck1_2",
    "type": "single_choice",
    "grade": "Lớp 10",
    "subject": "Tin học",
    "term": "Cuối kì I",
    "prompt": "Trong ngôn ngữ lập trình Python, hàm nào sau đây được sử dụng để xuất dữ liệu ra màn hình?",
    "options": [
      { "id": "opt_t10_2_a", "text": "print()", "is_correct": true },
      { "id": "opt_t10_2_b", "text": "input()", "is_correct": false },
      { "id": "opt_t10_2_c", "text": "echo()", "is_correct": false },
      { "id": "opt_t10_2_d", "text": "output()", "is_correct": false }
    ],
    "tags": ["tin_hoc_10", "lap_trinh_python", "cuoi_ki_1"]
  },
  {
    "id": "q_tin8_gk1_3",
    "type": "single_choice",
    "grade": "Lớp 8",
    "subject": "Tin học",
    "term": "Giữa kì I",
    "prompt": "Thông tin trong môi trường số có đặc điểm nổi bật nào sau đây?",
    "options": [
      { "id": "opt_t8_3_a", "text": "Dễ dàng sao chép, lan truyền nhanh chóng và khó thu hồi triệt để", "is_correct": true },
      { "id": "opt_t8_3_b", "text": "Hoàn toàn bảo mật và không bao giờ bị rò rỉ", "is_correct": false },
      { "id": "opt_t8_3_c", "text": "Chỉ lưu trữ được trên giấy và sách vở in truyền thống", "is_correct": false },
      { "id": "opt_t8_3_d", "text": "Không thể chia sẻ qua mạng Internet", "is_correct": false }
    ],
    "tags": ["tin_hoc_8", "thong_tin_so", "giua_ki_1"]
  },
  {
    "id": "q_tin9_gk1_4",
    "type": "true_false",
    "grade": "Lớp 9",
    "subject": "Tin học",
    "term": "Giữa kì I",
    "prompt": "Xét tính Đúng / Sai của các khẳng định sau về mạng máy tính và an toàn thông tin:",
    "items": [
      { "id": "sub_t9_4_a", "text": "Mạng LAN là mạng kết nối các máy tính trong phạm vi hẹp như trường học, văn phòng.", "is_correct": true },
      { "id": "sub_t9_4_b", "text": "Địa chỉ IP là định danh duy nhất của mỗi thiết bị khi tham gia vào mạng Internet.", "is_correct": true },
      { "id": "sub_t9_4_c", "text": "Cáp mạng xoắn đôi (UTP) là phương tiện truyền dẫn không dây.", "is_correct": false },
      { "id": "sub_t9_4_d", "text": "Trang web có giao thức https:// giúp mã hóa bảo mật thông tin tốt hơn http://.", "is_correct": true }
    ],
    "tags": ["tin_hoc_9", "mang_may_tinh", "dung_sai"]
  },
  {
    "id": "q_tin7_ck1_5",
    "type": "single_choice",
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Cuối kì I",
    "prompt": "Trong phần mềm bảng tính điện tử (MS Excel), cú pháp hàm nào sau đây dùng để tính tổng các ô từ A1 đến A5?",
    "options": [
      { "id": "opt_t7_ck1_a", "text": "=SUM(A1:A5)", "is_correct": true },
      { "id": "opt_t7_ck1_b", "text": "=AVERAGE(A1:A5)", "is_correct": false },
      { "id": "opt_t7_ck1_c", "text": "=TOTAL(A1..A5)", "is_correct": false },
      { "id": "opt_t7_ck1_d", "text": "=COUNT(A1:A5)", "is_correct": false }
    ],
    "tags": ["tin_hoc_7", "bang_tinh_excel", "cuoi_ki_1"]
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
