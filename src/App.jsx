import React, { useState } from 'react';
import { 
  Calendar, Clock, CreditCard, User, Shield, CheckCircle, 
  XCircle, AlertCircle, Plus, Edit, Trash2, Download, LogOut, 
  Search, Filter, ChevronRight, Activity, Database, History, RefreshCw
} from 'lucide-react';

const initialEquipments = [
  {
    id: "AHS-EQ-001",
    name: "Real-Time PCR System (ABI 7500)",
    category: "Molecular Biology",
    location: "ห้องปฏิบัติการกลาง ชั้น 3 อาคารสหเวชศาสตร์",
    rate: 350,
    status: "available",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องวิเคราะห์ปริมาณสารพันธุกรรมเชิง Real-time รองรับการวิเคราะห์ Gene Expression และ Genotyping"
  },
  {
    id: "AHS-EQ-002",
    name: "High-Performance Liquid Chromatography (HPLC)",
    category: "Analytical Chemistry",
    location: "ห้องปฏิบัติการเคมีคลินิก ชั้น 4",
    rate: 500,
    status: "available",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องแยกและวิเคราะห์เชิงปริมาณของสารละลาย เหมาะสำหรับงานวิจัยยาสมุนไพรและชีวเคมี"
  },
  {
    id: "AHS-EQ-003",
    name: "Microplate Reader (Multimode Detector)",
    category: "Cell Biology & Immunology",
    location: "ห้องปฏิบัติการวิจัยภูมิคุ้มกันวิทยา ชั้น 3",
    rate: 200,
    status: "available",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องวัดความเข้มแสง ตัวตรวจจับ Absorbance, Fluorescence และ Luminescence สำหรับ 96-well plate"
  }
];

const initialBookings = [
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
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Data States
  const [equipments, setEquipments] = useState(initialEquipments);
  const [bookings, setBookings] = useState(initialBookings);
  const [userProfile, setUserProfile] = useState({
    name: "ภัทรพล สหเวชบำรุง",
    email: "user@buu.ac.th",
    role: "นิสิต",
    department: "เทคโนโลยีหัวใจและหลอดเลือด",
    creditBalance: 47600,
    totalQuota: 50000
  });

  // Modal Booking State
  const [bookingModalItem, setBookingModalItem] = useState(null);
  const [bookingHours, setBookingHours] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-03-25');
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

  const handleCancelBooking = (bookingId, cost) => {
    if (window.confirm('คุณต้องการยกเลิกการจองนี้และขอรับเครดิตคืนใช่หรือไม่?')) {
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
      setUserProfile({
        ...userProfile,
        creditBalance: userProfile.creditBalance + cost
      });
    }
  };

  const handleExportCSV = () => {
    const headers = "Booking ID,Equipment Name,User Name,User Email,Date,Time Slot,Cost (THB),Status\n";
    const rows = bookings.map(b => `${b.id},"${b.equipmentName}","${b.userName}",${b.userEmail},${b.date},"${b.timeSlot}",${b.cost},${b.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ahs_buu_booking_report_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
  };

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
            <div className="flex items-center gap-2 mr-2 border-r border-slate-700 pr-3">
              <span className="text-xs text-slate-400">ทดสอบบัญชี:</span>
              <button 
                onClick={() => setUserProfile({...userProfile, role: "นิสิต", name: "ภัทรพล สหเวชบำรุง"})}
                className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${userProfile.role === 'นิสิต' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                <User className="w-3 h-3" /> นิสิต (user@buu.ac.th)
              </button>
              <button 
                onClick={() => setUserProfile({...userProfile, role: "Admin", name: "ผู้ดูแลระบบ Lab"})}
                className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${userProfile.role === 'Admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-700'}`}
              >
                <Shield className="w-3 h-3" /> Admin (admin@buu.ac.th)
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
            />
            <div className="text-sm">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                {userProfile.name}
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded-full border border-amber-400/30">
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
              onClick={() => setActiveTab('booking')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'booking' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Plus className="w-4 h-4" /> จองการใช้งาน
            </button>
            <button 
              onClick={() => setActiveTab('calendar')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'calendar' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Calendar className="w-4 h-4" /> ตารางปฏิทิน
            </button>
            <button 
              onClick={() => setActiveTab('history')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'history' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <History className="w-4 h-4" /> ประวัติการจอง & คืนเครดิต
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Shield className="w-4 h-4" /> แดชบอร์ดสรุป
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Credit Banner */}
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
              <div>
                <h2 className="text-lg font-bold text-slate-800">รายการเครื่องมือวิทยาศาสตร์ขั้นสูง</h2>
                <p className="text-xs text-slate-500">เลือกเครื่องมือที่ต้องการใช้งานเพื่อจองคิวหรือตรวจสอบอัตราค่าบริการ</p>
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
                    <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-500 text-white">
                      พร้อมใช้งาน
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
                        onClick={() => setBookingModalItem(item)}
                        className="bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 font-medium text-xs px-4 py-2 rounded-lg transition"
                      >
                        จองใช้งาน
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Booking Wizard */}
        {activeTab === 'booking' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-500" /> ฟอร์มจองการใช้งานเครื่องมือ
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">เลือกเครื่องมือที่ต้องการจอง</label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50">
                  {equipments.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name} (฿{eq.rate}/ชม.)</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">วันที่ต้องการใช้งาน</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50" defaultValue="2026-03-25" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">จำนวนชั่วโมง</label>
                  <select className="w-full px-3 py-2 border rounded-lg text-sm bg-slate-50">
                    <option value="1">1 ชั่วโมง</option>
                    <option value="2">2 ชั่วโมง</option>
                    <option value="3">3 ชั่วโมง</option>
                  </select>
                </div>
              </div>
              <button onClick={() => alert('จำลองส่งคำขอจองเรียบร้อย')} className="w-full bg-amber-500 text-slate-950 font-bold text-sm py-3 rounded-xl hover:bg-amber-400 transition mt-4">
                ส่งคำขอจองเครื่องมือ
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Calendar */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> ตารางปฏิทินการใช้เครื่องมือประจำเดือน
            </h2>
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              📅 ตารางปฏิทินคิวการใช้งานเครื่องมือใน Central Lab แสดงรายการจองย้อนหลังและล่วงหน้า
            </div>
          </div>
        )}

        {/* Tab 4: History & Refund */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-amber-500" /> ประวัติการจอง & ขอคืนเครดิต
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

        {/* Tab 5: Admin Panel */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <Shield className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-slate-800">เข้าสู่ระบบผู้ดูแล (Admin)</h2>
                <p className="text-xs text-slate-500 mt-1 mb-6">กรอกรหัสผ่านผู้ดูแลเพื่อทดสอบสิทธิ์ Admin</p>
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber-500" /> แดชบอร์ดสรุปผลผู้ดูแลระบบ (Admin Dashboard)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">จัดการวงเงินเครดิต และดึงรายงานสรุปผลการใช้งาน</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleExportCSV}
                      className="bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 transition"
                    >
                      <Download className="w-4 h-4" /> ดึงข้อมูล Export CSV
                    </button>
                    <button 
                      onClick={() => setIsAdminLoggedIn(false)} 
                      className="bg-rose-50 text-rose-600 text-xs px-3 py-2.5 rounded-xl hover:bg-rose-100 transition"
                    >
                      ออกจากสิทธิ์ Admin
                    </button>
                  </div>
                </div>

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
      </main>
    </div>
  );
}
