# -*- coding: utf-8 -*-
import json
import re
import os

# Define the 44 single-choice questions
sc_questions_data = [
    {
        "id": "q_tin6_ot_1",
        "prompt": "Thông tin là gì?",
        "options": [
            ("Những gì đem lại hiểu biết cho con người về thế giới xung quanh và về chính bản thân mình.", True),
            ("Các con số, chữ viết và hình ảnh trên trang giấy.", False),
            ("Bất kì vật thể nào xung quanh chúng ta.", False),
            ("Các thiết bị điện tử có khả năng lưu trữ.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_2",
        "prompt": "Dữ liệu là gì?",
        "options": [
            ("Sự hiểu biết của con người.", False),
            ("Thông tin được ghi lên vật mang tin.", True),
            ("Quá trình thu nhận và xử lí thông tin.", False),
            ("Các thiết bị dùng để kết nối mạng.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_3",
        "prompt": "Vật mang tin là gì?",
        "options": [
            ("Những gì đem lại hiểu biết cho con người.", False),
            ("Các thiết bị đầu cuối trong mạng máy tính.", False),
            ("Phương tiện được dùng để lưu trữ và truyền tải thông tin.", True),
            ("Các phần mềm giúp máy tính hoạt động.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_4",
        "prompt": "Dữ liệu được thể hiện dưới những dạng cơ bản nào?",
        "options": [
            ("Chỉ văn bản và con số.", False),
            ("Chỉ hình ảnh và âm thanh.", False),
            ("Âm thanh, hình ảnh, văn bản và các con số.", True),
            ("Các thiết bị phần cứng của máy tính.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_5",
        "prompt": "Nhận định nào sau đây đúng về mối quan hệ giữa thông tin và dữ liệu?",
        "options": [
            ("Thông tin và dữ liệu là một, không có sự khác biệt.", False),
            ("Thông tin được ghi lên vật mang tin trở thành dữ liệu.", True),
            ("Thông tin luôn nằm trong máy tính, còn dữ liệu ở ngoài đời thực.", False),
            ("Dữ liệu chỉ có ý nghĩa đối với máy tính, không có ý nghĩa đối với con người.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_6",
        "prompt": "Sự hiểu biết mà thông tin đem lại luôn phụ thuộc vào yếu tố nào?",
        "options": [
            ("Tốc độ của máy tính.", False),
            ("Độ lớn của vật mang tin.", False),
            ("Người tiếp nhận thông tin đó.", True),
            ("Dãy bit biểu diễn thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_7",
        "prompt": "Khi đi trên đường, bạn Minh thấy đèn giao thông chuyển sang màu đỏ nên dừng lại. Trong trường hợp này, 'đèn giao thông chuyển màu đỏ' đóng vai trò là gì?",
        "options": [
            ("Thông tin.", False),
            ("Dữ liệu.", True),
            ("Quá trình xử lí.", False),
            ("Bộ nhớ.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_8",
        "prompt": "Từ việc thấy đèn đỏ, bạn Minh biết rằng mình 'phải dừng xe lại để đảm bảo an toàn'. Điều mà Minh biết được gọi là gì?",
        "options": [
            ("Thông tin.", True),
            ("Dữ liệu.", False),
            ("Vật mang tin.", False),
            ("Thiết bị vào.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_9",
        "prompt": "Trong tình huống bạn An xem mục dự báo thời tiết trên tivi, chiếc tivi đóng vai trò là gì?",
        "options": [
            ("Thiết bị kết nối mạng.", False),
            ("Dữ liệu thời tiết.", False),
            ("Vật mang tin.", True),
            ("Bộ xử lí thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_10",
        "prompt": "Phát biểu: 'Theo bảng thống kê, tháng 6 Đà Nẵng ít mưa nhất so với Hà Nội, Huế' là:",
        "options": [
            ("Vật mang tin.", False),
            ("Dữ liệu.", False),
            ("Bộ nhớ.", False),
            ("Thông tin.", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_11",
        "prompt": "Một em bé 3 tuổi nhìn thấy dòng chữ 'CẤM LỬA' trên biển cảnh báo nhưng không hiểu ý nghĩa. Đối với em bé, dòng chữ đó là:",
        "options": [
            ("Thông tin quan trọng.", False),
            ("Dữ liệu nhưng không đem lại thông tin.", True),
            ("Vật mang tin vô hình.", False),
            ("Bộ xử lí thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_12",
        "prompt": "Quá trình xử lí thông tin của con người gồm bao nhiêu hoạt động cơ bản?",
        "options": [
            ("2 hoạt động.", False),
            ("3 hoạt động.", False),
            ("4 hoạt động.", True),
            ("5 hoạt động.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_13",
        "prompt": "Các hoạt động cơ bản của quá trình xử lí thông tin theo thứ tự hợp lí thường là:",
        "options": [
            ("Lưu trữ -> Xử lí -> Truyền -> Thu nhận.", False),
            ("Thu nhận -> Lưu trữ -> Xử lí -> Truyền.", True),
            ("Xử lí -> Thu nhận -> Lưu trữ -> Truyền.", False),
            ("Truyền -> Xử lí -> Thu nhận -> Lưu trữ.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_14",
        "prompt": "Máy tính gồm bao nhiêu thành phần chính để thực hiện các hoạt động xử lí thông tin?",
        "options": [
            ("3 (Thiết bị vào, thiết bị ra, phần mềm).", False),
            ("4 (Thiết bị vào, bộ nhớ, bộ xử lí, thiết bị ra).", True),
            ("2 (Phần cứng, Phần mềm).", False),
            ("5 (Bàn phím, chuột, CPU, màn hình, máy in).", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_15",
        "prompt": "Trong máy tính, thiết bị nào sau đây dùng để thu nhận thông tin (thiết bị vào)?",
        "options": [
            ("Bàn phím, chuột, máy quét.", True),
            ("Màn hình, máy in, loa.", False),
            ("Bộ xử lí (CPU).", False),
            ("Đĩa cứng, đĩa quang, thẻ nhớ.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_16",
        "prompt": "Bộ nhớ trong máy tính thực hiện chức năng gì?",
        "options": [
            ("Thu nhận thông tin.", False),
            ("Xử lí thông tin.", False),
            ("Truyền thông tin.", False),
            ("Lưu trữ thông tin.", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_17",
        "prompt": "Bộ phận nào được ví như 'bộ não' của máy tính, đóng vai trò xử lí thông tin?",
        "options": [
            ("Bộ nhớ (RAM, Ổ cứng).", False),
            ("Bộ xử lí (CPU).", True),
            ("Thiết bị vào (Bàn phím, chuột).", False),
            ("Thiết bị ra (Màn hình).", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_18",
        "prompt": "Thiết bị ra của máy tính (như màn hình, máy in) tương ứng với hoạt động nào trong quá trình xử lí thông tin?",
        "options": [
            ("Thu nhận thông tin.", False),
            ("Xử lí thông tin.", False),
            ("Truyền/chia sẻ thông tin.", True),
            ("Lưu trữ thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_19",
        "prompt": "Việc em chép bài trên bảng vào vở là hoạt động nào trong quá trình xử lí thông tin?",
        "options": [
            ("Thu nhận thông tin.", False),
            ("Xử lí thông tin.", False),
            ("Lưu trữ thông tin.", True),
            ("Truyền thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_20",
        "prompt": "Em đang nghe chương trình ca nhạc trên đài phát thanh. Hoạt động nghe ca nhạc này là:",
        "options": [
            ("Thu nhận thông tin.", True),
            ("Xử lí thông tin.", False),
            ("Truyền thông tin.", False),
            ("Lưu trữ thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_21",
        "prompt": "Não của cầu thủ phân tích vị trí thủ môn để sút bóng vào góc khung thành hở nhất. Đây là hoạt động:",
        "options": [
            ("Thu nhận thông tin.", False),
            ("Lưu trữ thông tin.", False),
            ("Xử lí thông tin.", True),
            ("Truyền thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_22",
        "prompt": "Việc em thuyết trình chủ đề tình bạn trước toàn lớp thuộc hoạt động nào?",
        "options": [
            ("Thu nhận thông tin.", False),
            ("Truyền thông tin.", True),
            ("Xử lí thông tin.", False),
            ("Bộ nhớ thông tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_23",
        "prompt": "Đặc điểm nào sau đây KHÔNG phải là ưu điểm của máy tính so với con người khi xử lí thông tin?",
        "options": [
            ("Tính toán với tốc độ cao, chính xác.", False),
            ("Làm việc liên tục bền bỉ ngày đêm.", False),
            ("Có khả năng tự tư duy, sáng tạo ra ý tưởng mới như con người.", True),
            ("Lưu trữ được lượng thông tin khổng lồ trong không gian nhỏ.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_24",
        "prompt": "Thông tin trong máy tính thông dụng hiện nay được biểu diễn bằng các kí hiệu nào?",
        "options": [
            ("Các số từ 0 đến 9.", False),
            ("Các chữ cái từ A đến Z.", False),
            ("Hai kí hiệu 0 và 1.", True),
            ("Hệ thống các mã vạch.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_25",
        "prompt": "Đơn vị nhỏ nhất để lưu trữ thông tin trong máy tính là gì?",
        "options": [
            ("Byte.", False),
            ("Bit.", True),
            ("Kilobyte.", False),
            ("Megabyte.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_26",
        "prompt": "1 Byte có giá trị bằng bao nhiêu bit?",
        "options": [
            ("2 bit.", False),
            ("8 bit.", True),
            ("10 bit.", False),
            ("1024 bit.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_27",
        "prompt": "Dãy bit là gì?",
        "options": [
            ("Dãy gồm các số từ 0 đến 9.", False),
            ("Dãy gồm các kí tự bảng chữ cái.", False),
            ("Dãy gồm những kí hiệu 0 và 1.", True),
            ("Bảng mã văn bản nội bộ.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_28",
        "prompt": "1 Kilobyte (KB) xấp xỉ bằng bao nhiêu byte?",
        "options": [
            ("1 nghìn byte.", True),
            ("1 triệu byte.", False),
            ("1 tỉ byte.", False),
            ("1 nghìn tỉ byte.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_29",
        "prompt": "Trong các đơn vị đo dung lượng thông tin sau, đơn vị nào lớn nhất?",
        "options": [
            ("Byte (B).", False),
            ("Megabyte (MB).", False),
            ("Gigabyte (GB).", False),
            ("Terabyte (TB).", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_30",
        "prompt": "Hình ảnh kĩ thuật số trong máy tính được cấu tạo từ đâu?",
        "options": [
            ("Các đường thẳng và đường cong.", False),
            ("Các mảnh ghép vật lí.", False),
            ("Các điểm ảnh (pixel).", True),
            ("Các mã màu nước.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_31",
        "prompt": "Để máy tính có thể xử lí được văn bản, hình ảnh, âm thanh, tất cả các dữ liệu này cần được:",
        "options": [
            ("In ra giấy.", False),
            ("Chuyển đổi thành dãy bit.", True),
            ("Chuyển thành ngôn ngữ Tiếng Việt.", False),
            ("Phân loại theo thư mục riêng biệt.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_32",
        "prompt": "Một thẻ nhớ có dung lượng 16 GB, một bức ảnh chụp có dung lượng khoảng 12 MB. Thẻ nhớ đó chứa được khoảng bao nhiêu bức ảnh? (Biết 1 GB = 1024 MB)",
        "options": [
            ("Khoảng 133 bức ảnh.", False),
            ("Khoảng 1024 bức ảnh.", False),
            ("Khoảng 1365 bức ảnh.", True),
            ("Khoảng 2048 bức ảnh.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_33",
        "prompt": "Dữ liệu được lưu trữ trên đĩa quang (CD, DVD) hoặc thẻ nhớ được xếp vào thành phần nào của hệ thống xử lí thông tin máy tính?",
        "options": [
            ("Bộ nhớ trong.", False),
            ("Bộ nhớ ngoài (Thiết bị lưu trữ thông tin).", True),
            ("Thiết bị vào.", False),
            ("Bộ xử lí.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_34",
        "prompt": "Kí tự 'A' được mã hoá trong máy tính thành dãy 01000001. Dãy này có độ dài là bao nhiêu?",
        "options": [
            ("1 bit.", False),
            ("8 bit (1 byte).", True),
            ("8 byte.", False),
            ("1 KB.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_35",
        "prompt": "Mạng máy tính là gì?",
        "options": [
            ("Tập hợp các thiết bị điện tử trong một căn nhà.", False),
            ("Hai hay nhiều máy tính và các thiết bị được kết nối để truyền thông tin cho nhau.", True),
            ("Mạng lưới đường bộ nối các thành phố.", False),
            ("Phần mềm giúp máy tính kết nối Internet.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_36",
        "prompt": "Các thành phần chính của một mạng máy tính bao gồm:",
        "options": [
            ("Các thiết bị đầu cuối, các thiết bị kết nối và phần mềm mạng.", True),
            ("Bàn phím, chuột, màn hình và hệ điều hành.", False),
            ("Dây cáp mạng, điện thoại di động và máy in.", False),
            ("Mạng có dây và mạng không dây.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_37",
        "prompt": "Thiết bị nào sau đây được gọi là thiết bị đầu cuối trong mạng máy tính?",
        "options": [
            ("Bộ chia (Hub).", False),
            ("Bộ định tuyến (Router).", False),
            ("Dây dẫn cáp mạng.", False),
            ("Máy tính để bàn, điện thoại thông minh, máy in.", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_38",
        "prompt": "Thiết bị nào sau đây đóng vai trò là thiết bị kết nối trong mạng máy tính?",
        "options": [
            ("Máy tính để bàn.", False),
            ("Bộ chuyển mạch (Switch), Bộ định tuyến (Router).", True),
            ("Tai nghe không dây.", False),
            ("Hệ điều hành máy tính.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_39",
        "prompt": "Phần mềm mạng có vai trò gì trong mạng máy tính?",
        "options": [
            ("Duy trì quy tắc, điều khiển quá trình truyền dữ liệu trên mạng.", True),
            ("Là thiết bị vật lí để truyền tín hiệu không dây.", False),
            ("Là nơi người dùng thao tác lưu trữ trực tiếp.", False),
            ("Cung cấp nguồn điện cho các máy tính trong mạng.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_40",
        "prompt": "Một trong những ưu điểm nổi bật của kết nối mạng không dây so với mạng có dây là gì?",
        "options": [
            ("Không thể bị ảnh hưởng bởi nhiễu sóng hoặc thời tiết.", False),
            ("Thiết bị có thể linh hoạt thay đổi vị trí mà vẫn duy trì kết nối mạng.", True),
            ("Luôn luôn miễn phí cước sử dụng.", False),
            ("Tốc độ truyền tải luôn cao hơn mạng có dây trong mọi hoàn cảnh.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_41",
        "prompt": "Việc 5 máy tính trong phòng làm việc cùng chia sẻ để dùng chung một chiếc máy in minh hoạ cho lợi ích nào của mạng máy tính?",
        "options": [
            ("Trao đổi dữ liệu.", False),
            ("Liên lạc với nhau.", False),
            ("Dùng chung các thiết bị trên mạng.", True),
            ("Truy cập Internet tốc độ cao.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_42",
        "prompt": "Bạn Khoa gửi một tệp báo cáo bằng Word từ máy tính của mình sang máy tính của bạn An. Đây là tính năng gì của mạng máy tính?",
        "options": [
            ("Dùng chung thiết bị.", False),
            ("Điều khiển thiết bị kết nối.", False),
            ("Trao đổi dữ liệu.", True),
            ("Bảo mật dữ liệu mạng.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_43",
        "prompt": "Đường truyền dữ liệu 'không nhìn thấy' thường sử dụng công nghệ nào để truyền tín hiệu?",
        "options": [
            ("Dây cáp quang.", False),
            ("Dây cáp đồng.", False),
            ("Sóng vô tuyến (wifi, bluetooth...).", True),
            ("Sóng siêu âm.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_44",
        "prompt": "Trường học cung cấp điểm truy cập mạng (Access Point) tại thư viện để học sinh dùng điện thoại tra cứu. Đây là ứng dụng của loại mạng nào?",
        "options": [
            ("Mạng có dây cục bộ.", False),
            ("Mạng không dây.", True),
            ("Mạng viễn thông cố định.", False),
            ("Mạng lưới đường sắt.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    }
]

# Define the 6 true/false questions
tf_questions_data = [
    {
        "id": "q_tin6_ot_45",
        "prompt": "Đọc các phát biểu sau về 'Thông tin và dữ liệu':",
        "items": [
            ("Thông tin là những gì đem lại hiểu biết cho con người về thế giới xung quanh.", True),
            ("Dữ liệu là thông tin được ghi lên vật mang tin.", True),
            ("Mọi dữ liệu (ví dụ như bản tin thời tiết) đều mang lại thông tin cho tất cả mọi đối tượng tiếp nhận bất kể độ tuổi hay trình độ.", False),
            ("Tấm bảng ghi giá vé xe là dữ liệu, còn chữ viết trên đó là vật mang tin.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_1_thong_tin_va_du_lieu"]
    },
    {
        "id": "q_tin6_ot_46",
        "prompt": "Đọc các phát biểu sau về 'Quá trình xử lí thông tin của con người':",
        "items": [
            ("Quá trình xử lí thông tin của con người chỉ gồm 3 hoạt động cơ bản: thu nhận, xử lí và truyền thông tin.", False),
            ("Ở hoạt động thu nhận thông tin, con người nhận thông tin từ thế giới bên ngoài nhờ vào các giác quan.", True),
            ("Thông tin chỉ được lưu trữ trong bộ não con người, không thể lưu trữ bằng cách ghi chép ra ngoài.", False),
            ("Việc bộ não liên kết các thông tin đã có, so sánh, phân tích để đưa ra kết luận được gọi là hoạt động xử lí thông tin.", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_47",
        "prompt": "Đọc các phát biểu sau về 'Xử lí thông tin trong máy tính':",
        "items": [
            ("Bàn phím, chuột máy tính đóng vai trò là các thiết bị thu nhận thông tin (thiết bị vào).", True),
            ("Màn hình máy tính có chức năng phân tích, xử lí thông tin giống như bộ não của con người.", False),
            ("Máy tính có ưu điểm vượt trội là tính toán với tốc độ rất cao, chính xác và có thể làm việc bền bỉ.", True),
            ("Khác với con người, máy tính hiện nay có thể dễ dàng thu nhận trực tiếp thông tin về mùi vị nhờ bộ xử lí CPU.", False)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_2_xu_li_thong_tin"]
    },
    {
        "id": "q_tin6_ot_48",
        "prompt": "Đọc các phát biểu sau về 'Biểu diễn và đo lượng thông tin trong máy tính':",
        "items": [
            ("Trong máy tính, mọi loại thông tin (văn bản, hình ảnh, âm thanh) đều được chuyển thành dãy các kí hiệu 0 và 1.", True),
            ("Bit là đơn vị lớn nhất dùng để đo dung lượng thông tin.", False),
            ("Trong biểu diễn hình ảnh đen trắng, mỗi điểm ảnh (pixel) bắt buộc phải dùng 8 bit để biểu diễn.", False),
            ("Đơn vị 1 Kilobyte (KB) có giá trị xấp xỉ 1 nghìn byte (chính xác là 1024 byte).", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_3_thong_tin_trong_may_tinh"]
    },
    {
        "id": "q_tin6_ot_49",
        "prompt": "Đọc các phát biểu sau về 'Mạng máy tính':",
        "items": [
            ("Mạng máy tính là mạng lưới gồm hai hay nhiều máy tính và thiết bị được kết nối để truyền thông tin cho nhau.", True),
            ("Lợi ích của mạng máy tính chỉ dừng lại ở việc dùng chung máy in, không thể trao đổi các tệp tin qua lại.", False),
            ("Việc chia sẻ dữ liệu qua mạng giúp người dùng dễ dàng gửi một tệp ảnh cho nhau mà không cần chép qua USB.", True),
            ("Phần mềm mạng có vai trò như luật lệ giao thông, giúp điều khiển quá trình truyền dữ liệu.", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    },
    {
        "id": "q_tin6_ot_50",
        "prompt": "Đọc các phát biểu sau về 'Thành phần mạng và kết nối mạng':",
        "items": [
            ("Máy tính để bàn, điện thoại di động thông minh được xếp vào nhóm thiết bị đầu cuối của mạng máy tính.", True),
            ("Bộ định tuyến (Router) và Điểm truy cập không dây (Access Point) là các thiết bị kết nối.", True),
            ("Sử dụng mạng có dây sẽ tránh được hoàn toàn các sự cố như đứt dây do chuột cắn hay mưa bão so với mạng không dây.", False),
            ("Mạng không dây giúp các thiết bị (như điện thoại, laptop) có thể linh hoạt thay đổi vị trí mà vẫn duy trì được kết nối mạng.", True)
        ],
        "tags": ["tin_hoc_6", "on_tap_thuong_xuyen", "bai_4_mang_may_tinh"]
    }
]

# Convert sc_questions_data to Question objects
new_questions = []

letters = ['a', 'b', 'c', 'd']
for q_idx, sc in enumerate(sc_questions_data, start=1):
    q_id = sc["id"]
    opts = []
    for o_idx, (text, is_corr) in enumerate(sc["options"]):
        opt_id = f"opt_t6_ot_{q_idx}_{letters[o_idx]}"
        opts.append({
            "id": opt_id,
            "text": text,
            "is_correct": is_corr
        })
    new_questions.append({
        "id": q_id,
        "type": "single_choice",
        "prompt": sc["prompt"],
        "options": opts,
        "tags": sc["tags"],
        "grade": "Lớp 6",
        "subject": "Tin học",
        "term": "Ôn tập thường xuyên"
    })

for q_idx, tf in enumerate(tf_questions_data, start=45):
    q_id = tf["id"]
    items = []
    for i_idx, (text, is_corr) in enumerate(tf["items"]):
        sub_id = f"sub_t6_ot_{q_idx}_{letters[i_idx]}"
        items.append({
            "id": sub_id,
            "text": text,
            "is_correct": is_corr
        })
    new_questions.append({
        "id": q_id,
        "type": "true_false",
        "prompt": tf["prompt"],
        "items": items,
        "tags": tf["tags"],
        "grade": "Lớp 6",
        "subject": "Tin học",
        "term": "Ôn tập thường xuyên"
    })

print(f"Generated {len(new_questions)} questions for Tin học 6 - Ôn tập thường xuyên.")

# Now read existing defaultQuestionBank.ts
with open("src/data/defaultQuestionBank.ts", "r", encoding="utf-8") as f:
    orig_ts = f.read()

# Extract existing bank JSON
m = re.search(r'export const DEFAULT_QUESTION_BANK: Question\[\] = (\[.*?\]);\s*export const DEFAULT_EXAM_CONFIG', orig_ts, re.DOTALL)
if not m:
    print("Could not find DEFAULT_QUESTION_BANK in defaultQuestionBank.ts")
    exit(1)

existing_bank = json.loads(m.group(1))

# Keep all questions that are NOT old partial q_tin6
filtered_bank = [q for q in existing_bank if not q['id'].startswith('q_tin6_')]

# Append our 50 new questions
final_bank = filtered_bank + new_questions

print(f"Total questions in bank: {len(final_bank)} (Tin 7: {len([q for q in final_bank if q.get('grade') == 'Lớp 7'])}, Tin 6: {len([q for q in final_bank if q.get('grade') == 'Lớp 6'])})")

# Reconstruct ts file
prefix = orig_ts[:m.start(1)]
suffix = orig_ts[m.end(1):]

new_ts_content = prefix + json.dumps(final_bank, ensure_ascii=False, indent=2) + suffix

with open("src/data/defaultQuestionBank.ts", "w", encoding="utf-8") as f:
    f.write(new_ts_content)

print("Updated src/data/defaultQuestionBank.ts successfully.")

# Update server_data/db.json if it exists
db_file = "server_data/db.json"
if os.path.exists(db_file):
    try:
        with open(db_file, "r", encoding="utf-8") as f:
            db_data = json.load(f)
        db_data["bank"] = final_bank
        
        # Check classes in db_data
        classes = db_data.get("classes", [])
        has_ontap = any(c.get("code") == "6ONTAP" for c in classes)
        if not has_ontap:
            classes.append({
                "id": "cls_6ontap",
                "code": "6ONTAP",
                "name": "Lớp 6 - Ôn Tập Thường Xuyên (Test)",
                "grade": "Lớp 6",
                "subject": "Tin học",
                "teacherName": "Thầy/Cô Bộ Môn Tin Học",
                "pinCode": "6666",
                "examTitle": "Đề Ôn Tập Thường Xuyên - Tin Học 6",
                "examConfig": {
                    "duration_minutes": 45,
                    "total_questions_to_pick": 20,
                    "target_grade": "Lớp 6",
                    "target_subject": "Tin học",
                    "target_term": "Ôn tập thường xuyên",
                    "exam_mode": "bank",
                    "distribution": {
                        "single_choice": 16,
                        "true_false": 4
                    }
                },
                "isActive": True,
                "description": "Đề ôn tập thường xuyên Tin học 6 (Bộ 50 câu: 44 trắc nghiệm đơn + 6 chùm đúng/sai)"
            })
            db_data["classes"] = classes

        with open(db_file, "w", encoding="utf-8") as f:
            json.dump(db_data, f, ensure_ascii=False, indent=2)
        print("Updated server_data/db.json successfully.")
    except Exception as e:
        print("Error updating db.json:", e)
