import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  UserCheck, 
  LogOut, 
  LogIn, 
  PlusCircle, 
  History, 
  XCircle, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Microscope, 
  Sparkles,
  Info,
  User, 
  Shield, 
  BarChart3, 
  RefreshCw, 
  MapPin, 
  Tag, 
  Wrench, 
  Ban, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  Settings, 
  DollarSign, 
  FileSpreadsheet, 
  Download, 
  PieChart, 
  FileDown, 
  Phone,
  Users,
  GraduationCap,
  Briefcase
} from 'lucide-react';

// --- GOOGLE APPS SCRIPT API URL ---
const API_URL = "https://script.google.com/macros/s/AKfycbxUVVKzosNHXY_xdrQV_LUbq2yV1SuVWPL9_9b7CuGCS9LvNyktoJOiS9i9BDokHe0/exec";

// --- INITIAL FALLBACK DATA ---
const FALLBACK_EQUIPMENT = [
  { id: 'eq-1', name: 'Thermal Cycler / PCR (Bio-Rad T100)', category: 'Molecular Biology', code: '6008-0720-1000-001', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 300, status: 'Available', image: '/eq-1.jpg', description: 'เครื่องเพิ่มปริมาณสารพันธุกรรม (S/N: 621-BR-26902)', specifications: 'Bio-Rad T100, S/N: 621-BR-26902', totalHoursUsed: 45, maintenanceThresholdHours: 200 },
  { id: 'eq-2', name: 'NanoDrop Spectrophotometer (Hercuvan)', category: 'Biochemistry & Molecular', code: 'EQ-MS302-002', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 250, status: 'Available', image: '/eq-2.jpg', description: 'Spectrophotometer วัดความเข้มข้น DNA/RNA ปริมาณน้อย', specifications: 'Hercuvan Microvolume Spectrophotometer', totalHoursUsed: 30, maintenanceThresholdHours: 150 },
  { id: 'eq-3', name: 'Real-Time qPCR System (QuantStudio 5)', category: 'Molecular Biology', code: '6008-0146-0100-0001', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 1000, status: 'Available', image: '/eq-3.jpg', description: 'เครื่องเพิ่มปริมาณสารพันธุกรรมแบบ Real-time', specifications: 'Thermo Fisher QuantStudio 5', totalHoursUsed: 80, maintenanceThresholdHours: 200 },
  { id: 'eq-4', name: 'Freeze Dryer (Labconco)', category: 'Sample Preparation', code: '6408-0127-7000-01', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 500, status: 'Maintenance', image: '/eq-4.jpg', description: 'เครื่องทำสารให้แห้งภายใต้อุณหภูมิต่ำ', specifications: 'Labconco Freeze Dryer', totalHoursUsed: 190, maintenanceThresholdHours: 200 },
  { id: 'eq-5', name: 'Freeze Dryer (Christ Alpha 2-4 LSC)', category: 'Sample Preparation', code: 'พท.6408-0127-7000-002', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 500, status: 'Available', image: '/eq-5.jpg', description: 'เครื่องทำสารให้แห้งภายใต้อุณหภูมิต่ำ', specifications: 'Christ Alpha 2-4 LSC', totalHoursUsed: 60, maintenanceThresholdHours: 200 },
  { id: 'eq-6', name: 'UFLC / HPLC System (Shimadzu)', category: 'Analytical Chemistry', code: '6008-0630-1000-003', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 800, status: 'Available', image: '/eq-6.jpg', description: 'เครื่องวิเคราะห์และแยกสารชนิดเหลวให้บริสุทธิ์', specifications: 'Shimadzu HPLC System', totalHoursUsed: 110, maintenanceThresholdHours: 250 },
  { id: 'eq-7', name: 'FPLC Protein Purification System (GE ÄKTA start)', category: 'Biochemistry & Protein', code: '6008-1060-7000-001', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 750, status: 'Available', image: '/eq-7.jpg', description: 'เครื่องวิเคราะห์และแยกโปรตีนให้บริสุทธิ์', specifications: 'GE ÄKTA start FPLC System', totalHoursUsed: 75, maintenanceThresholdHours: 200 },
  { id: 'eq-8', name: 'Rotary Evaporator (KNF)', category: 'Sample Extraction', code: 'EQ-MS302-008', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 350, status: 'Available', image: '/eq-8.jpg', description: 'เครื่องระเหยสารสกัด', specifications: 'KNF Rotary Evaporator System', totalHoursUsed: 40, maintenanceThresholdHours: 150 },
  { id: 'eq-9', name: 'Centrifuge (Eppendorf)', category: 'General Lab Equipment', code: '6008-0631-3000-005', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 200, status: 'Available', image: '/eq-9.jpg', description: 'เครื่องปั่นเหวี่ยงตกตะกอนสาร', specifications: 'Eppendorf Centrifuge 5810/5810 R', totalHoursUsed: 95, maintenanceThresholdHours: 200 },
  { id: 'eq-10', name: 'Microplate Reader (PerkinElmer)', category: 'Immunology & Assay', code: 'EQ-MS302-010', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 400, status: 'Available', image: '/eq-10.jpg', description: 'เครื่องวัดปริมาณสารทางด้านภูมิคุ้มกันวิทยา', specifications: 'PerkinElmer Microplate Reader', totalHoursUsed: 50, maintenanceThresholdHours: 150 },
  { id: 'eq-11', name: 'ChemiDoc Gel Imaging System (Bio-Rad)', category: 'Molecular & Gel Imaging', code: '6008-0124-0000-02', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 450, status: 'Available', image: '/eq-11.jpg', description: 'เครื่องถ่ายภาพเจลและบันทึกผลการทดลอง', specifications: 'Bio-Rad ChemiDoc System', totalHoursUsed: 85, maintenanceThresholdHours: 200 },
  { id: 'eq-12', name: 'ห้องปฏิบัติการเพาะเลี้ยงเซลล์ MS302/1', category: 'Laboratory Room', code: 'ROOM-MS302/1', location: 'ห้องปฏิบัติการ MS302/1', ratePerHour: 500, status: 'Available', image: '/eq-12.jpg', description: 'ห้องปฏิบัติการเพาะเลี้ยงเซลล์', specifications: 'Cell Culture Facility MS302/1', totalHoursUsed: 120, maintenanceThresholdHours: 500 },
  { id: 'eq-13', name: 'ห้องปฏิบัติการจุลชีววิทยาทางการแพทย์ MS408', category: 'Laboratory Room', code: 'ROOM-MS408', location: 'ห้องปฏิบัติการ MS408 ชั้น 4', ratePerHour: 500, status: 'Available', image: '/eq-13.jpg', description: 'ห้องปฏิบัติการเพาะเลี้ยงและทดสอบจุลชีพทางการแพทย์', specifications: 'Microbiology Lab MS408 Facility', totalHoursUsed: 140, maintenanceThresholdHours: 500 }
];

const formatThaiDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(amount || 0);
};
// 🌟 วางแทรกฟังก์ชัน getTodayThaiString ตรงนี้ครับ
const getTodayThaiString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 🌟 วางแทรกโค้ดข้อ 1 ต่อตรงนี้ครับ
const parseHour = (timeStr) => parseInt(timeStr.split(':')[0], 10);

