'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Gamepad2, Home, Menu, X, Binary } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFontSize, FontSize } from './FontSizeProvider';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { fontSize, setFontSize } = useFontSize();

  // Add scroll listener for dynamic shadow/border
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'หน้าแรก', href: '/', icon: <Home size={18} /> },
    { name: 'บทเรียน', href: '/learn', icon: <BookOpen size={18} /> },
    { name: 'แบบฝึกหัด', href: '/quiz', icon: <Gamepad2 size={18} /> },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/50' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-black flex items-center gap-3 text-slate-800 hover:text-teal-600 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl">
            <div className="bg-slate-800 text-white p-2 rounded-xl group-hover:bg-teal-500 transition-colors shadow-sm">
              <Binary size={24} />
            </div>
            <span>Bin<span className="text-teal-500">Learn</span></span>
          </Link>

          {/* Desktop Menu & Settings */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                      isActive 
                        ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Font Size Settings */}
            <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
              <button 
                onClick={() => setFontSize('small')} 
                className={`px-3 py-2 rounded-xl font-bold transition-all text-sm ${fontSize === 'small' ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                aria-label="ลดขนาดตัวอักษร"
                title="ลดขนาดตัวอักษร"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('normal')} 
                className={`px-3 py-2 rounded-xl font-bold transition-all text-base ${fontSize === 'normal' ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                aria-label="ขนาดตัวอักษรปกติ"
                title="ขนาดตัวอักษรปกติ"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')} 
                className={`px-3 py-2 rounded-xl font-bold transition-all text-lg ${fontSize === 'large' ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'}`}
                aria-label="เพิ่มขนาดตัวอักษร"
                title="เพิ่มขนาดตัวอักษร"
              >
                A+
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 shadow-xl absolute w-full animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                    isActive 
                      ? 'bg-teal-50 text-teal-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
            
            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between px-2">
              <span className="text-slate-500 font-bold">ขนาดตัวอักษร</span>
              <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
                <button 
                  onClick={() => setFontSize('small')} 
                  className={`px-4 py-2 rounded-xl font-bold transition-all text-sm ${fontSize === 'small' ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500'}`}
                >A-</button>
                <button 
                  onClick={() => setFontSize('normal')} 
                  className={`px-4 py-2 rounded-xl font-bold transition-all text-base ${fontSize === 'normal' ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500'}`}
                >A</button>
                <button 
                  onClick={() => setFontSize('large')} 
                  className={`px-4 py-2 rounded-xl font-bold transition-all text-lg ${fontSize === 'large' ? 'bg-white text-teal-600 shadow-sm ring-1 ring-slate-900/5' : 'text-slate-500'}`}
                >A+</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}