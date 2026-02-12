
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { GalleryItem } from '../types';
import { X, ZoomIn, Calendar } from 'lucide-react';

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    // Fixed: Await promise before setting state
    db.getGallery().then(setItems);
  }, []);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">ফটো গ্যালারি</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">হবিগঞ্জ জেলাজুড়ে আমাদের স্কাউট সমাবেশ, সমাজসেবামূলক অভিযান এবং প্রশিক্ষণ ক্যাম্পের স্মরণীয় মুহূর্তগুলো।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div 
              key={item.id} 
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedImg(item.imageUrl)}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <div className="flex items-center text-yellow-400 text-xs font-bold mb-2">
                  <Calendar size={12} className="mr-1" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2 text-white">
                  <ZoomIn size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            গ্যালারিতে বর্তমানে কোনো ছবি নেই।
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors">
            <X size={40} />
          </button>
          <img 
            src={selectedImg} 
            alt="ছবি" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
