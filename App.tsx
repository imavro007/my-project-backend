
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, LogOut, LayoutDashboard, FileText, Users, Image as ImageIcon, Home as HomeIcon } from 'lucide-react';

// Pages
import Home from './pages/Home';
import Units from './pages/Units';
import Gallery from './pages/Gallery';
import Notices from './pages/Notices';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminNotices from './pages/AdminNotices';
import AdminUnits from './pages/AdminUnits';
import AdminGallery from './pages/AdminGallery';

const LOGO_URL = "https://lh3.googleusercontent.com/d/1lsfDCTkiNPN7ICv5OPTvB8FhUf0_Vr2D";

const Navbar = ({ isAdmin }: { isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { path: '/', label: 'হোম' },
    { path: '/notices', label: 'নোটিশ' },
    { path: '/units', label: 'ইউনিটসমূহ' },
    { path: '/gallery', label: 'গ্যালারি' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-md py-4'
    } border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 border border-gray-200 shadow-sm group-hover:border-green-600 transition-colors">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-green-900 leading-tight">হবিগঞ্জ জেলা রোভার</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-red-600">বাংলাদেশ স্কাউটস</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  location.pathname === link.path 
                  ? 'text-green-700 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <Link to={isAdmin ? "/admin" : "/login"} className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center space-x-2 shadow-md hover:shadow-red-200">
              <ShieldCheck size={16} />
              <span>{isAdmin ? "ড্যাশবোর্ড" : "লগইন"}</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={isAdmin ? "/admin" : "/login"}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-4 rounded-xl text-base font-bold bg-red-600 text-white text-center shadow-lg"
          >
            {isAdmin ? "এডমিন প্যানেল" : "লগইন"}
          </Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center space-x-4 mb-6">
          <img src={LOGO_URL} alt="Logo" className="w-14 h-14" />
          <div>
            <h3 className="text-green-900 text-xl font-bold">হবিগঞ্জ জেলা রোভার</h3>
            <p className="text-red-600 font-bold text-xs uppercase tracking-widest">বাংলাদেশ স্কাউটস</p>
          </div>
        </div>
        <p className="max-w-md text-gray-500 text-sm leading-relaxed">হবিগঞ্জ জেলা রোভার স্কাউটস সংগঠন বহিরাঙ্গন কার্যক্রম, নেতৃত্ব এবং সেবার মাধ্যমে তরুণদের দায়িত্বশীল নাগরিক হিসেবে গড়ে তুলতে কাজ করে যাচ্ছে।</p>
      </div>
      <div>
        <h4 className="text-gray-900 font-bold mb-6">দ্রুত লিঙ্ক</h4>
        <ul className="space-y-3 text-sm font-medium">
          <li><Link to="/" className="text-gray-500 hover:text-green-600 transition-colors">হোম</Link></li>
          <li><Link to="/notices" className="text-gray-500 hover:text-green-600 transition-colors">নোটিশ</Link></li>
          <li><Link to="/units" className="text-gray-500 hover:text-green-600 transition-colors">ইউনিটসমূহ</Link></li>
          <li><Link to="/gallery" className="text-gray-500 hover:text-green-600 transition-colors">গ্যালারি</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-gray-900 font-bold mb-6">যোগাযোগ</h4>
        <div className="space-y-4 text-sm text-gray-500">
          <p>জেলা স্কাউট অফিস, হবিগঞ্জ</p>
          <p>ইমেইল: habiganjzilarover@gmail.com</p>
          <p>ফোন: +৮৮০ ১৭১১-XXXXXX</p>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
      <p>&copy; {new Date().getFullYear()} হবিগঞ্জ জেলা রোভার। সর্বস্বত্ব সংরক্ষিত।</p>
    </div>
  </footer>
);

const AdminSidebar = ({ setAuth }: { setAuth: (val: boolean) => void }) => {
  const location = useLocation();
  const menuItems = [
    { path: '/admin', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { path: '/admin/notices', label: 'নোটিশ', icon: FileText },
    { path: '/admin/units', label: 'ইউনিট', icon: Users },
    { path: '/admin/gallery', label: 'গ্যালারি', icon: ImageIcon },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 min-h-screen hidden md:flex flex-col">
      <div className="p-8 border-b border-gray-50">
        <img src={LOGO_URL} alt="Logo" className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-sm font-bold text-center text-gray-400 uppercase tracking-widest">এডমিন কন্ট্রোল</h2>
      </div>
      <nav className="flex-1 mt-6 px-4 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 space-x-3 rounded-xl transition-all ${
                isActive ? 'bg-green-600 text-white shadow-lg shadow-green-100' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              <span className="font-semibold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-50">
        <button
          onClick={() => {
            localStorage.removeItem('admin_token');
            setAuth(false);
          }}
          className="w-full flex items-center px-4 py-3 space-x-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mb-2"
        >
          <LogOut size={18} />
          <span className="font-bold text-sm">লগআউট</span>
        </button>
        <Link to="/" className="flex items-center justify-center space-x-2 text-gray-400 hover:text-gray-600 transition-colors py-2">
          <HomeIcon size={16} />
          <span className="text-xs font-bold">মূল ওয়েবসাইট</span>
        </Link>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, isAuth }: { children?: React.ReactNode, isAuth: boolean }) => {
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) setIsAuth(true);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen pt-20">
        <Routes>
          <Route path="/admin/*" element={
            <ProtectedRoute isAuth={isAuth}>
              <div className="flex flex-1 pt-0">
                <AdminSidebar setAuth={setIsAuth} />
                <div className="flex-1 bg-gray-50/50 overflow-y-auto">
                   <div className="p-4 md:p-10">
                     <Routes>
                        <Route index element={<AdminDashboard />} />
                        <Route path="notices" element={<AdminNotices />} />
                        <Route path="units" element={<AdminUnits />} />
                        <Route path="gallery" element={<AdminGallery />} />
                     </Routes>
                   </div>
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/*" element={
            <>
              <Navbar isAdmin={isAuth} />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/notices" element={<Notices />} />
                  <Route path="/units" element={<Units />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/login" element={<Login setAuth={setIsAuth} />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
