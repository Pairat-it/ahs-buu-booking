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
  KeyRound,
  FileSpreadsheet, 
  Download, 
  PieChart, 
  FileDown, 
  Phone 
} from 'lucide-react';

// --- GOOGLE APPS SCRIPT API URL ---
const API_URL = "https://script.google.com/macros/s/AKfycbw9-YvysfOmUUkKGF3izHa2I2jqv2N10S5C3LLQnyuD_6601EA7Tp0VTJRPaCTY0_k/exec";

// --- INITIAL MOCK DATA (13 รายการจาก MS302 & MS408) ---
const INITIAL_EQUIPMENT = [
  {
    id: 'eq-1',
    name: 'Thermal Cycler / PCR (Bio-Rad T100)',
    category: 'Molecular Biology',
    code: '6008-0720-1000-001',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 300,
    status: 'Available',
    image: '/eq-1.jpg',
    description: 'เครื่องเพิ่มปริมาณสารพันธุกรรม (S/N: 621-BR-26902 | ตัวแทน: บ.ธีระเทรดดิ้ง)',
    specifications: 'Bio-Rad T100, S/N: 621-BR-26902',
    totalHoursUsed: 45,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-2',
    name: 'NanoDrop Spectrophotometer (Hercuvan)',
    category: 'Biochemistry & Molecular',
    code: 'EQ-MS302-002',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 250,
    status: 'Available',
    image: '/eq-2.jpg',
    description: 'Spectrophotometer วัดความเข้มข้น DNA/RNA และสารอื่นๆ ปริมาณน้อย (S/N: 183-16285-22030001 | ตัวแทน: U.Bangtrading 1992)',
    specifications: 'Hercuvan Microvolume Spectrophotometer, S/N: 183-16285-22030001',
    totalHoursUsed: 30,
    maintenanceThresholdHours: 150
  },
  {
    id: 'eq-3',
    name: 'Real-Time qPCR System (QuantStudio 5)',
    category: 'Molecular Biology',
    code: '6008-0146-0100-0001',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 1000,
    status: 'Available',
    image: '/eq-3.jpg',
    description: 'เครื่องเพิ่มปริมาณสารพันธุกรรมแบบ Real-time (S/N: 272-510-143 | ตัวแทน: บ.GenePlus)',
    specifications: 'Thermo Fisher Scientific QuantStudio 5, S/N: 272-510-143',
    totalHoursUsed: 80,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-4',
    name: 'Freeze Dryer (Labconco)',
    category: 'Sample Preparation',
    code: '6408-0127-7000-01',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 500,
    status: 'Maintenance',
    image: '/eq-4.jpg',
    description: 'เครื่องทำสารให้แห้งภายใต้อุณหภูมิต่ำ (S/N: 201-205-613-C | ตัวแทน: บ.BecThai - อนุมัติซ่อมแล้ว รอเข้าดำเนินการ)',
    specifications: 'Labconco Freeze Dryer, S/N: 201-205-613-C',
    totalHoursUsed: 190,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-5',
    name: 'Freeze Dryer (Christ Alpha 2-4 LSC)',
    category: 'Sample Preparation',
    code: 'พท.6408-0127-7000-002',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 500,
    status: 'Available',
    image: '/eq-5.jpg',
    description: 'เครื่องทำสารให้แห้งภายใต้อุณหภูมิต่ำ (S/N: MTC-27633 | ตัวแทน: บ.SPCRT)',
    specifications: 'Christ Alpha 2-4 LSC, S/N: MTC-27633',
    totalHoursUsed: 60,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-6',
    name: 'UFLC / HPLC System (Shimadzu)',
    category: 'Analytical Chemistry',
    code: '6008-0630-1000-003',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 800,
    status: 'Available',
    image: '/eq-6.jpg',
    description: 'เครื่องวิเคราะห์และแยกสารชนิดเหลวให้บริสุทธิ์ (ตัวแทน: บ.Bara scientific)',
    specifications: 'Shimadzu High-Performance Liquid Chromatography System',
    totalHoursUsed: 110,
    maintenanceThresholdHours: 250
  },
  {
    id: 'eq-7',
    name: 'FPLC Protein Purification System (GE ÄKTA start)',
    category: 'Biochemistry & Protein',
    code: '6008-1060-7000-001',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 750,
    status: 'Available',
    image: '/eq-7.jpg',
    description: 'เครื่องวิเคราะห์และแยกโปรตีนให้บริสุทธิ์ (S/N: 20-703-31 | ตัวแทน: Bangtrading 1992)',
    specifications: 'GE / Cytiva ÄKTA start FPLC System, S/N: 20-703-31',
    totalHoursUsed: 75,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-8',
    name: 'Rotary Evaporator (KNF)',
    category: 'Sample Extraction',
    code: 'EQ-MS302-008',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 350,
    status: 'Available',
    image: '/eq-8.jpg',
    description: 'เครื่องระเหยสารสกัด (S/N: KNF-1563-0324 | ตัวแทน: บ.SPCRT)',
    specifications: 'KNF Rotary Evaporator System, S/N: KNF-1563-0324',
    totalHoursUsed: 40,
    maintenanceThresholdHours: 150
  },
  {
    id: 'eq-9',
    name: 'Centrifuge (Eppendorf)',
    category: 'General Lab Equipment',
    code: '6008-0631-3000-005',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 200,
    status: 'Available',
    image: '/eq-9.jpg',
    description: 'เครื่องปั่นเหวี่ยงตกตะกอนสาร (S/N: 5811-FN-079185 | ตัวแทน: Eppendorf Thailand)',
    specifications: 'Eppendorf Centrifuge 5810/5810 R, S/N: 5811-FN-079185',
    totalHoursUsed: 95,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-10',
    name: 'Microplate Reader (PerkinElmer)',
    category: 'Immunology & Assay',
    code: 'EQ-MS302-010',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 400,
    status: 'Available',
    image: '/eq-10.jpg',
    description: 'เครื่องวัดปริมาณสารทางด้านภูมิคุ้มกันวิทยา (S/N: 3400-5-2203-171 | ตัวแทน: Bangtrading 1992)',
    specifications: 'PerkinElmer Microplate Reader, S/N: 3400-5-2203-171',
    totalHoursUsed: 50,
    maintenanceThresholdHours: 150
  },
  {
    id: 'eq-11',
    name: 'ChemiDoc Gel Imaging System (Bio-Rad)',
    category: 'Molecular & Gel Imaging',
    code: '6008-0124-0000-02',
    location: 'ห้องปฏิบัติการ MS302',
    ratePerHour: 450,
    status: 'Available',
    image: '/eq-11.jpg',
    description: 'เครื่องถ่ายภาพเจลและบันทึกผลการทดลอง (S/N: T32-BR-1944 | บำรุงรักษาล่าสุด: Malikou)',
    specifications: 'Bio-Rad ChemiDoc Gel Imaging System, S/N: T32-BR-1944',
    totalHoursUsed: 85,
    maintenanceThresholdHours: 200
  },
  {
    id: 'eq-12',
    name: 'ห้องปฏิบัติการเพาะเลี้ยงเซลล์ MS302/1',
    category: 'Laboratory Room',
    code: 'ROOM-MS302/1',
    location: 'ห้องปฏิบัติการ MS302/1',
    ratePerHour: 500,
    status: 'Available',
    image: '/eq-12.jpg',
    description: 'ห้องปฏิบัติการเพาะเลี้ยงเซลล์ พร้อมตู้ชีวอนามัยและอุปกรณ์มาตรฐาน',
    specifications: 'Cell Culture Facility MS302/1',
    totalHoursUsed: 120,
    maintenanceThresholdHours: 500
  },
  {
    id: 'eq-13',
    name: 'ห้องปฏิบัติการจุลชีววิทยาทางการแพทย์ MS408',
    category: 'Laboratory Room',
    code: 'ROOM-MS408',
    location: 'ห้องปฏิบัติการ MS408 ชั้น 4',
    ratePerHour: 500,
    status: 'Available',
    image: '/eq-13.jpg',
    description: 'ห้องปฏิบัติการเพาะเลี้ยงและทดสอบจุลชีพทางการแพทย์',
    specifications: 'Medical Microbiology Laboratory MS408 Facility',
    totalHoursUsed: 140,
    maintenanceThresholdHours: 500
  }
];

