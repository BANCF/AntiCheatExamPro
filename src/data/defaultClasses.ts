import { ClassRoom, TeacherAccount } from '../types/exam';

export const DEFAULT_CLASSES: ClassRoom[] = [
  {
    id: 'cls_6ontap',
    code: '6ONTAP',
    name: 'Lớp 6 - Ôn Tập Thường Xuyên (Test)',
    grade: 'Lớp 6',
    subject: 'Tin học',
    teacherName: 'Thầy/Cô Bộ Môn Tin Học',
    pinCode: '6666',
    examTitle: 'Đề Ôn Tập Thường Xuyên - Tin Học 6',
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: 'Lớp 6',
      target_subject: 'Tin học',
      target_term: 'Ôn tập thường xuyên',
      exam_mode: 'bank',
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: 'Đề ôn tập thường xuyên Tin học 6 (Ngân hàng 50 câu: 44 trắc nghiệm đơn + 6 trắc nghiệm đúng/sai)'
  },
  {
    id: 'cls_6g01',
    code: '6G01',
    name: 'Lớp 6G01 - Tin Học 6',
    grade: 'Lớp 6',
    subject: 'Tin học',
    teacherName: 'Thầy/Cô Bộ Môn Tin Học',
    pinCode: '6001',
    examTitle: 'Đề Ôn Tập Thường Xuyên - Tin Học 6 (Lớp 6G01)',
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: 'Lớp 6',
      target_subject: 'Tin học',
      target_term: 'Ôn tập thường xuyên',
      exam_mode: 'bank',
      distribution: {
        single_choice: 16,
        true_false: 4
      }
    },
    isActive: true,
    description: 'Đề thi ôn tập thường xuyên Tin học 6 (16 trắc nghiệm + 4 đúng/sai)'
  },
  {
    id: 'cls_7a1',
    code: '7A1',
    name: 'Lớp 7A1 - Tin Học 7',
    grade: 'Lớp 7',
    subject: 'Tin học',
    teacherName: 'Thầy/Cô Bộ Môn Tin Học',
    pinCode: '2026',
    examTitle: 'Kiểm Tra Tin Học 7 - Học Kì II (Lớp 7A1)',
    examConfig: {
      duration_minutes: 15,
      total_questions_to_pick: 10,
      target_grade: 'Lớp 7',
      target_subject: 'Tin học',
      exam_mode: 'bank'
    },
    isActive: true,
    description: 'Bài thi trắc nghiệm khách quan ngẫu nhiên hóa đề cho lớp 7A1'
  },
  {
    id: 'cls_7a2',
    code: '7A2',
    name: 'Lớp 7A2 - Tin Học 7',
    grade: 'Lớp 7',
    subject: 'Tin học',
    teacherName: 'Thầy/Cô Bộ Môn Tin Học',
    pinCode: '7226',
    examTitle: 'Kiểm Tra Tin Học 7 - Đề Số 2 (Lớp 7A2)',
    examConfig: {
      duration_minutes: 15,
      total_questions_to_pick: 10,
      target_grade: 'Lớp 7',
      target_subject: 'Tin học',
      exam_mode: 'bank'
    },
    isActive: true,
    description: 'Bài thi trắc nghiệm riêng biệt cho học sinh lớp 7A2'
  },
  {
    id: 'cls_10a1',
    code: '10A1',
    name: 'Lớp 10A1 - Toán Học 10',
    grade: 'Lớp 10',
    subject: 'Toán học',
    teacherName: 'Thầy/Cô Bộ Môn Toán Học',
    pinCode: '1010',
    examTitle: 'Kiểm Tra Đại Số & Hình Học 10 (Lớp 10A1)',
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 20,
      target_grade: 'Lớp 10',
      target_subject: 'Toán học',
      exam_mode: 'bank'
    },
    isActive: true,
    description: 'Phòng thi Toán lớp 10A1 có công thức LaTeX'
  },
  {
    id: 'cls_12a3',
    code: '12A3',
    name: 'Lớp 12A3 - Vật Lí 12',
    grade: 'Lớp 12',
    subject: 'Vật lí',
    teacherName: 'Thầy/Cô Bộ Môn Vật Lí',
    pinCode: '1234',
    examTitle: 'Kiểm Tra Chuyên Đề Sóng Ánh Sáng (Lớp 12A3)',
    examConfig: {
      duration_minutes: 45,
      total_questions_to_pick: 25,
      target_grade: 'Lớp 12',
      target_subject: 'Vật lí',
      exam_mode: 'bank'
    },
    isActive: true,
    description: 'Phòng thi Vật lí 12A3 chống gian lận đa lớp'
  }
];

export const DEFAULT_TEACHERS: TeacherAccount[] = [
  {
    id: 'tc_admin',
    username: 'admin',
    password: 'admin2026',
    fullName: 'Quản Trị Viên (Admin Trường)',
    role: 'admin',
    subject: 'Tất cả'
  },
  {
    id: 'tc_tin',
    username: 'gv_tin',
    password: 'tin2026',
    fullName: 'Thầy/Cô Bộ Môn Tin Học',
    role: 'teacher',
    subject: 'Tin học',
    assignedClasses: ['6G01', '7A1', '7A2']
  },
  {
    id: 'tc_toan',
    username: 'gv_toan',
    password: 'toan2026',
    fullName: 'Thầy/Cô Bộ Môn Toán Học',
    role: 'teacher',
    subject: 'Toán học',
    assignedClasses: ['10A1']
  },
  {
    id: 'tc_ly',
    username: 'gv_ly',
    password: 'ly2026',
    fullName: 'Thầy/Cô Bộ Môn Vật Lí',
    role: 'teacher',
    subject: 'Vật lí',
    assignedClasses: ['12A3']
  },
  {
    id: 'tc_hoa',
    username: 'gv_hoa',
    password: 'hoa2026',
    fullName: 'Thầy/Cô Bộ Môn Hóa Học',
    role: 'teacher',
    subject: 'Hóa học'
  },
  {
    id: 'tc_sinh',
    username: 'gv_sinh',
    password: 'sinh2026',
    fullName: 'Thầy/Cô Bộ Môn Sinh Học',
    role: 'teacher',
    subject: 'Sinh học'
  }
];
