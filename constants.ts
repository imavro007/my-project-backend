
import { Notice, RoverUnit, GalleryItem } from './types';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'আসন্ন জেলা রোভার মুট ২০২৪ এর প্রস্তুতি',
    description: 'আগামী মাসে হবিগঞ্জ সরকারি উচ্চ বিদ্যালয় মাঠে বার্ষিক জেলা রোভার মুট অনুষ্ঠিত হবে। সকল ইউনিটকে আগামী শুক্রবারের মধ্যে রেজিস্ট্রেশন সম্পন্ন করার অনুরোধ করা হলো।',
    date: '২০২৪-০৫-১৫',
  },
  {
    id: '2',
    title: 'ইউনিট লিডার প্রশিক্ষণ কর্মশালা',
    description: 'নেতৃত্বের দক্ষতা এবং স্কাউট পদ্ধতি উন্নয়নের জন্য ইউনিট লিডারদের নিয়ে দুই দিনের একটি কর্মশালা আয়োজন করা হয়েছে।',
    date: '২০২৪-০৫-২০',
  }
];

export const INITIAL_UNITS: RoverUnit[] = [
  {
    id: '1',
    name: 'হবিগঞ্জ সরকারি কলেজ রোভার ইউনিট',
    upazilla: 'হবিগঞ্জ সদর',
    institutionType: 'সরকারি',
    leaderName: 'ড. মো. আব্দুস সালাম',
    contactInfo: '০১৭১১-XXXXXX',
    email: 'salam.hgc@gmail.com',
    description: 'জেলার অন্যতম প্রাচীন এবং সক্রিয় ইউনিট, যা ব্যতিক্রমী সমাজসেবার জন্য পরিচিত।',
  },
  {
    id: '2',
    name: 'বৃন্দাবন সরকারি কলেজ রোভার ইউনিট',
    upazilla: 'হবিগঞ্জ সদর',
    institutionType: 'সরকারি',
    leaderName: 'প্রফেসর ফাতেমা বেগম',
    contactInfo: '০১৮২২-XXXXXX',
    email: 'fatema.bgm@gmail.com',
    description: 'দক্ষতা উন্নয়নের ওপর গুরুত্ব দিয়ে নিয়মিত প্রেসিডেন্ট রোভার স্কাউট তৈরি করছে।',
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'পরিচ্ছন্নতা অভিযান ২০২৩',
    imageUrl: 'https://picsum.photos/seed/rover1/800/600',
    date: '২০২৩-১১-১০',
  },
  {
    id: '2',
    title: 'রক্তদান কর্মসূচি',
    imageUrl: 'https://picsum.photos/seed/rover2/800/600',
    date: '২০২৩-১২-০৫',
  },
  {
    id: '3',
    title: 'জেলা স্কাউট সমাবেশ',
    imageUrl: 'https://picsum.photos/seed/rover3/800/600',
    date: '২০২৪-০১-২০',
  }
];
