import sys, re, json, os, zipfile, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

# 1. Read docx
docx_path = "De_thi_Giua_ki_1_Tin_7_Tron_Dap_An.docx"
with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read("word/document.xml")

root = ET.fromstring(xml_content)
lines = []
for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
    line = "".join(texts).strip()
    if line:
        lines.append(line)

print(f"Total lines extracted from docx: {len(lines)}")

# 2. Parse answer keys
p1_idx = -1
p2_idx = -1
hd_idx = -1
for i, l in enumerate(lines):
    if "PHẦN I." in l: p1_idx = i
    elif "PHẦN II." in l: p2_idx = i
    elif "HƯỚNG DẪN CHẤM" in l: hd_idx = i

print(f"p1: {p1_idx}, p2: {p2_idx}, hd: {hd_idx}")

ans_key_sc = {}
in_sc_key = False
in_tf_key = False

for l in lines[hd_idx:]:
    if "I. Phần trắc nghiệm nhiều lựa chọn" in l:
        in_sc_key = True
        in_tf_key = False
        continue
    if "II. Phần trắc nghiệm đúng/sai" in l:
        in_sc_key = False
        in_tf_key = True
        continue
    if in_sc_key:
        m = re.match(r"Câu\s+(\d+)\s*:\s*([A-D])", l)
        if m:
            ans_key_sc[int(m.group(1))] = m.group(2).upper()

print(f"SC answer keys found: {len(ans_key_sc)}")

# Parse Part I single-choice
sc_questions = []
for q_num in range(1, 33):
    q_str = f"Câu {q_num}:"
    start = -1
    for i in range(p1_idx, p2_idx):
        if lines[i].startswith(q_str):
            start = i
            break
    if start == -1:
        print(f"Error: Missing Câu {q_num}")
        sys.exit(1)
        
    prompt = lines[start][len(q_str):].strip()
    opts = {}
    curr_opt = None
    for j in range(start + 1, p2_idx):
        line = lines[j]
        if line.startswith("Câu ") or "PHẦN II" in line:
            break
        m_opt = re.match(r"^([A-D])\.\s*(.*)", line)
        if m_opt:
            curr_opt = m_opt.group(1)
            opts[curr_opt] = m_opt.group(2).strip()
        elif curr_opt:
            opts[curr_opt] += " " + line
            
    if len(opts) != 4:
        print(f"Error: Câu {q_num} has options: {opts}")
        sys.exit(1)
        
    correct_letter = ans_key_sc.get(q_num)
    if not correct_letter:
        print(f"Error: Missing key for Câu {q_num}")
        sys.exit(1)
        
    options_list = []
    for letter in ["A", "B", "C", "D"]:
        options_list.append({
            "id": f"opt_t7_gk1_{q_num}_{letter.lower()}",
            "text": opts[letter],
            "is_correct": (letter == correct_letter)
        })
        
    if q_num in [1, 2, 3, 4, 17, 18, 19]:
        unit_tag = "bai_1_thiet_bi_vao_ra"
    elif q_num in [5, 6, 7, 8, 20]:
        unit_tag = "bai_2_he_dieu_hanh_va_phan_mem"
    elif q_num in [9, 10, 11, 12, 21, 22, 23, 24, 25, 28, 29, 31, 32]:
        unit_tag = "bai_3_quan_li_du_lieu_tep_va_thu_muc"
    else:
        unit_tag = "bai_4_mang_xa_hoi_va_internet"

    sc_questions.append({
        "id": f"q_tin7_gk1_{q_num}",
        "type": "single_choice",
        "prompt": prompt,
        "options": options_list,
        "tags": ["tin_hoc_7", "de_thi_giua_ki_1", unit_tag],
        "grade": "Lớp 7",
        "subject": "Tin học",
        "term": "Giữa kì I"
    })

print(f"Successfully processed {len(sc_questions)} single-choice questions.")

# 3. Parse Part II True/False
tf_q1 = {
    "id": "q_tin7_gk1_tf_1",
    "type": "true_false",
    "prompt": "Đọc các phát biểu sau về quy tắc tham gia mạng xã hội và sử dụng Internet an toàn:",
    "items": [
        {
            "id": "sub_t7_gk1_1_a",
            "text": "Việc đăng tải, chia sẻ các thông tin giả mạo, sai sự thật trên mạng xã hội là hành vi bị pháp luật nghiêm cấm.",
            "is_correct": True
        },
        {
            "id": "sub_t7_gk1_1_b",
            "text": "Bất kì ai, ở mọi lứa tuổi kể cả dưới 10 tuổi đều được phép tự do lập tài khoản Facebook mà không có giới hạn nào.",
            "is_correct": False
        },
        {
            "id": "sub_t7_gk1_1_c",
            "text": "Khi nhận được một yêu cầu kết bạn từ một tài khoản hoàn toàn xa lạ, em nên chấp nhận ngay để mở rộng giao tiếp.",
            "is_correct": False
        },
        {
            "id": "sub_t7_gk1_1_d",
            "text": "Mạng xã hội là con dao hai lưỡi (có cả mặt tốt và mặt xấu), học sinh cần tìm hiểu kĩ và sử dụng đúng mục đích học tập, giao lưu lành mạnh.",
            "is_correct": True
        }
    ],
    "tags": ["tin_hoc_7", "de_thi_giua_ki_1", "dung_sai_chum", "bai_4_mang_xa_hoi_va_internet"],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
}

