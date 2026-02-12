
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { RoverUnit, Upazilla, InstitutionType } from '../types';
import { Plus, Trash2, Edit2, X, Save, User, Phone, Book, Info, Mail, MapPin, Building2 } from 'lucide-react';

const UPAZILLAS: Upazilla[] = [
  'হবিগঞ্জ সদর', 'নবীগঞ্জ', 'লাখাই', 'বাহুবল', 'আজমিরীগঞ্জ', 'বানিয়াচং', 'মাধবপুর', 'চুনারুঘাট', 'শায়েস্তাগঞ্জ'
];

const INST_TYPES: InstitutionType[] = [
  'সরকারি', 'এমপিও ভুক্ত', 'মুক্ত দল'
];

const AdminUnits = () => {
  const [units, setUnits] = useState<RoverUnit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<RoverUnit, 'id'>>({ 
    name: '', 
    upazilla: 'হবিগঞ্জ সদর', 
    institutionType: 'সরকারি', 
    leaderName: '', 
    contactInfo: '', 
    email: '', 
    description: '' 
  });

  useEffect(() => {
    // Fixed: Await promise before setting state
    db.getUnits().then(setUnits);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ 
      name: '', 
      upazilla: 'হবিগঞ্জ সদর', 
      institutionType: 'সরকারি', 
      leaderName: '', 
      contactInfo: '', 
      email: '', 
      description: '' 
    });
    setShowForm(true);
  };

  const handleOpenEdit = (unit: RoverUnit) => {
    setEditingId(unit.id);
    setFormData({ 
      name: unit.name, 
      upazilla: unit.upazilla, 
      institutionType: unit.institutionType, 
      leaderName: unit.leaderName, 
      contactInfo: unit.contactInfo, 
      email: unit.email || '', 
      description: unit.description 
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Fixed: Handled async db calls and refreshed state correctly
    if (editingId) {
      await db.updateUnit(editingId, formData);
    } else {
      await db.addUnit(formData);
    }
    const updated = await db.getUnits();
    setUnits(updated);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে আপনি এই ইউনিটটি মুছতে চান?')) {
      // Fixed: Handled async db call and refreshed state correctly
      await db.deleteUnit(id);
      const updated = await db.getUnits();
      setUnits(updated);
    }
  };

  return (
    <div className="space-y-8 font-['Hind_Siliguri']">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900">ইউনিট ব্যবস্থাপনা</h1>
          <p className="text-gray-400 text-sm mt-1">জেলায় নিবন্ধিত সকল রোভার ইউনিটসমূহ তালিকাভুক্ত করুন।</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-green-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-800 transition-all shadow-xl shadow-green-100"
        >
          <Plus size={20} /> নতুন ইউনিট যোগ করুন
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-8 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'ইউনিট তথ্য সংশোধন' : 'নতুন ইউনিট নিবন্ধন'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ইউনিটের নাম</label>
                  <div className="relative">
                    <Book className="absolute top-4 left-5 text-gray-300" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="হবিগঞ্জ সরকারি কলেজ রোভার ইউনিট"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">উপজেলা</label>
                    <div className="relative">
                      <MapPin className="absolute top-4 left-5 text-gray-300" size={18} />
                      <select 
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold appearance-none"
                        value={formData.upazilla}
                        onChange={(e) => setFormData({...formData, upazilla: e.target.value as Upazilla})}
                      >
                        {UPAZILLAS.map(u => <option key={u} value={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">প্রতিষ্ঠানের ধরন</label>
                    <div className="relative">
                      <Building2 className="absolute top-4 left-5 text-gray-300" size={18} />
                      <select 
                        required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold appearance-none"
                        value={formData.institutionType}
                        onChange={(e) => setFormData({...formData, institutionType: e.target.value as InstitutionType})}
                      >
                        {INST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-4">
                  <h3 className="text-xs font-black text-green-700 uppercase tracking-widest">RSL (Rover Scout Leader) তথ্য</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">RSL নাম</label>
                      <div className="relative">
                        <User className="absolute top-4 left-5 text-gray-300" size={18} />
                        <input 
                          type="text" 
                          required
                          className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                          value={formData.leaderName}
                          onChange={(e) => setFormData({...formData, leaderName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">RSL নম্বর</label>
                      <div className="relative">
                        <Phone className="absolute top-4 left-5 text-gray-300" size={18} />
                        <input 
                          type="text" 
                          required
                          placeholder="০১৭XXXXXXXX"
                          className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                          value={formData.contactInfo}
                          onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">RSL ইমেইল</label>
                    <div className="relative">
                      <Mail className="absolute top-4 left-5 text-gray-300" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="example@gmail.com"
                        className="w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ইউনিট সম্পর্কে সংক্ষেপে</label>
                  <div className="relative">
                    <Info className="absolute top-4 left-5 text-gray-300" size={18} />
                    <textarea 
                      rows={3}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium" 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-all shadow-xl shadow-green-100">
                  <Save size={20} /> {editingId ? 'পরিবর্তনগুলো সেভ করুন' : 'ইউনিট নিবন্ধন করুন'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-8 py-4 rounded-2xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {units.map(unit => (
          <div key={unit.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between group hover:border-green-200 transition-all">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="px-4 py-2 bg-green-50 rounded-xl text-green-700 text-xs font-black uppercase tracking-widest">
                   {unit.upazilla}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleOpenEdit(unit)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(unit.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-snug">{unit.name}</h4>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4">{unit.institutionType}</p>
              
              <div className="space-y-3 mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                <div className="flex items-center text-xs font-bold text-gray-600">
                  <User size={14} className="mr-3 text-green-700" />
                  <span>RSL: {unit.leaderName}</span>
                </div>
                <div className="flex items-center text-xs font-bold text-gray-600">
                  <Phone size={14} className="mr-3 text-green-700" />
                  <span>{unit.contactInfo}</span>
                </div>
                <div className="flex items-center text-xs font-bold text-gray-600">
                  <Mail size={14} className="mr-3 text-green-700" />
                  <span className="truncate">{unit.email}</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs italic leading-relaxed line-clamp-2">"{unit.description}"</p>
            </div>
            <div className="pt-6 mt-6 border-t border-gray-50 flex justify-between items-center">
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">UID: {unit.id.substring(0, 8)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUnits;
