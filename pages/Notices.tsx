
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Notice } from '../types';
import { Calendar, FileText, ExternalLink, ChevronRight, Download, Info } from 'lucide-react';

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    // Fixed: Await promise before setting state
    db.getNotices().then(setNotices);
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen font-['Hind_Siliguri']">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">অফিসিয়াল নোটিশ বোর্ড</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">জেলা স্কাউট অফিসের সকল সাম্প্রতিক ঘোষণা, ইভেন্টের সময়সূচী এবং অফিশিয়াল নির্দেশনা ও ডাউনলোডযোগ্য ফরম এখানে পাবেন।</p>
        </div>

        <div className="space-y-8">
          {notices.map((notice, idx) => (
            <div 
              key={notice.id} 
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col md:row gap-8 hover:border-green-300 transition-all group animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-green-50 rounded-[2rem] px-6 py-6 h-fit border border-green-100 min-w-[120px] shadow-inner shadow-green-100/50">
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">{new Date(notice.date).toLocaleString('bn-BD', { month: 'long' })}</span>
                  <span className="text-4xl font-black text-green-800 leading-none">{new Date(notice.date).getDate()}</span>
                  <span className="text-xs text-gray-400 font-bold mt-2">{new Date(notice.date).getFullYear()}</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-4">
                    <Info size={14} className="mr-2" />
                    <span>অফিশিয়াল ঘোষণা</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 group-hover:text-green-700 transition-colors leading-snug">{notice.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 whitespace-pre-line text-base font-medium">{notice.description}</p>
                  
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-50">
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-100">
                      <FileText size={18} />
                      বিস্তারিত দেখুন
                    </button>
                    {notice.pdfUrl && (
                      <a 
                        href={notice.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-2xl text-sm font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100"
                      >
                        <Download size={20} />
                        পিডিএফ ডাউনলোড করুন
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {notices.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 animate-in fade-in duration-700">
              <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full">
                <FileText size={40} className="text-gray-200" />
              </div>
              <p className="text-2xl text-gray-900 font-black mb-2">বর্তমানে কোনো নোটিশ নেই</p>
              <p className="text-gray-400 font-medium">নতুন আপডেটের জন্য নিয়মিত আমাদের ওয়েবসাইট ভিজিট করুন।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notices;
