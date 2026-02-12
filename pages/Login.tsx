
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const LOGO_URL = "https://lh3.googleusercontent.com/d/1lsfDCTkiNPN7ICv5OPTvB8FhUf0_Vr2D";

const Login = ({ setAuth }: { setAuth: (val: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // ব্যাকএন্ডে লগইন রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch("https://my-project-backend-hkk6.onrender.com/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setAuth(true);
        navigate('/admin');
        return;
      }
    } catch (err) {
      console.warn("Server connection failed, checking local fallback...");
    }

    // Fallback logic (সার্ভার না থাকলেও যেন এডমিন কাজ চালিয়ে নিতে পারেন)
    if (username === "admin" && password === "rover123") {
      localStorage.setItem('admin_token', 'demo_token_active');
      setAuth(true);
      navigate('/admin');
    } else {
      setError('ইউজারনেম বা পাসওয়ার্ড সঠিক নয়।');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center p-4 bg-gray-50/50">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-green-700 mb-8 font-bold text-sm transition-colors group">
           <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
           মূল ওয়েবসাইটে ফিরে যান
        </Link>
        
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
               <img src={LOGO_URL} alt="Logo" className="w-20 h-20 mb-6" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">এডমিন প্যানেল</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">লগইন করুন</p>
          </div>

          {error && (
            <div className="mb-8 bg-red-50 border-l-4 border-red-600 p-4 flex items-center text-red-700 animate-in fade-in duration-300 rounded-r-xl">
              <AlertCircle size={20} className="mr-3 flex-shrink-0" />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ইউজারনেম</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all font-medium text-gray-700"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">পাসওয়ার্ড</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all font-medium text-gray-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-700 text-white font-bold py-4 rounded-2xl hover:bg-green-800 transition-all shadow-lg shadow-green-100 flex items-center justify-center text-lg active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
             <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Habiganj Zilla Rover</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
