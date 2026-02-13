
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Notice } from '../types';
import { Plus, Trash2, Edit2, X, Save, AlertCircle, Link as LinkIcon } from 'lucide-react';

const AdminNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    date: new Date().toISOString().split('T')[0],
    pdfUrl: '' 
  });

  useEffect(() => {
    // Fixed: Await promise before setting state
    db.getNotices().then(setNotices);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ 
      title: '', 
      description: '', 
      date: new Date().toISOString().split('T')[0],
      pdfUrl: '' 
    });
    setShowForm(true);
  };

  const handleOpenEdit = (notice: Notice) => {
    setEditingId((notice as any)._id || notice.id); // _id কে প্রাধান্য দিন
    setFormData({ 
      title: notice.title, 
      description: notice.description, 
      date: notice.date,
      pdfUrl: notice.pdfUrl || '' 
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Fixed: Handled async db calls and refreshed state correctly
    if (editingId) {
      await db.updateNotice(editingId, formData);
    } else {
      await db.addNotice(formData);
    }
    const updated = await db.getNotices();
    setNotices(updated);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে আপনি এই নোটিশটি মুছতে চান?')) {
      // Fixed: Handled async db call and refreshed state correctly
      await db.deleteNotice(id);
      const updated = await db.getNotices();
      setNotices(updated);
    }
  };

  return (
    <div className="space-y-6 font-['Hind_Siliguri']">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-gray-900">নোটিশ বোর্ড</h1>
           <p className="text-gray-400 text-sm mt-1">জেলার সকল অফিশিয়াল নোটিশ এখান থেকে নিয়ন্ত্রণ করুন।</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-green-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-800 transition-all shadow-lg"
        >
          <Plus size={20} /> নতুন নোটিশ
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-center p-8 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'নোটিশ সংশোধন করুন' : 'নতুন নোটিশ তৈরি করুন'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500 transition-colors p-2"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">নোটিশের শিরোনাম</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">প্রকাশের তারিখ</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">পিডিএফ লিঙ্ক (ঐচ্ছিক)</label>
                    <div className="relative">
                      <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                      <input 
                        type="url" 
                        placeholder="https://example.com/notice.pdf"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold" 
                        value={formData.pdfUrl}
                        onChange={(e) => setFormData({...formData, pdfUrl: e.target.value})}
                      />
                    </div>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">নোটিশের বিবরণ</label>
                <textarea 
                  rows={6}
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium leading-relaxed" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-all shadow-xl shadow-green-100">
                  <Save size={20} /> {editingId ? 'পরিবর্তনগুলো সেভ করুন' : 'নোটিশ প্রকাশ করুন'}
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

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
            <tr>
              <th className="px-8 py-6">শিরোনাম ও বিবরণ</th>
              <th className="px-8 py-6">তারিখ</th>
              <th className="px-8 py-6 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {notices.map(notice => (
              <tr key={(notice as any)._id || notice.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-8">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{notice.title}</h4>
                    {notice.pdfUrl && <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">PDF</span>}
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-1">{notice.description}</p>
                </td>
                <td className="px-8 py-8">
                   <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase">
                      {notice.date}
                   </div>
                </td>
                <td className="px-8 py-8 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleOpenEdit(notice)}
                      className="p-3 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete((notice as any)._id || notice.id)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr>
                <td colSpan={3} className="px-8 py-20 text-center">
                  <AlertCircle size={48} className="mx-auto mb-4 text-gray-100" />
                  <p className="text-gray-400 font-medium">কোনো নোটিশ পাওয়া যায়নি।</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNotices;