const isBookingPast = (b) => {
  const todayStr = getTodayThaiString();
  const currentHour = new Date().getHours();
  const bStartHour = parseHour(b.startTime);
  
  if (b.date < todayStr) return true;
  if (b.date === todayStr && bStartHour <= currentHour) return true;
  return false;
};
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [equipmentList, setEquipmentList] = useState(FALLBACK_EQUIPMENT);
  const [bookings, setBookings] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [creditLogs, setCreditLogs] = useState([]);

  // 🌟 วางแทรก State ล็อกปุ่มกดซ้ำตรงนี้ครับ
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const [activeTab, setActiveTab] = useState('catalog');
  const [authMode, setAuthMode] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const [showAdminAuthModal, setShowAdminAuthModal] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');

  const [showAdjustCreditModal, setShowAdjustCreditModal] = useState(false);
  const [creditAdjustUser, setCreditAdjustUser] = useState(null);
  const [newCreditAmount, setNewCreditAmount] = useState(50000);
  const [creditAdjustReason, setCreditAdjustReason] = useState('');

  const [showAddEqModal, setShowAddEqModal] = useState(false);
  const [editingEq, setEditingEq] = useState(null);
  const [showAddMaintModal, setShowAddMaintModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const [profileForm, setProfileForm] = useState({ displayName: '', email: '', phone: '', userType: 'นิสิต', department: '', affiliationType: 'ภายในคณะสหเวชศาสตร์' });
 
  // ฟอร์มลงทะเบียนพร้อมรายการภาควิชา/สาขาวิชาทั้ง 9 ตัวเลือก
  const [registerForm, setRegisterForm] = useState({ 
    displayName: '', 
    email: '', 
    phone: '', 
    studentId: '', 
    userType: 'นิสิต', 
    department: 'สาขาวิทยาศาสตร์การแพทย์', 
    customDepartment: '',
    affiliationType: 'ภายในคณะสหเวชศาสตร์' 
  });
  
  const [bookingForm, setBookingForm] = useState({ equipmentId: '', date: new Date().toISOString().split('T')[0], startTime: '09:00', endTime: '11:00', purpose: '' });
  const [eqForm, setEqForm] = useState({ name: '', category: 'Molecular Biology', code: '', location: 'ห้องปฏิบัติการ MS302', ratePerHour: 300, status: 'Available', image: '/eq-1.jpg', description: '', specifications: '', maintenanceThresholdHours: 200 });
  const [maintForm, setMaintForm] = useState({ equipmentId: '', type: 'Preventive Maintenance', technician: '', cost: '', details: '' });

  const [calendarFilterEq, setCalendarFilterEq] = useState('ALL');

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchLiveData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.status === "success") {
        if (json.data.equipments && json.data.equipments.length > 0) setEquipmentList(json.data.equipments);
        if (json.data.users) setUsersList(json.data.users);
        if (json.data.bookings) setBookings(json.data.bookings);
        if (json.data.maintenanceLogs) setMaintenanceLogs(json.data.maintenanceLogs);
        if (json.data.creditLogs) setCreditLogs(json.data.creditLogs);
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  const remainingCredit = useMemo(() => {
    if (!currentUser) return 0;
    const userUpcomingBookings = bookings.filter((b) => b.userId === currentUser.uid && b.status === 'Upcoming');
    const usedCost = userUpcomingBookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);
    return Math.max(0, (Number(currentUser.creditLimit) || 50000) - usedCost);
  }, [currentUser, bookings]);

  const studentCount = useMemo(() => usersList.filter(u => u.userType === 'นิสิต').length, [usersList]);
  const staffCount = useMemo(() => usersList.filter(u => u.userType === 'บุคลากร' || u.userType === 'อาจารย์').length, [usersList]);

  const calculatedBookingDetails = useMemo(() => {
    const eq = equipmentList.find((item) => item.id === bookingForm.equipmentId);
    if (!eq || !bookingForm.startTime || !bookingForm.endTime || !bookingForm.date) {
      return { hours: 0, totalCost: 0, valid: false, isPast: false, hasOverlap: false };
    }

    const start = parseHour(bookingForm.startTime);
    const end = parseHour(bookingForm.endTime);
    const hours = end - start;

    // 1. ตรวจสอบว่าเวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น
    if (hours <= 0) {
      return { hours: 0, totalCost: 0, valid: false, isPast: false, hasOverlap: false };
    }

    // 2. ตรวจสอบเวลาที่ผ่านมาแล้ว
    const now = new Date();
    const todayStr = getTodayThaiString();
    const currentHour = now.getHours();

    let isPast = false;
    if (bookingForm.date < todayStr) {
      isPast = true;
    } else if (bookingForm.date === todayStr && start <= currentHour) {
      isPast = true;
    }

    // 3. ตรวจสอบการจองซ้ำ/ทับซ้อนช่วงเวลา (Overlap Collision Check)
    const hasOverlap = bookings.some((b) => {
      // เช็กเฉพาะเครื่องเดียวกัน วันเดียวกัน และรายการที่ยังไม่ถูกยกเลิก
      if (b.equipmentId !== bookingForm.equipmentId || b.date !== bookingForm.date || b.status === 'Cancelled') {
        return false;
      }
      const bStart = parseHour(b.startTime);
      const bEnd = parseHour(b.endTime);
      
      // สูตรตรวจสอบเวลาทับซ้อน: (Start1 < End2) AND (End1 > Start2)
      return start < bEnd && end > bStart;
    });

    return { 
      hours, 
      totalCost: hours * (Number(eq.ratePerHour) || 0), 
      valid: hours > 0 && !isPast && !hasOverlap,
      isPast,
      hasOverlap 
    };
  }, [bookingForm, equipmentList, bookings]);

  const equipmentUsageAnalytics = useMemo(() => {
    return equipmentList.map(eq => {
      const eqBookings = bookings.filter(b => b.equipmentId === eq.id && b.status === 'Upcoming');
      const totalHours = eqBookings.reduce((sum, b) => sum + (Number(b.durationHours) || 0), 0) + (Number(eq.totalHoursUsed) || 0);
      const totalRevenue = eqBookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);
      return { id: eq.id, name: eq.name, code: eq.code, totalHours, totalRevenue, threshold: Number(eq.maintenanceThresholdHours) || 200, bookingCount: eqBookings.length };
    });
  }, [equipmentList, bookings]);

  const maxUsageHours = useMemo(() => Math.max(...equipmentUsageAnalytics.map(a => a.totalHours), 100), [equipmentUsageAnalytics]);
  const maxRevenue = useMemo(() => Math.max(...equipmentUsageAnalytics.map(a => a.totalRevenue), 10000), [equipmentUsageAnalytics]);

  const filteredCalendarBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (b.status === 'Cancelled') return false;
      if (calendarFilterEq === 'ALL') return true;
      return b.equipmentId === calendarFilterEq;
    });
  }, [bookings, calendarFilterEq]);

  const isAdmin = currentUser?.role === 'Admin';

  const handleExportCSV = () => {
    if (bookings.length === 0) { showToast('ไม่มีข้อมูลการใช้งานที่จะส่งออก', 'warning'); return; }
    const headers = ['Booking ID', 'Equipment Name', 'User Name', 'Date', 'Start Time', 'End Time', 'Hours', 'Cost (THB)', 'Purpose', 'Status'];
    const rows = bookings.map(b => [b.id, `"${b.equipmentName}"`, `"${b.userName}"`, b.date, b.startTime, b.endTime, b.durationHours, b.totalCost, `"${b.purpose || ''}"`, b.status]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a'); link.setAttribute('href', encodeURI(csvContent)); link.setAttribute('download', `AHS_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    showToast('ดาวน์โหลดรายงาน CSV เรียบร้อยแล้ว', 'success');
  };

  const handleExportUsersCSV = () => {
    if (usersList.length === 0) { showToast('ไม่มีข้อมูลผู้ใช้งานที่จะส่งออก', 'warning'); return; }
    const headers = ['UID / StudentID', 'Name', 'Email', 'Phone', 'User Type', 'Department', 'Credit Limit (THB)', 'Status'];
    const rows = usersList.map(u => [`"${u.studentId || u.uid}"`, `"${u.displayName}"`, `"${u.email}"`, `"${u.phone || '-'}"`, `"${u.userType || 'นิสิต'}"`, `"${u.department || ''}"`, u.creditLimit, u.isBanned ? 'Banned' : 'Active']);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a'); link.setAttribute('href', encodeURI(csvContent)); link.setAttribute('download', `AHS_Users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    showToast('ดาวน์โหลดรายชื่อผู้ใช้ CSV เรียบร้อยแล้ว', 'success');
  };

const handleLoginSubmit = (e) => {
    e.preventDefault();
    const emailInput = loginEmail.trim().toLowerCase();
    const foundUser = usersList.find((u) => u.email.trim().toLowerCase() === emailInput);
    if (foundUser) {
      // 📍 เช็กสถานะการถูกระงับตรงนี้ครับ
      if (foundUser.status === 'Suspended' || foundUser.isBanned) { 
        showToast('บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ', 'error'); 
        return; 
      }
      
      setCurrentUser(foundUser); 
      showToast(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ ${foundUser.displayName}`, 'success');
    } else {
      showToast('ไม่พบข้อมูลอีเมลนี้ในระบบ กรุณาลงทะเบียนใช้งานครั้งแรก', 'warning');
      setAuthMode('register'); 
      setRegisterForm((prev) => ({ ...prev, email: loginEmail }));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const email = registerForm.email.trim().toLowerCase();
    if (!email.endsWith('@buu.ac.th') && !email.endsWith('@go.buu.ac.th')) {
      showToast('กรุณาใช้อีเมลมหาวิทยาลัยบูรพา (@buu.ac.th หรือ @go.buu.ac.th)', 'error'); 
      return;
    }

    const finalDepartment = registerForm.department === 'หน่วยงานภายนอกคณะ' 
      ? `หน่วยงานภายนอก: ${registerForm.customDepartment || 'ไม่ระบุ'}` 
      : registerForm.department;

    const initialCredit = registerForm.userType === 'บุคลากร' ? 100000 : 50000;

    const newUser = {
      uid: `usr-${Date.now()}`, 
      displayName: registerForm.displayName, 
      email: email, 
      phone: registerForm.phone,
      studentId: registerForm.studentId, 
      userType: registerForm.userType, 
      department: finalDepartment,
      affiliationType: registerForm.department === 'หน่วยงานภายนอกคณะ' ? 'ภายนอกคณะสหเวชศาสตร์' : 'ภายในคณะสหเวชศาสตร์', 
      role: 'User', 
      isBanned: false,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(registerForm.displayName)}&background=0284c7&color=fff`,
      creditLimit: initialCredit
    };

    try {
      const res = await fetch(API_URL, { 
        method: 'POST', 
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify({ action: 'saveUser', data: newUser }) 
      });
      
      const json = await res.json();
      
      if (json.status === "success") {
        setUsersList((prev) => [...prev, newUser]); 
        setCurrentUser(newUser);
        showToast(`ลงทะเบียนเป็น [${newUser.userType}] สำเร็จ! ยินดีต้อนรับคุณ ${newUser.displayName}`, 'success');
      } else {
        showToast(`เกิดข้อผิดพลาดจาก Sheets: ${json.message}`, 'error');
      }
    } catch (err) { 
      showToast(`เกิดข้อผิดพลาดในการเชื่อมต่อ: ${err.message}`, 'error'); 
    }
  };

  const handleVerifyAdminPasscode = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123') {
      const adminUser = usersList.find(u => u.role === 'Admin') || {
        uid: 'admin-001', displayName: 'ดร.สมศักดิ์ (Admin)', email: 'admin@buu.ac.th', role: 'Admin', creditLimit: 100000,
        photoURL: 'https://ui-avatars.com/api/?name=Admin&background=dc2626&color=fff'
      };
      setCurrentUser(adminUser); setShowAdminAuthModal(false);
      showToast('เข้าสู่ระบบผู้ดูแลระบบ (Admin) เรียบร้อยแล้ว', 'success');
    } else { setAdminAuthError('รหัสผ่าน Admin ไม่ถูกต้อง'); }
  };

  const handleToggleEquipmentStatus = async (eq) => {
    const newStatus = eq.status === 'Available' ? 'Maintenance' : 'Available';
    const updatedEq = { ...eq, status: newStatus };
    try {
      await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'saveEquipment', data: updatedEq }) });
      setEquipmentList((prev) => prev.map((item) => (item.id === eq.id ? updatedEq : item)));
      showToast(`ปรับสถานะ ${eq.name} เป็น "${newStatus === 'Available' ? 'พร้อมใช้งาน' : 'อยู่ระหว่างซ่อม'}" เรียบร้อยแล้ว`, 'success');
    } catch (err) { showToast('เกิดข้อผิดพลาดในการปรับสถานะเครื่องมือ', 'error'); }
  };

  const handleSaveEquipment = async (e) => {
    e.preventDefault();
    const payload = editingEq ? { ...editingEq, ...eqForm } : { id: `eq-${Date.now()}`, ...eqForm, totalHoursUsed: 0 };
    try {
      await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'saveEquipment', data: payload }) });
      if (editingEq) { setEquipmentList(prev => prev.map(item => item.id === payload.id ? payload : item)); showToast('แก้ไขข้อมูลเครื่องมือเรียบร้อยแล้ว', 'success'); }
      else { setEquipmentList(prev => [...prev, payload]); showToast('เพิ่มเครื่องมือใหม่เรียบร้อยแล้ว', 'success'); }
      setShowAddEqModal(false);
    } catch (err) { showToast('เกิดข้อผิดพลาดในการบันทึกเครื่องมือ', 'error'); }
  };

  const handleSaveMaintenanceLog = async (e) => {
    e.preventDefault();
    const eq = equipmentList.find((i) => i.id === maintForm.equipmentId);
    if (!eq) { showToast('กรุณาเลือกเครื่องมือที่ต้องการส่งซ่อม', 'error'); return; }

    const newLog = {
      id: `M-${Math.floor(100 + Math.random() * 900)}`,
      equipmentId: eq.id,
      equipmentName: eq.name,
      date: new Date().toISOString().split('T')[0],
      type: maintForm.type,
      technician: maintForm.technician,
      cost: parseFloat(maintForm.cost) || 0,
      details: maintForm.details
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'saveMaintenanceLog', data: newLog })
      });

      const json = await res.json();

      if (json.status === "success") {
        setMaintenanceLogs([newLog, ...maintenanceLogs]);
        setEquipmentList(prev => prev.map(i => i.id === eq.id ? { ...i, status: 'Maintenance' } : i));
        showToast('บันทึกประวัติซ่อมบำรุงลง Google Sheets เรียบร้อยแล้ว', 'success');
        setShowAddMaintModal(false);
      } else {
        showToast(`เกิดข้อผิดพลาดจาก Google Sheets: ${json.message}`, 'error');
      }
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อ Google Sheets', 'error');
    }
  };
