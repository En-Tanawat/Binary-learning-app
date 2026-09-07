'use client';
import { useState } from 'react';
import { Lightbulb, Power, PlayCircle } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 0 ? 1 : 0;
    setBits(newBits);
  };

  const decimalValue = bits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="text-center space-y-6 pt-4 mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 text-amber-600 rounded-4xl mb-2 shadow-sm">
          <Lightbulb className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
          เคล็ดลับจำง่าย: <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-500">ทฤษฎีสวิตช์ไฟ</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto">
          เลขฐาน 2 ไม่ใช่เรื่องยาก! แค่คิดว่ามันคือ &quot;สวิตช์ไฟ&quot; ในบ้านของคุณ
        </p>
      </div>

      {/* The Core Concept */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center transform transition-transform hover:-translate-y-2">
          <div className="text-7xl mb-6 text-slate-200 grayscale opacity-50">💡</div>
          <h2 className="text-6xl font-black text-slate-700 font-mono mb-4">0</h2>
          <p className="text-xl text-slate-500 font-bold bg-slate-50 py-4 px-6 rounded-2xl">สถานะ &quot;ปิด&quot;<br/><span className="text-base font-normal mt-1 block">(ไม่เอาแต้มมารวม)</span></p>
        </div>
        <div className="bg-linear-to-b from-amber-50 to-orange-50 rounded-[2.5rem] p-10 border border-amber-100 shadow-xl shadow-amber-200/40 text-center transform transition-transform hover:-translate-y-2">
          <div className="text-7xl mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse">💡</div>
          <h2 className="text-6xl font-black text-orange-600 font-mono mb-4">1</h2>
          <p className="text-xl text-orange-700 font-bold bg-orange-100/50 py-4 px-6 rounded-2xl">สถานะ &quot;เปิด&quot;<br/><span className="text-base font-normal mt-1 block">(เอาแต้มมารวมกัน)</span></p>
        </div>
      </div>

      {/* Interactive Bit Flipper */}
      <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mt-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12 text-white text-center md:text-left">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
              <Power className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">ลองกดสวิตช์ไฟด้วยตัวเอง!</h2>
              <p className="text-slate-400 text-lg">หลอดไฟแต่ละดวงมี &quot;แต้ม&quot; ไม่เท่ากัน เริ่มจากขวามาซ้าย (1, 2, 4, 8...)</p>
            </div>
          </div>

          {/* Horizontal scroll wrapper for small screens to prevent line breaks */}
          <div className="w-full overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <div className="flex justify-between md:grid md:grid-cols-8 min-w-150 md:min-w-0 gap-3 md:gap-4 mb-8">
              {bits.map((bit, idx) => {
                const weight = Math.pow(2, 7 - idx);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-3">
                    <div className="text-amber-300 font-bold text-sm bg-amber-500/10 px-2 py-1.5 rounded-lg w-full text-center border border-amber-500/20 whitespace-nowrap">
                      +{weight}
                    </div>
                    <button
                      onClick={() => toggleBit(idx)}
                      className={`w-full aspect-2/3 rounded-2xl flex flex-col items-center justify-between p-3 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
                        bit === 1 
                          ? 'bg-linear-to-b from-amber-400 to-orange-500 shadow-[0_0_25px_rgba(245,158,11,0.5)] border border-amber-300 scale-105' 
                          : 'bg-slate-800 border border-slate-700 shadow-inner hover:bg-slate-700/80'
                      }`}
                      aria-label={`Toggle bit with weight ${weight}`}
                    >
                      <div className={`w-4 h-4 rounded-full mt-2 transition-colors ${bit === 1 ? 'bg-white shadow-[0_0_15px_white]' : 'bg-slate-600'}`}></div>
                      <span className={`text-4xl font-black font-mono mt-auto ${bit === 1 ? 'text-white drop-shadow-md' : 'text-slate-600'}`}>
                        {bit}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm mt-4">
            <div className="text-slate-400 text-xl font-medium mb-2">แต้มรวมที่ได้ตอนนี้ (เลขฐาน 10)</div>
            <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-br from-teal-400 via-blue-400 to-indigo-400 font-mono tracking-tighter">
              {decimalValue}
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200 w-full my-16"></div>

      {/* Simplified Theory Sections */}
      <div className="space-y-12">
        <h2 className="text-4xl font-black text-slate-800 text-center mb-12">สรุปวิธีคิดง่ายๆ 2 แบบ</h2>
        
        {/* Bin -> Dec Explanation */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <span className="bg-teal-100 text-teal-700 text-2xl font-black w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">1</span>
            <h3 className="text-3xl font-bold text-slate-800">แปลง ฐาน 2 → ฐาน 10</h3>
          </div>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            <strong>ทริค:</strong> เขียนแต้ม (1, 2, 4, 8, 16...) ไว้บนหัวตัวเลขฐาน 2 จากขวาไปซ้าย ถ้าเห็นเลข <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-bold">1</span> ให้หยิบแต้มนั้นมาบวกกัน!
          </p>
          
          <div className="bg-slate-50 p-8 rounded-4xl border border-slate-100">
            <div className="text-center font-bold text-slate-500 mb-8 text-lg">ตัวอย่างโจทย์: แปลง <strong className="text-slate-800 text-2xl ml-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">1011₂</strong></div>
            <div className="flex justify-center gap-4 md:gap-8 text-center font-mono text-xl mb-10">
              <div className="flex flex-col items-center">
                <div className="text-teal-600 font-bold mb-3 text-sm md:text-base bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">แต้ม 8</div>
                <div className="text-5xl font-black text-slate-800 mb-3">1</div>
                <div className="text-base font-bold text-teal-600 bg-white px-3 py-1 rounded-full shadow-sm">✓ เอา 8</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-slate-400 font-bold mb-3 text-sm md:text-base bg-slate-100 border border-slate-200 rounded-xl px-4 py-2">แต้ม 4</div>
                <div className="text-5xl font-black text-slate-300 mb-3">0</div>
                <div className="text-base font-bold text-slate-400 px-3 py-1">✗ ไม่เอา</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-teal-600 font-bold mb-3 text-sm md:text-base bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">แต้ม 2</div>
                <div className="text-5xl font-black text-slate-800 mb-3">1</div>
                <div className="text-base font-bold text-teal-600 bg-white px-3 py-1 rounded-full shadow-sm">✓ เอา 2</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-teal-600 font-bold mb-3 text-sm md:text-base bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">แต้ม 1</div>
                <div className="text-5xl font-black text-slate-800 mb-3">1</div>
                <div className="text-base font-bold text-teal-600 bg-white px-3 py-1 rounded-full shadow-sm">✓ เอา 1</div>
              </div>
            </div>
            <div className="text-center text-2xl md:text-3xl font-bold text-slate-700 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              รวมแต้ม: <span className="text-teal-600">8</span> + 0 + <span className="text-teal-600">2</span> + <span className="text-teal-600">1</span> = <span className="text-5xl font-black text-teal-600 ml-2">11</span>
            </div>
          </div>
        </div>

        {/* Dec -> Bin Explanation */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <span className="bg-blue-100 text-blue-700 text-2xl font-black w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">2</span>
            <h3 className="text-3xl font-bold text-slate-800">แปลง ฐาน 10 → ฐาน 2</h3>
          </div>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            <strong>ทริค (วิธีลบค่าทีละขั้น):</strong> ให้คิดว่าเรามี &quot;แต้มเป้าหมาย&quot; และต้องเลือกหยิบแต้มก้อนใหญ่ที่สุด (16, 8, 4, 2, 1) มาใส่ให้พอดี หยิบได้ใส่ <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-bold">1</span> หยิบไม่ได้ใส่ <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-lg font-bold">0</span>
          </p>
          
          <div className="bg-slate-50 p-6 md:p-8 rounded-4xl border border-slate-100">
             <div className="text-center font-bold text-slate-500 mb-8 text-lg">ตัวอย่างโจทย์: แปลงแต้ม <strong className="text-slate-800 text-2xl mx-1 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">13</strong> เป็นฐาน 2</div>
             
             <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm gap-4">
                  <div className="text-slate-700 font-bold text-lg">เป้าหมาย 13... หยิบแต้ม <span className="text-2xl font-black text-blue-600 mx-1">8</span> ได้ไหม?</div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <span className="text-base text-slate-500 font-medium">ได้ (เหลือ 5)</span>
                    <span className="bg-blue-600 text-white font-black text-2xl w-12 h-12 flex items-center justify-center rounded-xl shadow-md">1</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm gap-4">
                  <div className="text-slate-700 font-bold text-lg">เหลือ 5... หยิบแต้ม <span className="text-2xl font-black text-blue-600 mx-1">4</span> ได้ไหม?</div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <span className="text-base text-slate-500 font-medium">ได้ (เหลือ 1)</span>
                    <span className="bg-blue-600 text-white font-black text-2xl w-12 h-12 flex items-center justify-center rounded-xl shadow-md">1</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-5 rounded-2xl border border-slate-200 gap-4 opacity-75">
                  <div className="text-slate-600 font-bold text-lg">เหลือ 1... หยิบแต้ม <span className="text-2xl font-black text-slate-500 mx-1">2</span> ได้ไหม?</div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <span className="text-base text-slate-400 font-medium">ไม่ได้ (ใหญ่ไป)</span>
                    <span className="bg-slate-300 text-slate-500 font-black text-2xl w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">0</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-sm gap-4">
                  <div className="text-slate-700 font-bold text-lg">เหลือ 1... หยิบแต้ม <span className="text-2xl font-black text-blue-600 mx-1">1</span> ได้ไหม?</div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <span className="text-base text-green-600 font-bold">ได้พอดี! (เหลือ 0)</span>
                    <span className="bg-blue-600 text-white font-black text-2xl w-12 h-12 flex items-center justify-center rounded-xl shadow-md">1</span>
                  </div>
                </div>
             </div>
             
             <div className="text-center mt-10 text-2xl font-bold text-slate-700">
                นำตัวเลขมาเรียงกัน จะได้ 
                <span className="text-5xl font-black text-blue-600 ml-4 font-mono tracking-widest bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">1101₂</span>
             </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center pt-12 pb-8">
        <Link href="/quiz" className="flex items-center gap-4 bg-slate-800 hover:bg-slate-700 text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 outline-none focus-visible:ring-4 focus-visible:ring-slate-400">
          <PlayCircle className="w-8 h-8 text-teal-400" />
          ไปลุยห้องสอบกันเลย!
        </Link>
      </div>
    </div>
  );
}