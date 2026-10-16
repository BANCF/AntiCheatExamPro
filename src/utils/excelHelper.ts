import * as XLSX from 'xlsx';
import { Question, SubmissionRecord, SingleChoiceQuestion, TrueFalseQuestion } from '../types/exam';

/**
 * Export Gradebook to Excel (.xlsx)
 */
export function exportGradebookToExcel(
  submissions: SubmissionRecord[],
  examTitle: string = 'Bang_Diem_Kiem_Tra'
): void {
  const dataRows = submissions.map((sub, index) => {
    const violationSummary = sub.violations_log.length > 0
      ? sub.violations_log.map((v, i) => `${i + 1}. [${v.type}] ${v.note || ''}`).join('; ')
      : 'Không có vi phạm';

    return {
      'STT': index + 1,
      'Bài Kiểm Tra': sub.exam_title || examTitle,
      'Họ và Tên': sub.student_name,
      'Lớp': sub.student_class,
      'Mã Đề': sub.assigned_code,
      'Điểm Số (Thang 10)': sub.calculated_score.toFixed(2),
      'Trạng Thái Nộp': sub.status === 'FORCE_SUBMITTED' ? 'BỊ THU BÀI DO VI PHẠM' : 'Nộp bài hợp lệ',
      'Số Lần Vi Phạm': sub.violation_count,
      'Điểm Đạt': `${sub.correct_points_earned ?? 0} / ${sub.max_possible_points ?? sub.total_questions}`,
      'Thời Gian Bắt Đầu': new Date(sub.start_time).toLocaleString('vi-VN'),
      'Thời Gian Nộp Bài': new Date(sub.submit_time).toLocaleString('vi-VN'),
      'Nhật Ký Vi Phạm': violationSummary
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(dataRows);

  // Set column widths for readability
  worksheet['!cols'] = [
    { wch: 6 },   // STT
    { wch: 25 },  // Họ và Tên
    { wch: 10 },  // Lớp
    { wch: 10 },  // Mã Đề
    { wch: 18 },  // Điểm Số
    { wch: 25 },  // Trạng Thái Nộp
    { wch: 16 },  // Số Lần Vi Phạm
    { wch: 14 },  // Điểm Đạt
    { wch: 22 },  // Bắt Đầu
    { wch: 22 },  // Nộp Bài
    { wch: 45 }   // Nhật Ký Vi Phạm
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bảng Điểm');

  // Trigger download
  const dateStr = new Date().toISOString().slice(0, 10);
  const sanitizedTitle = examTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  XLSX.writeFile(workbook, `${sanitizedTitle}_${dateStr}.xlsx`);
}

/**
 * Generate and download a sample Excel (.xlsx) Question Bank template
 */
export function downloadSampleExcelTemplate(): void {
  const sampleData = [
    {
      'loai_cau_hoi': 'single_choice',
      'lop': 'Lớp 10',
      'mon_hoc': 'Tin học',
      'hoc_ki': 'Giữa kì I',
      'cau_hoi': 'Hệ điều hành nào sau đây là mã nguồn mở?',
      'phuong_an_A': 'Linux',
      'phuong_an_A_dung': 'DUNG',
      'phuong_an_B': 'Windows 11',
      'phuong_an_B_dung': 'SAI',
      'phuong_an_C': 'macOS',
      'phuong_an_C_dung': 'SAI',
      'phuong_an_D': 'iOS',
      'phuong_an_D_dung': 'SAI',
      'chu_de_tags': 'tin_hoc_10, he_dieu_hanh'
    },
    {
      'loai_cau_hoi': 'single_choice',
      'lop': 'Lớp 10',
      'mon_hoc': 'Tin học',
      'hoc_ki': 'Giữa kì I',
      'cau_hoi': 'Giao thức nào mã hóa dữ liệu web bằng SSL/TLS?',
      'phuong_an_A': 'HTTPS',
      'phuong_an_A_dung': 'DUNG',
      'phuong_an_B': 'HTTP',
      'phuong_an_B_dung': 'SAI',
      'phuong_an_C': 'FTP',
      'phuong_an_C_dung': 'SAI',
      'phuong_an_D': 'Telnet',
      'phuong_an_D_dung': 'SAI',
      'chu_de_tags': 'mang_may_tinh, bao_mat'
    },
    {
      'loai_cau_hoi': 'true_false',
      'lop': 'Lớp 10',
      'mon_hoc': 'Tin học',
      'hoc_ki': 'Giữa kì I',
      'cau_hoi': 'Đánh giá tính Đúng / Sai của các nhận định về giao thức mạng:',
      'phuong_an_A': 'HTTP truyền tải văn bản thuần không mã hóa.',
      'phuong_an_A_dung': 'DUNG',
      'phuong_an_B': 'HTTPS sử dụng chứng chỉ số SSL/TLS để bảo mật.',
      'phuong_an_B_dung': 'DUNG',
      'phuong_an_C': 'FTP là giao thức chuyên dùng để gửi thư điện tử.',
      'phuong_an_C_dung': 'SAI',
      'phuong_an_D': 'Mỗi máy tính chỉ cần địa chỉ MAC không cần IP vẫn duyệt web quốc tế.',
      'phuong_an_D_dung': 'SAI',
      'chu_de_tags': 'tin_hoc_10, mang_lan'
    }
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  ws['!cols'] = [
    { wch: 15 }, // loai_cau_hoi
    { wch: 12 }, // lop
    { wch: 14 }, // mon_hoc
    { wch: 14 }, // hoc_ki
    { wch: 45 }, // cau_hoi
    { wch: 30 },
    { wch: 18 },
    { wch: 30 },
    { wch: 18 },
    { wch: 30 },
    { wch: 18 },
    { wch: 30 },
    { wch: 18 },
    { wch: 25 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Mau_Cau_Hoi');
  XLSX.writeFile(wb, 'Mau_Ngan_Hang_Cau_Hoi.xlsx');
}

/**
 * Download sample JSON template
 */
export function downloadSampleJsonTemplate(): void {
  const sampleJson: Question[] = [
    {
      id: 'q_sample_1',
      type: 'single_choice',
      prompt: 'Hệ điều hành nào sau đây là mã nguồn mở?',
      options: [
        { id: 'opt_1', text: 'Linux', is_correct: true },
        { id: 'opt_2', text: 'Windows', is_correct: false },
        { id: 'opt_3', text: 'macOS', is_correct: false },
        { id: 'opt_4', text: 'iOS', is_correct: false }
      ],
      tags: ['tin_hoc_10', 'easy']
    },
    {
      id: 'q_sample_2',
      type: 'true_false',
      prompt: 'Cho biết tính Đúng / Sai của các nhận định sau về giao thức mạng:',
      items: [
        { id: 'sub_1', text: 'HTTP truyền thông tin dưới dạng mã hóa.', is_correct: false },
        { id: 'sub_2', text: 'HTTPS sử dụng SSL/TLS để bảo mật đường truyền.', is_correct: true },
        { id: 'sub_3', text: 'FTP được dùng phổ biến để truyền tập tin qua mạng.', is_correct: true },
        { id: 'sub_4', text: 'Mỗi thiết bị trên Internet chỉ có thể có địa chỉ MAC mà không cần IP.', is_correct: false }
      ],
      tags: ['tin_hoc_10', 'medium']
    }
  ];

  const blob = new Blob([JSON.stringify(sampleJson, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Mau_Ngan_Hang_Cau_Hoi.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Parse an Excel file into Question[]
 */
export async function parseExcelQuestions(file: File): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json<any>(worksheet);

        const questions: Question[] = [];

        rows.forEach((row, index) => {
          const type = (row['loai_cau_hoi'] || 'single_choice').toLowerCase().trim();
          const prompt = row['cau_hoi'] || `Câu hỏi số ${index + 1}`;
          const rawTags = row['chu_de_tags'] || '';
          const tags = typeof rawTags === 'string'
            ? rawTags.split(',').map((t: string) => t.trim()).filter(Boolean)
            : ['general'];

          const isTrue = (val: any) => {
            if (!val) return false;
            const str = String(val).toUpperCase().trim();
            return str === 'DUNG' || str === 'TRUE' || str === '1' || str === 'ĐÚNG' || str === 'YES';
          };

          const grade = row['lop'] || row['khoi'] || row['grade'] || undefined;
          const subject = row['mon_hoc'] || row['mon'] || row['subject'] || undefined;
          const term = row['hoc_ki'] || row['ki_thi'] || row['phan'] || row['term'] || undefined;

          if (type === 'true_false') {
            const items = [
              { id: `sub_${index}_1`, text: String(row['phuong_an_A'] || 'Ý A'), is_correct: isTrue(row['phuong_an_A_dung']) },
              { id: `sub_${index}_2`, text: String(row['phuong_an_B'] || 'Ý B'), is_correct: isTrue(row['phuong_an_B_dung']) },
              { id: `sub_${index}_3`, text: String(row['phuong_an_C'] || 'Ý C'), is_correct: isTrue(row['phuong_an_C_dung']) },
              { id: `sub_${index}_4`, text: String(row['phuong_an_D'] || 'Ý D'), is_correct: isTrue(row['phuong_an_D_dung']) }
            ].filter((item) => item.text && item.text.trim().length > 0);

            const q: TrueFalseQuestion = {
              id: `q_excel_${Date.now()}_${index}`,
              type: 'true_false',
              prompt,
              items,
              tags,
              grade,
              subject,
              term
            };
            questions.push(q);
          } else {
            // single_choice
            const options = [
              { id: `opt_${index}_1`, text: String(row['phuong_an_A'] || 'Đáp án A'), is_correct: isTrue(row['phuong_an_A_dung']) },
              { id: `opt_${index}_2`, text: String(row['phuong_an_B'] || 'Đáp án B'), is_correct: isTrue(row['phuong_an_B_dung']) },
              { id: `opt_${index}_3`, text: String(row['phuong_an_C'] || 'Đáp án C'), is_correct: isTrue(row['phuong_an_C_dung']) },
              { id: `opt_${index}_4`, text: String(row['phuong_an_D'] || 'Đáp án D'), is_correct: isTrue(row['phuong_an_D_dung']) }
            ].filter((opt) => opt.text && opt.text.trim().length > 0);

            // If none marked correct, mark first as fallback
            if (!options.some((opt) => opt.is_correct) && options.length > 0) {
              options[0].is_correct = true;
            }

            const q: SingleChoiceQuestion = {
              id: `q_excel_${Date.now()}_${index}`,
              type: 'single_choice',
              prompt,
              options,
              tags,
              grade,
              subject,
              term
            };
            questions.push(q);
          }
        });

        resolve(questions);
      } catch (err) {
        reject(new Error('Lỗi phân tích file Excel. Vui lòng kiểm tra đúng định dạng mẫu.'));
      }
    };
    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Parse a JSON file into Question[]
 */
export async function parseJsonQuestions(file: File): Promise<Question[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          throw new Error('Dữ liệu JSON phải là một mảng câu hỏi (Array)');
        }
        // Basic schema normalization
        const questions: Question[] = parsed.map((item, idx) => {
          return {
            id: item.id || `q_json_${Date.now()}_${idx}`,
            type: item.type === 'true_false' ? 'true_false' : 'single_choice',
            prompt: item.prompt || 'Câu hỏi',
            options: item.options || [],
            items: item.items || [],
            tags: Array.isArray(item.tags) ? item.tags : ['imported']
          } as Question;
        });
        resolve(questions);
      } catch (err: any) {
        reject(new Error(err.message || 'Lỗi phân tích file JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Không thể đọc file'));
    reader.readAsText(file);
  });
}
