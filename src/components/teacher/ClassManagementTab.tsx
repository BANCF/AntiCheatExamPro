import React, { useState, useMemo } from 'react';
import { ClassRoom, TeacherAccount, ExamConfig, Question } from '../../types/exam';
import {
  School,
  PlusCircle,
  KeyRound,
  BookOpen,
  Copy,
  Check,
  Power,
  Trash2,
  Edit,
  Search,
  Sparkles,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  UploadCloud,
  Layers,
  Eye,
  Sliders,
  X
} from 'lucide-react';
import { KNOWN_GRADES, KNOWN_SUBJECTS, KNOWN_TERMS, getQuestionClassification } from '../../utils/questionClassification';
import { MathRenderer } from '../common/MathRenderer';

interface ClassManagementTabProps {
  classes: ClassRoom[];
  config: ExamConfig;
  bank: Question[];
  currentTeacher?: TeacherAccount | null;
  onSaveClass: (classItem: ClassRoom) => void;
  onDeleteClass: (classId: string) => void;
  onLaunchClassExam: (classItem: ClassRoom) => void;
  onViewClassSubmissions?: (classCode: string) => void;
}

/**
 * Parses user input string like "1A 2B 3C 4D", "1.A, 2.B", "Câu 1: A", or "ABCDABCD..."
 * into a structured dictionary { "1": "A", "2": "B", ... }
 */
function parseAnswerKeyString(input: string, total: number): Record<string, string> {
  const result: Record<string, string> = {};
  if (!input || !input.trim()) return result;

  const regex = /(?:(?:câu|cau|q|question)\s*)?(\d+)[\s.:-]*([a-dA-D])/giu;
  let match: RegExpExecArray | null;
  let count = 0;

  while ((match = regex.exec(input)) !== null) {
    const qNum = match[1];
    const ans = match[2].toUpperCase();
    result[qNum] = ans;
    count++;
  }

  // Fallback: raw letters without numbers
  if (count === 0) {
    const cleanLetters = input.replace(/[^a-dA-D]/gi, '').toUpperCase();
    for (let i = 0; i < Math.min(cleanLetters.length, total); i++) {
      result[String(i + 1)] = cleanLetters[i];
    }
  }

  return result;
}

