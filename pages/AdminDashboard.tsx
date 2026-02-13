
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { FileText, Users, Image as ImageIcon, Plus, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    notices: 0,
    units: 0,
    gallery: 0
  });

  useEffect(() => {
    // Fixed: Wrapped db calls in an async function to await promises before accessing .length
    const fetchStats = async () => {
      const [notices, units, gallery] = await Promise.all([
        db.getNotices(),
        db.getUnits(),
        db.getGallery()
      ]);
      setStats({
        notices: notices.length,
        units: units.length,
        gallery: gallery.length
      });
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'মোট নোটিশ', value: stats.notices, icon: FileText, color: 'bg-blue-500', link: '/admin/notices' },
    { label: 'রোভার ইউনিটসমূহ', value: stats.units, icon: Users, color: 'bg-green-600', link: '/admin/units' },
    { label: 'গ্যালারি আইটেম', value: stats.gallery, icon: ImageIcon, color: 'bg-yellow-500', link: '/admin/gallery' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-['Hind_Siliguri']">এডমিন ড্যাশবোর্ড</h1>
          <p className="text-gray-500 mt-2">ফিরে আসার জন্য স্বাগতম। পোর্টালে আজকের আপডেটগুলো নিচে দেখুন।</p>
        </div>

        {/* নতুন বাটন */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 hover:text-green-700 transition-all shadow-sm w-fit"
        >
          <ExternalLink size={18} />
          <span>মূল ওয়েবসাইট</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Hind_Siliguri']">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 p-4 ${stat.color} text-white rounded-bl-3xl opacity-10 group-hover:opacity-20 transition-opacity`}>
                <Icon size={48} />
              </div>
              <div className="relative z-10">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-4">{stat.value}</p>
                <Link to={stat.link} className="flex items-center text-green-700 text-sm font-bold hover:underline">
                  ব্যবস্থাপনা <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-['Hind_Siliguri']">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">দ্রুত অ্যাকশন</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/notices" className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group">
              <Plus size={32} className="text-gray-300 group-hover:text-green-500 mb-2" />
              <span className="text-gray-600 font-bold text-sm">নতুন নোটিশ</span>
            </Link>
            <Link to="/admin/units" className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group">
              <Plus size={32} className="text-gray-300 group-hover:text-green-500 mb-2" />
              <span className="text-gray-600 font-bold text-sm">ইউনিট যুক্ত করুন</span>
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">সাম্প্রতিক কার্যক্রম</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p><span className="font-bold">সিস্টেম অনলাইন।</span> সকল কনফিগারেশন সঠিকভাবে লোড হয়েছে।</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <p><span className="font-bold">ডেটাবেস সক্রিয়।</span> ডেমো ব্যবহারের জন্য লোকাল স্টোরেজ সচল।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
