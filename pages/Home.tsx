
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import { Notice, RoverUnit } from '../types';
import { ArrowRight, Award, Target, Users, BookOpen, Calendar, MapPin, CheckCircle2, Download, FileText, History } from 'lucide-react';

const Home = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [units, setUnits] = useState<RoverUnit[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedNotices = await db.getNotices();
      const fetchedUnits = await db.getUnits();
      // হোম পেজে শুধুমাত্র প্রথম ৩টি নোটিশ এবং ইউনিট দেখানো হবে
      setNotices(fetchedNotices.slice(0, 3));
      setUnits(fetchedUnits.slice(0, 3));
    };
    loadData();
  }, []);

  return (
    <div className="space-y-20 md:space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Section - Image Removed and Centered */}
      <section className="relative min-h-[70vh] flex items-center bg-white overflow-hidden border-b border-gray-50">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-50 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 text-center">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">বাংলাদেশ স্কাউটস • হবিগঞ্জ জেলা</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
              তরুণদের জন্য <br/>
              <span className="text-green-700">শ্রেষ্ঠত্বের</span> জয়যাত্রা
            </h1>
            <p className="text-base md:text-xl text-gray-500 font-medium mb-12 leading-relaxed max-w-2xl mx-auto">
              নেতৃত্ব, সমাজসেবা এবং রোমাঞ্চকর কর্মকাণ্ডের মাধ্যমে হবিগঞ্জের তরুণদের ক্ষমতায়ন ও সুনাগরিক হিসেবে গড়ে তোলা।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/units" className="bg-green-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-800 transition-all shadow-xl shadow-green-100 text-center active:scale-95">
                ইউনিটসমূহ দেখুন
              </Link>
              <Link to="/notices" className="bg-white text-gray-900 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all text-center active:scale-95">
                নোটিশ বোর্ড
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-gray-900 pointer-events-none">
            <History size={300} />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center space-x-2 text-red-600 font-bold text-sm uppercase tracking-widest mb-6">
              <div className="w-10 h-[2px] bg-red-600"></div>
              <span>আমাদের ইতিহাস</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              হবিগঞ্জ জেলা রোভারের <br/>
              <span className="text-green-700">গৌরবময়</span> ইতিহাস
            </h2>
            
            <div className="space-y-6 text-gray-500 text-base md:text-lg leading-relaxed text-justify mb-10">
              <p>
                হবিগঞ্জ জেলা রোভার স্কাউটস বাংলাদেশ স্কাউটসের একটি অন্যতম এবং গর্বিত শাখা। পাহাড়, সবুজ অরণ্য আর ছায়া সুনিবিড় চায়ের বাগানে ঘেরা এই জেলায় রোভার স্কাউটিংয়ের রয়েছে এক দীর্ঘ ও বীরত্বপূর্ণ ইতিহাস। প্রতিষ্ঠার পর থেকেই এই জেলা রোভার স্কাউটস তরুণদের শারীরিক, মানসিক এবং আধ্যাত্মিক বিকাশে নিরলসভাবে কাজ করে যাচ্ছে।
              </p>
              <p>
                আমাদের মূল লক্ষ্য হলো স্কাউট প্রতিজ্ঞার আলোকে সেবা এবং আনুগত্যের মাধ্যমে একটি সমৃদ্ধ ও সুশৃঙ্খল সমাজ গঠন করা। হবিগঞ্জের বিভিন্ন শিক্ষা প্রতিষ্ঠানে ছড়িয়ে থাকা হাজারো রোভার স্কাউট প্রতিনিয়ত দেশ ও জাতির সেবায় নিজেদের নিয়োজিত রাখছে।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <Users size={24} className="text-red-600 mb-4" />
                <div className="text-2xl font-black text-gray-900">২৫+ ইউনিট</div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-1">জেলায় সক্রিয় কার্যক্রম</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <Award size={24} className="text-green-700 mb-4" />
                <div className="text-2xl font-black text-gray-900">৫০০+ স্কাউট</div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-1">দক্ষ ও প্রশিক্ষিত সদস্য</p>
              </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                "সুশৃঙ্খল নেতৃত্বের বিকাশ",
                "সামাজিক দায়বদ্ধতা ও সেবা",
                "আধুনিক প্রযুক্তিনির্ভর স্কাউটিং",
                "পরিবেশ ও প্রকৃতি সংরক্ষণ"
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-gray-700 font-semibold">
                  <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/units" className="inline-flex items-center space-x-2 bg-green-700 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-800 transition-all shadow-lg shadow-green-100 group">
              <span>বিস্তারিত তথ্য দেখুন</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Notices Section */}
      <section className="bg-white md:bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row justify-between mb-12 md:mb-16 gap-6 md:gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">গুরুত্বপূর্ণ নোটিশ</h2>
              <p className="text-gray-500 font-medium text-sm md:text-base">জেলা কার্যালয়ের সর্বশেষ ঘোষণা ও খবরাখবর।</p>
            </div>
            <Link 
              to="/notices" 
              className="w-full md:w-auto text-center bg-white border border-gray-200 text-gray-900 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95 border-b-4"
            >
              সকল নোটিশ দেখুন
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {notices.map(notice => (
              <div key={notice.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-100 transition-all group flex flex-col justify-between h-full relative overflow-hidden">
                {notice.pdfUrl && (
                  <div className="absolute top-0 right-0 p-2">
                    <div className="bg-red-50 text-red-600 px-2 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-widest">
                      PDF Available
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <Calendar size={14} className="text-red-600" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{notice.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors line-clamp-2 leading-snug">{notice.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{notice.description}</p>
                </div>
                <div className="pt-6 mt-auto flex items-center justify-between border-t border-gray-50">
                   <Link to="/notices" className="text-gray-900 text-sm font-bold flex items-center hover:text-green-700">
                      বিস্তারিত <ArrowRight size={14} className="ml-1" />
                   </Link>
                   {notice.pdfUrl && (
                     <a 
                      href={notice.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-bold text-sm transition-colors"
                     >
                       <Download size={16} />
                       <span>ডাউনলোড</span>
                     </a>
                   )}
                </div>
              </div>
            ))}
            {notices.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-400">
                বর্তমানে কোনো নোটিশ নেই।
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-green-900 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <div>
              <div className="w-12 h-1 bg-red-600 mb-8"></div>
              <h3 className="text-2xl md:text-3xl font-black mb-6">আমাদের লক্ষ্য</h3>
              <p className="text-green-100 text-base md:text-lg leading-relaxed opacity-80">তরুণদের সুপ্ত প্রতিভার বিকাশ ঘটিয়ে তাদের আদর্শ ও দক্ষ নাগরিক হিসেবে গড়ে তোলা, যাতে তারা দেশ ও জাতির কল্যাণে অগ্রণী ভূমিকা পালন করতে পারে।</p>
            </div>
            <div>
              <div className="w-12 h-1 bg-red-600 mb-8"></div>
              <h3 className="text-2xl md:text-3xl font-black mb-6">আমাদের স্বপ্ন</h3>
              <p className="text-green-100 text-base md:text-lg leading-relaxed opacity-80">হবিগঞ্জ জেলাকে স্কাউটিংয়ের একটি মডেল জেলায় পরিণত করা এবং প্রতিটি শিক্ষা প্রতিষ্ঠানে একটি কার্যকর ও সক্রিয় রোভার ইউনিট নিশ্চিত করা।</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 text-center py-10">
         <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 md:mb-8 leading-tight">আন্দোলনে যোগ দিন</h2>
         <p className="text-gray-500 mb-10 max-w-xl mx-auto text-sm md:text-base">আপনি কি হবিগঞ্জের কোনো শিক্ষা প্রতিষ্ঠানের ছাত্র? রোভার স্কাউটিংয়ের মাধ্যমে নিজের দক্ষতা বৃদ্ধি করতে আজই নিকটস্থ ইউনিটে যোগাযোগ করুন।</p>
         <Link to="/units" className="inline-flex items-center space-x-3 bg-red-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-3xl font-bold text-lg md:text-xl hover:bg-red-700 transition-all shadow-xl shadow-red-100 border-b-4 border-red-800 active:scale-95">
            <span>ইউনিট খুঁজে নিন</span>
            <Users size={24} />
         </Link>
      </section>
    </div>
  );
};

export default Home;