const handleSaveAdjustCredit = async (e) => {
    e.preventDefault();
    if (!creditAdjustUser) return;
    const parsedCredit = parseFloat(newCreditAmount);
    const logData = {
      id: `CL-${Math.floor(100 + Math.random() * 900)}`, userId: creditAdjustUser.uid, userName: creditAdjustUser.displayName,
      userEmail: creditAdjustUser.email, previousCredit: creditAdjustUser.creditLimit, newCredit: parsedCredit,
      adjustedBy: currentUser.displayName, reason: creditAdjustReason || 'ปรับวงเงินโดย Admin'
    };
    try {
      await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'adjustCredit', data: logData }) });
      setUsersList(prev => prev.map(u => u.uid === creditAdjustUser.uid ? { ...u, creditLimit: parsedCredit } : u));
      setCreditLogs([logData, ...creditLogs]);
      showToast(`ปรับวงเงินคุณ ${creditAdjustUser.displayName} เป็น ${formatCurrency(parsedCredit)} เรียบร้อยแล้ว`, 'success');
      setShowAdjustCreditModal(false);
    } catch (err) { showToast('เกิดข้อผิดพลาดในการบันทึกการปรับวงเงิน', 'error'); }
  };

 const handleToggleUserStatus = async (targetUserId, currentStatus) => {
    const newStatus = currentStatus === 'Suspended' ? 'Active' : 'Suspended';
    const actionText = newStatus === 'Suspended' ? 'ระงับการใช้งาน' : 'ปลดการระงับใช้งาน';

    if (!window.confirm(`คุณต้องการ ${actionText} ผู้ใช้งานรายนี้ใช่หรือไม่?`)) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'toggleUserStatus', userId: targetUserId, status: newStatus })
      });

      const json = await res.json();

      if (json.status === 'success') {
        // อัปเดต state บนหน้าจอเมื่อ Google Sheets ตอบกลับว่าบันทึกสำเร็จแล้วเท่านั้น
        setUsersList((prev) =>
          prev.map((u) => (u.uid === targetUserId ? { ...u, status: newStatus } : u))
        );
        showToast(`${actionText} ผู้ใช้งานเรียบร้อยแล้ว`, 'success');
      } else {
        showToast(`ไม่สามารถอัปเดตสถานะได้: ${json.message}`, 'error');
      }
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์', 'error');
    }
  };
  const handleOpenEditProfileModal = () => {
    if (!currentUser) return;
    setProfileForm({ displayName: currentUser.displayName || '', email: currentUser.email || '', phone: currentUser.phone || '', userType: currentUser.userType || 'นิสิต', department: currentUser.department || '', affiliationType: currentUser.affiliationType || 'ภายในคณะสหเวชศาสตร์' });
    setShowEditProfileModal(true);
  };
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...profileForm };
    try {
      await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'saveUser', data: updatedUser }) });
      setCurrentUser(updatedUser); setUsersList((prev) => prev.map((u) => (u.uid === currentUser.uid ? updatedUser : u)));
      setShowEditProfileModal(false); showToast('อัปเดตข้อมูลประวัติส่วนตัวเรียบร้อยแล้ว', 'success');
    } catch (err) { showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error'); }
  };

 const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!currentUser || isSubmittingBooking) return;

    // 📍 เช็กสถานะถูกระงับการใช้งานตรงนี้ครับ
    if (currentUser.status === 'Suspended' || currentUser.isBanned) {
      showToast('บัญชีของคุณถูกระงับการใช้งาน ไม่สามารถทำการจองคิวได้', 'error');
      return;
    }
    
     if (calculatedBookingDetails.isPast) {
      showToast('ไม่สามารถจองช่วงเวลาที่ผ่านมาแล้วได้ กรุณาเลือกวัน/เวลาใหม่', 'error');
      return;
    }

    if (calculatedBookingDetails.hasOverlap) {
      showToast('เครื่องมือนี้ถูกจองในช่วงเวลาดังกล่าวแล้ว กรุณาเลือกช่วงเวลาอื่น', 'error');
      return;
    }

    if (!calculatedBookingDetails.valid) {
      showToast('กรุณาเลือกช่วงเวลาให้ถูกต้อง', 'error');
      return;
    }

    // ล็อกปุ่มกดทันทีเพื่อป้องกัน Double Click
    setIsSubmittingBooking(true);

    const targetEquipment = equipmentList.find((item) => item.id === bookingForm.equipmentId);
    const newBooking = {
      id: `B-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      equipmentId: targetEquipment.id,
      equipmentName: targetEquipment.name,
      date: bookingForm.date,
      startTime: bookingForm.startTime,
      endTime: bookingForm.endTime,
      durationHours: calculatedBookingDetails.hours,
      totalCost: calculatedBookingDetails.totalCost,
      purpose: bookingForm.purpose,
      status: 'Upcoming',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'createBooking', data: newBooking })
      });
      const json = await res.json();

      if (json.status === 'success') {
        setBookings((prev) => [newBooking, ...prev]);
        showToast('จองคิวสำเร็จ! บันทึกลง Google Sheets เรียบร้อย', 'success');
        setActiveTab('history');
      } else {
        showToast(`เกิดข้อผิดพลาด: ${json.message}`, 'error');
      }
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการส่งข้อมูลจองคิว', 'error');
    } finally {
      // คืนค่าล็อกเพื่อให้กดใหม่ได้เมื่อทำงานเสร็จ
      setIsSubmittingBooking(false);
    }
  };
  const handleCancelBooking = async (bookingId) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    // ดักจับ: ไม่ให้ยกเลิกรายการที่ผ่านไปแล้วหรือกำลังใช้งาน
    if (isBookingPast(targetBooking)) {
      showToast('ไม่สามารถยกเลิกการจองที่ถึงกำหนดเวลาใช้งานหรือผ่านไปแล้วได้', 'error');
      return;
    }

    if (!window.confirm('คุณต้องการยกเลิกการจองนี้ และรับเครดิตคืนใช่หรือไม่?')) return;

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'cancelBooking', bookingId })
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
      );
      showToast('ยกเลิกการจองและคืนเครดิตเรียบร้อย', 'success');
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการยกเลิกการจอง', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-[9999] animate-bounce">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border-2 text-sm font-bold ${
            notification.type === 'error' ? 'bg-rose-600 text-white border-rose-400' :
            notification.type === 'warning' ? 'bg-amber-500 text-slate-950 border-amber-300' : 'bg-emerald-600 text-white border-emerald-400'
          }`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white border-b-4 border-amber-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* 📍 เปลี่ยนจากไอคอน Microscope เดิมเป็นตราสัญลักษณ์ Logo.png */}
            <img 
              src="/Logo.png" 
              alt="ตราสัญลักษณ์คณะสหเวชศาสตร์" 
              className="w-24 h-24 object-contain shrink-0" 
            />
            <div>
              <h1 className="text-xl font-bold">ระบบบริการเครื่องมือวิจัย คณะสหเวชศาสตร์</h1>
              <p className="text-xs text-slate-300">มหาวิทยาลัยบูรพา (AHS BUU Central Lab)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!currentUser ? (
              <button 
                onClick={() => { setAdminPasscode(''); setAdminAuthError(''); setShowAdminAuthModal(true); }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Shield className="w-4 h-4" /> ล็อกอิน Admin
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white">{currentUser.displayName}</p>
                  <p className="text-[11px] text-amber-300">วงเงินคงเหลือ: {formatCurrency(remainingCredit)}</p>
                </div>
                <button onClick={() => setCurrentUser(null)} className="p-2 bg-slate-800 hover:bg-rose-600 rounded-xl text-xs" title="ลงชื่อออก">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {currentUser && (
          <div className="bg-slate-950/60 px-4 py-2 flex gap-2 overflow-x-auto border-t border-white/10">
            <button onClick={() => setActiveTab('catalog')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'catalog' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>แคตตาล็อกเครื่องมือ</button>
            <button onClick={() => setActiveTab('booking')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'booking' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>จองการใช้งาน</button>
            <button onClick={() => setActiveTab('calendar')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'calendar' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>ตารางปฏิทิน</button>
            <button onClick={() => setActiveTab('history')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'history' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>ประวัติการจอง & คืนเครดิต</button>
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'dashboard' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}>แดชบอร์ดสรุป</button>

            {isAdmin && (
              <>
                <div className="h-6 w-px bg-white/20 mx-1 self-center" />
                <button onClick={() => setActiveTab('admin-analytics')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'admin-analytics' ? 'bg-rose-600 text-white' : 'bg-rose-950/60 text-rose-200'}`}>[Admin] สถิติ & บำรุงรักษา</button>
                <button onClick={() => setActiveTab('admin-eq')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'admin-eq' ? 'bg-rose-600 text-white' : 'bg-rose-950/60 text-rose-200'}`}>[Admin] จัดการเครื่องมือ</button>
                <button onClick={() => setActiveTab('admin-maint')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'admin-maint' ? 'bg-rose-600 text-white' : 'bg-rose-950/60 text-rose-200'}`}>[Admin] ประวัติซ่อมบำรุง</button>
                <button onClick={() => setActiveTab('admin-users')} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'admin-users' ? 'bg-rose-600 text-white' : 'bg-rose-950/60 text-rose-200'}`}>[Admin] ผู้ใช้ & เครดิต</button>
              </>
            )}
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {!currentUser ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
            <div className="text-center">
              {/* 📍 เปลี่ยนจากไอคอน Microscope เป็นตราสัญลักษณ์ Logo.png */}
              <img 
                src="/Logo.png" 
                alt="ตราสัญลักษณ์คณะสหเวชศาสตร์" 
                className="w-32 h-32 object-contain mx-auto mb-3" 
              />
              <h2 className="text-xl font-bold text-slate-900">{authMode === 'login' ? 'เข้าสู่ระบบใช้งานจริง' : 'ลงทะเบียนใช้งานครั้งแรก'}</h2>
              <p className="text-xs text-slate-500 mt-1">คณะสหเวชศาสตร์ มหาวิทยาลัยบูรพา</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button onClick={() => setAuthMode('login')} className={`flex-1 py-2 rounded-lg ${authMode === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>เข้าสู่ระบบ</button>
              <button onClick={() => setAuthMode('register')} className={`flex-1 py-2 rounded-lg ${authMode === 'register' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}>ลงทะเบียนใหม่</button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">อีเมล ม.บูรพา (@buu.ac.th หรือ @go.buu.ac.th) *</label>
                  <input type="email" required placeholder="username@go.buu.ac.th" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full p-3.5 bg-slate-50 border rounded-xl text-xs font-semibold" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl text-xs">เข้าสู่ระบบ</button>
              </form>
            ) : (
              /* ฟอร์มลงทะเบียนพร้อมรายการภาควิชา/สาขาวิชาทั้ง 9 ตัวเลือก */
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ประเภทผู้ใช้งาน *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegisterForm({ ...registerForm, userType: 'นิสิต' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        registerForm.userType === 'นิสิต'
                          ? 'bg-indigo-900 text-amber-400 border-indigo-900 shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" /> นิสิต
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegisterForm({ ...registerForm, userType: 'บุคลากร' })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                        registerForm.userType === 'บุคลากร'
                          ? 'bg-indigo-900 text-amber-400 border-indigo-900 shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" /> บุคลากร / อาจารย์
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                  <input type="text" required placeholder="นายสมชาย ใจดี" value={registerForm.displayName} onChange={(e) => setRegisterForm({...registerForm, displayName: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {registerForm.userType === 'นิสิต' ? 'รหัสนิสิต *' : 'รหัสบุคลากร *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={registerForm.userType === 'นิสิต' ? '6503XXXX' : 'EMP-XXXX'}
                      value={registerForm.studentId}
                      onChange={(e) => setRegisterForm({...registerForm, studentId: e.target.value})}
                      className="w-full p-3 bg-slate-50 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                    <input type="tel" required placeholder="08X-XXX-XXXX" value={registerForm.phone} onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ภาควิชา / สาขาวิชา / หน่วยงาน *</label>
                  <select
                    value={registerForm.department}
                    onChange={(e) => setRegisterForm({ ...registerForm, department: e.target.value })}
                    className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                  >
                    <option value="สาขาวิทยาศาสตร์การแพทย์">1. สาขาวิทยาศาสตร์การแพทย์</option>
                    <option value="สาขาเทคนิคการแพทย์">2. สาขาเทคนิคการแพทย์</option>
                    <option value="สาขาพยาธิวิทยากายวิภาค">3. สาขาพยาธิวิทยากายวิภาค</option>
                    <option value="สาขาโภชนาการและการกำหนดอาหาร">4. สาขาโภชนาการและการกำหนดอาหาร</option>
                    <option value="สาขาแพทย์แผนไทยประยุกต์">5. สาขาแพทย์แผนไทยประยุกต์</option>
                    <option value="สาขากายภาพบำบัด">6. สาขากายภาพบำบัด</option>
                    <option value="สาขาชีวเวชศาสตร์">7. สาขาชีวเวชศาสตร์</option>
                    <option value="สาขาสำนักงานการศึกษา (แพทย์แผนจีน)">8. สาขาสำนักงานการศึกษา (แพทย์แผนจีน)</option>
                    <option value="หน่วยงานภายนอกคณะ">9. หน่วยงานภายนอกคณะ (โปรดระบุ)</option>
                  </select>
                </div>

                {registerForm.department === 'หน่วยงานภายนอกคณะ' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ระบุชื่อหน่วยงานภายนอกคณะ *</label>
                    <input
                      type="text"
                      required
                      placeholder="เช่น คณะพยาบาลศาสตร์ / โรงพยาบาล..."
                      value={registerForm.customDepartment}
                      onChange={(e) => setRegisterForm({ ...registerForm, customDepartment: e.target.value })}
                      className="w-full p-3 bg-slate-50 border rounded-xl text-xs"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">อีเมล ม.บูรพา (@buu.ac.th หรือ @go.buu.ac.th) *</label>
                  <input type="email" required placeholder="name@go.buu.ac.th" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
                </div>

                <button type="submit" className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 font-bold rounded-xl text-xs shadow-md mt-2 transition-all text-slate-950">
                  ยืนยันการลงทะเบียน (ซิงค์ Google Sheets)
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-6">

            {/* User Quota Banner */}
            <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <CreditCard className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-300 uppercase">สิทธิ์โควต้าฟรีเครดิตวิจัยประจำปี</span>
                  <h2 className="text-2xl font-bold text-white mt-0.5">
                    วงเงินคงเหลือ: <span className="text-amber-400 font-extrabold">{formatCurrency(remainingCredit)}</span>
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <p className="text-xs text-slate-300">
                      {currentUser.displayName}{' '}
                      {/* 📍 ปรับเปลี่ยนจุดนี้: ถ้าเป็น Admin และประเภทเดิมคือ 'นิสิต' จะเปลี่ยนเป็น 'ผู้ดูแลระบบ' อัตโนมัติ */}
                      <span className="bg-white/10 px-2 py-0.5 rounded text-amber-300 font-bold">
                        {currentUser?.userType === 'นิสิต' && isAdmin ? 'ผู้ดูแลระบบ' : (currentUser?.userType || 'ผู้ดูแลระบบ')}
                      </span>{' '}
                      • <strong className="text-slate-100">{currentUser.department || 'สังกัด ม.บูรพา'}</strong>
                    </p>
                    <button onClick={handleOpenEditProfileModal} className="bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 px-2.5 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all">
                      <Edit className="w-3 h-3" /> แก้ไขประวัติ
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-white/10 w-full md:w-auto justify-around">
                <div className="text-center px-3">
                  <p className="text-[11px] text-slate-400 uppercase">วงเงินอนุมัติ</p>
                  <p className="text-sm font-bold text-slate-200">{formatCurrency(currentUser.creditLimit)}</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center px-3">
                  <p className="text-[11px] text-slate-400 uppercase">ใช้ไปแล้ว</p>
                  <p className="text-sm font-bold text-rose-400">{formatCurrency(currentUser.creditLimit - remainingCredit)}</p>
                </div>
              </div>
            </div>

            {/* TAB 1: CATALOG */}
            {activeTab === 'catalog' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipmentList.map((eq) => (
                  <div key={eq.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-slate-100">
                      <img src={eq.image} alt={eq.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">{eq.category}</span>
                      <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md ${eq.status === 'Available' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                        {eq.status === 'Available' ? 'พร้อมใช้งาน' : 'กำลังซ่อมบำรุง'}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400">{eq.code}</span>
                        <h3 className="text-base font-bold text-slate-900">{eq.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{eq.description}</p>
                      </div>
                      <div className="pt-3 border-t flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">อัตราบริการ</span>
                          <span className="text-lg font-bold text-indigo-900">{formatCurrency(eq.ratePerHour)}</span><span className="text-xs text-slate-500"> /ชม.</span>
                        </div>
                        <button disabled={eq.status !== 'Available'} onClick={() => { setBookingForm((prev) => ({ ...prev, equipmentId: eq.id })); setActiveTab('booking'); }} className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow">
                          จองเครื่องนี้
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: BOOKING */}
            {activeTab === 'booking' && (
              <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                <h2 className="text-lg font-bold text-slate-900">จองคิวใช้งานเครื่องมือ</h2>
                <form onSubmit={handleCreateBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">เลือกเครื่องมือ *</label>
                    <select required value={bookingForm.equipmentId} onChange={(e) => setBookingForm({ ...bookingForm, equipmentId: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold">
                      <option value="">-- เลือกเครื่องมือ --</option>
                      {equipmentList.map((eq) => (
                        <option key={eq.id} value={eq.id} disabled={eq.status !== 'Available'}>{eq.name} ({formatCurrency(eq.ratePerHour)}/ชม.)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">วันที่ต้องการจอง *</label>
                    <input type="date" required min={getTodayThaiString()} value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold" />
                  </div>

                  {/* เตือน 1: เมื่อเลือกเวลาอดีต */}
                  {calculatedBookingDetails.isPast && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-2">
                      ⚠️ ไม่สามารถเลือกช่วงเวลาที่ผ่านมาแล้วได้ กรุณาเปลี่ยนวัน/เวลาเริ่มจอง
                    </div>
                  )}

                  {/* เตือน 2: เมื่อช่วงเวลานั้นมีคนจองไว้แล้ว */}
                  {calculatedBookingDetails.hasOverlap && (
                    <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold flex items-center gap-2">
                      🚫 เครื่องมือนี้ถูกจองในช่วงเวลาดังกล่าวแล้ว กรุณาเลือกช่วงเวลาอื่น
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">เวลาเริ่ม *</label>
                      <select value={bookingForm.startTime} onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs">
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((t) => (
                          <option key={t} value={t}>{t} น.</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">เวลาสิ้นสุด *</label>
                      <select value={bookingForm.endTime} onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs">
                        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map((t) => (
                          <option key={t} value={t}>{t} น.</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">วัตถุประสงค์ในการจอง *</label>
                    <textarea required rows="2" value={bookingForm.purpose} onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })} placeholder="ระบุโครงการวิจัย..." className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-2xl flex justify-between items-center text-xs">
                    <span>ค่าบริการรวม: <strong className="text-amber-400 text-base">{formatCurrency(calculatedBookingDetails.totalCost)}</strong></span>
                    <span>วงเงินคงเหลือ: <strong className="text-emerald-400">{formatCurrency(remainingCredit - calculatedBookingDetails.totalCost)}</strong></span>
                  </div>

                  {/* 📍 ปรับแก้ไขปุ่มกด Step 3 เพิ่ม isSubmittingBooking */}
                  <button 
                    type="submit" 
                    disabled={isSubmittingBooking || !calculatedBookingDetails.valid || (remainingCredit - calculatedBookingDetails.totalCost < 0)} 
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingBooking ? '⏳ กำลังบันทึกข้อมูล...' : 'ยืนยันการจองคิว (ซิงค์ Google Sheets)'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: CALENDAR */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-amber-500" /> ตารางปฏิทินแสดงคิวการจอง</h2>
                  <select value={calendarFilterEq} onChange={(e) => setCalendarFilterEq(e.target.value)} className="bg-slate-50 border rounded-xl px-3 py-2 text-xs font-semibold">
                    <option value="ALL">เครื่องมือทั้งหมด ({equipmentList.length})</option>
                    {equipmentList.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
                  </select>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCalendarBookings.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-400 text-xs">ไม่มีคิวการจองในขณะนี้</div>
                  ) : (
                    filteredCalendarBookings.map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border space-y-2">
                        <div className="flex justify-between items-center"><span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">{formatThaiDate(b.date)}</span><span className="text-xs font-bold text-indigo-900">{b.startTime} - {b.endTime} น.</span></div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{b.equipmentName}</h4>
                        <div className="text-[11px] text-slate-500 pt-2 border-t flex justify-between"><span>ผู้จอง: <strong>{b.userName}</strong></span><span>{b.id}</span></div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

           {/* TAB 4: HISTORY & REFUNDS */}
            {activeTab === 'history' && (
              <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                <h2 className="text-lg font-bold text-slate-900">ประวัติการจองและการคืนเครดิต ({currentUser.displayName})</h2>
                <div className="space-y-3">
                  {bookings.filter(b => b.userId === currentUser.uid).length === 0 ? (
                    <p className="text-xs text-slate-400 py-8 text-center">ยังไม่มีประวัติการจอง</p>
                  ) : (
                    bookings.filter(b => b.userId === currentUser.uid).map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <span className="text-[11px] font-mono text-indigo-900 font-bold">{b.id} • {formatThaiDate(b.date)} ({b.startTime} - {b.endTime} น.)</span>
                          <h4 className="text-sm font-bold text-slate-900">{b.equipmentName}</h4>
                          <p className="text-xs text-slate-500">{b.purpose}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm text-slate-900">{formatCurrency(b.totalCost)}</span>
                          
                          {/* 📍 ปรับแก้ไขจุดนี้: เพิ่มการเช็ก isBookingPast(b) */}
                          {b.status === 'Upcoming' ? (
                            isBookingPast(b) ? (
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                                พ้นกำหนดการยกเลิก
                              </span>
                            ) : (
                              <button onClick={() => handleCancelBooking(b.id)} className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold border border-rose-200">
                                ยกเลิก & คืนเครดิต
                              </button>
                            )
                          ) : (
                            <span className="text-xs text-slate-400 italic">ยกเลิกแล้ว</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            {/* TAB 5: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border"><h2 className="text-lg font-bold text-slate-900">แดชบอร์ดสรุปภาพรวมการใช้งาน</h2></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center"><CreditCard className="w-6 h-6"/></div><div><p className="text-xs text-slate-400 font-semibold uppercase">เครดิตคงเหลือ</p><p className="text-2xl font-extrabold">{formatCurrency(remainingCredit)}</p></div></div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><Clock className="w-6 h-6"/></div><div><p className="text-xs text-slate-400 font-semibold uppercase">ชั่วโมงที่จองรวม</p><p className="text-2xl font-extrabold">{bookings.filter(b => b.userId === currentUser.uid && b.status === 'Upcoming').reduce((sum, b) => sum + (Number(b.durationHours)||0), 0)} ชม.</p></div></div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle className="w-6 h-6"/></div><div><p className="text-xs text-slate-400 font-semibold uppercase">รายการจองสมบูรณ์</p><p className="text-2xl font-extrabold">{bookings.filter(b => b.userId === currentUser.uid && b.status === 'Upcoming').length} รายการ</p></div></div>
                </div>
              </div>
            )}

            {/* ADMIN 1: ANALYTICS */}
            {activeTab === 'admin-analytics' && isAdmin && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-rose-600" /> การวิเคราะห์สถิติ & ดัชนีบำรุงรักษา</h2>
                  <button onClick={handleExportCSV} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow"><FileDown className="w-4 h-4"/> ส่งออก CSV</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b pb-2">ชั่วโมงใช้งานสะสม (Hours)</h3>
                    {equipmentUsageAnalytics.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold"><span>{item.name}</span><span>{item.totalHours} ชม.</span></div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-indigo-600 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((item.totalHours / maxUsageHours) * 100))}%` }} /></div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b pb-2">มูลค่าการบริการรวม (Revenue Value)</h3>
                    {equipmentUsageAnalytics.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold"><span>{item.name}</span><span className="text-emerald-600">{formatCurrency(item.totalRevenue)}</span></div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((item.totalRevenue / maxRevenue) * 100))}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN 2: MANAGE EQUIPMENT */}
            {activeTab === 'admin-eq' && isAdmin && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Settings className="w-5 h-5 text-rose-600" /> จัดการเครื่องมือวิทยาศาสตร์</h2>
                  <button onClick={() => { setEditingEq(null); setEqForm({ name:'', category:'Molecular Biology', code:'', location:'ห้องปฏิบัติการ MS302', ratePerHour:300, status:'Available', image:'/eq-1.jpg', description:'', specifications:'', maintenanceThresholdHours:200 }); setShowAddEqModal(true); }} className="bg-rose-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow">
                    <Plus className="w-4 h-4" /> เพิ่มเครื่องมือใหม่
                  </button>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b font-bold uppercase"><tr><th className="px-6 py-4">เครื่องมือ</th><th className="px-6 py-4">สถานที่</th><th className="px-6 py-4 text-right">ค่าบริการ</th><th className="px-6 py-4 text-center">สถานะปัจจุบัน</th><th className="px-6 py-4 text-center">สลับสถานะ / แก้ไข</th></tr></thead>
                    <tbody className="divide-y divide-slate-200">
                      {equipmentList.map((eq) => (
                        <tr key={eq.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-900">{eq.name} <div className="text-[10px] text-slate-400 font-normal">{eq.code}</div></td>
                          <td className="px-6 py-4">{eq.location}</td>
                          <td className="px-6 py-4 text-right font-bold">{formatCurrency(eq.ratePerHour)}/ชม.</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-full font-bold ${eq.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {eq.status === 'Available' ? 'พร้อมใช้งาน' : 'อยู่ระหว่างซ่อม'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <button 
                              onClick={() => handleToggleEquipmentStatus(eq)} 
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs mr-2 transition-all border ${
                                eq.status === 'Available' 
                                  ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-500 hover:text-white' 
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-600 hover:text-white'
                              }`}
                            >
                              {eq.status === 'Available' ? 'ตั้งเป็น: ส่งซ่อม' : 'ตั้งเป็น: พร้อมใช้งาน'}
                            </button>
                            <button onClick={() => { setEditingEq(eq); setEqForm(eq); setShowAddEqModal(true); }} className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg" title="แก้ไขข้อมูล">
                              <Edit className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ADMIN 3: MAINTENANCE LOGS */}
            {activeTab === 'admin-maint' && isAdmin && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Wrench className="w-5 h-5 text-rose-600" /> ประวัติงานซ่อมบำรุงรักษา</h2>
                  <button onClick={() => setShowAddMaintModal(true)} className="bg-rose-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow">
                    <Plus className="w-4 h-4" /> บันทึกงานซ่อมใหม่
                  </button>
                </div>
                <div className="space-y-3">
                  {maintenanceLogs.length === 0 ? <p className="text-xs text-slate-400 py-8 text-center bg-white rounded-3xl border">ยังไม่มีประวัติการส่งซ่อม</p> : maintenanceLogs.map((log) => (
                    <div key={log.id} className="bg-white p-5 rounded-3xl shadow-sm border space-y-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <h4 className="font-bold text-sm text-slate-900">{log.equipmentName}</h4>
                        <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-0.5 rounded-full">{log.type}</span>
                      </div>
                      <p className="text-xs text-slate-600">{log.details}</p>
                      <div className="flex justify-between text-xs text-slate-400 pt-2 border-t">
                        <span>ช่าง/บริษัท: <strong>{log.technician}</strong></span>
                        <span className="text-rose-600 font-bold">{formatCurrency(log.cost)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN 4: USERS & CREDIT AUDIT LOGS */}
            {activeTab === 'admin-users' && isAdmin && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Users className="w-5 h-5 text-rose-600" /> จัดการผู้ใช้งาน & วงเงินฟรีเครดิต</h2>
                  <button onClick={handleExportUsersCSV} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow"><Download className="w-4 h-4"/> ส่งออกรายชื่อ (CSV)</button>
                </div>

                {/* สรุปสัดส่วนประเภทผู้ใช้งาน */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">ผู้ใช้งานรวม</p>
                      <p className="text-2xl font-extrabold text-slate-900">{usersList.length} คน</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">กลุ่มนิสิต</p>
                      <p className="text-2xl font-extrabold text-indigo-900">{studentCount} คน</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">กลุ่มบุคลากร / อาจารย์</p>
                      <p className="text-2xl font-extrabold text-amber-600">{staffCount} คน</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 border-b font-bold uppercase"><tr><th className="px-6 py-4">ผู้ใช้งาน</th><th className="px-6 py-4">ประเภท / สังกัด</th><th className="px-6 py-4">อีเมล / เบอร์โทร</th><th className="px-6 py-4 text-right">วงเงินเครดิต</th><th className="px-6 py-4 text-center">จัดการ</th></tr></thead>
                    <tbody className="divide-y divide-slate-200">
                      {usersList.map((u) => (
                        <tr key={u.uid} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2">
                              <span>{u.displayName}</span>
                              {/* 📍 ป้ายแสดงสถานะการใช้งาน */}
                              {u.status === 'Suspended' ? (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200 whitespace-nowrap">
                                  🚫 ถูกระงับ
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200 whitespace-nowrap">
                                  ✓ ปกติ
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal">{u.studentId}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${u.userType === 'บุคลากร' || u.userType === 'อาจารย์' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'}`}>
                              {u.userType || 'นิสิต'}
                            </span>
                            <div className="text-[10px] text-slate-500 mt-0.5">{u.department || 'สหเวชศาสตร์'}</div>
                          </td>
                          <td className="px-6 py-4">{u.email}<div className="text-[10px] text-slate-400">{u.phone}</div></td>
                          <td className="px-6 py-4 text-right font-bold text-emerald-700">{formatCurrency(u.creditLimit)}</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              {/* ปุ่มปรับวงเงิน */}
                              <button onClick={() => { setCreditAdjustUser(u); setNewCreditAmount(u.creditLimit); setShowAdjustCreditModal(true); }} className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow">
                                ปรับวงเงิน
                              </button>

                              {/* 📍 ปุ่มระงับ / ปลดระงับการใช้งาน */}
                              <button
                                onClick={() => handleToggleUserStatus(u.uid, u.status)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                                  u.status === 'Suspended'
                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border-emerald-200'
                                    : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border-rose-200'
                                }`}
                              >
                                {u.status === 'Suspended' ? 'ปลดระงับ' : 'ระงับการใช้งาน'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <History className="w-4 h-4 text-indigo-900" /> ประวัติการปรับเปลี่ยนวงเงินเครดิต (Credit Audit Logs)
                  </h3>
                  <div className="space-y-3">
                    {creditLogs.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">ยังไม่มีประวัติการปรับวงเงิน</p>
                    ) : (
                      creditLogs.map((log) => (
                        <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                          <div>
                            <span className="font-bold text-slate-900">{log.userName}</span> ({log.userEmail})
                            <p className="text-[11px] text-slate-500">เหตุผล: {log.reason} • ปรับโดย: <strong>{log.adjustedBy}</strong></p>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 line-through mr-2">{formatCurrency(log.previousCredit)}</span>
                            <span className="font-bold text-emerald-600 text-sm">{formatCurrency(log.newCredit)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}
      </main>
      {/* --- MODALS --- */}
      {showAdminAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="text-lg font-bold text-slate-900 text-center">ยืนยันตัวตนผู้ดูแลระบบ (Admin)</h3>
            <form onSubmit={handleVerifyAdminPasscode} className="space-y-4">
              {/* 📍 ปรับแก้ไข placeholder ลบเฉลย (admin123) ออก */}
              <input 
                type="password" 
                required 
                value={adminPasscode} 
                onChange={(e) => setAdminPasscode(e.target.value)} 
                placeholder="กรอกรหัสผ่าน..." 
                className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold" 
              />
              {adminAuthError && <p className="text-xs text-rose-600 font-bold">{adminAuthError}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAdminAuthModal(false)} className="w-1/2 py-2.5 bg-slate-100 text-xs font-bold rounded-xl">ยกเลิก</button>
                <button type="submit" className="w-1/2 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAdjustCreditModal && creditAdjustUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4">
            <h3 className="text-lg font-bold text-slate-900">ปรับวงเงินเครดิต ({creditAdjustUser.displayName})</h3>
            <form onSubmit={handleSaveAdjustCredit} className="space-y-4">
              <div><label className="block text-xs font-bold mb-1">วงเงินใหม่ (บาท)</label><input type="number" required value={newCreditAmount} onChange={(e) => setNewCreditAmount(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold text-sm" /></div>
              <div><label className="block text-xs font-bold mb-1">เหตุผลในการปรับ *</label><textarea required rows="2" value={creditAdjustReason} onChange={(e) => setCreditAdjustReason(e.target.value)} placeholder="ระบุเหตุผลในการอนุมัติวงเงิน..." className="w-full p-3 bg-slate-50 border rounded-xl text-xs" /></div>
              <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAdjustCreditModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">ยกเลิก</button><button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow">บันทึกลง Google Sheets</button></div>
            </form>
          </div>
        </div>
      )}

      {showAddEqModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900">{editingEq ? 'แก้ไขเครื่องมือ' : 'เพิ่มเครื่องมือวิทยาศาสตร์ใหม่'}</h3>
            <form onSubmit={handleSaveEquipment} className="space-y-3">
              <div><label className="block text-xs font-bold mb-1">ชื่อเครื่องมือ *</label><input type="text" required value={eqForm.name} onChange={(e) => setEqForm({ ...eqForm, name: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-bold mb-1">รหัสครุภัณฑ์ *</label><input type="text" required value={eqForm.code} onChange={(e) => setEqForm({ ...eqForm, code: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
                <div><label className="block text-xs font-bold mb-1">อัตราบริการ (บาท/ชม.) *</label><input type="number" required value={eqForm.ratePerHour} onChange={(e) => setEqForm({ ...eqForm, ratePerHour: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-bold mb-1">สถานที่ตั้ง *</label><input type="text" required value={eqForm.location} onChange={(e) => setEqForm({ ...eqForm, location: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
                <div>
                  <label className="block text-xs font-bold mb-1">สถานะการใช้งาน *</label>
                  <select 
                    value={eqForm.status} 
                    onChange={(e) => setEqForm({ ...eqForm, status: e.target.value })} 
                    className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-semibold"
                  >
                    <option value="Available">พร้อมใช้งาน (Available)</option>
                    <option value="Maintenance">อยู่ระหว่างซ่อมบำรุง (Maintenance)</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-xs font-bold mb-1">พาธรูปภาพ (เช่น /eq-1.jpg)</label><input type="text" value={eqForm.image} onChange={(e) => setEqForm({ ...eqForm, image: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              <div><label className="block text-xs font-bold mb-1">คำอธิบายรายละเอียด</label><textarea rows="2" value={eqForm.description} onChange={(e) => setEqForm({ ...eqForm, description: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowAddEqModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">ยกเลิก</button><button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow">บันทึกลง Google Sheets</button></div>
            </form>
          </div>
        </div>
      )}

      {showAddMaintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4">
            <h3 className="text-lg font-bold text-slate-900">บันทึกประวัติงานซ่อมบำรุง</h3>
            <form onSubmit={handleSaveMaintenanceLog} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">เลือกเครื่องมือ *</label>
                <select required value={maintForm.equipmentId} onChange={(e) => setMaintForm({ ...maintForm, equipmentId: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-semibold">
                  <option value="">-- เลือกเครื่องมือ --</option>
                  {equipmentList.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-bold mb-1">ประเภทงานซ่อม *</label><input type="text" required value={maintForm.type} onChange={(e) => setMaintForm({ ...maintForm, type: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
                <div><label className="block text-xs font-bold mb-1">ค่าใช้จ่าย (บาท) *</label><input type="number" required value={maintForm.cost} onChange={(e) => setMaintForm({ ...maintForm, cost: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              </div>
              <div><label className="block text-xs font-bold mb-1">ช่าง / ตัวแทนบริษัท *</label><input type="text" required value={maintForm.technician} onChange={(e) => setMaintForm({ ...maintForm, technician: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              <div><label className="block text-xs font-bold mb-1">รายละเอียดการซ่อม</label><textarea rows="2" value={maintForm.details} onChange={(e) => setMaintForm({ ...maintForm, details: e.target.value })} className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs" /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowAddMaintModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">ยกเลิก</button><button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow">บันทึกลง Google Sheets</button></div>
            </form>
          </div>
        </div>
      )}

      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4">
            <h3 className="text-lg font-bold text-slate-900">แก้ไขข้อมูลประวัติส่วนตัว</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">ชื่อ-นามสกุล *</label>
                <input type="text" required value={profileForm.displayName} onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">เบอร์โทรศัพท์ *</label>
                  <input type="tel" required value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">อีเมล *</label>
                  <input type="email" required value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" />
                </div>
              </div>

              {/* 📍 แทรกส่วนเลือกประเภทผู้ใช้งานเพิ่มตรงนี้ครับ */}
              <div>
                <label className="block text-xs font-bold mb-1">ประเภทผู้ใช้งาน *</label>
                <select
                  value={profileForm.userType}
                  onChange={(e) => setProfileForm({ ...profileForm, userType: e.target.value })}
                  className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-700"
                >
                  <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ (Admin)</option>
                  <option value="อาจารย์">อาจารย์</option>
                  <option value="บุคลากร">บุคลากร</option>
                  <option value="นิสิต">นิสิต</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowEditProfileModal(false)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl">ยกเลิก</button>
                <button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow">บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1.5">
          <p className="font-medium text-slate-300">© 2026 คณะสหเวชศาสตร์ มหาวิทยาลัยบูรพา (Faculty of Allied Health Sciences, Burapha University)</p>
          <p className="text-slate-500">169 ถนนลงหาดบางแสน ตำบลแสนสุข อำเภอเมือง จังหวัดชลบุรี 20131 | โทรศัพท์: 0-3810-3157</p>
          
          {/* 📍 ข้อมูลผู้พัฒนาระบบ */}
          <p className="text-slate-400 pt-2 border-t border-slate-800/80 mt-2">
            ผู้พัฒนาระบบ: <span className="text-slate-200 font-semibold">นายไพรัช อิฐรัตน์</span> • 
            E-mail: <a href="mailto:pairat.it@go.buu.ac.th" className="text-amber-400 hover:underline ml-1">pairat.it@go.buu.ac.th</a> • 
            โทร: <a href="tel:0619454194" className="text-amber-400 hover:underline ml-1">061-945-4194</a>
          </p>
        </div>
      </footer>

    </div>
  );
}
