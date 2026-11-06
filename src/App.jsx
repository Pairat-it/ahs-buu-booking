import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CreditCard, User, Shield, CheckCircle, 
  XCircle, AlertCircle, Plus, Edit, Trash2, Download, LogOut, 
  Search, Filter, ChevronRight, Activity, Database
} from 'lucide-react';

// รายการเครื่องมือเริ่มต้น (ใช้กรณีเปิดใช้งานครั้งแรกสุด)
const defaultEquipments = [
  {
    id: "AHS-EQ-001",
    name: "Real-Time PCR System (ABI 7500)",
    category: "Molecular Biology",
    location: "ห้องปฏิบัติการกลาง ชั้น 3 อาคารสหเวชศาสตร์",
    rate: 350,
    status: "available",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=60",
    description: "เครื่องวิเคราะห์ปริมาณสารพันธุกรรมเชิงリアルタイム รองรับการวิเคราะห์ Gene Expression และ Genotyping"
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

export default function App() {
  // บัญชีจำลอง
  const currentUser = {
    name: "ภัทรพล สหเวชบำรุง",
    role: "นิสิต",
    department: "เทคโนโลยีหัวใจและหลอดเลือด",
    creditBalance: 47600,
    totalQuota: 50000,
    usedCredit: 2400
  };

  // 1. ระบบ LocalStorage สำหรับข้อมูลเครื่องมือ (ดึงจากเครื่อง หากไม่มีใช้ default)
  const [equipments, setEquipments] = useState(() => {
    const saved = localStorage.getItem('ahs_buu_equipments');
    return saved ? JSON.parse(saved) : defaultEquipments;
  });

  // บันทึกลง LocalStorage ทุกครั้งที่ข้อมูลเครื่องมือเปลี่ยน
  useEffect(() => {
    localStorage.setItem('ahs_buu_equipments', JSON.stringify(equipments));
  }, [equipments]);

  // States ระบบอื่นๆ
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // State ฟอร์มสำหรับ Admin (เพิ่ม/แก้ไข)
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    id: '', name: '', category: 'Molecular Biology', location: '', 
    rate: 200, status: 'available', image: '', description: ''
  });

  // ล็อกอิน Admin
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

  // เปิดฟอร์ม เพิ่ม/แก้ไข เครื่องมือ
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        id: `AHS-EQ-00${equipments.length + 1}`,
        name: '',
        category: 'Molecular Biology',
        location: 'ห้องปฏิบัติการกลาง ชั้น 3',
        rate: 300,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=60',
        description: ''
      });
    }
    setShowModal(true);
  };

  // บันทึกการ เพิ่ม/แก้ไข เครื่องมือ
  const handleSaveEquipment = (e) => {
    e.preventDefault();
    if (editingItem) {
      setEquipments(equipments.map(eq => eq.id === editingItem.id ? formData : eq));
    } else {
      setEquipments([...equipments, formData]);
    }
    setShowModal(false);
  };

  // ลบเครื่องมือ
  const handleDeleteEquipment = (id) => {
    if (window.confirm('คุณต้องการลบรายการเครื่องมือนี้ใช่หรือไม่?')) {
      setEquipments(equipments.filter(eq => eq.id !== id));
    }
  };

  // รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น
  const handleResetToDefault = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลเครื่องมือทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
      setEquipments(defaultEquipments);
      localStorage.removeItem('ahs_buu_equipments');
    }
  };

  // กรองข้อมูลตามค้นหาและหมวดหมู่
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
                {currentUser.name}
                <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-400/30">
                  {currentUser.role}
                </span>
              </div>
              <div className="text-xs text-slate-400">วงเงินคงเหลือ: <span className="text-amber-400 font-bold">฿{currentUser.creditBalance.toLocaleString()}</span></div>
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
              onClick={() => setActiveTab('admin')} 
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Shield className="w-4 h-4" /> ระบบจัดการ Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* User Catalog Tab */}
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

            {/* Equipment Grid */}
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
                        onClick={() => alert(`ส่งคำขอจองเครื่องมือ: ${item.name}`)}
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

        {/* Admin Dashboard Tab */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                <Shield className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-slate-800">เข้าสู่ระบบผู้ดูแล (Admin)</h2>
                <p className="text-xs text-slate-500 mt-1 mb-6">กรอกรหัสผ่านผู้ดูแลเพื่อเปิดสิทธิ์แก้ไขข้อมูลเครื่องมือ</p>
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
                      <Shield className="w-5 h-5 text-amber-500" /> ระบบจัดการข้อมูลเครื่องมือวิทยาศาสตร์
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">การแก้ไขในหน้านี้จะถูกบันทึกลง LocalStorage อัตโนมัติ</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenModal()} 
                      className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-amber-400 transition"
                    >
                      <Plus className="w-4 h-4" /> เพิ่มเครื่องมือใหม่
                    </button>
                    <button 
                      onClick={handleResetToDefault} 
                      className="bg-slate-100 text-slate-600 text-xs px-3 py-2.5 rounded-xl hover:bg-slate-200 transition"
                    >
                      รีเซ็ตค่าเริ่มต้น
                    </button>
                    <button 
                      onClick={() => setIsAdminLoggedIn(false)} 
                      className="bg-rose-50 text-rose-600 text-xs px-3 py-2.5 rounded-xl hover:bg-rose-100 transition"
                    >
                      ออกจากสิทธิ์ Admin
                    </button>
                  </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 text-slate-700 font-semibold text-xs uppercase border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4">รูปภาพ & ชื่อเครื่องมือ</th>
                          <th className="px-6 py-4">หมวดหมู่</th>
                          <th className="px-6 py-4">สถานที่ติดตั้ง</th>
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
                            <td className="px-6 py-4 text-xs">{item.location}</td>
                            <td className="px-6 py-4 font-bold text-slate-800">฿{item.rate}/ชม.</td>
                            <td className="px-6 py-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full ${item.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {item.status === 'available' ? 'พร้อมใช้งาน' : 'ปิดปรับปรุง'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleOpenModal(item)} className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
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

        {/* Modal Form for Add/Edit */}
        {showModal && (
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
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100">ยกเลิก</button>
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
