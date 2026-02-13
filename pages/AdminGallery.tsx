
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { GalleryItem } from '../types';
import { Plus, Trash2, Edit2, X, Upload, ImageIcon, Save, Calendar, Info } from 'lucide-react';

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', date: new Date().toISOString().split('T')[0] });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    // Fixed: Await promise before setting state
    db.getGallery().then(setItems);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', imageUrl: '', date: new Date().toISOString().split('T')[0] });
    setPreview(null);
    setShowForm(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingId((item as any)._id || item.id); // ডাটাবেসের সঠিক আইডি গ্রহণ
    setFormData({ title: item.title, description: item.description || '', imageUrl: item.imageUrl, date: item.date });
    setPreview(item.imageUrl);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl && !editingId) {
        formData.imageUrl = `https://picsum.photos/seed/${Date.now()}/800/600`;
    }
    
    // Fixed: Handled async db calls and refreshed state correctly
    if (editingId) {
      await db.updateGalleryItem(editingId, formData);
    } else {
      await db.addGalleryItem(formData);
    }
    
    const updatedItems = await db.getGallery();
    setItems(updatedItems);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি এই ছবিটি গ্যালারি থেকে মুছতে চান?')) {
      // Fixed: Handled async db call and refreshed state correctly
      await db.deleteGalleryItem(id);
      const updatedItems = await db.getGallery();
      setItems(updatedItems);
    }
  };

  return (
    <div className="space-y-8 font-['Hind_Siliguri']">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900">গ্যালারি আর্কাইভ</h1>
          <p className="text-gray-400 text-sm mt-1">জেলার বিভিন্ন ইভেন্টের ছবি এবং বিস্তারিত বিবরণ এখান থেকে যোগ করুন।</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-green-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-800 transition-all shadow-xl shadow-green-100"
        >
          <Upload size={20} /> নতুন ছবি যোগ করুন
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-8 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'গ্যালারি আইটেম সংশোধন' : 'নতুন ইভেন্ট যুক্ত করুন'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ইভেন্টের শিরোনাম</label>
                      <input 
                        type="text" 
                        required
                        placeholder="বার্ষিক ক্যাম্পফায়ার ২০২৪"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">তারিখ</label>
                      <div className="relative">
                        <Calendar className="absolute top-4 left-5 text-gray-300" size={18} />
                        <input 
                          type="date" 
                          required
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ছবি আপলোড</label>
                    <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-100 border-dashed rounded-3xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all overflow-hidden relative group">
                      {preview ? (
                        <>
                          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest">পরিবর্তন করুন</div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <ImageIcon className="w-10 h-10 mb-3 text-gray-300" />
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">ছবি নির্বাচন করুন</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                 </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ইভেন্টের বিস্তারিত বিবরণ</label>
                <div className="relative">
                  <Info className="absolute top-4 left-5 text-gray-300" size={18} />
                  <textarea 
                    rows={4}
                    placeholder="ইভেন্টের বিশেষ মুহূর্ত এবং কার্যক্রম সম্পর্কে লিখুন..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium leading-relaxed" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-all shadow-xl shadow-green-100">
                  <Save size={20} /> {editingId ? 'তথ্য আপডেট করুন' : 'গ্যালারিতে যুক্ত করুন'}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={(item as any)._id || item.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 aspect-square flex flex-col">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all p-6 flex flex-col justify-between">
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => handleOpenEdit(item)}
                  className="bg-white/20 backdrop-blur-md text-white p-2 rounded-xl hover:bg-white hover:text-blue-600 transition-all shadow-lg"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete((item as any)._id || item.id)}
                  className="bg-white/20 backdrop-blur-md text-white p-2 rounded-xl hover:bg-red-600 transition-all shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div>
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">{item.date}</span>
                <p className="text-white font-bold text-sm truncate mt-1">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
             <ImageIcon size={64} className="text-gray-100 mb-6" />
             <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">গ্যালারি বর্তমানে খালি।</p>
             <button onClick={handleOpenAdd} className="mt-6 bg-white border border-gray-200 text-green-700 px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all">প্রথম ছবি যোগ করুন</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
