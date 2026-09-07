import Link from 'next/link';
import { BookOpen, Gamepad2, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-10 px-4 relative overflow-hidden">
      
      {/* Animated Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-3xl z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
       
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight leading-[1.1]">
          ปลดล็อกสกิล <br/><br></br>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-500 via-blue-500 to-indigo-500">
            &quot;เลขฐาน 2&quot;
          </span><br></br>
          <br/>ให้เป็นเรื่องง่ายๆ
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
          เปลี่ยนเรื่องคอมพิวเตอร์ที่ดูซับซ้อน ให้เข้าใจง่ายด้วยภาพเปรียบเทียบ และแบบฝึกหัดที่เหมือนเล่นเกม!
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mt-16 z-10">
        
        {/* Learn Card */}
        <Link href="/learn" className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left block">
          <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-linear-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
              <BookOpen size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3 flex items-center justify-between">
              เริ่มบทเรียน
              <ChevronRight className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              อธิบายด้วยภาพ &quot;สวิตช์ไฟ&quot; เข้าใจทันทีไม่ต้องท่องจำ พร้อมตัวจำลองระบบวงจรของจริงให้ลองกดเล่น
            </p>
          </div>
        </Link>

        {/* Quiz Card */}
        <Link href="/quiz" className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left block">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-linear-to-br from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <Gamepad2 size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3 flex items-center justify-between">
              เข้าห้องสอบ
              <ChevronRight className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              ท้าทายสมองกับโจทย์แบบสุ่ม เลือกระดับความยากได้ พร้อมระบบคำใบ้และสรุปผลคะแนนแบบเรียลไทม์
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}