tf_q2 = {
    "id": "q_tin7_gk1_tf_2",
    "type": "true_false",
    "prompt": "Đọc tình huống sau: “Bạn Khoa mang máy tính xách tay ra quán cà phê để hoàn thành dự án Tin học. Trong lúc làm việc, Khoa thấy một chiếc USB lạ ai đó bỏ quên trên bàn liền cắm vào máy để xem thử nội dung, đồng thời Khoa kết nối vào wifi công cộng không mật khẩu để đăng nhập tài khoản cá nhân tải tài liệu. Do vội vã lấy đồ, Khoa vô tình làm đổ một chút nước ra cạnh máy tính.” Đánh giá các hành vi của Khoa:",
    "items": [
        {
            "id": "sub_t7_gk1_2_a",
            "text": "Việc cắm chiếc USB lạ nhặt được vào máy tính là hoàn toàn an toàn nếu Khoa chưa nháy đúp mở các tệp tin bên trong.",
            "is_correct": False
        },
        {
            "id": "sub_t7_gk1_2_b",
            "text": "Đăng nhập tài khoản cá nhân, mật khẩu qua mạng wifi công cộng không có mã hóa (không mật khẩu) có rủi ro bị tin tặc đánh cắp thông tin.",
            "is_correct": True
        },
        {
            "id": "sub_t7_gk1_2_c",
            "text": "Khoa cần lau tay khô, nhanh chóng thấm vùng nước bị đổ và cách li nguồn nước để tránh nước ngấm vào khe tản nhiệt hay cổng cắm gây chập cháy.",
            "is_correct": True
        },
        {
            "id": "sub_t7_gk1_2_d",
            "text": "Để bài tập dự án được an toàn tuyệt đối, Khoa chỉ cần làm xong và lưu nó duy nhất trên màn hình Desktop của máy tính xách tay đó.",
            "is_correct": False
        }
    ],
    "tags": ["tin_hoc_7", "de_thi_giua_ki_1", "dung_sai_chum", "an_toan_may_tinh_va_du_lieu"],
    "grade": "Lớp 7",
    "subject": "Tin học",
    "term": "Giữa kì I"
}

new_tin7_questions = sc_questions + [tf_q1, tf_q2]
print(f"Total new questions created: {len(new_tin7_questions)}")

# 4. Load current bank from src/data/defaultQuestionBank.ts
with open("src/data/defaultQuestionBank.ts", "r", encoding="utf-8") as f:
    orig_ts = f.read()

m = re.search(r"export const DEFAULT_QUESTION_BANK: Question\[\] = (\[.*?\]);\n\nexport const DEFAULT_EXAM_CONFIG", orig_ts, re.DOTALL)
if not m:
    print("Error: Could not find DEFAULT_QUESTION_BANK pattern in defaultQuestionBank.ts")
    sys.exit(1)

current_bank = json.loads(m.group(1))

# Keep all questions that are not old q_tin7_gk1 (in case re-running)
filtered_bank = [q for q in current_bank if not q["id"].startswith("q_tin7_gk1_")]

# Ensure the older outline Tin 7 questions are classified with term: "Ôn tập thường xuyên"
for q in filtered_bank:
    if "tin_hoc_7" in q.get("tags", []) or q.get("id", "").startswith("q_tin7_"):
        q["grade"] = "Lớp 7"
        q["subject"] = "Tin học"
        q["term"] = "Ôn tập thường xuyên"

# Combine with our 34 new official exam questions
final_bank = filtered_bank + new_tin7_questions
print(f"Total questions in updated bank: {len(final_bank)}")
tin7_gk1 = [q for q in final_bank if q.get("term") == "Giữa kì I" and q.get("grade") == "Lớp 7"]
tin7_ot = [q for q in final_bank if q.get("term") == "Ôn tập thường xuyên" and q.get("grade") == "Lớp 7"]
tin6_ot = [q for q in final_bank if q.get("grade") == "Lớp 6"]
print(f" - Tin 7 Giữa kì I (Đề chính thức): {len(tin7_gk1)} câu (32 SC + 2 TF)")
print(f" - Tin 7 Ôn tập thường xuyên (Đề cương): {len(tin7_ot)} câu")
print(f" - Tin 6 Ôn tập thường xuyên: {len(tin6_ot)} câu")

