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
  ChevronLeft, 
  ChevronRight, 
  Microscope, 
  Sparkles,
  Info,
  Building2,
  FileText,
  User,
  Shield,
  BarChart3,
  RefreshCw,
  MapPin,
  Tag,
  Wrench,
  Ban,
  UserX,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Sliders,
  Settings,
  Check,
  Lock,
  DollarSign,
  KeyRound,
  FileSpreadsheet,
  Activity,
  Layers,
  HelpCircle,
  Download,
  PieChart,
  FileDown,
  Phone
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
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
    uid: 'std-65020999',
    displayName: 'ภัทรพล สหเวชบำรุง',
    email: 'user@buu.ac.th',
    phone: '081-234-5678',
    studentId: '65030199',
    userType: 'นิสิต',
    department: 'เทคโนโลยีหัวใจและทรวงอก',
    affiliationType: 'ภายในคณะสหเวชศาสตร์',
    role: 'User',
    isBanned: false,
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    creditLimit: 50000
  },
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
  },
  {
    uid: 'std-65020111',
    displayName: 'นายสมชาย วิจัยดี',
    email: 'somchai.v@go.buu.ac.th',
    phone: '089-876-5432',
    studentId: '65030111',
    userType: 'ผู้ช่วยนักวิจัย',
    department: 'เทคนิคการแพทย์',
    affiliationType: 'ภายในคณะสหเวชศาสตร์',
    role: 'User',
    isBanned: false,
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    creditLimit: 50000
  },
  {
    uid: 'std-65020222',
    displayName: 'ดร.กานดา วิทยาศาสตร์',
    email: 'kanda.w@go.buu.ac.th',
    phone: '086-555-4321',
    studentId: 'STAFF-902',
    userType: 'อาจารย์',
    department: 'กายภาพบำบัด',
    affiliationType: 'ภายในคณะสหเวชศาสตร์',
    role: 'User',
    isBanned: false,
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    creditLimit: 65000
  },
  {
    uid: 'user-banned-01',
    displayName: 'นายอัครเดช ฝ่าฝืนกฎ',
    email: 'akaradech.f@go.buu.ac.th',
    phone: '082-111-2233',
    studentId: '64030044',
    userType: 'นิสิต',
    department: 'โภชนาการและการกำหนดอาหาร',
    affiliationType: 'ภายในคณะสหเวชศาสตร์',
    role: 'User',
    isBanned: true,
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    creditLimit: 50000
  }
];

const INITIAL_BOOKINGS = [
  {
    id: 'B-1001',
    userId: 'std-65020999',
    userName: 'ภัทรพล สหเวชบำรุง',
    equipmentId: 'eq-1',
    equipmentName: 'High-Performance Liquid Chromatography (HPLC)',
    date: '2026-11-10',
    startTime: '09:00',
    endTime: '12:00',
    durationHours: 3,
    totalCost: 2400,
    purpose: 'วิเคราะห์ปริมาณสารต้านอนุมูลอิสระในสมุนไพร',
    status: 'Upcoming',
    createdAt: '2026-11-01T10:00:00Z'
  },
  {
    id: 'B-1002',
    userId: 'std-65020222',
    userName: 'ดร.กานดา วิทยาศาสตร์',
    equipmentId: 'eq-2',
    equipmentName: 'Real-Time PCR System (qPCR)',
    date: '2026-11-12',
    startTime: '13:00',
    endTime: '16:00',
    durationHours: 3,
    totalCost: 3600,
    purpose: 'ทดสอบ Gene Expression ในมะเร็งเต้านม',
    status: 'Upcoming',
    createdAt: '2026-11-02T14:30:00Z'
  },
  {
    id: 'B-1003',
    userId: 'std-65020111',
    userName: 'นายสมชาย วิจัยดี',
    equipmentId: 'eq-3',
    equipmentName: 'Flow Cytometer (BD FACSCelesta)',
    date: '2026-11-08',
    startTime: '10:00',
    endTime: '12:00',
    durationHours: 2,
    totalCost: 3000,
    purpose: 'แยกชนิด T-cell Subset ในผู้ป่วย',
    status: 'Upcoming',
    createdAt: '2026-11-03T09:15:00Z'
  }
];

const INITIAL_MAINTENANCE_LOGS = [
  {
    id: 'M-501',
    equipmentId: 'eq-4',
    equipmentName: 'Transmission Electron Microscope (TEM)',
    date: '2026-11-01',
    type: 'Corrective Maintenance',
    technician: 'บริษัท ซายน์เทค จำกัด (Eng. วิชัย)',
    cost: 15000,
    details: 'เปลี่ยนหลอดกำเนิดอิเล็กตรอน (Filament Replacement) และปรับตั้งศูนย์ลำแสง vacuum pressure'
  },
  {
    id: 'M-502',
    equipmentId: 'eq-1',
    equipmentName: 'High-Performance Liquid Chromatography (HPLC)',
    date: '2026-10-15',
    type: 'Preventive Maintenance',
    technician: 'ศูนย์บริการเครื่องมือวิทยาศาสตร์ ม.บูรพา',
    cost: 4500,
    details: 'ล้างทำความสะอาดปั๊มเปลี่ยน Seal Kit และ Calibration อัตราการไหล'
  }
];

const INITIAL_CREDIT_LOGS = [
  {
    id: 'CL-001',
    targetUserId: 'std-65020222',
    targetUserName: 'ดร.กานดา วิทยาศาสตร์',
    previousCredit: 50000,
    newCredit: 65000,
    adjustedBy: 'ดร.สมศักดิ์ ผู้ดูแลระบบแล็บ',
    reason: 'ได้รับอนุมัติทุนวิจัยเพิ่มเติมประจำไตรมาสที่ 4',
    timestamp: '2026-11-01T09:15:00Z'
  }
];

// Helper to format Thai Date
const formatThaiDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper for formatting Currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 }).format(amount);
};

