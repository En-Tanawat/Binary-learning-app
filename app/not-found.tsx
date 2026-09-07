import Link from 'next/link';
import { Home, ZapOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
      <div className="relative">
        <div className="text-[8rem] md:text-[12rem] font-black text-slate-100 font-mono tracking-tighter drop-shadow-sm select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 transform rotate-12">
            <ZapOff className="w-16 h-16 text-rose-500" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">อ๊ะ! หาหน้านี้ไม่เจอ</h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          สงสัยวงจรไฟฟ้าจะขาด! หน้าเว็บไซต์ที่คุณกำลังตามหาอาจถูกย้ายไปแล้ว หรือไม่มีอยู่จริงในระบบ
        </p>
      </div>

      <Link href="/" className="mt-8 flex items-center gap-3 bg-slate-800 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-teal-500">
        <Home size={24} />
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