const INITIAL_USERS = [
  {
    uid: 'admin-001',
    displayName: 'ดร.สมศักดิ์ ผู้ดูแลระบบแล็บ',
    email: 'admin@buu.ac.th',
    phone: '038-103-157',
    studentId: 'ADMIN-01',
    userType: 'นักวิทยาศาสตร์',
    department: 'ศูนย์บริการเครื่องมือวิทยาศาสตร์กลาง',
    affiliationType: 'ภายในคณะสหเวชศาสตร์',
    role: 'Admin',
    isBanned: false,
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    creditLimit: 100000
  }
];

const formatThaiDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(amount || 0);
};

export default function App() {
  // --- STATES ---
  const [currentUser, setCurrentUser] = useState(null);
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState('catalog');
  const [equipmentList, setEquipmentList] = useState(INITIAL_EQUIPMENT);
  const [bookings, setBookings] = useState([]);
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [creditLogs, setCreditLogs] = useState([]);
  
  // Auth & Sync State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginEmail, setLoginEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Popups
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

  // Forms
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    email: '',
    phone: '',
    userType: 'นิสิต',
    department: '',
    affiliationType: 'ภายในคณะสหเวชศาสตร์'
  });

  const [registerForm, setRegisterForm] = useState({
    displayName: '',
    email: '',
    phone: '',
    studentId: '',
    userType: 'นิสิต',
    department: '',
    affiliationType: 'ภายในคณะสหเวชศาสตร์'
  });

  const [bookingForm, setBookingForm] = useState({
    equipmentId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '11:00',
    purpose: ''
  });

  const [eqForm, setEqForm] = useState({
    name: '',
    category: 'Analytical Chemistry',
    code: '',
    location: '',
    ratePerHour: 500,
    status: 'Available',
    image: '',
    description: '',
    specifications: '',
    maintenanceThresholdHours: 200
  });

  const [maintForm, setMaintForm] = useState({
    equipmentId: '',
    type: 'Preventive Maintenance',
    technician: '',
    cost: '',
    details: ''
  });

  // Filters & Analytics
  const [calendarFilterEq, setCalendarFilterEq] = useState('ALL');
  const [adminLogFilterEq, setAdminLogFilterEq] = useState('ALL');
  const [adminLogFilterUser, setAdminLogFilterUser] = useState('ALL');
  const [adminLogStartDate, setAdminLogStartDate] = useState('');
  const [adminLogEndDate, setAdminLogEndDate] = useState('');

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // --- ดึงข้อมูล REAL-TIME จาก GOOGLE SHEETS ---
  const fetchLiveData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.status === "success") {
        if (json.data.equipments && json.data.equipments.length > 0) setEquipmentList(json.data.equipments);
        if (json.data.users && json.data.users.length > 0) setUsersList(json.data.users);
        if (json.data.bookings) setBookings(json.data.bookings);
        if (json.data.maintenanceLogs) setMaintenanceLogs(json.data.maintenanceLogs);
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

  // Remaining Credit Calculation
  const remainingCredit = useMemo(() => {
    if (!currentUser) return 0;
    const userUpcomingBookings = bookings.filter(
      (b) => b.userId === currentUser.uid && b.status === 'Upcoming'
    );
    const usedCost = userUpcomingBookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);
    return Math.max(0, (Number(currentUser.creditLimit) || 50000) - usedCost);
  }, [currentUser, bookings]);

  // Calculate booking hours & cost
  const calculatedBookingDetails = useMemo(() => {
    const eq = equipmentList.find((item) => item.id === bookingForm.equipmentId);
    if (!eq || !bookingForm.startTime || !bookingForm.endTime) {
      return { hours: 0, totalCost: 0, valid: false, error: '' };
    }
    const start = parseInt(bookingForm.startTime.split(':')[0], 10);
    const end = parseInt(bookingForm.endTime.split(':')[0], 10);
    const hours = end - start;
    if (hours <= 0) return { hours: 0, totalCost: 0, valid: false, error: 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น' };
    return { hours, totalCost: hours * (Number(eq.ratePerHour) || 0), valid: true, error: '' };
  }, [bookingForm, equipmentList]);

  // Admin Log Filters
  const filteredAdminBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (adminLogFilterEq !== 'ALL' && b.equipmentId !== adminLogFilterEq) return false;
      if (adminLogFilterUser !== 'ALL' && b.userId !== adminLogFilterUser) return false;
      if (adminLogStartDate && b.date < adminLogStartDate) return false;
      if (adminLogEndDate && b.date > adminLogEndDate) return false;
      return true;
    });
  }, [bookings, adminLogFilterEq, adminLogFilterUser, adminLogStartDate, adminLogEndDate]);

  // Calendar Filter
  const filteredCalendarBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (b.status === 'Cancelled') return false;
      if (calendarFilterEq === 'ALL') return true;
      return b.equipmentId === calendarFilterEq;
    });
  }, [bookings, calendarFilterEq]);

  // Analytics Computation
  const equipmentUsageAnalytics = useMemo(() => {
    return equipmentList.map(eq => {
      const eqBookings = bookings.filter(b => b.equipmentId === eq.id && b.status === 'Upcoming');
      const totalHours = eqBookings.reduce((sum, b) => sum + (Number(b.durationHours) || 0), 0) + (Number(eq.totalHoursUsed) || 0);
      const totalRevenue = eqBookings.reduce((sum, b) => sum + (Number(b.totalCost) || 0), 0);
      return {
        id: eq.id,
        name: eq.name,
        code: eq.code,
        totalHours,
        totalRevenue,
        threshold: Number(eq.maintenanceThresholdHours) || 200,
        bookingCount: eqBookings.length
      };
    });
  }, [equipmentList, bookings]);

  const maxUsageHours = useMemo(() => Math.max(...equipmentUsageAnalytics.map(a => a.totalHours), 100), [equipmentUsageAnalytics]);
  const maxRevenue = useMemo(() => Math.max(...equipmentUsageAnalytics.map(a => a.totalRevenue), 10000), [equipmentUsageAnalytics]);

  const isAdmin = currentUser?.role === 'Admin';

  // Export CSV Handlers
  const handleExportCSV = () => {
    if (filteredAdminBookings.length === 0) {
      showToast('ไม่มีข้อมูลการใช้งานที่จะส่งออก', 'warning');
      return;
    }
    const headers = ['Booking ID', 'Equipment Name', 'User Name', 'Date', 'Start Time', 'End Time', 'Hours', 'Cost (THB)', 'Purpose', 'Status'];
    const rows = filteredAdminBookings.map(b => [
      b.id, `"${b.equipmentName}"`, `"${b.userName}"`, b.date, b.startTime, b.endTime, b.durationHours, b.totalCost, `"${b.purpose || ''}"`, b.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHS_Equipment_Usage_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ดาวน์โหลดรายงาน CSV เรียบร้อยแล้ว', 'success');
  };

  const handleExportUsersCSV = () => {
    if (usersList.length === 0) {
      showToast('ไม่มีข้อมูลผู้ใช้งานที่จะส่งออก', 'warning');
      return;
    }
    const headers = ['UID / StudentID', 'Name', 'Email', 'Phone', 'User Type', 'Department', 'Affiliation', 'Credit Limit (THB)', 'Status'];
    const rows = usersList.map(u => [
      `"${u.studentId || u.uid}"`, `"${u.displayName}"`, `"${u.email}"`, `"${u.phone || '-'}"`, `"${u.userType || 'นิสิต'}"`, `"${u.department || ''}"`, `"${u.affiliationType || 'ภายในคณะ'}"`, u.creditLimit, u.isBanned ? 'Banned' : 'Active'
    ]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHS_Users_Directory_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ดาวน์โหลดรายชื่อผู้ใช้เป็น CSV เรียบร้อยแล้ว', 'success');
  };

  // --- AUTHENTICATION HANDLERS ---
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const emailInput = loginEmail.trim().toLowerCase();
    const foundUser = usersList.find((u) => u.email.trim().toLowerCase() === emailInput);

    if (foundUser) {
      if (foundUser.isBanned) {
        showToast('บัญชีนี้ถูกระงับสิทธิ์การใช้งาน กรุณาติดต่อผู้ดูแลระบบ', 'error');
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

    const newUser = {
      uid: `usr-${Date.now()}`,
      displayName: registerForm.displayName,
      email: email,
      phone: registerForm.phone,
      studentId: registerForm.studentId,
      userType: registerForm.userType,
      department: registerForm.department,
      affiliationType: registerForm.affiliationType,
      role: 'User',
      isBanned: false,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(registerForm.displayName)}&background=0284c7&color=fff`,
      creditLimit: registerForm.userType === 'อาจารย์' ? 65000 : 50000
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'saveUser', data: newUser })
      });
      setUsersList((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
      showToast(`ลงทะเบียนสำเร็จ! ยินดีต้อนรับคุณ ${newUser.displayName}`, 'success');
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูลลง Google Sheets', 'error');
    }
  };

  const handleVerifyAdminPasscode = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123') {
      const adminAcc = usersList.find((u) => u.role === 'Admin') || INITIAL_USERS[0];
      setCurrentUser(adminAcc);
      setShowAdminAuthModal(false);
      showToast('เข้าสู่ระบบสิทธิ์ผู้ดูแลระบบ (Admin) สำเร็จ', 'success');
    } else {
      setAdminAuthError('รหัสผ่าน Admin ไม่ถูกต้อง (ลองใช้: admin123)');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  // --- BOOKING ACTIONS ---
  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('กรุณาเข้าสู่ระบบก่อนทำรายการจอง', 'warning');
      return;
    }
    if (currentUser.isBanned) {
      showToast('บัญชีของคุณถูกงดใช้สิทธิ์ชั่วคราว ไม่สามารถจองเครื่องมือได้', 'error');
      return;
    }
    if (!calculatedBookingDetails.valid) {
      showToast(calculatedBookingDetails.error || 'กรุณาเลือกช่วงเวลาให้ถูกต้อง', 'error');
      return;
    }
    if (remainingCredit < calculatedBookingDetails.totalCost) {
      showToast('วงเงินฟรีเครดิตคงเหลือไม่เพียงพอสำหรับช่วงเวลานี้', 'error');
      return;
    }

    const targetEquipment = equipmentList.find((item) => item.id === bookingForm.equipmentId);
    
    // Check Time Conflict
    const hasConflict = bookings.some(
      (b) =>
        b.equipmentId === bookingForm.equipmentId &&
        b.date === bookingForm.date &&
        b.status === 'Upcoming' &&
        ((bookingForm.startTime >= b.startTime && bookingForm.startTime < b.endTime) ||
          (bookingForm.endTime > b.startTime && bookingForm.endTime <= b.endTime) ||
          (bookingForm.startTime <= b.startTime && bookingForm.endTime >= b.endTime))
    );

    if (hasConflict) {
      showToast('ช่วงเวลานี้ถูกจองไปแล้ว กรุณาเลือกวันหรือเวลาอื่น', 'error');
      return;
    }

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
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'createBooking', data: newBooking })
      });
      setBookings([newBooking, ...bookings]);
      showToast(`จองคิวสำเร็จ! รหัส ${newBooking.id} บันทึกลง Google Sheets เรียบร้อย`, 'success');
      setBookingForm({
        equipmentId: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '11:00',
        purpose: ''
      });
      setActiveTab('history');
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการส่งข้อมูลจองคิวไปยัง Google Sheets', 'error');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'cancelBooking', bookingId: bookingId })
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
      );
      showToast('ยกเลิกรายการจองและคืนเครดิตใน Google Sheets เรียบร้อยแล้ว', 'success');
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการส่งคำขอยกเลิกไปยัง Google Sheets', 'error');
    }
  };

  // --- ADMIN & PROFILE ACTIONS ---
  const handleOpenEditProfileModal = () => {
    if (!currentUser) return;
    setProfileForm({
      displayName: currentUser.displayName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      userType: currentUser.userType || 'นิสิต',
      department: currentUser.department || '',
      affiliationType: currentUser.affiliationType || 'ภายในคณะสหเวชศาสตร์'
    });
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...profileForm };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'saveUser', data: updatedUser })
      });
      setCurrentUser(updatedUser);
      setUsersList((prev) => prev.map((u) => (u.uid === currentUser.uid ? updatedUser : u)));
      setShowEditProfileModal(false);
      showToast('อัปเดตข้อมูลประวัติส่วนตัวใน Google Sheets เรียบร้อยแล้ว', 'success');
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
    }
  };

  const handleSaveAdjustCredit = (e) => {
    e.preventDefault();
    if (!creditAdjustUser) return;
    const parsedCredit = parseFloat(newCreditAmount);
    if (isNaN(parsedCredit) || parsedCredit < 0) {
      showToast('กรุณาระบุจำนวนวงเงินตัวเลขที่ถูกต้อง', 'error');
      return;
    }
    const prevCredit = creditAdjustUser.creditLimit;
    setUsersList((prev) => prev.map((u) => u.uid === creditAdjustUser.uid ? { ...u, creditLimit: parsedCredit } : u));
    if (currentUser?.uid === creditAdjustUser.uid) setCurrentUser({ ...currentUser, creditLimit: parsedCredit });
    setCreditLogs([{ id: `CL-${Math.floor(100+Math.random()*900)}`, targetUserId: creditAdjustUser.uid, targetUserName: creditAdjustUser.displayName, previousCredit: prevCredit, newCredit: parsedCredit, adjustedBy: currentUser.displayName, reason: creditAdjustReason || 'ปรับวงเงินโดย Admin', timestamp: new Date().toISOString() }, ...creditLogs]);
    showToast(`ปรับวงเงินให้คุณ ${creditAdjustUser.displayName} เป็น ${formatCurrency(parsedCredit)} เรียบร้อยแล้ว`, 'success');
    setShowAdjustCreditModal(false);
  };

  const handleToggleBanUser = (uid) => {
    setUsersList((prev) => prev.map((u) => u.uid === uid ? { ...u, isBanned: !u.isBanned } : u));
    showToast('ปรับสถานะการงดใช้สิทธิ์เรียบร้อยแล้ว', 'info');
  };

  const handleSaveEquipment = (e) => {
    e.preventDefault();
    if (editingEq) {
      setEquipmentList((prev) => prev.map((item) => item.id === editingEq.id ? { ...item, ...eqForm, ratePerHour: parseFloat(eqForm.ratePerHour)||0 } : item));
      showToast('แก้ไขข้อมูลเครื่องมือเรียบร้อยแล้ว', 'success');
    } else {
      setEquipmentList([...equipmentList, { id: `eq-${Date.now()}`, ...eqForm, ratePerHour: parseFloat(eqForm.ratePerHour)||0, totalHoursUsed: 0 }]);
      showToast('เพิ่มเครื่องมือใหม่เรียบร้อยแล้ว', 'success');
    }
    setShowAddEqModal(false);
  };

  const handleSaveMaintenanceLog = (e) => {
    e.preventDefault();
    const eq = equipmentList.find((i) => i.id === maintForm.equipmentId);
    if (!eq) return;
    const newLog = { id: `M-${Math.floor(100+Math.random()*900)}`, equipmentId: eq.id, equipmentName: eq.name, date: new Date().toISOString().split('T')[0], type: maintForm.type, technician: maintForm.technician, cost: parseFloat(maintForm.cost)||0, details: maintForm.details };
    setMaintenanceLogs([newLog, ...maintenanceLogs]);
    setEquipmentList((prev) => prev.map((i) => (i.id === eq.id ? { ...i, status: 'Maintenance' } : i)));
    showToast('บันทึกประวัติการส่งซ่อมบำรุงเรียบร้อยแล้ว', 'success');
    setShowAddMaintModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium ${
            notification.type === 'error' ? 'bg-rose-600 text-white' :
            notification.type === 'warning' ? 'bg-amber-500 text-white' :
            notification.type === 'info' ? 'bg-sky-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* HEADER & BRANDING */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white border-b-4 border-amber-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Microscope className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  AHS BUU Central Lab System
                </span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  ระบบบริการเครื่องมือวิจัย คณะสหเวชศาสตร์
                </h1>
                <p className="text-xs text-slate-300">มหาวิทยาลัยบูรพา (Faculty of Allied Health Sciences)</p>
              </div>
            </div>

            {/* Account Quick Selectors & Profile */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
              {!currentUser ? (
                <button
                  onClick={() => { setAdminPasscode(''); setAdminAuthError(''); setShowAdminAuthModal(true); }}
                  className="bg-rose-600/90 hover:bg-rose-600 text-white font-bold px-3 py-2 rounded-xl border border-rose-400/40 text-xs flex items-center gap-1.5 shadow"
                >
                  <Shield className="w-3.5 h-3.5" /> ล็อกอิน Admin
                </button>
              ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 px-3 flex items-center gap-2.5 shadow-inner">
                  <img src={currentUser.photoURL} alt={currentUser.displayName} className={`w-9 h-9 rounded-full border-2 object-cover ${isAdmin ? 'border-rose-400' : 'border-amber-400'}`} />
                  <div className="text-left leading-tight hidden sm:block">
                    <p className="text-xs font-semibold text-white flex items-center gap-1">
                      {currentUser.displayName}
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${isAdmin ? 'bg-rose-500 text-white' : 'bg-amber-400 text-slate-950'}`}>
                        {currentUser.role}
                      </span>
                    </p>
                    <p className="text-[11px] text-amber-300 font-medium">วงเงินคงเหลือ: {formatCurrency(remainingCredit)}</p>
                  </div>
                  <button onClick={handleLogout} title="ลงชื่อออก" className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-all">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* NAVIGATION TABS */}
        {currentUser && (
          <div className="bg-slate-950/50 backdrop-blur border-t border-white/10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 py-2 scrollbar-none">
              <button onClick={() => setActiveTab('catalog')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'catalog' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}><Microscope className="w-4 h-4"/>แคตตาล็อกเครื่องมือ</button>
              <button onClick={() => setActiveTab('booking')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'booking' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}><PlusCircle className="w-4 h-4"/>จองการใช้งาน</button>
              <button onClick={() => setActiveTab('calendar')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'calendar' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}><CalendarIcon className="w-4 h-4"/>ตารางปฏิทิน</button>
              <button onClick={() => setActiveTab('history')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'history' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}><History className="w-4 h-4"/>ประวัติการจอง & คืนเครดิต</button>
              <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}><BarChart3 className="w-4 h-4"/>แดชบอร์ดสรุป</button>

              {isAdmin && (
                <>
                  <div className="h-6 w-px bg-white/20 mx-1 self-center" />
                  <button onClick={() => setActiveTab('admin-analytics')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap ${activeTab === 'admin-analytics' ? 'bg-rose-600 text-white font-semibold' : 'bg-rose-950/60 text-rose-200 border border-rose-800/40'}`}><TrendingUp className="w-4 h-4"/>[Admin] สถิติ & บำรุงรักษา</button>
                  <button onClick={() => setActiveTab('admin-eq')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap ${activeTab === 'admin-eq' ? 'bg-rose-600 text-white font-semibold' : 'bg-rose-950/60 text-rose-200 border border-rose-800/40'}`}><Settings className="w-4 h-4"/>[Admin] จัดการเครื่องมือ</button>
                  <button onClick={() => setActiveTab('admin-maint')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap ${activeTab === 'admin-maint' ? 'bg-rose-600 text-white font-semibold' : 'bg-rose-950/60 text-rose-200 border border-rose-800/40'}`}><Wrench className="w-4 h-4"/>[Admin] ประวัติการซ่อมบำรุง</button>
                  <button onClick={() => setActiveTab('admin-users')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap ${activeTab === 'admin-users' ? 'bg-rose-600 text-white font-semibold' : 'bg-rose-950/60 text-rose-200 border border-rose-800/40'}`}><DollarSign className="w-4 h-4"/>[Admin] จัดการผู้ใช้ & เครดิต</button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MAIN BODY CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* หน้าเข้าสู่ระบบ & ลงทะเบียนครั้งแรก (เมื่อยังไม่ได้ล็อกอิน) */}
        {!currentUser ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6 animate-fadeIn">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-amber-400 shadow-md">
                <Microscope className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {authMode === 'login' ? 'เข้าสู่ระบบบริการเครื่องมือวิจัย' : 'ลงทะเบียนใช้งานครั้งแรก'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">คณะสหเวชศาสตร์ มหาวิทยาลัยบูรพา (AHS BUU)</p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button 
                onClick={() => setAuthMode('login')} 
                className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                เข้าสู่ระบบ
              </button>
              <button 
                onClick={() => setAuthMode('register')} 
                className={`flex-1 py-2 rounded-lg transition-all ${authMode === 'register' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                ลงทะเบียนใหม่
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">อีเมล ม.บูรพา (@buu.ac.th หรือ @go.buu.ac.th) *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="username@go.buu.ac.th"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full p-3.5 bg-slate-50 border rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-bold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" /> เข้าสู่ระบบ
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                  <input 
                    type="text" required placeholder="นายสมชาย ใจดี"
                    value={registerForm.displayName}
                    onChange={(e) => setRegisterForm({...registerForm, displayName: e.target.value})}
                    className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">รหัสนิสิต/บุคลากร *</label>
                    <input 
                      type="text" required placeholder="6503XXXX"
                      value={registerForm.studentId}
                      onChange={(e) => setRegisterForm({...registerForm, studentId: e.target.value})}
                      className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                    <input 
                      type="tel" required placeholder="08X-XXX-XXXX"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                      className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">อีเมล ม.บูรพา *</label>
                  <input 
                    type="email" required placeholder="name@go.buu.ac.th"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">สถานะผู้ใช้งาน *</label>
                    <select 
                      value={registerForm.userType}
                      onChange={(e) => setRegisterForm({...registerForm, userType: e.target.value})}
                      className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                    >
                      <option value="นิสิต">นิสิต (Student)</option>
                      <option value="ผู้ช่วยนักวิจัย">ผู้ช่วยนักวิจัย</option>
                      <option value="อาจารย์">อาจารย์</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ภาควิชา/สังกัด *</label>
                    <input 
                      type="text" required placeholder="เทคนิคการแพทย์"
                      value={registerForm.department}
                      onChange={(e) => setRegisterForm({...registerForm, department: e.target.value})}
                      className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md mt-2 flex items-center justify-center gap-2">
                  <UserCheck className="w-4 h-4" /> ยืนยันการลงทะเบียน (ซิงค์ Google Sheets)
                </button>
              </form>
            )}
          </div>
        ) : (
          /* เนื้อหาแอปพลิเคชันเต็มรูปแบบ เมื่อเข้าสู่ระบบแล้ว */
          <div className="space-y-6">

            {/* User Credit Banner Card */}
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
                      {currentUser.displayName} ({currentUser.userType || 'ผู้ใช้'}) • <strong className="text-slate-100">{currentUser.department || 'สังกัด ม.บูรพา'}</strong>
                    </p>
                    <button onClick={handleOpenEditProfileModal} className="bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 px-2.5 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all">
                      <Edit className="w-3 h-3" /> แก้ไขประวัติ
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-white/10 w-full md:w-auto justify-around">
                <div className="text-center px-3">
                  <p className="text-[11px] text-slate-400 uppercase">วงเงินรวม</p>
                  <p className="text-sm font-bold text-slate-200">{formatCurrency(currentUser.creditLimit)}</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center px-3">
                  <p className="text-[11px] text-slate-400 uppercase">ใช้ไปแล้ว</p>
                  <p className="text-sm font-bold text-rose-400">{formatCurrency(currentUser.creditLimit - remainingCredit)}</p>
                </div>
              </div>
            </div>

            {/* TAB 1: EQUIPMENT CATALOG */}
            {activeTab === 'catalog' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Microscope className="w-5 h-5 text-amber-500" /> รายการเครื่องมือวิทยาศาสตร์ชั้นสูง (MS302 & MS408)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">เลือกเครื่องมือที่ต้องการใช้งานเพื่อจองคิว หรือตรวจสอบอัตราค่าบริการ</p>
                  </div>
                  <span className="text-xs text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl">มีทั้งหมด <strong>{equipmentList.length}</strong> รายการ</span>
                </div>

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
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="text-[11px] font-mono text-slate-400 mb-1">{eq.code}</div>
                          <h3 className="text-base font-bold text-slate-900 line-clamp-2">{eq.name}</h3>
                          <p className="text-xs text-slate-600 mt-2 line-clamp-2">{eq.description}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">อัตราค่าบริการ</span>
                            <span className="text-lg font-bold text-indigo-900">{formatCurrency(eq.ratePerHour)}</span><span className="text-xs text-slate-500"> /ชม.</span>
                          </div>
                          <button
                            disabled={eq.status !== 'Available'}
                            onClick={() => { setBookingForm((prev) => ({ ...prev, equipmentId: eq.id })); setActiveTab('booking'); }}
                            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow ${eq.status === 'Available' ? 'bg-amber-400 hover:bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                          >
                            <PlusCircle className="w-4 h-4" /> จองเครื่องนี้
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: BOOKING FORM */}
            {activeTab === 'booking' && (
              <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6 animate-fadeIn">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><PlusCircle className="w-6 h-6 text-amber-500" /> จองคิวใช้งานเครื่องมือ</h2>
                  <p className="text-xs text-slate-500 mt-1">กรอกรายละเอียด วัน เวลา และวัตถุประสงค์ในการเข้าใช้งาน</p>
                </div>
                <form onSubmit={handleCreateBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">1. เลือกเครื่องมือวิทยาศาสตร์ *</label>
                    <select required value={bookingForm.equipmentId} onChange={(e) => setBookingForm({ ...bookingForm, equipmentId: e.target.value })} className="w-full p-3.5 bg-slate-50 border rounded-2xl text-xs font-semibold">
                      <option value="">-- กรุณาเลือกเครื่องมือ --</option>
                      {equipmentList.map((eq) => (
                        <option key={eq.id} value={eq.id} disabled={eq.status !== 'Available'}>{eq.name} ({formatCurrency(eq.ratePerHour)}/ชม.)</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">2. วันที่จอง *</label>
                      <input type="date" required min={new Date().toISOString().split('T')[0]} value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="w-full p-3.5 bg-slate-50 border rounded-2xl text-xs font-semibold" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">เวลาเริ่ม *</label>
                      <select value={bookingForm.startTime} onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })} className="w-full p-3.5 bg-slate-50 border rounded-2xl text-xs">
                        {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'].map((t) => <option key={t} value={t}>{t} น.</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">เวลาสิ้นสุด *</label>
                      <select value={bookingForm.endTime} onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })} className="w-full p-3.5 bg-slate-50 border rounded-2xl text-xs">
                        {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map((t) => <option key={t} value={t}>{t} น.</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">3. วัตถุประสงค์ในการทดลอง *</label>
                    <textarea rows="3" required value={bookingForm.purpose} onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })} placeholder="ระบุโครงการวิจัย..." className="w-full p-3.5 bg-slate-50 border rounded-2xl text-xs" />
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-slate-400">ระยะเวลา:</span><span className="font-bold text-amber-300">{calculatedBookingDetails.hours} ชม.</span></div>
                    <div className="flex justify-between text-xs"><span className="text-slate-400">ค่าบริการรวม:</span><span className="text-xl font-bold text-amber-400">{formatCurrency(calculatedBookingDetails.totalCost)}</span></div>
                  </div>
                  <button type="submit" disabled={!calculatedBookingDetails.valid || (remainingCredit - calculatedBookingDetails.totalCost < 0)} className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" /> ยืนยันการจองคิว (ซิงค์ Google Sheets)
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: CALENDAR */}
            {activeTab === 'calendar' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-amber-500" /> ตารางปฏิทินแสดงคิวการจอง</h2>
                  <select value={calendarFilterEq} onChange={(e) => setCalendarFilterEq(e.target.value)} className="bg-slate-50 border rounded-xl px-3 py-2 text-xs font-semibold">
                    <option value="ALL">เครื่องมือทั้งหมด ({equipmentList.length})</option>
                    {equipmentList.map(eq => <option key={eq.id} value={eq.id}>{eq.name}</option>)}
                  </select>
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCalendarBookings.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-slate-400 text-xs">ไม่มีคิวการจองในขณะนี้</div>
                  ) : (
                    filteredCalendarBookings.map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
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
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><History className="w-5 h-5 text-amber-500" /> ประวัติการจองและระบบคืนเครดิต</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 border-b text-xs font-bold text-slate-500 uppercase">
                      <tr><th className="px-6 py-4">รหัสการจอง</th><th className="px-6 py-4">เครื่องมือ</th><th className="px-6 py-4">วันที่ / เวลา</th><th className="px-6 py-4 text-right">ค่าบริการ</th><th className="px-6 py-4 text-center">สถานะ</th><th className="px-6 py-4 text-center">การจัดการ</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {bookings.filter(b => b.userId === currentUser.uid).length === 0 ? (
                        <tr><td colSpan="6" className="py-12 text-center text-slate-400 text-xs">ยังไม่มีประวัติการจอง</td></tr>
                      ) : (
                        bookings.filter(b => b.userId === currentUser.uid).map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 font-mono font-bold text-xs text-indigo-900">{b.id}</td>
                            <td className="px-6 py-4"><div className="font-bold text-slate-900">{b.equipmentName}</div><div className="text-xs text-slate-400">{b.purpose}</div></td>
                            <td className="px-6 py-4 text-xs"><div className="font-semibold">{formatThaiDate(b.date)}</div><div className="text-slate-500">{b.startTime} - {b.endTime} น.</div></td>
                            <td className="px-6 py-4 text-right font-bold">{formatCurrency(b.totalCost)}</td>
                            <td className="px-6 py-4 text-center"><span className={`text-xs font-bold px-3 py-1 rounded-full ${b.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{b.status === 'Upcoming' ? 'จองสำเร็จ' : 'ยกเลิกแล้ว'}</span></td>
                            <td className="px-6 py-4 text-center">
                              {b.status === 'Upcoming' ? (
                                <button onClick={() => handleCancelBooking(b.id)} className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs border border-rose-200 flex items-center gap-1 mx-auto"><XCircle className="w-3.5 h-3.5" /> ยกเลิก & คืนเครดิต</button>
                              ) : <span className="text-xs text-slate-400 italic">คืนเครดิตแล้ว</span>}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border"><h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-amber-500" /> แดชบอร์ดสรุปภาพรวมการใช้งาน</h2></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center"><CreditCard className="w-6 h-6"/></div><div><p className="text-xs text-slate-400 font-semibold uppercase">เครดิตคงเหลือ</p><p className="text-2xl font-extrabold">{formatCurrency(remainingCredit)}</p></div></div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><Clock className="w-6 h-6"/></div><div><p className="text-xs text-slate-400 font-semibold uppercase">ชั่วโมงที่จองรวม</p><p className="text-2xl font-extrabold">{bookings.filter(b => b.userId === currentUser.uid && b.status === 'Upcoming').reduce((sum, b) => sum + (Number(b.durationHours)||0), 0)} ชม.</p></div></div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle className="w-6 h-6"/></div><div><p className="text-xs text-slate-400 font-semibold uppercase">รายการจองสมบูรณ์</p><p className="text-2xl font-extrabold">{bookings.filter(b => b.userId === currentUser.uid && b.status === 'Upcoming').length} รายการ</p></div></div>
                </div>
              </div>
            )}

            {/* ADMIN ONLY TABS */}
            {activeTab === 'admin-analytics' && isAdmin && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-rose-500" /> การวิเคราะห์สถิติ & ดัชนีบำรุงรักษา</h2>
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

            {activeTab === 'admin-eq' && isAdmin && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Settings className="w-5 h-5 text-rose-500" /> จัดการเครื่องมือวิทยาศาสตร์ (CRUD)</h2>
                  <button onClick={() => { setEditingEq(null); setEqForm({ name:'', category:'Analytical Chemistry', code:'', location:'', ratePerHour:500, status:'Available', image:'', description:'', specifications:'', maintenanceThresholdHours:200 }); setShowAddEqModal(true); }} className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"><Plus className="w-4 h-4"/> เพิ่มเครื่องมือใหม่</button>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 border-b text-xs font-bold uppercase"><tr><th className="px-6 py-4">เครื่องมือ</th><th className="px-6 py-4">สถานที่ตั้ง</th><th className="px-6 py-4 text-right">ค่าบริการ</th><th className="px-6 py-4 text-center">สถานะ</th><th className="px-6 py-4 text-center">จัดการ</th></tr></thead>
                    <tbody className="divide-y divide-slate-200">
                      {equipmentList.map((eq) => (
                        <tr key={eq.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4"><div className="font-bold text-slate-900">{eq.name}</div><div className="text-xs text-slate-400">{eq.code}</div></td>
                          <td className="px-6 py-4 text-xs">{eq.location}</td>
                          <td className="px-6 py-4 text-right font-bold">{formatCurrency(eq.ratePerHour)}/ชม.</td>
                          <td className="px-6 py-4 text-center"><span className={`text-xs font-bold px-3 py-1 rounded-full ${eq.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{eq.status}</span></td>
                          <td className="px-6 py-4 text-center"><button onClick={() => { setEditingEq(eq); setEqForm(eq); setShowAddEqModal(true); }} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"><Edit className="w-4 h-4"/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'admin-maint' && isAdmin && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Wrench className="w-5 h-5 text-rose-500" /> ประวัติการซ่อมบำรุงรักษา</h2>
                  <button onClick={() => setShowAddMaintModal(true)} className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"><Plus className="w-4 h-4"/> บันทึกงานซ่อมใหม่</button>
                </div>
                <div className="space-y-4">
                  {maintenanceLogs.map((log) => (
                    <div key={log.id} className="bg-white p-6 rounded-3xl shadow-sm border space-y-2">
                      <div className="flex justify-between items-center border-b pb-2"><h3 className="text-base font-bold">{log.equipmentName}</h3><span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">{log.type}</span></div>
                      <p className="text-xs text-slate-600">{log.details}</p>
                      <div className="flex justify-between text-xs text-slate-500 pt-2 border-t"><span>ผู้ดูแล: <strong>{log.technician}</strong></span><span className="text-rose-600 font-bold">{formatCurrency(log.cost)}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'admin-users' && isAdmin && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-2xl shadow-sm border flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><DollarSign className="w-5 h-5 text-rose-500" /> จัดการผู้ใช้งาน & วงเงินเครดิต</h2>
                  <button onClick={handleExportUsersCSV} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow"><Download className="w-4 h-4"/> ส่งออกรายชื่อ (CSV)</button>
                </div>
                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 border-b text-xs font-bold uppercase"><tr><th className="px-6 py-4">ผู้ใช้งาน</th><th className="px-6 py-4">เบอร์โทรศัพท์</th><th className="px-6 py-4">สังกัด</th><th className="px-6 py-4 text-right">วงเงินอนุมัติ</th><th className="px-6 py-4 text-center">การจัดการ</th></tr></thead>
                    <tbody className="divide-y divide-slate-200">
                      {usersList.map((u) => (
                        <tr key={u.uid} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-bold text-slate-900">{u.displayName} <div className="text-xs text-slate-400 font-normal">{u.email}</div></td>
                          <td className="px-6 py-4 text-xs font-semibold">{u.phone || '-'}</td>
                          <td className="px-6 py-4 text-xs">{u.userType} • {u.department}</td>
                          <td className="px-6 py-4 text-right font-bold text-emerald-700">{formatCurrency(u.creditLimit)}</td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <button onClick={() => { setCreditAdjustUser(u); setNewCreditAmount(u.creditLimit); setShowAdjustCreditModal(true); }} className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs mr-2 shadow">ปรับวงเงิน</button>
                            <button onClick={() => handleToggleBanUser(u.uid)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${u.isBanned ? 'bg-emerald-600 text-white' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>{u.isBanned ? 'ปลดระงับ' : 'งดใช้งาน'}</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* --- MODALS --- */}
      {showAdminAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 text-center">ยืนยันตัวตนผู้ดูแลระบบ (Admin Passcode)</h3>
            <form onSubmit={handleVerifyAdminPasscode} className="space-y-4">
              <input type="password" required value={adminPasscode} onChange={(e) => setAdminPasscode(e.target.value)} placeholder="ใส่รหัสผ่าน (ทดสอบ: admin123)" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" />
              {adminAuthError && <p className="text-xs text-rose-600 font-bold">{adminAuthError}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAdminAuthModal(false)} className="w-1/2 py-2.5 bg-slate-100 text-xs font-bold rounded-xl">ยกเลิก</button>
                <button type="submit" className="w-1/2 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl shadow">ยืนยัน</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAdjustCreditModal && creditAdjustUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4">
            <h3 className="text-lg font-bold">ปรับวงเงินฟรีเครดิต ({creditAdjustUser.displayName})</h3>
            <form onSubmit={handleSaveAdjustCredit} className="space-y-4">
              <div><label className="block text-xs font-bold mb-1">วงเงินใหม่ (บาท)</label><input type="number" required value={newCreditAmount} onChange={(e) => setNewCreditAmount(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold" /></div>
              <div><label className="block text-xs font-bold mb-1">เหตุผล</label><textarea required rows="2" value={creditAdjustReason} onChange={(e) => setCreditAdjustReason(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" /></div>
              <div className="flex justify-end gap-2"><button type="button" onClick={() => setShowAdjustCreditModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">ยกเลิก</button><button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow">บันทึก</button></div>
            </form>
          </div>
        </div>
      )}

      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-4">
            <h3 className="text-lg font-bold text-slate-900">แก้ไขข้อมูลประวัติส่วนตัว</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div><label className="block text-xs font-bold mb-1">ชื่อ-นามสกุล *</label><input type="text" required value={profileForm.displayName} onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs font-bold mb-1">เบอร์โทรศัพท์ *</label><input type="tel" required value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" /></div>
                <div><label className="block text-xs font-bold mb-1">อีเมล *</label><input type="email" required value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} className="w-full p-3 bg-slate-50 border rounded-xl text-xs" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowEditProfileModal(false)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl">ยกเลิก</button><button type="submit" className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow">บันทึก</button></div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-medium text-slate-300">© 2026 คณะสหเวชศาสตร์ มหาวิทยาลัยบูรพา (Faculty of Allied Health Sciences, Burapha University)</p>
          <p className="text-slate-500">169 ถนนลงหาดบางแสน ตำบลแสนสุข อำเภอเมือง จังหวัดชลบุรี 20131 | โทรศัพท์: 0-3810-3157</p>
        </div>
      </footer>

    </div>
  );
}
