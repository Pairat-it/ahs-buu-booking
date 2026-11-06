import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CreditCard, User, Shield, CheckCircle, 
  XCircle, AlertCircle, Plus, Edit, Trash2, Download, LogOut, 
  Search, Filter, ChevronRight, Activity, Database, History, RefreshCw, FileText
} from 'lucide-react';

// รายการเครื่องมือเริ่มต้น ( default )
const defaultEquipments = [
  {
    id: "AHS-EQ-001",
    name: "Real-Time PCR System (ABI 7500)",
    category: "Molecular Biology",
    location: "ห้องปฏิบัติการกลาง ชั้น 3 อาคารสหเวชศาสตร์",
    rate: 350,
    status: "available",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องวิเคราะห์ปริมาณสารพันธุกรรมเชิง Real-time รองรับการวิเคราะห์ Gene Expression"
  },
  {
    id: "AHS-EQ-002",
    name: "High-Performance Liquid Chromatography (HPLC)",
    category: "Analytical Chemistry",
    location: "ห้องปฏิบัติการเคมีคลินิก ชั้น 4",
    rate: 500,
    status: "available",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องแยกและวิเคราะห์เชิงปริมาณของสารละลาย เหมาะสำหรับงานวิจัยยาสมุนไพร"
  },
  {
    id: "AHS-EQ-003",
    name: "Microplate Reader (Multimode Detector)",
    category: "Cell Biology & Immunology",
    location: "ห้องปฏิบัติการวิจัยภูมิคุ้มกันวิทยา ชั้น 3",
    rate: 200,
    status: "available",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องวัดความเข้มแสง Absorbance, Fluorescence และ Luminescence สำหรับ 96-well plate"
  }
];

// ประวัติการจองเริ่มต้น
const defaultBookings = [
  {
    id: "BK-2026-001",
    equipmentId: "AHS-EQ-001",
    equipmentName: "Real-Time PCR System (ABI 7500)",
    userName: "ภัทรพล สหเวชบำรุง",
    userEmail: "user@buu.ac.th",
    date: "2026-03-15",
    timeSlot: "09:00 - 12:00 (3 ชม.)",
    cost: 1050,
    status: "completed"
  },
  {
    id: "BK-2026-002",
    equipmentId: "AHS-EQ-002",
    equipmentName: "High-Performance Liquid Chromatography (HPLC)",
    userName: "ภัทรพล สหเวชบำรุง",
    userEmail: "user@buu.ac.th",
    date: "2026-03-20",
    timeSlot: "13:00 - 16:00 (3 ชม.)",
    cost: 1500,
    status: "confirmed"
  }
];

