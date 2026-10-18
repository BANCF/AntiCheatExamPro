import React, { useState } from 'react';
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
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { KNOWN_GRADES, KNOWN_SUBJECTS } from '../../utils/questionClassification';

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

export const ClassManagementTab: React.FC<ClassManagementTabProps> = ({
  classes,
  config,
  currentTeacher,
  onSaveClass,
  onDeleteClass,
  onLaunchClassExam,
  onViewClassSubmissions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formGrade, setFormGrade] = useState('Lớp 7');
  const [formSubject, setFormSubject] = useState(currentTeacher?.subject && currentTeacher.subject !== 'Tất cả' ? currentTeacher.subject : 'Tin học');
  const [formTeacherName, setFormTeacherName] = useState(currentTeacher?.fullName || 'Thầy/Cô Giáo Viên');
  const [formPinCode, setFormPinCode] = useState('');
  const [formExamTitle, setFormExamTitle] = useState('');
  const [formDuration, setFormDuration] = useState(config.duration_minutes || 15);
  const [formTotalQuestions, setFormTotalQuestions] = useState(config.total_questions_to_pick || 10);
  const [formExamMode, setFormExamMode] = useState<'bank' | 'pdf'>(config.exam_mode || 'bank');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formDescription, setFormDescription] = useState('');

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingClass(null);
    setFormCode('');
    setFormName('');
    setFormGrade('Lớp 7');
    setFormSubject(currentTeacher?.subject && currentTeacher.subject !== 'Tất cả' ? currentTeacher.subject : 'Tin học');
    setFormTeacherName(currentTeacher?.fullName || 'Thầy/Cô Giáo Viên');
    setFormPinCode(String(1000 + Math.floor(Math.random() * 9000)));
    setFormExamTitle('');
    setFormDuration(config.duration_minutes || 15);
    setFormTotalQuestions(config.total_questions_to_pick || 10);
    setFormExamMode(config.exam_mode || 'bank');
    setFormIsActive(true);
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: ClassRoom) => {
    setEditingClass(c);
    setFormCode(c.code);
    setFormName(c.name);
    setFormGrade(c.grade || 'Lớp 7');
    setFormSubject(c.subject || 'Tin học');
    setFormTeacherName(c.teacherName || currentTeacher?.fullName || '');
    setFormPinCode(c.pinCode);
    setFormExamTitle(c.examTitle || '');
    setFormDuration(c.examConfig?.duration_minutes || config.duration_minutes || 15);
    setFormTotalQuestions(c.examConfig?.total_questions_to_pick || config.total_questions_to_pick || 10);
    setFormExamMode(c.examConfig?.exam_mode || config.exam_mode || 'bank');
    setFormIsActive(c.isActive);
    setFormDescription(c.description || '');
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
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

    // Check duplicate code if adding new
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
      examTitle: formExamTitle.trim() || `Kiểm Tra ${formSubject} - ${cleanCode}`,
      examConfig: {
        duration_minutes: Number(formDuration),
        total_questions_to_pick: Number(formTotalQuestions),
        target_grade: formGrade,
        target_subject: formSubject,
        exam_mode: formExamMode
      },
      isActive: formIsActive,
      description: formDescription.trim(),
      createdAt: editingClass ? editingClass.createdAt : new Date().toISOString()
    };

    onSaveClass(updatedItem);
    setIsModalOpen(false);
    showToast('success', `Đã lưu cấu hình lớp: ${updatedItem.code} (${updatedItem.name})`);
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

  const filteredClasses = classes.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchQuery =
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      (c.examTitle && c.examTitle.toLowerCase().includes(q));
    const matchSubject = selectedSubjectFilter === 'all' || c.subject === selectedSubjectFilter;
    return matchQuery && matchSubject;
  });

  const activeCount = classes.filter((c) => c.isActive).length;

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold shadow-lg transition-all animate-fadeIn ${
            toastMessage.type === 'success'
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border border-rose-300 text-rose-800'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <School className="w-3.5 h-3.5" />
            QUẢN LÝ LỚP HỌC & MÃ PIN BÀI THI RIÊNG BIỆT
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">Phòng Thi Riêng Theo Từng Lớp</h2>
          <p className="text-xs sm:text-sm text-indigo-200/80 max-w-2xl">
            Tạo mã lớp chính xác (VD: <strong>7A1</strong>, <strong>10A1</strong>). Học sinh điền đúng mã lớp để nhận diện. 
            Mỗi lớp có <strong>Mã PIN bảo mật riêng</strong> và <strong>bài thi riêng biệt</strong>, kiểm soát mở/đóng thi tức thời.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-900 text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-indigo-600" />
          <span>Tạo Lớp & Bài Thi Mới</span>
        </button>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Tổng số lớp học</div>
            <div className="text-2xl font-bold text-slate-900">{classes.length} lớp</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <School className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Phòng thi đang mở (Active)</div>
            <div className="text-2xl font-bold text-emerald-600">{activeCount} lớp</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Power className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-medium">Phòng thi đang đóng (Khóa)</div>
            <div className="text-2xl font-bold text-slate-600">{classes.length - activeCount} lớp</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã lớp (7A1), tên bài thi, môn..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium shrink-0">Lọc môn:</span>
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-600 cursor-pointer"
          >
            <option value="all">Tất cả bộ môn</option>
            {KNOWN_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((c) => {
          const isCopied = copiedCode === c.code;
          return (
            <div
              key={c.id}
              className={`p-5 rounded-2xl bg-white border transition-all shadow-xs space-y-4 ${
                c.isActive
                  ? 'border-indigo-200 hover:border-indigo-400 ring-1 ring-indigo-100'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold text-base flex items-center justify-center shadow-sm">
                    {c.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{c.name}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                    onClick={() => handleOpenEdit(c)}
                    title="Chỉnh sửa thông tin và bài thi"
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

              {/* Class Specific Exam Details Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Bài thi: {c.examTitle || c.name}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-500" />
                    {c.examConfig?.duration_minutes || 15} phút
                  </span>
                </div>

                {/* PIN Code Highlight Banner */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-50/70 border border-indigo-200 text-indigo-950 font-mono">
                  <div className="flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-indigo-700" />
                    <span className="text-[11px] font-sans font-semibold text-indigo-800">Mã PIN bài thi:</span>
                    <span className="text-sm font-extrabold tracking-wider bg-white px-2 py-0.5 rounded border border-indigo-300 text-indigo-900">
                      {c.pinCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyInvitation(c)}
                    className="px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Đã sao chép' : 'Sao chép gửi HS'}</span>
                  </button>
                </div>

                {c.description && (
                  <p className="text-[11px] text-slate-500 italic">{c.description}</p>
                )}
              </div>

              {/* Card Action Footer */}
              <div className="flex items-center justify-between pt-1 text-xs">
                {onViewClassSubmissions ? (
                  <button
                    type="button"
                    onClick={() => onViewClassSubmissions(c.code)}
                    className="text-slate-600 hover:text-indigo-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Xem bảng điểm lớp {c.code} →</span>
                  </button>
                ) : (
                  <span className="text-slate-400 text-[11px]">Mã định danh: {c.code}</span>
                )}

                <button
                  type="button"
                  onClick={() => onLaunchClassExam(c)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Vào thi thử lớp {c.code}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredClasses.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
          <School className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">Chưa có lớp học nào khớp với tìm kiếm</h4>
          <p className="text-xs text-slate-500">Bấm nút "Tạo Lớp & Bài Thi Mới" bên trên để tạo phòng thi riêng cho học sinh.</p>
        </div>
      )}

      {/* Add / Edit Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-4 animate-fadeIn my-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingClass ? `Chỉnh Sửa Lớp ${editingClass.code}` : 'Tạo Lớp Học & Bài Thi Mới'}
                  </h3>
                  <p className="text-xs text-slate-500">Học sinh phải điền đúng mã lớp và mã PIN này để vào thi</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-3.5 text-xs">
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
                    placeholder="VD: 7A1, 7A2, 10A1..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-600 uppercase"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mã PIN bài thi của lớp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formPinCode}
                    onChange={(e) => setFormPinCode(e.target.value)}
                    placeholder="VD: 2026, 1234..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-indigo-700 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tên hiển thị lớp học <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ví dụ: Lớp 7A1 - Năm học 2025-2026"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Khối Lớp</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    {KNOWN_GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bộ Môn</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-indigo-600"
                  >
                    {KNOWN_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Exam for this class */}
              <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <div className="font-bold text-indigo-900 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cấu hình bài thi riêng cho lớp này:</span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tên bài kiểm tra của lớp
                  </label>
                  <input
                    type="text"
                    value={formExamTitle}
                    onChange={(e) => setFormExamTitle(e.target.value)}
                    placeholder="VD: Kiểm Tra 15 Phút Tin Học 7 - Lớp 7A1"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Thời gian (phút)</label>
                    <input
                      type="number"
                      min={5}
                      max={180}
                      value={formDuration}
                      onChange={(e) => setFormDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Số câu hỏi</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formTotalQuestions}
                      onChange={(e) => setFormTotalQuestions(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Hình thức</label>
                    <select
                      value={formExamMode}
                      onChange={(e) => setFormExamMode(e.target.value as 'bank' | 'pdf')}
                      className="w-full px-2 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 font-medium"
                    >
                      <option value="bank">Ngân hàng</option>
                      <option value="pdf">Đề PDF</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Giáo viên phụ trách
                </label>
                <input
                  type="text"
                  value={formTeacherName}
                  onChange={(e) => setFormTeacherName(e.target.value)}
                  placeholder="Thầy Nguyễn Văn Nam"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Mô tả / Ghi chú phòng thi
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="VD: Kiểm tra định kì tuần 24, yêu cầu bật toàn màn hình"
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
                  Mở phòng thi ngay (Cho phép học sinh đăng nhập và làm bài)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                >
                  Lưu Lớp & Phòng Thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
