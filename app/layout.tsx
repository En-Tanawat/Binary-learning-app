import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import { Prompt, JetBrains_Mono } from 'next/font/google';

const prompt = Prompt({
  subsets: ['latin', 'thai'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-prompt',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  title: 'BinLearn - เรียนรู้เลขฐาน 2 ได้ง่ายๆ',
  description: 'Web Application สำหรับการเรียนรู้เลขฐาน 2 (Binary Numbers) พร้อมแบบฝึกหัด Interactive สำหรับผู้เริ่มต้น',
  keywords: ['เลขฐาน 2', 'binary', 'เรียนรู้คอมพิวเตอร์', 'วิทยาการคำนวณ', 'BinLearn'],
  authors: [{ name: 'BinLearn Team' }],
  openGraph: {
    title: 'BinLearn - สนุกกับการแปลงเลขฐาน 2',
    description: 'เรียนรู้วิธีการแปลงเลขฐาน 2 เป็นฐาน 10 ได้อย่างง่ายดาย พร้อมห้องสอบทดสอบความเข้าใจ',
    url: 'https://binary-learning-app.vercel.app',
    siteName: 'BinLearn',
    locale: 'th_TH',
    type: 'website',
  },
};

import { FontSizeProvider } from './components/FontSizeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${prompt.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#f8fafc] text-slate-800 min-h-screen selection:bg-teal-200 selection:text-teal-900 font-sans antialiased flex flex-col">
        <FontSizeProvider>
          <Navbar />
          {/* Main content takes remaining space (flex-1) ensuring footer stays at bottom */}
          <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 pt-6 md:pt-10 mb-12">
            {children}
          </main>
          
          {/* Added Footer for better visual grounding */}
          <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-auto bg-white/50 backdrop-blur-sm">
            <p className="flex items-center justify-center gap-2">
              © {new Date().getFullYear()} BinLearn 
              <span className="hidden sm:inline text-slate-300">•</span> 
              <span className="hidden sm:inline">ระบบเรียนรู้เลขฐาน 2 สร้างขึ้นเพื่อให้การเรียนรู้เป็นเรื่องง่าย</span>
            </p>
          </footer>
        </FontSizeProvider>
      </body>
    </html>
  );
}