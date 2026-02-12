
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { RoverUnit } from '../types';
import { Search, MapPin, User, Phone, Info, Mail, Building2, ExternalLink } from 'lucide-react';

const Units = () => {
  const [units, setUnits] = useState<RoverUnit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fixed: Await promise before setting state
    db.getUnits().then(setUnits);
  }, []);

  const filteredUnits = units.filter(unit => {
  const search = searchTerm.toLowerCase();
  
  // Optional chaining (?.) এবং empty string fallback (|| "") ব্যবহার করা হয়েছে
  const nameMatch = (unit.name || "").toLowerCase().includes(search);
  const leaderMatch = (unit.leaderName || "").toLowerCase().includes(search);
  const upazillaMatch = (unit.upazilla || "").toLowerCase().includes(search);

  return nameMatch || leaderMatch || upazillaMatch;
});

  return (
    <div className="py-20 bg-gray-50 min-h-screen font-['Hind_Siliguri']">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">রোভার স্কাউট ইউনিটসমূহ</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">হবিগঞ্জ জেলা রোভারের অধীনে পরিচালিত সকল সক্রিয় ইউনিটগুলো এখানে দেখুন। আপনার নিকটস্থ ইউনিটের সাথে যোগাযোগ করুন এবং আন্দোলনে যোগ দিন।</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-20 relative animate-in fade-in slide-in-from-bottom duration-700 delay-200">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-300">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="ইউনিট, উপজেলা বা লিডারের নামে খুঁজুন..."
            className="block w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-gray-200/50 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-600 transition-all text-gray-700 font-semibold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit, idx) => (
              <div 
                key={unit.id} 
                className="bg-white rounded-[2.5rem] shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-4 w-full bg-green-700"></div>
                <div className="p-8 lg:p-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1.5 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100">
                       {unit.upazilla}
                    </span>
                    <Building2 size={24} className="text-gray-100 group-hover:text-green-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-2 leading-snug h-16 overflow-hidden group-hover:text-green-700 transition-colors">{unit.name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">{unit.institutionType}</p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-2xl group-hover:bg-green-50/50 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-700">
                        <User size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ইউনিট লিডার (RSL)</p>
                        <p className="text-gray-700 font-black truncate">{unit.leaderName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-red-600">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">যোগাযোগ নম্বর</p>
                        <p className="text-gray-600 font-bold">{unit.contactInfo}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-blue-600">
                        <Mail size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ইমেইল ঠিকানা</p>
                        <p className="text-gray-600 font-bold truncate">{unit.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-green-700 text-white font-bold py-4 rounded-2xl hover:bg-green-800 transition-all shadow-lg shadow-green-100 flex items-center justify-center space-x-2 active:scale-95">
                      <MapPin size={18} />
                      <span>অবস্থান দেখুন</span>
                    </button>
                    <button className="w-14 h-14 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:text-red-600 hover:border-red-100 transition-all flex items-center justify-center shadow-sm">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100 animate-in fade-in duration-500">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mb-8">
                <Search size={40} className="text-gray-200" />
              </div>
              <p className="text-2xl text-gray-500 font-black mb-2">কোনো ইউনিট পাওয়া যায়নি</p>
              <p className="text-gray-400 font-medium">আপনার খোঁজা উপজেলা বা নামের সাথে মিল পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Units;
