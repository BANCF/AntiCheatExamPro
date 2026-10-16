import json

with open("de_cuong_extracted.txt", "r", encoding="utf-8") as f:
    text = f.read()

single_choice_keys = {
    1: 'B', 2: 'A', 3: 'B', 4: 'B', 5: 'C', 6: 'C', 7: 'B', 8: 'C', 9: 'C', 10: 'C',
    11: 'B', 12: 'B', 13: 'C', 14: 'B', 15: 'C', 16: 'B', 17: 'A', 18: 'C', 19: 'C', 20: 'B',
    21: 'C', 22: 'C', 23: 'B', 24: 'B', 25: 'C', 26: 'B', 27: 'C', 28: 'C', 29: 'B', 30: 'B',
    31: 'D', 32: 'C', 33: 'B', 34: 'C', 35: 'C', 36: 'C', 37: 'C', 38: 'C', 39: 'B', 40: 'C',
    41: 'C', 42: 'A', 43: 'B', 44: 'B'
}

true_false_keys = {
    45: {'a': True, 'b': False, 'c': True, 'd': False},
    46: {'a': False, 'b': True, 'c': True, 'd': False},
    47: {'a': True, 'b': False, 'c': False, 'd': True},
    48: {'a': False, 'b': True, 'c': True, 'd': False},
    49: {'a': True, 'b': False, 'c': True, 'd': False},
    50: {'a': True, 'b': False, 'c': False, 'd': True}
}

lines = [line.strip() for line in text.split("\n") if line.strip()]

questions = []

# Parse single choice (Câu 1 to Câu 44)
for q_num in range(1, 45):
    q_pattern = f"Câu {q_num}:"
    start_idx = -1
    for idx, line in enumerate(lines):
        if line.startswith(q_pattern):
            start_idx = idx
            break
    
    if start_idx != -1:
        prompt_line = lines[start_idx]
        prompt = prompt_line[len(q_pattern):].strip()
        
        opt_lines = {}
        for offset in range(1, 15):
            cur_idx = start_idx + offset
            if cur_idx >= len(lines):
                break
            cur_line = lines[cur_idx]
            if cur_line.startswith("Câu ") or cur_line.startswith("II."):
                break
            for letter in ['A', 'B', 'C', 'D']:
                if cur_line.startswith(f"{letter}."):
                    opt_lines[letter] = cur_line[2:].strip()
        
        letters = ['A', 'B', 'C', 'D']
        options = []
        correct_letter = single_choice_keys.get(q_num, 'A')
        for letter in letters:
            options.append({
                "id": f"opt_{q_num}_{letter.lower()}",
                "text": opt_lines.get(letter, f"Phương án {letter}"),
                "is_correct": (letter == correct_letter)
            })
            
        if q_num <= 12:
            tags = ["tin_hoc_7", "bai_1_thiet_bi_vao_ra", "phan_cung"]
        elif q_num <= 17:
            tags = ["tin_hoc_7", "bai_2_phan_mem_may_tinh", "he_dieu_hanh"]
        elif q_num <= 32:
            tags = ["tin_hoc_7", "bai_3_quan_li_du_lieu", "tep_va_thu_muc"]
        else:
            tags = ["tin_hoc_7", "bai_4_mang_xa_hoi", "internet_an_toan"]
            
        questions.append({
            "id": f"q_tin7_{q_num}",
            "type": "single_choice",
            "prompt": prompt,
            "options": options,
            "tags": tags
        })

# Parse true false (Câu 45 to Câu 50)
for q_num in range(45, 51):
    q_pattern = f"Câu {q_num}:"
    start_idx = -1
    for idx, line in enumerate(lines):
        if line.startswith(q_pattern):
            start_idx = idx
            break
            
    if start_idx != -1:
        prompt_line = lines[start_idx]
        prompt = prompt_line[len(q_pattern):].strip()
        
        sub_texts = {}
        for offset in range(1, 15):
            cur_idx = start_idx + offset
            if cur_idx >= len(lines):
                break
            cur_line = lines[cur_idx]
            if cur_line.startswith("Câu ") or cur_line.startswith("III."):
                break
            for s_letter in ['a', 'b', 'c', 'd']:
                if cur_line.startswith(f"{s_letter})"):
                    sub_texts[s_letter] = cur_line[2:].strip()
                    
        keys_for_q = true_false_keys.get(q_num, {})
        items = []
        for s_letter in ['a', 'b', 'c', 'd']:
            items.append({
                "id": f"sub_{q_num}_{s_letter}",
                "text": sub_texts.get(s_letter, f"Ý {s_letter}"),
                "is_correct": keys_for_q.get(s_letter, False)
            })
            
        questions.append({
            "id": f"q_tin7_{q_num}",
            "type": "true_false",
            "prompt": prompt,
            "items": items,
            "tags": ["tin_hoc_7", "dung_sai_chum", "on_tap_giua_ki_1"]
        })

print(f"Parsed {len(questions)} questions accurately.")

ts_content = '''import { Question, ExamConfig } from '../types/exam';

export const DEFAULT_QUESTION_BANK: Question[] = ''' + json.dumps(questions, ensure_ascii=False, indent=2) + ''';

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
  access_pin: "2026",
  teacher_password: "admin2026"
};
'''

with open("src/data/defaultQuestionBank.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

store_data = {
    "bank": questions,
    "config": {
        "exam_id": "exam_tin7_giuaki1",
        "title": "Đề Cương Ôn Tập Giữa Học Kì I - Môn Tin Học 7",
        "duration_minutes": 45,
        "max_violations_allowed": 3,
        "total_questions_to_pick": 20,
        "distribution": {
            "single_choice": 16,
            "true_false": 4
        },
        "access_pin": "2026",
        "teacher_password": "admin2026"
    },
    "submissions": []
}

with open("server_data/db.json", "w", encoding="utf-8") as f:
    json.dump(store_data, f, ensure_ascii=False, indent=2)

print("Saved cleanly!")
