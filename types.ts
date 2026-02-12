
export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  pdfUrl?: string;
}

export type Upazilla = 'হবিগঞ্জ সদর' | 'নবীগঞ্জ' | 'লাখাই' | 'বাহুবল' | 'আজমিরীগঞ্জ' | 'বানিয়াচং' | 'মাধবপুর' | 'চুনারুঘাট' | 'শায়েস্তাগঞ্জ';
export type InstitutionType = 'সরকারি' | 'এমপিও ভুক্ত' | 'মুক্ত দল';

export interface RoverUnit {
  id: string;
  name: string;
  upazilla: Upazilla;
  institutionType: InstitutionType;
  leaderName: string; // RSL Name
  contactInfo: string; // RSL Number
  email: string; // RSL Email
  description: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string; // বিস্তারিত বিবরণ
  imageUrl: string;
  date: string;
}

export interface AppState {
  notices: Notice[];
  units: RoverUnit[];
  gallery: GalleryItem[];
}