export const ClassManagementTab: React.FC<ClassManagementTabProps> = ({
  classes,
  config,
  bank,
  currentTeacher,
  onSaveClass,
  onDeleteClass,
  onLaunchClassExam,
  onViewClassSubmissions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');

  // Modal 1: Add / Edit Class Information
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);

  // Modal 2: Dedicated Visual Exam Config for a Class (RA ĐỀ CHO LỚP)
  const [isExamConfigModalOpen, setIsExamConfigModalOpen] = useState(false);
  const [targetClassForExam, setTargetClassForExam] = useState<ClassRoom | null>(null);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states for Class Modal
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formGrade, setFormGrade] = useState('Lớp 7');
  const [formSubject, setFormSubject] = useState(currentTeacher?.subject && currentTeacher.subject !== 'Tất cả' ? currentTeacher.subject : 'Tin học');
  const [formTeacherName, setFormTeacherName] = useState(currentTeacher?.fullName || 'Thầy/Cô Giáo Viên');
  const [formPinCode, setFormPinCode] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDescription, setFormDescription] = useState('');

  // States for Dedicated "Ra Đề Cho Lớp" Modal
  const [examFormTitle, setExamFormTitle] = useState('');
  const [examFormMode, setExamFormMode] = useState<'bank' | 'pdf' | 'default'>('bank');
  const [examFormDuration, setExamFormDuration] = useState(15);
  const [examFormQuestionCount, setExamFormQuestionCount] = useState(20);
  const [examFormSingleChoiceCount, setExamFormSingleChoiceCount] = useState(16);
  const [examFormTrueFalseCount, setExamFormTrueFalseCount] = useState(4);
  const [examFormTerm, setExamFormTerm] = useState('Ôn tập thường xuyên');
  const [examFormPinCode, setExamFormPinCode] = useState('');

  // PDF Exam specific states for class
  const [pdfFileUrl, setPdfFileUrl] = useState<string>('');
  const [pdfFileName, setPdfFileName] = useState<string>('');
  const [pdfTotalQ, setPdfTotalQ] = useState<number>(40);
  const [pdfAnswerMap, setPdfAnswerMap] = useState<Record<string, string>>({});
  const [pdfQuickPasteText, setPdfQuickPasteText] = useState<string>('');
  const [showSamplePreview, setShowSamplePreview] = useState(false);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Open Add Class Modal
  const handleOpenAddClass = () => {
    setEditingClass(null);
    setFormCode('');
    setFormName('');
    setFormGrade('Lớp 7');
    setFormSubject(currentTeacher?.subject && currentTeacher.subject !== 'Tất cả' ? currentTeacher.subject : 'Tin học');
    setFormTeacherName(currentTeacher?.fullName || 'Thầy/Cô Giáo Viên');
    setFormPinCode(String(1000 + Math.floor(Math.random() * 9000)));
    setFormIsActive(true);
    setFormDescription('');
    setIsClassModalOpen(true);
  };

  // Open Edit Class Modal
  const handleOpenEditClass = (c: ClassRoom) => {
    setEditingClass(c);
    setFormCode(c.code);
    setFormName(c.name);
    setFormGrade(c.grade || 'Lớp 7');
    setFormSubject(c.subject || 'Tin học');
    setFormTeacherName(c.teacherName || currentTeacher?.fullName || '');
    setFormPinCode(c.pinCode);
    setFormIsActive(c.isActive);
    setFormDescription(c.description || '');
    setIsClassModalOpen(true);
  };

  // Open Dedicated Visual Exam Creation Modal for a Class
  const handleOpenExamConfig = (c: ClassRoom) => {
    setTargetClassForExam(c);
    setExamFormTitle(c.examTitle || `Kiểm Tra ${c.subject} - Lớp ${c.code}`);
    const existingCfg = c.examConfig || {};
    const totalQ = existingCfg.total_questions_to_pick || 10;
    setExamFormDuration(existingCfg.duration_minutes || config.duration_minutes || 15);
    setExamFormQuestionCount(totalQ);

    let defaultSC = 8;
    let defaultTF = 2;
    if (existingCfg.distribution && typeof existingCfg.distribution.single_choice === 'number' && typeof existingCfg.distribution.true_false === 'number') {
      defaultSC = existingCfg.distribution.single_choice;
      defaultTF = existingCfg.distribution.true_false;
    } else {
      defaultTF = Math.max(0, Math.min(6, Math.round(totalQ * 0.2)));
      defaultSC = totalQ - defaultTF;
    }

    setExamFormSingleChoiceCount(defaultSC);
    setExamFormTrueFalseCount(defaultTF);
    setExamFormTerm(existingCfg.target_term || 'Ôn tập thường xuyên');
    setExamFormPinCode(c.pinCode);

    // Mode determination
    if (existingCfg.exam_mode === 'pdf') {
      setExamFormMode('pdf');
    } else if (existingCfg.exam_mode === 'bank') {
      setExamFormMode('bank');
    } else {
      setExamFormMode('bank');
    }

    // PDF state
    setPdfFileUrl(existingCfg.pdf_url || '');
    setPdfFileName(existingCfg.pdf_filename || '');
    const currentPdfKey = existingCfg.pdf_answer_key || {};
    setPdfAnswerMap(currentPdfKey);
    const count = existingCfg.pdf_total_questions || Object.keys(currentPdfKey).length || 40;
    setPdfTotalQ(count);

    const quickText = Object.entries(currentPdfKey)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([k, v]) => `${k}${v}`)
      .join(' ');
    setPdfQuickPasteText(quickText);
    setShowSamplePreview(false);

    setIsExamConfigModalOpen(true);
  };

  // Save Class basic info
  const handleSubmitClassForm = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = formCode.trim().toUpperCase();
    if (!cleanCode) {
      showToast('error', 'Vui lòng nhập Mã lớp');
      return;
    }
    if (!formPinCode.trim()) {
      showToast('error', 'Vui lòng đặt Mã PIN bài thi cho lớp');
      return;
    }

    if (!editingClass && classes.some((c) => c.code.toUpperCase() === cleanCode)) {
      showToast('error', `Mã lớp "${cleanCode}" đã tồn tại! Vui lòng chọn mã khác.`);
      return;
    }

    const updatedItem: ClassRoom = {
      id: editingClass ? editingClass.id : `cls_${Date.now()}`,
      code: cleanCode,
      name: formName.trim() || `Lớp ${cleanCode} - ${formSubject}`,
      grade: formGrade,
      subject: formSubject,
      teacherName: formTeacherName.trim(),
      pinCode: formPinCode.trim(),
      examTitle: editingClass?.examTitle || `Kiểm Tra ${formSubject} - ${cleanCode}`,
      examConfig: editingClass?.examConfig || {
        duration_minutes: 15,
        total_questions_to_pick: 10,
        target_grade: formGrade,
        target_subject: formSubject,
        target_term: 'Ôn tập thường xuyên',
        exam_mode: 'bank',
        distribution: {
          single_choice: 8,
          true_false: 2
        }
      },
      isActive: formIsActive,
      description: formDescription.trim(),
      createdAt: editingClass ? editingClass.createdAt : new Date().toISOString()
    };

    onSaveClass(updatedItem);
    setIsClassModalOpen(false);
    showToast('success', `Đã lưu lớp học: ${updatedItem.code} (${updatedItem.name})`);
  };

  // Save Exam Configuration for a Class
  const handleSaveExamConfigForClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetClassForExam) return;

    if (!examFormTitle.trim()) {
      showToast('error', 'Vui lòng nhập Tên bài kiểm tra của lớp!');
      return;
    }

    let updatedConfig: Partial<ExamConfig> = {};

    if (examFormMode === 'pdf') {
      if (Object.keys(pdfAnswerMap).length === 0) {
        showToast('error', 'Vui lòng cài đặt đáp án chuẩn cho đề thi PDF của lớp!');
        return;
      }
      updatedConfig = {
        ...targetClassForExam.examConfig,
        exam_mode: 'pdf',
        pdf_url: pdfFileUrl,
        pdf_filename: pdfFileName || 'De_thi_PDF_Lop_' + targetClassForExam.code + '.pdf',
        pdf_total_questions: pdfTotalQ,
        pdf_answer_key: pdfAnswerMap,
        duration_minutes: Number(examFormDuration)
      };
    } else if (examFormMode === 'bank') {
      const sc = Math.max(0, Number(examFormSingleChoiceCount) || 0);
      const tf = Math.max(0, Number(examFormTrueFalseCount) || 0);
      const totalQ = sc + tf;
      if (totalQ === 0) {
        showToast('error', 'Vui lòng chọn ít nhất 1 câu hỏi (Trắc nghiệm hoặc Đúng/Sai)!');
        return;
      }
      updatedConfig = {
        ...targetClassForExam.examConfig,
        exam_mode: 'bank',
        target_grade: targetClassForExam.grade,
        target_subject: targetClassForExam.subject,
        target_term: examFormTerm,
        duration_minutes: Number(examFormDuration) || 15,
        total_questions_to_pick: totalQ,
        distribution: {
          single_choice: sc,
          true_false: tf
        }
      };
    } else {
      // Default / Inherit from global config
      updatedConfig = {
        ...config,
        duration_minutes: Number(examFormDuration)
      };
    }

    const updatedClass: ClassRoom = {
      ...targetClassForExam,
      examTitle: examFormTitle.trim() || `Kiểm Tra ${targetClassForExam.subject} - Lớp ${targetClassForExam.code}`,
      pinCode: examFormPinCode.trim() || targetClassForExam.pinCode,
      examConfig: updatedConfig
    };

    onSaveClass(updatedClass);
    setIsExamConfigModalOpen(false);
    const totalCount = examFormSingleChoiceCount + examFormTrueFalseCount;
    showToast('success', `Đã ra đề thành công cho Lớp ${updatedClass.code} (${examFormMode === 'pdf' ? 'Đề PDF ' + pdfTotalQ + ' câu' : 'Ngân hàng ' + totalCount + ' câu (' + examFormSingleChoiceCount + ' TN + ' + examFormTrueFalseCount + ' Đúng/Sai)'})!`);
  };

  const handleToggleActive = (c: ClassRoom) => {
    const updated: ClassRoom = { ...c, isActive: !c.isActive };
    onSaveClass(updated);
    showToast('success', `${updated.isActive ? 'Đã MỞ phòng thi' : 'Đã ĐÓNG phòng thi'} cho lớp ${c.code}`);
  };

  const handleDelete = (c: ClassRoom) => {
    if (window.confirm(`Bạn có chắc muốn xóa lớp học "${c.code} - ${c.name}"?`)) {
      onDeleteClass(c.id);
      showToast('success', `Đã xóa lớp: ${c.code}`);
    }
  };

  const handleCopyInvitation = (c: ClassRoom) => {
    const origin = window.location.origin;
    const path = window.location.pathname;
    const examUrl = `${origin}${path}?class=${c.code}`;
    const text = `📢 THÔNG BÁO KIỂM TRA TRỰC TUYẾN
🏛️ Lớp học: ${c.name}
🔑 Mã lớp: ${c.code}
🔒 Mã PIN bài thi: ${c.pinCode}
📝 Tên bài thi: ${c.examTitle || c.name}
⏱️ Thời gian: ${c.examConfig?.duration_minutes || 15} phút
🌐 Link vào thi: ${examUrl}
⚠️ Yêu cầu: Học sinh nhập chính xác Họ tên, Mã lớp "${c.code}" và Mã PIN "${c.pinCode}" để vào bài thi.`;

    navigator.clipboard.writeText(text);
    setCopiedCode(c.code);
    showToast('success', `Đã sao chép thông tin thi lớp ${c.code} để gửi học sinh!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  // PDF file upload handler
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      showToast('error', 'Vui lòng chọn file định dạng PDF (.pdf)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPdfFileUrl(dataUrl);
      setPdfFileName(file.name);
      showToast('success', `Đã tải file PDF: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Quick answer key setter with toggle support
  const handleSetAnswerKey = (qNum: number, letter: string) => {
    setPdfAnswerMap((prev) => {
      const next = { ...prev };
      const key = String(qNum);
      if (next[key] === letter) {
        delete next[key];
      } else {
        next[key] = letter;
      }
      const quickText = Object.entries(next)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([k, v]) => `${k}${v}`)
        .join(' ');
      setPdfQuickPasteText(quickText);
      return next;
    });
  };

  // Quick paste text parser
  const handleApplyQuickPaste = () => {
    if (!pdfQuickPasteText.trim()) return;
    const parsed = parseAnswerKeyString(pdfQuickPasteText, pdfTotalQ);
    const count = Object.keys(parsed).length;
    if (count > 0) {
      setPdfAnswerMap(parsed);
      showToast('success', `Đã nhận dạng và nạp ${count} đáp án chuẩn thành công!`);
    } else {
      showToast('error', 'Không nhận dạng được đáp án. Ví dụ hợp lệ: "1A 2B 3C 4D" hoặc "ABCDABCD..."');
    }
  };

  // Count available questions in bank for the target class
  const availableBankQuestionsForTarget = useMemo(() => {
    if (!targetClassForExam) return [];
    return bank.filter((q) => {
      const info = getQuestionClassification(q);
      const matchGrade = !targetClassForExam.grade || info.grade === targetClassForExam.grade;
      const matchSubject = !targetClassForExam.subject || info.subject === targetClassForExam.subject;
      const matchTerm = !examFormTerm || examFormTerm === 'all' || info.term === examFormTerm;
      return matchGrade && matchSubject && matchTerm;
    });
  }, [bank, targetClassForExam, examFormTerm]);

  const availableSingleChoiceQuestions = useMemo(() => {
    return availableBankQuestionsForTarget.filter((q) => q.type === 'single_choice');
  }, [availableBankQuestionsForTarget]);

  const availableTrueFalseQuestions = useMemo(() => {
    return availableBankQuestionsForTarget.filter((q) => q.type === 'true_false');
  }, [availableBankQuestionsForTarget]);

  const filteredClasses = classes.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.grade.toLowerCase().includes(q);

    const matchesSubject = selectedSubjectFilter === 'all' || c.subject === selectedSubjectFilter;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-20 right-6 z-50 p-3.5 px-5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce ${
            toastMessage.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 text-white'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Control Banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <School className="w-5 h-5 text-indigo-600" />
            <span>Quản Lý Lớp Học & Ra Đề Phòng Thi Riêng</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Mỗi lớp học sở hữu mã PIN bài thi riêng và cấu hình đề thi độc lập (Đề Ngân hàng hoặc Đề PDF).
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddClass}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tạo Lớp Học Mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo mã lớp (7A1, 10A1), tên lớp..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            <option value="all">Tất cả môn học ({classes.length} lớp)</option>
            {KNOWN_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500">
          Hiển thị: <strong className="text-indigo-600">{filteredClasses.length}</strong> lớp học
        </span>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((c) => {
          const isCopied = copiedCode === c.code;
          const isPdfMode = c.examConfig?.exam_mode === 'pdf';
          const qCount = isPdfMode
            ? c.examConfig?.pdf_total_questions || (c.examConfig?.pdf_answer_key ? Object.keys(c.examConfig.pdf_answer_key).length : 40)
            : c.examConfig?.total_questions_to_pick || 10;
          const hasPdfKey = isPdfMode && Boolean(c.examConfig?.pdf_answer_key && Object.keys(c.examConfig.pdf_answer_key).length > 0);

          return (
            <div
              key={c.id}
              className={`p-5 rounded-3xl bg-white border transition-all shadow-xs space-y-4 ${
                c.isActive
                  ? 'border-indigo-200 hover:border-indigo-400 ring-1 ring-indigo-50'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center shadow-sm shrink-0">
                    {c.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          c.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${c.isActive ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
                        {c.isActive ? 'Đang mở thi' : 'Đã khóa'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-indigo-700">{c.subject}</span>
                      <span>•</span>
                      <span>{c.grade}</span>
                      {c.teacherName && (
                        <>
                          <span>•</span>
                          <span>GV: {c.teacherName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(c)}
                    title={c.isActive ? 'Khóa phòng thi lớp này' : 'Mở phòng thi lớp này'}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      c.isActive
                        ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditClass(c)}
                    title="Chỉnh sửa thông tin lớp học"
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(c)}
                    title="Xóa lớp học"
                    className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 🌟 VÙNG THÔNG TIN ĐỀ THI ĐƯỢC THIẾT KẾ LẠI TRỰC QUAN */}
              <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Bài thi: {c.examTitle || c.name}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-500" />
                    {c.examConfig?.duration_minutes || 15} phút
                  </span>
                </div>

                {/* Badges: Exam Mode & Readiness */}
                <div className="flex flex-wrap items-center gap-2">
                  {isPdfMode ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Đề Thi PDF ({qCount} câu)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Đề Ngân Hàng ({qCount} câu ngẫu nhiên)</span>
                    </span>
                  )}

                  {isPdfMode && hasPdfKey ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                      <Check className="w-3 h-3" /> Đã cài đáp án chuẩn
                    </span>
                  ) : isPdfMode && !hasPdfKey ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold">
                      <AlertCircle className="w-3 h-3" /> Chưa cài đáp án
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                      <Check className="w-3 h-3" /> Sẵn sàng xáo đề
                    </span>
                  )}
                </div>

                {/* PIN Code Highlight Banner */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-indigo-200 text-indigo-950 font-mono">
                  <div className="flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-indigo-700" />
                    <span className="text-[11px] font-sans font-semibold text-indigo-800">Mã PIN thi:</span>
                    <span className="text-sm font-extrabold tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-indigo-900">
                      {c.pinCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyInvitation(c)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Đã chép' : 'Sao chép gửi HS'}</span>
                  </button>
                </div>
              </div>

              {/* 🌟 NÚT RA ĐỀ RIÊNG NỔI BẬT & TRỰC QUAN */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleOpenExamConfig(c)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Ra Đề & Cấu Hình Bài Thi Lớp {c.code}</span>
                </button>

                <div className="flex items-center justify-end gap-2">
                  {onViewClassSubmissions && (
                    <button
                      type="button"
                      onClick={() => onViewClassSubmissions(c.code)}
                      className="text-slate-600 hover:text-indigo-700 font-semibold px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Bảng điểm →
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onLaunchClassExam(c)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Thi thử</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredClasses.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <School className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">Chưa có lớp học nào khớp với tìm kiếm</h4>
          <p className="text-xs text-slate-500">Bấm nút "Tạo Lớp Học Mới" bên trên để tạo phòng thi riêng cho học sinh.</p>
        </div>
      )}

      {/* 🌟 MODAL 1: TẠO / SỬA THÔNG TIN LỚP HỌC */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 animate-fadeIn my-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingClass ? `Chỉnh Sửa Lớp ${editingClass.code}` : 'Tạo Lớp Học Mới'}
                  </h3>
                  <p className="text-xs text-slate-500">Quản lý định danh lớp, môn học và giáo viên phụ trách</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsClassModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitClassForm} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mã Lớp Học <span className="text-rose-500">* (HS điền chính xác)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                    placeholder="VD: 7A1, 10A1"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold uppercase focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mã PIN bài thi <span className="text-rose-500">* (Bảo mật thi)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formPinCode}
                    onChange={(e) => setFormPinCode(e.target.value)}
                    placeholder="VD: 2026, 1234"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tên hiển thị của lớp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="VD: Lớp 7A1 - Tin Học 7"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Khối Lớp</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 font-medium"
                  >
                    {KNOWN_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Môn Học</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 font-medium"
                  >
                    {KNOWN_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Giáo viên phụ trách</label>
                <input
                  type="text"
                  value={formTeacherName}
                  onChange={(e) => setFormTeacherName(e.target.value)}
                  placeholder="Thầy Nguyễn Văn Nam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mô tả / Ghi chú</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="VD: Kiểm tra định kì tuần 24"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="font-semibold text-slate-800 cursor-pointer">
                  Mở phòng thi ngay (Cho phép học sinh đăng nhập)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  Lưu Thông Tin Lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🌟 MODAL 2: GIAO DIỆN RA ĐỀ THI CHO LỚP ĐƯỢC THIẾT KẾ LẠI TOÀN DIỆN (INTUITIVE EXAM BUILDER) */}
      {isExamConfigModalOpen && targetClassForExam && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 animate-fadeIn my-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-sm shrink-0">
                  {targetClassForExam.code}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>Ra Đề Thi Cho Lớp:</span>
                    <span className="text-indigo-600">{targetClassForExam.name}</span>
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                    <span>Môn: <strong>{targetClassForExam.subject}</strong></span>
                    <span>•</span>
                    <span>Khối: <strong>{targetClassForExam.grade}</strong></span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExamConfigModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExamConfigForClass} className="space-y-4 text-xs">
              {/* Tiêu đề bài kiểm tra */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-800">
                    Tên bài kiểm tra của lớp <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (!targetClassForExam) return;
                      setExamFormTitle(`${config.title} - ${targetClassForExam.code}`);
                      setExamFormDuration(config.duration_minutes || 15);
                      if (config.exam_mode === 'pdf') {
                        setExamFormMode('pdf');
                        setPdfFileUrl(config.pdf_url || '');
                        setPdfFileName(config.pdf_filename || '');
                        setPdfTotalQ(config.pdf_total_questions || 40);
                        setPdfAnswerMap(config.pdf_answer_key || {});
                      } else {
                        setExamFormMode('bank');
                        const sc = config.distribution?.single_choice || 16;
                        const tf = config.distribution?.true_false || 4;
                        setExamFormSingleChoiceCount(sc);
                        setExamFormTrueFalseCount(tf);
                        setExamFormQuestionCount(config.total_questions_to_pick || (sc + tf));
                      }
                      showToast('success', 'Đã sao chép cấu hình từ Đề Thi Chung sang lớp này!');
                    }}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Lấy cấu hình từ Đề Thi Chung</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={examFormTitle}
                  onChange={(e) => setExamFormTitle(e.target.value)}
                  placeholder="VD: Kiểm Tra Giữa Kì Tin Học 7 - Lớp 7A1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 focus:bg-white text-xs"
                />
              </div>

              {/* 3 THẺ CHỌN HÌNH THỨC RA ĐỀ TRỰC QUAN */}
              <div>
                <label className="block font-bold text-slate-800 mb-2">
                  Chọn hình thức ra đề:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Ngân Hàng Câu Hỏi */}
                  <div
                    onClick={() => setExamFormMode('bank')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      examFormMode === 'bank'
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {examFormMode === 'bank' && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <span>1. Ngân Hàng Câu Hỏi</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Tự động bốc ngẫu nhiên câu hỏi từ kho, xáo trộn thứ tự câu và đáp án chống gian lận.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 font-semibold text-indigo-700 text-[11px] flex items-center justify-between">
                      <span>Kho: <strong>{availableBankQuestionsForTarget.length} câu</strong> {targetClassForExam.subject} {targetClassForExam.grade}</span>
                      <span className="text-[10px] text-slate-500 font-normal">({availableSingleChoiceQuestions.length} TN • {availableTrueFalseQuestions.length} Đúng/Sai)</span>
                    </div>
                  </div>

                  {/* Option 2: Đề Thi PDF */}
                  <div
                    onClick={() => setExamFormMode('pdf')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      examFormMode === 'pdf'
                        ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {examFormMode === 'pdf' && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                    <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>2. Tải File Đề Thi (PDF)</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      Tải lên file PDF đề thi scan/soạn sẵn, học sinh xem đề PDF và tô phiếu trả lời A, B, C, D.
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 font-semibold text-purple-700 text-[11px]">
                      {pdfFileName ? `File: ${pdfFileName}` : 'Chưa tải file PDF'}
                    </div>
                  </div>
                </div>
              </div>

              {/* KHỐI CẤU HÌNH CHI TIẾT THEO HÌNH THỨC ĐÃ CHỌN */}
              {examFormMode === 'bank' && (
                <div className="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-950 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Cấu hình cơ cấu bốc đề từ Ngân hàng:
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSamplePreview(!showSamplePreview)}
                      className="text-indigo-700 font-bold hover:underline flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{showSamplePreview ? 'Ẩn xem trước' : 'Xem trước câu hỏi mẫu'}</span>
                    </button>
                  </div>

                  {/* Dòng 1: Đợt thi & Thời gian làm bài */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Đợt thi / Học kỳ nguồn
                      </label>
                      <select
                        value={examFormTerm}
                        onChange={(e) => setExamFormTerm(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:border-indigo-600 cursor-pointer text-xs"
                      >
                        <option value="all">Tất cả đợt thi</option>
                        {KNOWN_TERMS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Kho có tổng cộng {availableBankQuestionsForTarget.length} câu phù hợp
                      </span>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Thời gian làm bài (phút)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={180}
                        value={examFormDuration}
                        onChange={(e) => setExamFormDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-indigo-600 text-xs"
                      />
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        Tiêu chuẩn 15 phút (kiểm tra 15p) hoặc 45 phút
                      </span>
                    </div>
                  </div>

                  {/* Dòng 2: Cơ cấu bốc 2 dạng câu hỏi (Trắc nghiệm đơn & Đúng/Sai) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Card 1: Trắc nghiệm A-B-C-D */}
                    <div className="p-3.5 rounded-xl bg-white border border-indigo-200 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black">I</span>
                          <span>1. Trắc nghiệm A-B-C-D</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-[10px] font-semibold text-indigo-700">
                          Kho có {availableSingleChoiceQuestions.length} câu
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={availableSingleChoiceQuestions.length}
                            value={examFormSingleChoiceCount}
                            onChange={(e) => setExamFormSingleChoiceCount(Math.max(0, Number(e.target.value)))}
                            className="w-24 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-indigo-950 font-black text-sm focus:outline-none focus:border-indigo-600"
                          />
                          <span className="text-xs text-slate-600 font-medium">câu chọn 1 đáp án</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 text-[10px]">
                        <span className="text-slate-400">Chọn nhanh:</span>
                        {[0, 10, 12, 16, 20, availableSingleChoiceQuestions.length].filter((n, idx, arr) => n <= availableSingleChoiceQuestions.length && arr.indexOf(n) === idx).map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setExamFormSingleChoiceCount(n)}
                            className={`px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                              examFormSingleChoiceCount === n
                                ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {n === availableSingleChoiceQuestions.length ? `Tất cả (${n})` : `${n} câu`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card 2: Trắc nghiệm Đúng/Sai */}
                    <div className="p-3.5 rounded-xl bg-white border border-purple-200 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black">II</span>
                          <span>2. Trắc nghiệm Đúng / Sai</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200 text-[10px] font-semibold text-purple-700">
                          Kho có {availableTrueFalseQuestions.length} câu
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={availableTrueFalseQuestions.length}
                            value={examFormTrueFalseCount}
                            onChange={(e) => setExamFormTrueFalseCount(Math.max(0, Number(e.target.value)))}
                            className="w-24 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-purple-950 font-black text-sm focus:outline-none focus:border-purple-600"
                          />
                          <span className="text-xs text-slate-600 font-medium">câu chùm ý (a, b, c, d)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 text-[10px]">
                        <span className="text-slate-400">Chọn nhanh:</span>
                        {[0, 2, 4, 6, availableTrueFalseQuestions.length].filter((n, idx, arr) => n <= availableTrueFalseQuestions.length && arr.indexOf(n) === idx).map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setExamFormTrueFalseCount(n)}
                            className={`px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                              examFormTrueFalseCount === n
                                ? 'bg-purple-600 text-white border-purple-600 font-bold'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {n === availableTrueFalseQuestions.length ? `Tất cả (${n})` : `${n} câu`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dòng 3: Thanh tổng kết cấu hình đề thi */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-semibold text-slate-800">
                        Tổng cộng đề thi bốc cho học sinh: <strong className="text-indigo-700 text-sm font-black">{examFormSingleChoiceCount + examFormTrueFalseCount} câu</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">{examFormSingleChoiceCount} câu A-B-C-D</span>
                      <span>+</span>
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">{examFormTrueFalseCount} câu Đúng/Sai ({examFormTrueFalseCount * 4} ý)</span>
                    </div>
                  </div>

                  {/* Sample questions preview */}
                  {showSamplePreview && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white border border-indigo-200 space-y-3 max-h-60 overflow-y-auto">
                      <div className="font-bold text-slate-800 text-xs flex items-center justify-between border-b pb-2">
                        <span>Mẫu câu hỏi ngẫu nhiên sẽ được bốc:</span>
                        <span className="text-[11px] text-slate-500">Mỗi học sinh sẽ có mã đề và thứ tự xáo trộn riêng</span>
                      </div>

                      {/* Sample Single Choice */}
                      {availableSingleChoiceQuestions.length > 0 && examFormSingleChoiceCount > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                            Mẫu Trắc nghiệm 4 lựa chọn A-B-C-D:
                          </span>
                          {availableSingleChoiceQuestions.slice(0, 2).map((q, i) => (
                            <div key={q.id} className="p-2.5 rounded-lg bg-indigo-50/40 border border-indigo-200 text-xs space-y-1">
                              <div className="font-semibold text-slate-900">
                                <strong>Câu {i + 1}:</strong> <MathRenderer text={q.prompt} />
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 pl-2">
                                {q.options.map((opt, oIdx) => (
                                  <div key={opt.id} className="truncate">
                                    {['A', 'B', 'C', 'D'][oIdx]}. {opt.text}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Sample True/False */}
                      {availableTrueFalseQuestions.length > 0 && examFormTrueFalseCount > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">
                            Mẫu Trắc nghiệm Đúng / Sai (Chùm 4 ý):
                          </span>
                          {availableTrueFalseQuestions.slice(0, 1).map((q, i) => (
                            <div key={q.id} className="p-2.5 rounded-lg bg-purple-50/40 border border-purple-200 text-xs space-y-1.5">
                              <div className="font-semibold text-slate-900">
                                <strong>Câu {i + 1}:</strong> <MathRenderer text={q.prompt} />
                              </div>
                              <div className="space-y-1 pl-2 text-[11px]">
                                {q.items.map((item, itemIdx) => (
                                  <div key={item.id} className="flex items-center justify-between bg-white p-1 rounded border border-purple-100">
                                    <span>{['a', 'b', 'c', 'd'][itemIdx]}) {item.text}</span>
                                    <span className="font-bold text-[10px] text-purple-700 px-1.5 py-0.2 bg-purple-50 rounded">Đúng / Sai</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {examFormMode === 'pdf' && (
                <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200 space-y-3.5">
                  <div className="font-bold text-purple-950 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Cấu hình file đề thi & Đáp án chuẩn:</span>
                  </div>

                  {/* File Upload Zone */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-dashed border-purple-300 text-center space-y-2">
                    <UploadCloud className="w-8 h-8 mx-auto text-purple-600" />
                    <div className="text-xs font-semibold text-slate-800">
                      {pdfFileName ? (
                        <span className="text-purple-700 font-bold">📄 Đã chọn: {pdfFileName}</span>
                      ) : (
                        <span>Chọn hoặc kéo thả file đề thi PDF cho lớp này</span>
                      )}
                    </div>
                    <label className="inline-block px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors">
                      <span>{pdfFileName ? 'Đổi file PDF khác' : 'Tải file PDF lên'}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Total questions and duration */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Số câu trắc nghiệm (Phiếu làm bài)
                      </label>
                      <select
                        value={pdfTotalQ}
                        onChange={(e) => setPdfTotalQ(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-purple-600"
                      >
                        <option value={10}>10 câu</option>
                        <option value={15}>15 câu</option>
                        <option value={20}>20 câu</option>
                        <option value={25}>25 câu</option>
                        <option value={30}>30 câu</option>
                        <option value={40}>40 câu (Chuẩn thi TN)</option>
                        <option value={50}>50 câu</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Thời gian làm bài (phút)
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={180}
                        value={examFormDuration}
                        onChange={(e) => setExamFormDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  {/* Quick Paste Answer Key Bar */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nhập nhanh đáp án chuẩn (Dán chuỗi đáp án):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pdfQuickPasteText}
                        onChange={(e) => setPdfQuickPasteText(e.target.value)}
                        placeholder="VD: 1A 2B 3C 4D... hoặc ABCDABCD..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-purple-600"
                      />
                      <button
                        type="button"
                        onClick={handleApplyQuickPaste}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
                      >
                        Nạp đáp án
                      </button>
                    </div>
                  </div>

                  {/* Interactive Answer Matrix Grid */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span>Bảng tô đáp án chuẩn ({Object.keys(pdfAnswerMap).length}/{pdfTotalQ} câu đã cài):</span>
                      {Object.keys(pdfAnswerMap).length === pdfTotalQ && (
                        <span className="text-emerald-600 flex items-center gap-0.5">
                          <Check className="w-3.5 h-3.5" /> Đầy đủ {pdfTotalQ} đáp án
                        </span>
                      )}
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-purple-200 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                      {Array.from({ length: pdfTotalQ }, (_, i) => i + 1).map((qNum) => {
                        const selectedLetter = pdfAnswerMap[String(qNum)];
                        return (
                          <div
                            key={qNum}
                            className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                          >
                            <span className="font-bold text-[11px] text-slate-600 pl-1">
                              {qNum}.
                            </span>
                            <div className="flex items-center gap-0.5">
                              {['A', 'B', 'C', 'D'].map((letter) => (
                                <button
                                  key={letter}
                                  type="button"
                                  onClick={() => handleSetAnswerKey(qNum, letter)}
                                  className={`w-5 h-5 rounded-md font-mono font-bold text-[10px] cursor-pointer transition-all ${
                                    selectedLetter === letter
                                      ? 'bg-purple-600 text-white shadow-2xs'
                                      : 'hover:bg-slate-200 text-slate-600'
                                  }`}
                                >
                                  {letter}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Mã PIN phòng thi */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Mã PIN bảo mật bài thi cho lớp này
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={examFormPinCode}
                    onChange={(e) => setExamFormPinCode(e.target.value)}
                    placeholder="Mã PIN 4 số (VD: 2026)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Học sinh phải nhập chính xác mã PIN này khi vào phòng thi của lớp {targetClassForExam.code}.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsExamConfigModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-sm transition-all cursor-pointer"
                >
                  Lưu & Áp Dụng Đề Thi Cho Lớp {targetClassForExam.code}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
