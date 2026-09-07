import { Binary } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-teal-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-teal-500 to-blue-600 p-6 rounded-3xl shadow-xl animate-bounce">
          <Binary size={48} className="text-white" />
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <p className="text-xl font-black text-slate-800 tracking-wide">
          กำลังโหลด...
        </p>
        <p className="text-sm font-mono text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-lg animate-pulse">
          01101100 01101111 01100001 01100100
        </p>
      </div>
    </div>
  );
}