export default function App() {
  // 1. LocalStorage Management
  const [equipments, setEquipments] = useState(() => {
    const saved = localStorage.getItem('ahs_buu_equipments');
    return saved ? JSON.parse(saved) : defaultEquipments;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('ahs_buu_bookings');
    return saved ? JSON.parse(saved) : defaultBookings;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ahs_buu_profile');
    return saved ? JSON.parse(saved) : {
      name: "ภัทรพล สหเวชบำรุง",
      email: "user@buu.ac.th",
      role: "นิสิต",
      department: "เทคโนโลยีหัวใจและหลอดเลือด",
      creditBalance: 47650,
      totalQuota: 50000
    };
  });

  useEffect(() => {
    localStorage.setItem('ahs_buu_equipments', JSON.stringify(equipments));
  }, [equipments]);

  useEffect(() => {
    localStorage.setItem('ahs_buu_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('ahs_buu_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // System States
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Modal Booking State
  const [bookingModalItem, setBookingModalItem] = useState(null);
  const [bookingHours, setBookingHours] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-03-25');

  // Modal Admin Form Equipment
  const [showEqModal, setShowEqModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    id: '', name: '', category: 'Molecular Biology', location: '', 
    rate: 200, status: 'available', image: '', description: ''
  });

  // Admin Adjustment State
  const [creditAdjAmount, setCreditAdjAmount] = useState(1000);

  // Handlers
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setActiveTab('admin');
      setAdminPassword('');
    } else {
      alert('รหัสผ่านไม่ถูกต้อง (รหัสทดสอบ: admin123)');
    }
  };

  // ดำเนินการจองเครื่องมือ & ตัดเครดิต
  const handleConfirmBooking = () => {
    if (!bookingModalItem) return;
    const totalCost = bookingModalItem.rate * bookingHours;
    if (userProfile.creditBalance < totalCost) {
      alert('วงเงินเครดิตไม่พอสำหรับการจองนี้');
      return;
    }

    const newBooking = {
      id: `BK-2026-00${bookings.length + 1}`,
      equipmentId: bookingModalItem.id,
      equipmentName: bookingModalItem.name,
      userName: userProfile.name,
      userEmail: userProfile.email,
      date: bookingDate,
      timeSlot: `09:00 - ${9 + Number(bookingHours)}:00 (${bookingHours} ชม.)`,
      cost: totalCost,
      status: 'confirmed'
    };

    setBookings([newBooking, ...bookings]);
    setUserProfile({
      ...userProfile,
      creditBalance: userProfile.creditBalance - totalCost
    });

    setBookingModalItem(null);
    alert('ส่งคำขอและตัดวงเงินเครดิตเรียบร้อยแล้ว!');
  };

  // ยกเลิกการจอง & คืนเครดิต
  const handleCancelBooking = (bookingId, cost) => {
    if (window.confirm('คุณต้องการยกเลิกการจองนี้และขอรับเครดิตคืนใช่หรือไม่?')) {
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      setUserProfile({
        ...userProfile,
        creditBalance: userProfile.creditBalance + cost
      });
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = "Booking ID,Equipment Name,User Name,User Email,Date,Time Slot,Cost (THB),Status\n";
    const rows = bookings.map(b => `${b.id},"${b.equipmentName}","${b.userName}",${b.userEmail},${b.date},"${b.timeSlot}",${b.cost},${b.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ahs_buu_booking_report_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

  // จัดการอุปกรณ์ (Admin)
  const handleOpenEqModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        id: `AHS-EQ-00${equipments.length + 1}`,
        name: '', category: 'Molecular Biology', location: 'ห้องปฏิบัติการกลาง ชั้น 3',
        rate: 300, status: 'available',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=60',
        description: ''
      });
    }
    setShowEqModal(true);
  };

  const handleSaveEquipment = (e) => {
    e.preventDefault();
    if (editingItem) {
      setEquipments(equipments.map(eq => eq.id === editingItem.id ? formData : eq));
    } else {
      setEquipments([...equipments, formData]);
    }
    setShowEqModal(false);
  };

  const handleDeleteEquipment = (id) => {
    if (window.confirm('คุณต้องการลบรายการเครื่องมือนี้ใช่หรือไม่?')) {
      setEquipments(equipments.filter(eq => eq.id !== id));
    }
  };

  // ปรับวงเงิน Admin
  const handleAdjustCredit = (type) => {
    const amount = Number(creditAdjAmount);
    if (type === 'add') {
      setUserProfile({ ...userProfile, creditBalance: userProfile.creditBalance + amount });
    } else {
      setUserProfile({ ...userProfile, creditBalance: Math.max(0, userProfile.creditBalance - amount) });
    }
  };

  const filteredEquipments = equipments.filter(eq => {
    const matchesCategory = selectedCategory === 'All' || eq.category === selectedCategory;
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          eq.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
              AHS BUU Central Lab System
            </span>
            <h1 className="text-xl md:text-2xl font-bold mt-1 text-slate-100">
              ระบบบริการเครื่องมือวิจัย คณะสหเวชศาสตร์
            </h1>
            <p className="text-xs text-slate-400">มหาวิทยาลัยบูรพา (Faculty of Allied Health Sciences, Burapha University)</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-xl border border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
            />
            <div className="text-sm">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                {userProfile.name}
                <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-400/30">
                  {userProfile.role}
                </span>
              </div>
              <div className="text-xs text-slate-400">วงเงินคงเหลือ: <span className="text-amber-400 font-bold">฿{userProfile.creditBalance.toLocaleString()}</span></div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 py-2">
            <button 
              onClick={() => setActiveTab('catalog')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'catalog' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Database className="w-4 h-4" /> แคตตาล็อกเครื่องมือ
            </button>
            <button 
              onClick={() => setActiveTab('history')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'history' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <History className="w-4 h-4" /> ประวัติการจอง ({bookings.length})
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Shield className="w-4 h-4" /> ระบบผู้ดูแล (Admin)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Credit Card Dashboard Widget */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md mb-8 border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-amber-400 font-semibold tracking-wide">สิทธิ์โควต้าฟรีเครดิตวิจัยประจำปี</span>
              <h2 className="text-2xl font-bold">วงเงินคงเหลือ: ฿{userProfile.creditBalance.toLocaleString()}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{userProfile.name} ({userProfile.role}) • {userProfile.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 text-xs text-slate-300">
            <div>
              <div className="text-slate-400">วงเงินที่ได้รับ</div>
              <div className="text-base font-bold text-slate-100">฿{userProfile.totalQuota.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400">ใช้ไปแล้ว</div>
              <div className="text-base font-bold text-amber-400">฿{(userProfile.totalQuota - userProfile.creditBalance).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-400">สถานะบัญชี</div>
              <div className="text-base font-bold text-emerald-400">ปกติ (Active)</div>
            </div>
          </div>
        </div>

        {/* Tab 1: Catalog */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ค้นหาชื่อเครื่องมือ หรือ รหัสเครื่องมือ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="All">ทุกหมวดหมู่</option>
                  <option value="Molecular Biology">Molecular Biology</option>
                  <option value="Analytical Chemistry">Analytical Chemistry</option>
                  <option value="Cell Biology & Immunology">Cell Biology & Immunology</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipments.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
                  <div className="relative h-48 bg-slate-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${item.status === 'available' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {item.status === 'available' ? 'พร้อมใช้งาน' : 'ปิดปรับปรุง'}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs px-2.5 py-1 rounded-md">
                      {item.id}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">{item.category}</span>
                      <h3 className="font-bold text-slate-800 text-lg mt-2 line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                      <div className="text-xs text-slate-600 mt-3 flex items-center gap-1">
                        📍 {item.location}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">อัตราค่าบริการ</span>
                        <span className="text-lg font-bold text-slate-800">฿{item.rate} <span className="text-xs font-normal text-slate-500">/ ชม.</span></span>
                      </div>
                      <button 
                        disabled={item.status !== 'available'}
                        onClick={() => setBookingModalItem(item)}
                        className={`font-medium text-xs px-4 py-2 rounded-lg transition ${item.status === 'available' ? 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                      >
                        {item.status === 'available' ? 'จองใช้งาน' : 'ไม่พร้อมบริการ'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: History & Cancel */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-amber-500" /> ประวัติรายการจองเครื่องมือวิทยาศาสตร์
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-semibold text-xs uppercase border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">รหัสการจอง</th>
                    <th className="px-4 py-3">ชื่อเครื่องมือ</th>
                    <th className="px-4 py-3">วันที่ใช้บริการ</th>
                    <th className="px-4 py-3">ช่วงเวลา</th>
                    <th className="px-4 py-3">มูลค่าเครดิต</th>
                    <th className="px-4 py-3">สถานะ</th>
                    <th className="px-4 py-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{b.id}</td>
                      <td className="px-4 py-3">{b.equipmentName}</td>
                      <td className="px-4 py-3">{b.date}</td>
                      <td className="px-4 py-3">{b.timeSlot}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">฿{b.cost.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                          b.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {b.status === 'confirmed' ? 'ยืนยันแล้ว' : b.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิกแล้ว'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {b.status === 'confirmed' && (
                          <button 
                            onClick={() => handleCancelBooking(b.id, b.cost)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-medium border border-rose-200 px-3 py-1 rounded-lg hover:bg-rose-50"
                          >
                            ยกเลิก/คืนเครดิต
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Admin Panel */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <Shield className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-slate-800">เข้าสู่ระบบผู้ดูแล (Admin)</h2>
                <p className="text-xs text-slate-500 mt-1 mb-6">กรอกรหัสผ่านผู้ดูแลเพื่อเปิดสิทธิ์เต็มรูปแบบ</p>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="รหัสผ่าน (ทดสอบ: admin123)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition">
                    ยืนยันเข้าสู่ระบบ
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Admin Header & Export */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-500" /> แผงควบคุมผู้ดูแลระบบ (Admin Control)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">จัดการเครื่องมือ ปรับเพิ่ม/ลดวงเงินเครดิต และส่งออกข้อมูลการจอง</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleExportCSV}
                      className="bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 transition"
                    >
                      <Download className="w-4 h-4" /> ดึงข้อมูล Export CSV
                    </button>
                    <button 
                      onClick={() => handleOpenEqModal()} 
                      className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-amber-400 transition"
                    >
                      <Plus className="w-4 h-4" /> เพิ่มเครื่องมือใหม่
                    </button>
                    <button 
                      onClick={() => setIsAdminLoggedIn(false)} 
                      className="bg-rose-50 text-rose-600 text-xs px-3 py-2.5 rounded-xl hover:bg-rose-100 transition"
                    >
                      ออกจากสิทธิ์ Admin
                    </button>
                  </div>
                </div>

                {/* Credit Adjustment Box */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm mb-3">🛠️ ปรับแต่งวงเงินเครดิตนิสิต (ทดสอบระบบ)</h3>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      value={creditAdjAmount} 
                      onChange={e => setCreditAdjAmount(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm bg-slate-50 w-32"
                    />
                    <button onClick={() => handleAdjustCredit('add')} className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-blue-500">
                      + เพิ่มเครดิต (฿{creditAdjAmount})
                    </button>
                    <button onClick={() => handleAdjustCredit('deduct')} className="bg-rose-600 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-rose-500">
                      - หักเครดิต (฿{creditAdjAmount})
                    </button>
                  </div>
                </div>

                {/* Equipment Management Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-slate-100 font-bold text-slate-800 text-sm">
                    รายการเครื่องมือในระบบ ({equipments.length})
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-slate-700 font-semibold text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">รูปภาพ & ชื่อเครื่องมือ</th>
                          <th className="px-6 py-4">หมวดหมู่</th>
                          <th className="px-6 py-4">อัตราบริการ</th>
                          <th className="px-6 py-4">สถานะ</th>
                          <th className="px-6 py-4 text-right">จัดการ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {equipments.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition">
                            <td className="px-6 py-4 flex items-center gap-3">
                              <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                              <div>
                                <div className="font-bold text-slate-800">{item.name}</div>
                                <div className="text-xs text-slate-400">{item.id}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs">{item.category}</td>
                            <td className="px-6 py-4 font-bold text-slate-800">฿{item.rate}/ชม.</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full ${item.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {item.status === 'available' ? 'พร้อมใช้งาน' : 'ปิดปรับปรุง'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenEqModal(item)} className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDeleteEquipment(item.id)} className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
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
          </div>
        )}

        {/* Modal User Booking */}
        {bookingModalItem && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-1">ยืนยันการจองเครื่องมือ</h3>
              <p className="text-xs text-slate-500 mb-4">{bookingModalItem.name} ({bookingModalItem.id})</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">เลือกวันที่ต้องการจอง</label>
                  <input 
                    type="date" 
                    value={bookingDate} 
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">จำนวนชั่วโมงที่ใช้งาน</label>
                  <select 
                    value={bookingHours} 
                    onChange={e => setBookingHours(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50"
                  >
                    <option value={1}>1 ชั่วโมง</option>
                    <option value={2}>2 ชั่วโมง</option>
                    <option value={3}>3 ชั่วโมง</option>
                    <option value={4}>4 ชั่วโมง</option>
                  </select>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">อัตราค่าบริการ:</span>
                    <span className="font-semibold text-slate-800">฿{bookingModalItem.rate} / ชม.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">รวมทั้งสิ้น:</span>
                    <span className="font-bold text-amber-600 text-sm">฿{(bookingModalItem.rate * bookingHours).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">วงเงินหลังหัก:</span>
                    <span className="font-semibold text-slate-800">฿{(userProfile.creditBalance - (bookingModalItem.rate * bookingHours)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-6">
                <button onClick={() => setBookingModalItem(null)} className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">ยกเลิก</button>
                <button onClick={handleConfirmBooking} className="px-4 py-2 bg-amber-500 font-bold text-slate-950 rounded-lg text-sm hover:bg-amber-400">ยืนยันการจอง</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Admin Add/Edit Equipment */}
        {showEqModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {editingItem ? 'แก้ไขข้อมูลเครื่องมือ' : 'เพิ่มเครื่องมือวิทยาศาสตร์ใหม่'}
              </h3>
              <form onSubmit={handleSaveEquipment} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">รหัสเครื่องมือ</label>
                  <input type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} required className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">ชื่อเครื่องมือ</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">หมวดหมู่</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="Molecular Biology">Molecular Biology</option>
                      <option value="Analytical Chemistry">Analytical Chemistry</option>
                      <option value="Cell Biology & Immunology">Cell Biology & Immunology</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">ค่าบริการ (บาท/ชม.)</label>
                    <input type="number" value={formData.rate} onChange={e => setFormData({...formData, rate: Number(e.target.value)})} required className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">สถานที่ตั้ง</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">URL รูปภาพ</label>
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required className="w-full px-3 py-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">สถานะใช้งาน</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="available">พร้อมใช้งาน (Available)</option>
                    <option value="maintenance">ปิดปรับปรุง (Maintenance)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">รายละเอียดคำอธิบาย</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm"></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowEqModal(false)} className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">ยกเลิก</button>
                  <button type="submit" className="px-4 py-2 bg-amber-500 font-bold text-slate-950 rounded-lg text-sm hover:bg-amber-400">บันทึกข้อมูล</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