# Reconstruct defaultQuestionBank.ts
prefix = orig_ts[:m.start(1)]
suffix = orig_ts[m.end(1):]
new_ts_content = prefix + json.dumps(final_bank, ensure_ascii=False, indent=2) + suffix

with open("src/data/defaultQuestionBank.ts", "w", encoding="utf-8") as f:
    f.write(new_ts_content)
print("Updated src/data/defaultQuestionBank.ts successfully.")

# 5. Update src/data/defaultClasses.ts
with open("src/data/defaultClasses.ts", "r", encoding="utf-8") as f:
    classes_code = f.read()

# Check if cls_7c already exists
if "'cls_7c'" not in classes_code and '"cls_7c"' not in classes_code:
    # Add cls_7c right after cls_7a2
    class_7c_snippet = """  {
    id: 'cls_7c',
    code: '7C',
    name: 'Lớp 7C - Tin Học 7',
    grade: 'Lớp 7',
    subject: 'Tin học',
    teacherName: 'Thầy/Cô Bộ Môn Tin Học',
    pinCode: '7007',
    examTitle: 'Đề Thi Giữa Học Kì 1 - Tin Học 7 (Lớp 7C)',
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 34,
      target_grade: 'Lớp 7',
      target_subject: 'Tin học',
      target_term: 'Giữa kì I',
      exam_mode: 'bank',
      distribution: {
        single_choice: 32,
        true_false: 2,
        single_choice_points: 8.0,
        true_false_points: 2.0
      }
    },
    isActive: true,
    description: 'Đề thi Giữa học kì 1 môn Tin học 7 chính thức (32 câu trắc nghiệm 8.0đ + 2 câu đúng/sai 2.0đ, Thời gian 45 phút)'
  },
"""
    # Insert after cls_7a2 block
    target_marker = "id: 'cls_7a2',"
    idx = classes_code.find(target_marker)
    if idx != -1:
        # find the end of cls_7a2 object "  },"
        end_idx = classes_code.find("  },", idx)
        if end_idx != -1:
            classes_code = classes_code[:end_idx + 4] + "\n" + class_7c_snippet + classes_code[end_idx + 4:]
            print("Inserted cls_7c into DEFAULT_CLASSES.")
    
# Update gv_tin.assignedClasses to include '7C'
if "'7C'" not in classes_code and '"7C"' not in classes_code:
    classes_code = classes_code.replace("assignedClasses: ['6G01', '7A1', '7A2']", "assignedClasses: ['6G01', '7A1', '7A2', '7C']")
    print("Added '7C' to gv_tin assignedClasses.")

with open("src/data/defaultClasses.ts", "w", encoding="utf-8") as f:
    f.write(classes_code)
print("Updated src/data/defaultClasses.ts successfully.")

# 6. Update server_data/db.json
db_path = "server_data/db.json"
if os.path.exists(db_path):
    with open(db_path, "r", encoding="utf-8") as f:
        db = json.load(f)
        
    db["bank"] = final_bank
    
    classes = db.get("classes", [])
    has_7c = any(c.get("code") == "7C" for c in classes)
    cls_7c_data = {
        "id": "cls_7c",
        "code": "7C",
        "name": "Lớp 7C - Tin Học 7",
        "grade": "Lớp 7",
        "subject": "Tin học",
        "teacherName": "Thầy/Cô Bộ Môn Tin Học",
        "pinCode": "7007",
        "examTitle": "Đề Thi Giữa Học Kì 1 - Tin Học 7 (Lớp 7C)",
        "examConfig": {
            "duration_minutes": 45,
            "total_questions_to_pick": 34,
            "target_grade": "Lớp 7",
            "target_subject": "Tin học",
            "target_term": "Giữa kì I",
            "exam_mode": "bank",
            "distribution": {
                "single_choice": 32,
                "true_false": 2,
                "single_choice_points": 8.0,
                "true_false_points": 2.0
            }
        },
        "isActive": True,
        "description": "Đề thi Giữa học kì 1 môn Tin học 7 chính thức (32 câu trắc nghiệm 8.0đ + 2 câu đúng/sai 2.0đ, Thời gian 45 phút)"
    }
    
    if not has_7c:
        classes.append(cls_7c_data)
    else:
        for idx, c in enumerate(classes):
            if c.get("code") == "7C":
                classes[idx] = cls_7c_data
                break
    db["classes"] = classes
    
    # Update teachers in db
    teachers = db.get("teachers", [])
    for t in teachers:
        if t.get("username") == "gv_tin":
            assigned = t.get("assignedClasses", [])
            if "7C" not in assigned:
                assigned.append("7C")
                t["assignedClasses"] = assigned
                
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
    print("Updated server_data/db.json successfully.")

print("All updates completed successfully!")