export default function App() {
  // --- STATES ---
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState('catalog');
  const [equipmentList, setEquipmentList] = useState(INITIAL_EQUIPMENT);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [maintenanceLogs, setMaintenanceLogs] = useState(INITIAL_MAINTENANCE_LOGS);
  const [creditLogs, setCreditLogs] = useState(INITIAL_CREDIT_LOGS);
  
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

  // --- NEW STATE FOR USER PROFILE EDIT MODAL ---
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    email: '',
    phone: '',
    userType: 'นิสิต',
    department: '',
    affiliationType: 'ภายในคณะสหเวชศาสตร์'
  });

  // Forms
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

  const [calendarFilterEq, setCalendarFilterEq] = useState('ALL');

  // --- NEW STATES FOR ADMIN USAGE LOGS & ANALYTICS ---
  const [adminLogFilterEq, setAdminLogFilterEq] = useState('ALL');
  const [adminLogFilterUser, setAdminLogFilterUser] = useState('ALL');
  const [adminLogStartDate, setAdminLogStartDate] = useState('');
  const [adminLogEndDate, setAdminLogEndDate] = useState('');

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Remaining Credit Calculation for Current User
  const remainingCredit = useMemo(() => {
    if (!currentUser) return 0;
    const userUpcomingBookings = bookings.filter(
      (b) => b.userId === currentUser.uid && b.status === 'Upcoming'
    );
    const usedCost = userUpcomingBookings.reduce((sum, b) => sum + b.totalCost, 0);
    return Math.max(0, currentUser.creditLimit - usedCost);
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

    if (hours <= 0) {
      return { hours: 0, totalCost: 0, valid: false, error: 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น' };
    }

    const totalCost = hours * eq.ratePerHour;
    return { hours, totalCost, valid: true, error: '' };
  }, [bookingForm, equipmentList]);

  // Filter Bookings for Admin Usage Report Audit Log
  const filteredAdminBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (adminLogFilterEq !== 'ALL' && b.equipmentId !== adminLogFilterEq) return false;
      if (adminLogFilterUser !== 'ALL' && b.userId !== adminLogFilterUser) return false;
      if (adminLogStartDate && b.date < adminLogStartDate) return false;
      if (adminLogEndDate && b.date > adminLogEndDate) return false;
      return true;
    });
  }, [bookings, adminLogFilterEq, adminLogFilterUser, adminLogStartDate, adminLogEndDate]);

  // Export CSV Data Log Helper
  const handleExportCSV = () => {
    if (filteredAdminBookings.length === 0) {
      showToast('ไม่มีข้อมูลการใช้งานที่จะส่งออก', 'warning');
      return;
    }
    const headers = ['Booking ID', 'Equipment Name', 'User Name', 'Date', 'Start Time', 'End Time', 'Hours', 'Cost (THB)', 'Purpose', 'Status'];
    const rows = filteredAdminBookings.map(b => [
      b.id,
      `"${b.equipmentName}"`,
      `"${b.userName}"`,
      b.date,
      b.startTime,
      b.endTime,
      b.durationHours,
      b.totalCost,
      `"${b.purpose || ''}"`,
      b.status
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

  // --- HELPER TO EXPORT USERS LIST AS CSV FOR ANALYTICS ---
  const handleExportUsersCSV = () => {
    if (usersList.length === 0) {
      showToast('ไม่มีข้อมูลผู้ใช้งานที่จะส่งออก', 'warning');
      return;
    }
    const headers = ['UID / StudentID', 'Name', 'Email', 'Phone', 'User Type', 'Department', 'Affiliation', 'Credit Limit (THB)', 'Status'];
    const rows = usersList.map(u => [
      `"${u.studentId || u.uid}"`,
      `"${u.displayName}"`,
      `"${u.email}"`,
      `"${u.phone || '-'}"`,
      `"${u.userType || 'นิสิต'}"`,
      `"${u.department || ''}"`,
      `"${u.affiliationType || 'ภายในคณะ'}"`,
      u.creditLimit,
      u.isBanned ? 'Banned' : 'Active'
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHS_Users_Directory_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('ดาวน์โหลดรายชื่อและเบอร์โทรศัพท์ผู้ใช้เป็นไฟล์ CSV เรียบร้อยแล้ว', 'success');
  };

  // Compute Statistics for Bar Chart Analytics
  const equipmentUsageAnalytics = useMemo(() => {
    return equipmentList.map(eq => {
      const eqBookings = bookings.filter(b => b.equipmentId === eq.id && b.status === 'Upcoming');
      const totalHours = eqBookings.reduce((sum, b) => sum + b.durationHours, 0) + (eq.totalHoursUsed || 0);
      const totalRevenue = eqBookings.reduce((sum, b) => sum + b.totalCost, 0);
      return {
        id: eq.id,
        name: eq.name,
        code: eq.code,
        totalHours,
        totalRevenue,
        threshold: eq.maintenanceThresholdHours || 200,
        bookingCount: eqBookings.length
      };
    });
  }, [equipmentList, bookings]);

  const maxUsageHours = useMemo(() => {
    return Math.max(...equipmentUsageAnalytics.map(a => a.totalHours), 100);
  }, [equipmentUsageAnalytics]);

  const maxRevenue = useMemo(() => {
    return Math.max(...equipmentUsageAnalytics.map(a => a.totalRevenue), 10000);
  }, [equipmentUsageAnalytics]);

  // Is Current Account Admin?
  const isAdmin = currentUser?.role === 'Admin';

  // Account Switch Helper
  const handleSelectAccount = (user) => {
    if (user.role === 'Admin') {
      setAdminPasscode('');
      setAdminAuthError('');
      setShowAdminAuthModal(true);
    } else {
      setCurrentUser(user);
      if (activeTab.startsWith('admin-')) {
        setActiveTab('catalog');
      }
      showToast(`สลับบัญชีผู้ใช้เป็น ${user.displayName}`, 'info');
    }
  };

  // Verify Admin Passcode
  const handleVerifyAdminPasscode = (e) => {
    e.preventDefault();
    if (adminPasscode === 'admin123') {
      const adminAcc = usersList.find((u) => u.role === 'Admin') || INITIAL_USERS[1];
      setCurrentUser(adminAcc);
      setShowAdminAuthModal(false);
      showToast('เข้าสู่ระบบสิทธิ์ผู้ดูแลระบบ (Admin) สำเร็จ', 'success');
    } else {
      setAdminAuthError('รหัสผ่าน Admin ไม่ถูกต้อง (ลองใช้: admin123)');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('ออกจากระบบแล้ว', 'info');
  };

  // --- HANDLER FOR EDIT PROFILE ---
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

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      displayName: profileForm.displayName,
      email: profileForm.email,
      phone: profileForm.phone,
      userType: profileForm.userType,
      department: profileForm.department,
      affiliationType: profileForm.affiliationType
    };

    // Update currentUser and usersList state
    setCurrentUser(updatedUser);
    setUsersList((prevList) =>
      prevList.map((u) => (u.uid === currentUser.uid ? updatedUser : u))
    );

    setShowEditProfileModal(false);
    showToast('อัปเดตข้อมูลประวัติส่วนตัวเรียบร้อยแล้ว', 'success');
  };

  // Booking Actions
  const handleSelectEquipmentForBooking = (eq) => {
    if (currentUser?.isBanned) {
      showToast('บัญชีของคุณถูกงดใช้สิทธิ์ชั่วคราว ไม่สามารถจองเครื่องมือได้', 'error');
      return;
    }
    setBookingForm((prev) => ({ ...prev, equipmentId: eq.id }));
    setActiveTab('booking');
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('กรุณาล็อกอินก่อนทำรายการจอง', 'warning');
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
    if (!targetEquipment || targetEquipment.status !== 'Available') {
      showToast('เครื่องมือนี้ไม่อยู่ในสถานะพร้อมใช้งาน', 'error');
      return;
    }

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

    setBookings([newBooking, ...bookings]);
    showToast(`จองคิวสำเร็จ! รหัสการจอง ${newBooking.id} (ตัดเครดิต ${formatCurrency(newBooking.totalCost)})`, 'success');

    setBookingForm({
      equipmentId: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '11:00',
      purpose: ''
    });
    setActiveTab('history');
  };

  const handleCancelBooking = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );

    showToast(`ยกเลิกการจองเรียบร้อย ระบบได้คืนเครดิตจำนวน ${formatCurrency(booking.totalCost)} เข้าบัญชีแล้ว`, 'success');
  };

  // Admin Actions
  const handleOpenAdjustCreditModal = (user) => {
    setCreditAdjustUser(user);
    setNewCreditAmount(user.creditLimit);
    setCreditAdjustReason('');
    setShowAdjustCreditModal(true);
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
    const updatedUserList = usersList.map((u) =>
      u.uid === creditAdjustUser.uid ? { ...u, creditLimit: parsedCredit } : u
    );

    setUsersList(updatedUserList);

    if (currentUser?.uid === creditAdjustUser.uid) {
      setCurrentUser({ ...currentUser, creditLimit: parsedCredit });
    }

    const newCreditLog = {
      id: `CL-${Math.floor(100 + Math.random() * 900)}`,
      targetUserId: creditAdjustUser.uid,
      targetUserName: creditAdjustUser.displayName,
      previousCredit: prevCredit,
      newCredit: parsedCredit,
      adjustedBy: currentUser.displayName,
      reason: creditAdjustReason || 'ปรับวงเงินโดย Admin',
      timestamp: new Date().toISOString()
    };

    setCreditLogs([newCreditLog, ...creditLogs]);
    showToast(`ปรับวงเงินให้คุณ ${creditAdjustUser.displayName} เป็น ${formatCurrency(parsedCredit)} เรียบร้อยแล้ว`, 'success');
    setShowAdjustCreditModal(false);
  };

  const handleToggleBanUser = (uid) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.uid === uid) {
          const newBan = !u.isBanned;
          showToast(newBan ? `ระงับสิทธิ์การใช้งานของ ${u.displayName} แล้ว` : `ปลดระงับสิทธิ์การใช้งานของ ${u.displayName} แล้ว`, newBan ? 'warning' : 'success');
          return { ...u, isBanned: newBan };
        }
        return u;
      })
    );
  };

  const handleUpdateEqStatus = (eqId, newStatus) => {
    setEquipmentList((prev) =>
      prev.map((eq) => (eq.id === eqId ? { ...eq, status: newStatus } : eq))
    );
    showToast('อัปเดตสถานะเครื่องมือวิทยาศาสตร์เรียบร้อยแล้ว', 'info');
  };

  const handleDeleteEquipment = (eqId) => {
    setEquipmentList((prev) => prev.filter((item) => item.id !== eqId));
    showToast('ลบรายการเครื่องมือเรียบร้อยแล้ว', 'info');
  };

  const handleOpenEditEqModal = (eq) => {
    setEditingEq(eq);
    setEqForm({
      name: eq.name,
      category: eq.category,
      code: eq.code,
      location: eq.location,
      ratePerHour: eq.ratePerHour,
      status: eq.status,
      image: eq.image,
      description: eq.description,
      specifications: eq.specifications,
      maintenanceThresholdHours: eq.maintenanceThresholdHours || 200
    });
    setShowAddEqModal(true);
  };

  const handleSaveEquipment = (e) => {
    e.preventDefault();
    if (editingEq) {
      setEquipmentList((prev) =>
        prev.map((item) =>
          item.id === editingEq.id
            ? {
                ...item,
                ...eqForm,
                ratePerHour: parseFloat(eqForm.ratePerHour) || 0,
                maintenanceThresholdHours: parseFloat(eqForm.maintenanceThresholdHours) || 200
              }
            : item
        )
      );
      showToast('แก้ไขข้อมูลเครื่องมือเรียบร้อยแล้ว', 'success');
    } else {
      const newEq = {
        id: `eq-${Date.now()}`,
        ...eqForm,
        ratePerHour: parseFloat(eqForm.ratePerHour) || 0,
        maintenanceThresholdHours: parseFloat(eqForm.maintenanceThresholdHours) || 200,
        totalHoursUsed: 0
      };
      setEquipmentList([...equipmentList, newEq]);
      showToast('เพิ่มเครื่องมือใหม่เข้าสู่ระบบเรียบร้อยแล้ว', 'success');
    }
    setShowAddEqModal(false);
  };

  const handleSaveMaintenanceLog = (e) => {
    e.preventDefault();
    const eq = equipmentList.find((i) => i.id === maintForm.equipmentId);
    if (!eq) return;

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

    setMaintenanceLogs([newLog, ...maintenanceLogs]);
    setEquipmentList((prev) =>
      prev.map((i) => (i.id === eq.id ? { ...i, status: 'Maintenance' } : i))
    );

    showToast('บันทึกประวัติการบำรุงรักษาเรียบร้อยแล้ว', 'success');
    setShowAddMaintModal(false);
  };

  // Filter Bookings for Calendar
  const filteredCalendarBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (b.status === 'Cancelled') return false;
      if (calendarFilterEq === 'ALL') return true;
      return b.equipmentId === calendarFilterEq;
    });
  }, [bookings, calendarFilterEq]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium ${
            notification.type === 'error' ? 'bg-rose-600 text-white border-rose-700' :
            notification.type === 'warning' ? 'bg-amber-500 text-white border-amber-600' :
            notification.type === 'info' ? 'bg-sky-600 text-white border-sky-700' :
            'bg-emerald-600 text-white border-emerald-700'
          }`}>
            {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {notification.type === 'warning' && <AlertCircle className="w-5 h-5" />}
            {notification.type === 'info' && <Info className="w-5 h-5" />}
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* --- HEADER & BRANDING --- */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white border-b-4 border-amber-400 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Logo & University Identity */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Microscope className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    AHS BUU Central Lab System
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  ระบบบริการเครื่องมือวิจัย คณะสหเวชศาสตร์
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  มหาวิทยาลัยบูรพา (Faculty of Allied Health Sciences, Burapha University)
                </p>
              </div>
            </div>

            {/* Quick Switch Accounts & Current User Badge */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
              
              {/* Account Quick Selectors */}
              <div className="bg-slate-950/80 p-1 rounded-2xl border border-amber-400/30 flex items-center gap-1 shadow-inner text-xs">
                <span className="text-[10px] text-slate-400 px-2 font-semibold hidden sm:inline">ทดสอบบัญชี:</span>
                <button
                  onClick={() => handleSelectAccount(usersList[0])}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
                    currentUser?.uid === usersList[0].uid ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <User className="w-3 h-3" /> นิสิต (user@buu.ac.th)
                </button>
                <button
                  onClick={() => handleSelectAccount(usersList[1])}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all flex items-center gap-1 ${
                    currentUser?.role === 'Admin' ? 'bg-rose-600 text-white shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Shield className="w-3 h-3" /> Admin (admin@buu.ac.th)
                </button>
              </div>

              {/* User Profile Badge */}
              {currentUser ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 px-3 flex items-center gap-2.5 shadow-inner">
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName} 
                    className={`w-9 h-9 rounded-full border-2 object-cover ${isAdmin ? 'border-rose-400' : 'border-amber-400'}`}
                  />
                  <div className="text-left leading-tight hidden sm:block">
                    <p className="text-xs font-semibold text-white flex items-center gap-1">
                      {currentUser.displayName}
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isAdmin ? 'bg-rose-500 text-white' : 'bg-amber-400 text-slate-950'
                      }`}>
                        {currentUser.role}
                      </span>
                    </p>
                    <p className="text-[11px] text-amber-300 font-medium">
                      วงเงินคงเหลือ: <span className="font-bold text-amber-300">{formatCurrency(remainingCredit)}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="ลงชื่อออก"
                    className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleSelectAccount(usersList[0])}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl shadow border border-amber-500 flex items-center gap-2 text-xs"
                >
                  <LogIn className="w-4 h-4" />
                  เข้าสู่ระบบ
                </button>
              )}

            </div>

          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-slate-950/50 backdrop-blur border-t border-white/10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 py-2 scrollbar-none">
            
            {/* USER TABS */}
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-amber-400 text-slate-950 shadow font-semibold'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Microscope className="w-4 h-4" />
              แคตตาล็อกเครื่องมือ
            </button>

            <button
              onClick={() => setActiveTab('booking')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'booking'
                  ? 'bg-amber-400 text-slate-950 shadow font-semibold'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              จองการใช้งาน
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'calendar'
                  ? 'bg-amber-400 text-slate-950 shadow font-semibold'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              ตารางปฏิทิน
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-amber-400 text-slate-950 shadow font-semibold'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              ประวัติการจอง & คืนเครดิต
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-amber-400 text-slate-950 shadow font-semibold'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              แดชบอร์ดสรุป
            </button>

            {/* ADMIN ONLY TABS (STRICTLY HIDDEN OR LOCKED FOR NON-ADMINS) */}
            {isAdmin && (
              <>
                <div className="h-6 w-px bg-white/20 mx-1 self-center" />

                <button
                  onClick={() => setActiveTab('admin-analytics')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'admin-analytics'
                      ? 'bg-rose-600 text-white shadow font-semibold'
                      : 'bg-rose-950/60 text-rose-200 border border-rose-800/40 hover:bg-rose-900'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  [Admin] สถิติ & บำรุงรักษา
                </button>

                <button
                  onClick={() => setActiveTab('admin-eq')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'admin-eq'
                      ? 'bg-rose-600 text-white shadow font-semibold'
                      : 'bg-rose-950/60 text-rose-200 border border-rose-800/40 hover:bg-rose-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  [Admin] จัดการเครื่องมือ
                </button>

                <button
                  onClick={() => setActiveTab('admin-maint')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'admin-maint'
                      ? 'bg-rose-600 text-white shadow font-semibold'
                      : 'bg-rose-950/60 text-rose-200 border border-rose-800/40 hover:bg-rose-900'
                  }`}
                >
                  <Wrench className="w-4 h-4" />
                  [Admin] ประวัติการซ่อมบำรุง
                </button>

                <button
                  onClick={() => setActiveTab('admin-users')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === 'admin-users'
                      ? 'bg-rose-600 text-white shadow font-semibold'
                      : 'bg-rose-950/60 text-rose-200 border border-rose-800/40 hover:bg-rose-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  [Admin] จัดการผู้ใช้ & วงเงินเครดิต
                </button>
              </>
            )}

          </div>
        </div>
      </header>

      {/* --- MAIN BODY CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* User Credit Banner Card */}
        {currentUser && (
          <div className="mb-8 bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                <CreditCard className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-300 tracking-wider uppercase">สิทธิ์โควต้าฟรีเครดิตวิจัยประจำปี</span>
                <h2 className="text-2xl font-bold text-white mt-0.5">
                  วงเงินคงเหลือ: <span className="text-amber-400 font-extrabold">{formatCurrency(remainingCredit)}</span>
                </h2>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <p className="text-xs text-slate-300">
                    {currentUser.displayName} ({currentUser.userType || 'ผู้ใช้'}) • <strong className="text-slate-100">{currentUser.department || 'สังกัด ม.บูรพา'}</strong>
                  </p>
                  <button
                    onClick={handleOpenEditProfileModal}
                    className="bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 border border-amber-400/40 px-2.5 py-0.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Edit className="w-3 h-3" />
                    แก้ไขประวัติส่วนตัว
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-white/10 w-full md:w-auto justify-around relative z-10">
              <div className="text-center px-3">
                <p className="text-[11px] text-slate-400 uppercase">วงเงินที่ได้รับ</p>
                <p className="text-sm font-bold text-slate-200">{formatCurrency(currentUser.creditLimit)}</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center px-3">
                <p className="text-[11px] text-slate-400 uppercase">ใช้ไปแล้ว</p>
                <p className="text-sm font-bold text-rose-400">{formatCurrency(currentUser.creditLimit - remainingCredit)}</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center px-3">
                <p className="text-[11px] text-slate-400 uppercase">สถานะบัญชี</p>
                <p className={`text-sm font-bold ${currentUser.isBanned ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {currentUser.isBanned ? 'ถูกระงับสิทธิ์' : 'ปกติ (Active)'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: EQUIPMENT CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-amber-500" />
                  รายการเครื่องมือวิทยาศาสตร์ชั้นสูง
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">เลือกเครื่องมือที่ต้องการใช้งานเพื่อจองคิวหรือตรวจสอบอัตราค่าบริการ</p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span>มีทั้งหมด <strong>{equipmentList.length}</strong> รายการ</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipmentList.map((eq) => (
                <div 
                  key={eq.id} 
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img 
                      src={eq.image} 
                      alt={eq.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                        {eq.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md ${
                        eq.status === 'Available' ? 'bg-emerald-500/90 text-white' :
                        eq.status === 'Maintenance' ? 'bg-amber-500/90 text-white' : 'bg-rose-500/90 text-white'
                      }`}>
                        {eq.status === 'Available' ? 'พร้อมใช้งาน' : eq.status === 'Maintenance' ? 'กำลังซ่อมบำรุง' : 'งดบริการ'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 mb-1">{eq.code}</div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">{eq.name}</h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{eq.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{eq.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{eq.specifications}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">อัตราค่าบริการ</span>
                        <span className="text-lg font-bold text-indigo-900">{formatCurrency(eq.ratePerHour)}</span>
                        <span className="text-xs text-slate-500"> / ชม.</span>
                      </div>

                      <button
                        disabled={eq.status !== 'Available'}
                        onClick={() => handleSelectEquipmentForBooking(eq)}
                        className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                          eq.status === 'Available'
                            ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-95'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <PlusCircle className="w-4 h-4" />
                        จองเครื่องนี้
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
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
              <div className="border-b border-slate-100 pb-5 mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-6 h-6 text-amber-500" />
                  จองการใช้งานเครื่องมือวิทยาศาสตร์
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  กรอกรายละเอียด วัน เวลา และวัตถุประสงค์ในการเข้าใช้งานเครื่องมือ
                </p>
              </div>

              <form onSubmit={handleCreateBooking} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    1. เลือกเครื่องมือวิทยาศาสตร์ *
                  </label>
                  <select
                    required
                    value={bookingForm.equipmentId}
                    onChange={(e) => setBookingForm({ ...bookingForm, equipmentId: e.target.value })}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="">-- กรุณาเลือกเครื่องมือ --</option>
                    {equipmentList.map((eq) => (
                      <option key={eq.id} value={eq.id} disabled={eq.status !== 'Available'}>
                        {eq.name} ({formatCurrency(eq.ratePerHour)}/ชม.) {eq.status !== 'Available' ? `[${eq.status}]` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      2. วันที่ต้องการจอง *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      เวลาเริ่มใช้งาน *
                    </label>
                    <select
                      value={bookingForm.startTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                        <option key={time} value={time}>{time} น.</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      เวลาสิ้นสุด *
                    </label>
                    <select
                      value={bookingForm.endTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, endTime: e.target.value })}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                        <option key={time} value={time}>{time} น.</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    3. วัตถุประสงค์ในการทดลอง / หัวข้อวิจัย *
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={bookingForm.purpose}
                    onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })}
                    placeholder="ระบุชื่อโครงการวิจัย หรือตัวอย่างที่ต้องการนำมาทดสอบ..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                {/* Calculation Summary Box */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">ระยะเวลาใช้งาน:</span>
                    <span className="font-bold text-amber-300">{calculatedBookingDetails.hours} ชั่วโมง</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">ค่าบริการรวมทั้งสิ้น:</span>
                    <span className="text-xl font-bold text-amber-400">{formatCurrency(calculatedBookingDetails.totalCost)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">วงเงินคงเหลือหลังหัก:</span>
                    <span className={`font-bold ${remainingCredit - calculatedBookingDetails.totalCost < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {formatCurrency(remainingCredit - calculatedBookingDetails.totalCost)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!calculatedBookingDetails.valid || (remainingCredit - calculatedBookingDetails.totalCost < 0)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                    calculatedBookingDetails.valid && (remainingCredit - calculatedBookingDetails.totalCost >= 0)
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-98'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  ยืนยันการจองคิวใช้งาน
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: RESERVATION CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-amber-500" />
                  ตารางปฏิทินแสดงคิวการจองเครื่องมือ (Reservation Calendar)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">ตรวจสอบช่วงเวลาที่ถูกจองแล้วของเครื่องมือแต่ละชิ้นแบบเรียลไทม์</p>
              </div>

              {/* Equipment Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={calendarFilterEq}
                  onChange={(e) => setCalendarFilterEq(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="ALL">เครื่องมือทั้งหมด ({equipmentList.length})</option>
                  {equipmentList.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calendar Events Grid */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  รายการสล็อตเวลาที่ถูกจองแล้ว
                </span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-3 py-1 rounded-full">
                  ถูกจองแล้ว {filteredCalendarBookings.length} รายการ
                </span>
              </div>

              {filteredCalendarBookings.length === 0 ? (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <CalendarIcon className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                  <p className="text-sm">ไม่มีคิวการจองในขณะนี้ สามารถเลือกจองได้ทุกช่วงเวลา</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCalendarBookings.map((b) => (
                    <div 
                      key={b.id} 
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-all space-y-2 relative"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                          {formatThaiDate(b.date)}
                        </span>
                        <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                          {b.startTime} - {b.endTime} น.
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{b.equipmentName}</h4>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200">
                        <span>ผู้จอง: <strong className="text-slate-700">{b.userName}</strong></span>
                        <span className="text-slate-400">{b.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MY BOOKINGS HISTORY & AUTOMATIC REFUND */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <History className="w-5 h-5 text-amber-500" />
                ประวัติการจองและระบบคืนเครดิตอัตโนมัติ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                รายการจองของคุณ หากยกเลิกก่อนถึงเวลาใช้งาน ระบบจะทำการคืนวงเงินฟรีเครดิตเข้าบัญชีให้ทันที
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">รหัสการจอง</th>
                      <th className="px-6 py-4">เครื่องมือวิทยาศาสตร์</th>
                      <th className="px-6 py-4">วันที่ / เวลา</th>
                      <th className="px-6 py-4 text-right">ค่าบริการ</th>
                      <th className="px-6 py-4 text-center">สถานะ</th>
                      <th className="px-6 py-4 text-center">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {bookings.filter(b => currentUser && b.userId === currentUser.uid).length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-slate-400 text-xs">
                          ยังไม่มีประวัติการจองสำหรับบัญชีนี้
                        </td>
                      </tr>
                    ) : (
                      bookings.filter(b => currentUser && b.userId === currentUser.uid).map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-xs text-indigo-900">{b.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{b.equipmentName}</div>
                            <div className="text-xs text-slate-400 truncate max-w-xs">{b.purpose}</div>
                          </td>
                          <td className="px-6 py-4 text-xs">
                            <div className="font-semibold text-slate-800">{formatThaiDate(b.date)}</div>
                            <div className="text-slate-500">{b.startTime} - {b.endTime} น. ({b.durationHours} ชม.)</div>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900">
                            {formatCurrency(b.totalCost)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                              b.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {b.status === 'Upcoming' ? 'จองสำเร็จ' : 'ยกเลิกแล้ว (คืนเครดิต)'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {b.status === 'Upcoming' ? (
                              <button
                                onClick={() => handleCancelBooking(b.id)}
                                className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs border border-rose-200 transition-all flex items-center gap-1 mx-auto"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                ยกเลิก & คืนเครดิต
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 italic">คืนเครดิตแล้ว</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: USER SUMMARY DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-500" />
                แดชบอร์ดสรุปภาพรวมการใช้งาน (User Dashboard)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">สรุปสถิติจำนวนชั่วโมงและยอดใช้จ่ายวงเงินฟรีเครดิตของคุณ</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">เครดิตคงเหลือ</p>
                  <p className="text-2xl font-extrabold text-slate-900">{formatCurrency(remainingCredit)}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">ชั่วโมงที่จองรวม</p>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {bookings.filter(b => currentUser && b.userId === currentUser.uid && b.status === 'Upcoming').reduce((sum, b) => sum + b.durationHours, 0)} ชม.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">รายการจองที่สมบูรณ์</p>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {bookings.filter(b => currentUser && b.userId === currentUser.uid && b.status === 'Upcoming').length} รายการ
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ADMIN ONLY TABS WITH STRICT AUTHORIZATION GUARD --- */}

        {/* ADMIN TAB 1: PREDICTIVE ANALYTICS & WEAR INDEX */}
        {activeTab === 'admin-analytics' && isAdmin && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-rose-500" />
                  การวิเคราะห์สถิติและการวางแผนบำรุงรักษา (Predictive Analytics & Usage Charts)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">ดัชนีสะสมชั่วโมงใช้งาน กราฟเปรียบเทียบ และรายงานสรุปการใช้เครื่องมือวิทยาศาสตร์</p>
              </div>

              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200">
                Admin Authorized: {currentUser.displayName}
              </span>
            </div>

            {/* --- VISUAL CHARTS SECTION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1: Total Usage Hours per Equipment */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">เปรียบเทียบชั่วโมงใช้งานสะสม (Hours)</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">หน่วย: ชั่วโมง</span>
                </div>

                <div className="space-y-3 pt-2">
                  {equipmentUsageAnalytics.map((item) => {
                    const barWidth = Math.min(100, Math.round((item.totalHours / maxUsageHours) * 100));
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-700 font-bold truncate max-w-[200px]" title={item.name}>{item.name}</span>
                          <span className="text-indigo-900 font-mono font-bold">{item.totalHours} ชม.</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded-lg overflow-hidden flex items-center relative">
                          <div 
                            className="bg-indigo-600 h-full rounded-lg transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 2: Revenue Value per Equipment */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">เปรียบเทียบมูลค่าการบริการรวม (Revenue Value)</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">หน่วย: บาท</span>
                </div>

                <div className="space-y-3 pt-2">
                  {equipmentUsageAnalytics.map((item) => {
                    const barWidth = Math.min(100, Math.round((item.totalRevenue / maxRevenue) * 100));
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-700 font-bold truncate max-w-[200px]" title={item.name}>{item.name}</span>
                          <span className="text-emerald-700 font-mono font-bold">{formatCurrency(item.totalRevenue)}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-4 rounded-lg overflow-hidden flex items-center relative">
                          <div 
                            className="bg-emerald-500 h-full rounded-lg transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* --- AUDIT LOG & REPORT EXPORT SECTION --- */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-amber-500" />
                    ประวัติบันทึกการใช้งานเครื่องมือของผู้ใช้ (Usage Audit Log)
                  </h3>
                  <p className="text-xs text-slate-500">ตรวจสอบว่าใครเข้าใช้เครื่องมือใดบ้าง และส่งออกเป็นรายงาน CSV</p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  ส่งออกรายงาน (Export CSV)
                </button>
              </div>

              {/* Log Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">เลือกเครื่องมือวิทยาศาสตร์</label>
                  <select
                    value={adminLogFilterEq}
                    onChange={(e) => setAdminLogFilterEq(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="ALL">เครื่องมือทั้งหมด ({equipmentList.length})</option>
                    {equipmentList.map(eq => (
                      <option key={eq.id} value={eq.id}>{eq.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">เลือกผู้ใช้งาน</label>
                  <select
                    value={adminLogFilterUser}
                    onChange={(e) => setAdminLogFilterUser(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="ALL">ผู้ใช้งานทุกคน ({usersList.length})</option>
                    {usersList.map(u => (
                      <option key={u.uid} value={u.uid}>{u.displayName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">ตั้งแต่วันที่</label>
                  <input
                    type="date"
                    value={adminLogStartDate}
                    onChange={(e) => setAdminLogStartDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">ถึงวันที่</label>
                  <input
                    type="date"
                    value={adminLogEndDate}
                    onChange={(e) => setAdminLogEndDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Log Table Result */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                    <tr>
                      <th className="px-4 py-3">Booking ID</th>
                      <th className="px-4 py-3">ผู้ขอใช้งาน</th>
                      <th className="px-4 py-3">เครื่องมือวิทยาศาสตร์</th>
                      <th className="px-4 py-3">วันที่ / เวลา</th>
                      <th className="px-4 py-3 text-right">คิดเป็นเงิน</th>
                      <th className="px-4 py-3 text-center">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredAdminBookings.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                          ไม่พบข้อมูลบันทึกการใช้งานตามเงื่อนไขที่เลือก
                        </td>
                      </tr>
                    ) : (
                      filteredAdminBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-mono font-bold text-xs text-indigo-900">{b.id}</td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-900 text-xs">{b.userName}</div>
                            <div className="text-[11px] text-slate-400">ID: {b.userId}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-800 text-xs">{b.equipmentName}</div>
                            <div className="text-[11px] text-slate-400 truncate max-w-xs">{b.purpose}</div>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <div className="font-semibold text-slate-800">{formatThaiDate(b.date)}</div>
                            <div className="text-slate-500">{b.startTime} - {b.endTime} น. ({b.durationHours} ชม.)</div>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-slate-900 text-xs">
                            {formatCurrency(b.totalCost)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              b.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {b.status === 'Upcoming' ? 'จองสำเร็จ' : 'ยกเลิกแล้ว'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wear Index Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipmentList.map((eq) => {
                const wearPercent = Math.min(100, Math.round(((eq.totalHoursUsed || 0) / (eq.maintenanceThresholdHours || 200)) * 100));
                const isCritical = wearPercent >= 85;

                return (
                  <div key={eq.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400">{eq.code}</span>
                        <h3 className="text-sm font-bold text-slate-900">{eq.name}</h3>
                      </div>
                      {isCritical && (
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> ควรส่งซ่อมด่วน
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-500">Maintenance Wear Index</span>
                        <span className={isCritical ? 'text-rose-600 font-extrabold' : 'text-slate-800'}>
                          {wearPercent}% ({eq.totalHoursUsed || 0} / {eq.maintenanceThresholdHours || 200} ชม.)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            wearPercent >= 90 ? 'bg-rose-600' : wearPercent >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${wearPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ADMIN TAB 2: EQUIPMENT MANAGEMENT (CRUD & TOGGLE) */}
        {activeTab === 'admin-eq' && isAdmin && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-rose-500" />
                  จัดการเครื่องมือวิทยาศาสตร์ (Equipment CRUD)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">เพิ่ม แก้ไข ลบ และเปิด/ปิดสถานะเครื่องมือในระบบ</p>
              </div>

              <button
                onClick={() => {
                  setEditingEq(null);
                  setEqForm({
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
                  setShowAddEqModal(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
                เพิ่มเครื่องมือใหม่
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">เครื่องมือ</th>
                      <th className="px-6 py-4">สถานที่ตั้ง</th>
                      <th className="px-6 py-4 text-right">ค่าบริการ (บาท/ชม.)</th>
                      <th className="px-6 py-4 text-center">สถานะ</th>
                      <th className="px-6 py-4 text-center">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {equipmentList.map((eq) => (
                      <tr key={eq.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{eq.name}</div>
                          <div className="text-xs font-mono text-slate-400">{eq.code}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600">{eq.location}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(eq.ratePerHour)}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <select
                            value={eq.status}
                            onChange={(e) => handleUpdateEqStatus(eq.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none ${
                              eq.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                              eq.status === 'Maintenance' ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-rose-50 text-rose-700 border-rose-300'
                            }`}
                          >
                            <option value="Available">พร้อมใช้งาน</option>
                            <option value="Maintenance">ส่งซ่อมบำรุง</option>
                            <option value="OutOfService">งดบริการ</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditEqModal(eq)}
                              className="p-2 rounded-xl text-slate-600 hover:bg-slate-200"
                              title="แก้ไข"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEquipment(eq.id)}
                              className="p-2 rounded-xl text-rose-600 hover:bg-rose-100"
                              title="ลบ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN TAB 3: MAINTENANCE LOGS */}
        {activeTab === 'admin-maint' && isAdmin && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-rose-500" />
                  ประวัติการซ่อมบำรุงรักษา (Maintenance Logs)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">บันทึกและตรวจสอบประวัติการส่งซ่อมบำรุงเครื่องมือวิทยาศาสตร์</p>
              </div>

              <button
                onClick={() => {
                  setMaintForm({
                    equipmentId: equipmentList[0]?.id || '',
                    type: 'Preventive Maintenance',
                    technician: '',
                    cost: 0,
                    details: ''
                  });
                  setShowAddMaintModal(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md active:scale-95"
              >
                <Plus className="w-4 h-4" />
                บันทึกการส่งซ่อมใหม่
              </button>
            </div>

            <div className="space-y-4">
              {maintenanceLogs.map((log) => (
                <div key={log.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{log.id} • {formatThaiDate(log.date)}</span>
                      <h3 className="text-base font-bold text-slate-900">{log.equipmentName}</h3>
                    </div>
                    <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                      {log.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{log.details}</p>
                  <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t">
                    <span>ช่าง/บริษัทผู้ดูแล: <strong className="text-slate-800">{log.technician}</strong></span>
                    <span>ค่าใช้จ่าย: <strong className="text-rose-600 font-bold">{formatCurrency(log.cost)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN TAB 4: USER MANAGEMENT & CREDIT CONTROL */}
        {activeTab === 'admin-users' && isAdmin && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-rose-500" />
                  จัดการผู้ใช้งานและกำหนดวงเงินเครดิต (Admin Credit Management)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">แก้ไขวงเงินฟรีเครดิต ตรวจสอบเบอร์โทรศัพท์ สั่งงดใช้งาน และส่งออกประวัติผู้ใช้</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportUsersCSV}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  ส่งออกรายชื่อผู้ใช้ (CSV)
                </button>
                <div className="bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl text-xs font-semibold text-rose-800 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-rose-600" />
                  <span>ผู้ดูแลระบบ: <strong>{currentUser.displayName}</strong></span>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 font-bold text-slate-900 text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>รายชื่อผู้ลงทะเบียน ข้อมูลการติดต่อ และสิทธิ์วงเงินเครดิต ({usersList.length} รายชื่อ)</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">ผู้ใช้งาน / อีเมล</th>
                      <th className="px-6 py-4">เบอร์โทรศัพท์</th>
                      <th className="px-6 py-4">ประเภท / สังกัดหน่วยงาน</th>
                      <th className="px-6 py-4 text-right">วงเงินเครดิตอนุมัติ</th>
                      <th className="px-6 py-4 text-center">สถานะสิทธิ์</th>
                      <th className="px-6 py-4 text-center">การจัดการสิทธิ์ & วงเงิน</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {usersList.map((u) => (
                      <tr key={u.uid} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.photoURL} alt={u.displayName} className="w-10 h-10 rounded-full border object-cover" />
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                {u.displayName}
                                {u.role === 'Admin' && (
                                  <span className="bg-rose-100 text-rose-700 text-[9px] px-1.5 py-0.2 rounded font-bold">Admin</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-slate-800">
                          <div className="flex items-center gap-1.5 text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-lg w-fit">
                            <Phone className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{u.phone || 'ยังไม่ระบุ'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          <div className="font-semibold text-slate-800">
                            {u.userType || 'นิสิต'} • {u.department}
                          </div>
                          <div className="text-slate-400 text-[11px]">{u.affiliationType || 'ภายในคณะสหเวชศาสตร์'}</div>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900 whitespace-nowrap">
                          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            {formatCurrency(u.creditLimit)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            u.isBanned ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {u.isBanned ? 'งดการใช้งาน (Banned)' : 'ปกติ (Active)'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenAdjustCreditModal(u)}
                              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              ปรับวงเงิน
                            </button>

                            <button
                              onClick={() => handleToggleBanUser(u.uid)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                u.isBanned
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow'
                                  : 'bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200'
                              }`}
                            >
                              <Ban className="w-3.5 h-3.5" />
                              {u.isBanned ? 'ปลดระงับ' : 'งดใช้งาน'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audit Log for Credit Adjustments */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
                ประวัติการปรับวงเงินเครดิตย้อนหลัง (Credit Audit Log)
              </h3>
              <div className="space-y-3">
                {creditLogs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">ยังไม่มีประวัติการปรับเปลี่ยนวงเงินเครดิต</p>
                ) : (
                  creditLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{log.targetUserName}</span>
                          <span className="text-slate-400">({log.id})</span>
                        </div>
                        <p className="text-slate-600 mt-1">เหตุผล: <strong className="text-slate-800">{log.reason}</strong></p>
                        <p className="text-[11px] text-slate-400 mt-0.5">ดำเนินการโดย: {log.adjustedBy} • {formatThaiDate(log.timestamp)}</p>
                      </div>
                      <div className="text-right whitespace-nowrap bg-white p-2.5 rounded-xl border border-slate-200">
                        <span className="text-slate-400 line-through mr-2">{formatCurrency(log.previousCredit)}</span>
                        <span className="text-emerald-600 font-bold text-sm">➔ {formatCurrency(log.newCredit)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- MODAL: ADMIN PASSCODE AUTHENTICATION --- */}
      {showAdminAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-200 relative">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <Shield className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 text-center">ยืนยันตัวตนสำหรับผู้ดูแลระบบ (Admin)</h3>
            <p className="text-xs text-slate-500 text-center mt-1">
              กรุณาระบุ Admin Passcode เพื่อเข้าถึงระบบบริหารจัดการส่วนกลาง
            </p>

            <form onSubmit={handleVerifyAdminPasscode} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    placeholder="ใส่รหัสผ่าน (ทดสอบ: admin123)"
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none pl-10"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
                </div>
                {adminAuthError && (
                  <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {adminAuthError}
                  </p>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdminAuthModal(false)}
                  className="w-1/2 py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-all"
                >
                  ยืนยันสิทธิ์ Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADJUST USER CREDIT (ADMIN ONLY) --- */}
      {showAdjustCreditModal && creditAdjustUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">กำหนด / เปลี่ยนแปลงวงเงินฟรีเครดิต</h3>
                  <p className="text-xs text-slate-500">สำหรับผู้ใช้: {creditAdjustUser.displayName}</p>
                </div>
              </div>
              <button onClick={() => setShowAdjustCreditModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveAdjustCredit} className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <p className="text-xs text-slate-500">วงเงินเดิมในปัจจุบัน:</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(creditAdjustUser.creditLimit)} บาท</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  กำหนดวงเงินใหม่ (บาท) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={newCreditAmount}
                  onChange={(e) => setNewCreditAmount(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-base font-bold text-indigo-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  เหตุผล / หมายเหตุการปรับปรุงวงเงิน *
                </label>
                <textarea
                  rows="3"
                  required
                  value={creditAdjustReason}
                  onChange={(e) => setCreditAdjustReason(e.target.value)}
                  placeholder="เช่น เพิ่มโควตาทุนวิจัยพิเศษประจำปี, ปรับลดตามเงื่อนไขสัญญา..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAdjustCreditModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md"
                >
                  บันทึกการปรับวงเงิน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT EQUIPMENT --- */}
      {showAddEqModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEq ? 'แก้ไขข้อมูลเครื่องมือวิทยาศาสตร์' : 'เพิ่มเครื่องมือวิทยาศาสตร์ใหม่'}
              </h3>
              <button onClick={() => setShowAddEqModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveEquipment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อเครื่องมือ *</label>
                  <input
                    type="text"
                    required
                    value={eqForm.name}
                    onChange={(e) => setEqForm({ ...eqForm, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่ *</label>
                  <input
                    type="text"
                    required
                    value={eqForm.category}
                    onChange={(e) => setEqForm({ ...eqForm, category: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">รหัสเครื่องมือ</label>
                  <input
                    type="text"
                    value={eqForm.code}
                    onChange={(e) => setEqForm({ ...eqForm, code: e.target.value })}
                    placeholder="เช่น AHS-EQ-007"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ค่าบริการ (บาท/ชม.) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={eqForm.ratePerHour ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEqForm({ ...eqForm, ratePerHour: val === '' ? '' : Number(val) });
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">รอบส่งซ่อม (ชม.)</label>
                  <input
                    type="number"
                    required
                    value={eqForm.maintenanceThresholdHours ?? ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEqForm({ ...eqForm, maintenanceThresholdHours: val === '' ? '' : Number(val) });
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">สถานที่ตั้ง *</label>
                <input
                  type="text"
                  required
                  value={eqForm.location}
                  onChange={(e) => setEqForm({ ...eqForm, location: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รูปภาพ URL</label>
                <input
                  type="url"
                  value={eqForm.image}
                  onChange={(e) => setEqForm({ ...eqForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รายละเอียดคำอธิบาย *</label>
                <textarea
                  rows="2"
                  required
                  value={eqForm.description}
                  onChange={(e) => setEqForm({ ...eqForm, description: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddEqModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD MAINTENANCE LOG --- */}
      {showAddMaintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-900">บันทึกประวัติการส่งซ่อมบำรุง</h3>
              <button onClick={() => setShowAddMaintModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveMaintenanceLog} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">เลือกเครื่องมือ *</label>
                <select
                  required
                  value={maintForm.equipmentId}
                  onChange={(e) => setMaintForm({ ...maintForm, equipmentId: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  {equipmentList.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name} ({eq.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ประเภทการบำรุงรักษา</label>
                  <select
                    value={maintForm.type}
                    onChange={(e) => setMaintForm({ ...maintForm, type: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    <option value="Preventive Maintenance">Preventive Maintenance (PM)</option>
                    <option value="Corrective Maintenance">Corrective Maintenance (CM)</option>
                    <option value="Calibration">Calibration Check</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ค่าใช้จ่าย (บาท)</label>
                  <input
                    type="number"
                    min="0"
                    value={maintForm.cost ?? ''}
                    onChange={(e) => setMaintForm({ ...maintForm, cost: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ช่าง / บริษัทผู้ให้บริการ *</label>
                <input
                  type="text"
                  required
                  value={maintForm.technician}
                  onChange={(e) => setMaintForm({ ...maintForm, technician: e.target.value })}
                  placeholder="เช่น ศูนย์เครื่องมือวิทยาศาสตร์ ม.บูรพา หรือ บริษัท..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">รายละเอียดงานซ่อมบำรุง *</label>
                <textarea
                  rows="3"
                  required
                  value={maintForm.details}
                  onChange={(e) => setMaintForm({ ...maintForm, details: e.target.value })}
                  placeholder="ระบุอะไหล่ที่เปลี่ยน หรือรายการสอบเทียบ..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddMaintModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md"
                >
                  บันทึกการส่งซ่อม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="font-medium text-slate-300">
            © 2026 คณะสหเวชศาสตร์ มหาวิทยาลัยบูรพา (Faculty of Allied Health Sciences, Burapha University)
          </p>
          <p className="text-slate-500">
            169 ถนนลงหาดบางแสน ตำบลแสนสุข อำเภอเมือง จังหวัดชลบุรี 20131 | โทรศัพท์: 0-3810-3157
          </p>
        </div>
      </footer>

      {/* --- MODAL: EDIT USER PROFILE --- */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">แก้ไขประวัติข้อมูลส่วนตัว</h3>
                  <p className="text-xs text-slate-500">อัปเดตข้อมูลการติดต่อและสังกัดหน่วยงาน</p>
                </div>
              </div>
              <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อ-นามสกุล *</label>
                <input
                  type="text"
                  required
                  value={profileForm.displayName}
                  onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">เบอร์โทรศัพท์ *</label>
                  <input
                    type="tel"
                    required
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="08X-XXX-XXXX"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">อีเมล (E-mail) *</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">สถานะ / ประเภทผู้ใช้งาน *</label>
                  <select
                    value={profileForm.userType}
                    onChange={(e) => setProfileForm({ ...profileForm, userType: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="นิสิต">นิสิต (Student)</option>
                    <option value="ผู้ช่วยนักวิจัย">ผู้ช่วยนักวิจัย (Research Assistant)</option>
                    <option value="อาจารย์">อาจารย์ (Lecturer/Professor)</option>
                    <option value="นักวิทยาศาสตร์">นักวิทยาศาสตร์ (Scientist)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ประเภทหน่วยงาน *</label>
                  <select
                    value={profileForm.affiliationType}
                    onChange={(e) => setProfileForm({ ...profileForm, affiliationType: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="ภายในคณะสหเวชศาสตร์">ภายในคณะสหเวชศาสตร์ ม.บูรพา</option>
                    <option value="หน่วยงานภายนอก">หน่วยงานภายนอก / สถาบันอื่น</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อสังกัดหน่วยงาน / ภาควิชา *</label>
                <input
                  type="text"
                  required
                  value={profileForm.department}
                  onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                  placeholder="เช่น ภาควิชาเทคนิคการแพทย์, สถาบันวิจัย..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
