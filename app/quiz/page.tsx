'use client';
import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Star, Trophy, ArrowRight, Lightbulb, HelpCircle, BrainCircuit } from 'lucide-react';

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type QuestionType = 'BIN_TO_DEC' | 'DEC_TO_BIN';

export default function QuizPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [qType, setQType] = useState<QuestionType>('BIN_TO_DEC');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempt, setTotalAttempt] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const [showHint, setShowHint] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  const generateQuestion = (level: Difficulty) => {
    const maxBits = level === 'EASY' ? 4 : level === 'MEDIUM' ? 6 : 8;
    const minVal = level === 'EASY' ? 1 : level === 'MEDIUM' ? 16 : 64;
    const maxVal = (1 << maxBits) - 1;
    
    const randomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    
    const newType = Math.random() > 0.5 ? 'BIN_TO_DEC' : 'DEC_TO_BIN';
    setQType(newType);
    
    if (newType === 'BIN_TO_DEC') {
      setQuestion(randomNum.toString(2));
      setAnswer(randomNum.toString(10));
    } else {
      setQuestion(randomNum.toString(10));
      setAnswer(randomNum.toString(2));
    }

    setUserAnswer('');
    setIsCorrect(null);
    setShowHint(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQuestion(difficulty);
  }, [difficulty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer) return;

    let isAnsCorrect = false;
    if (qType === 'BIN_TO_DEC') {
      isAnsCorrect = parseInt(userAnswer, 10).toString() === answer;
    } else {
      const sanitized = userAnswer.replace(/[^01]/g, '');
      isAnsCorrect = parseInt(sanitized, 2) === parseInt(answer, 2);
    }

    setIsCorrect(isAnsCorrect);
    setTotalAttempt(prev => prev + 1);
    
    if (isAnsCorrect) {
      setScore(prev => prev + 1);
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1500);
    }
  };

  const getAccuracy = () => {
    if (totalAttempt === 0) return 0;
    return Math.round((score / totalAttempt) * 100);
  };

  return (
    <div className="w-full grid lg:grid-cols-3 gap-8">
      
      {/* Quiz Section (Left) */}
      <div className={`lg:col-span-2 bg-white p-6 sm:p-10 rounded-4xl shadow-xl shadow-slate-200/40 border-2 transition-all duration-500 ${isGlowing ? 'border-green-400 shadow-[0_0_50px_rgba(74,222,128,0.3)]' : 'border-slate-100'}`}>
        
        {/* Header & Skip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 border-b border-slate-100 pb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 flex items-center gap-4">
            <div className="bg-teal-100 text-teal-600 p-2.5 rounded-2xl">
              <BrainCircuit className="w-8 h-8" />
            </div>
            โจทย์ทดสอบ
          </h1>
          <button 
            onClick={() => generateQuestion(difficulty)} 
            className="flex items-center justify-center gap-2 text-slate-500 hover:text-teal-600 bg-slate-50 hover:bg-teal-50 px-5 py-3 rounded-xl font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <RefreshCw size={18} /> ข้ามข้อนี้
          </button>
        </div>

        {/* Difficulty Selection */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-10">
          {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((level) => {
            const isActive = difficulty === level;
            const stars = level === 'EASY' ? 1 : level === 'MEDIUM' ? 2 : 3;
            
            let colorClass = 'bg-slate-100 text-slate-500 hover:bg-slate-200';
            if (isActive) {
              if (level === 'EASY') colorClass = 'bg-linear-to-br from-green-400 to-green-500 text-white shadow-lg shadow-green-200';
              if (level === 'MEDIUM') colorClass = 'bg-linear-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200';
              if (level === 'HARD') colorClass = 'bg-linear-to-br from-red-400 to-rose-500 text-white shadow-lg shadow-red-200';
            }

            return (
              <button
                key={level}
                onClick={() => { setDifficulty(level); setScore(0); setTotalAttempt(0); }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base transition-all transform hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${colorClass}`}
              >
                {level}
                <div className="flex">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} size={16} className={isActive ? 'fill-white text-white' : 'fill-slate-400 text-transparent'} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Question Board */}
        <div className="bg-slate-900 p-8 sm:p-14 rounded-[2.5rem] text-center mb-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]"></div>
          <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-slate-300 text-sm font-bold px-4 py-1.5 rounded-full border border-white/10">
            ข้อที่ {totalAttempt + (isCorrect === null ? 1 : 0)}
          </div>
          
          <p className="text-slate-400 mb-8 font-medium text-lg mt-6 sm:mt-0">
            {qType === 'BIN_TO_DEC' 
              ? 'จงแปลงเลขฐาน 2 เป็นเลขฐาน 10'
              : 'จงแปลงเลขฐาน 10 เป็นเลขฐาน 2'}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 z-10 relative">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-mono font-black text-white tracking-tight drop-shadow-md">
              {question}<span className="text-2xl sm:text-4xl text-teal-400/80 ml-1">{qType === 'BIN_TO_DEC' ? '₂' : '₁₀'}</span>
            </h2>
            <span className="text-4xl sm:text-6xl font-black text-slate-600 mx-2">=</span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-mono font-black text-slate-500 tracking-tight">
              ?<span className="text-2xl sm:text-4xl text-slate-600 ml-1">{qType === 'BIN_TO_DEC' ? '₁₀' : '₂'}</span>
            </h2>
          </div>
        </div>

        {/* Hint System */}
        {!isCorrect && (
          <div className="mb-8">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="flex items-center justify-center gap-2 text-amber-600 font-bold bg-amber-50 hover:bg-amber-100 px-6 py-3 rounded-2xl transition-colors mx-auto w-full sm:w-auto outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <HelpCircle size={20} />
              {showHint ? 'ซ่อนคำใบ้' : 'ขอคำใบ้หน่อย!'}
            </button>
            
            {showHint && (
              <div className="mt-4 p-6 bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl animate-in slide-in-from-top-2 text-center text-amber-800 shadow-inner">
                <Lightbulb className="inline-block w-8 h-8 text-amber-500 mb-3 animate-bounce drop-shadow-sm" />
                {qType === 'BIN_TO_DEC' ? (
                  <p className="text-lg leading-relaxed"><strong>ทริค:</strong> นำบิต <span className="bg-amber-200 px-2 rounded">1</span> แต่ละตัวไปคูณค่าน้ำหนัก <br/>(เริ่มจากขวา: 1, 2, 4, 8, 16, 32... แล้วบวกกัน)</p>
                ) : (
                  <p className="text-lg leading-relaxed"><strong>ทริค:</strong> ลองตั้งลบด้วยแต้มใหญ่ที่สุดที่ใส่ได้ (เช่น 16, 8, 4) <br/>ใส่ได้เติม <span className="bg-amber-200 px-2 rounded font-mono">1</span> ใส่ไม่ได้เติม <span className="bg-amber-200/50 px-2 rounded font-mono">0</span></p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            inputMode="numeric"
            pattern={qType === 'BIN_TO_DEC' ? "[0-9]*" : "[01]*"}
            maxLength={12}
            autoComplete="off"
            value={userAnswer}
            onChange={(e) => {
              if (qType === 'DEC_TO_BIN') {
                // Mobile UX: only allow typing 0 and 1
                setUserAnswer(e.target.value.replace(/[^01]/g, ''));
              } else {
                setUserAnswer(e.target.value);
              }
            }}
            placeholder={qType === 'BIN_TO_DEC' ? "พิมพ์เลขฐาน 10..." : "พิมพ์เลขฐาน 2 (เช่น 1010)"}
            className="flex-1 border-2 border-slate-200 rounded-2xl p-5 text-3xl font-mono font-black text-center text-slate-800 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all shadow-sm placeholder:font-sans placeholder:font-medium placeholder:text-lg placeholder:text-slate-400"
            disabled={isCorrect !== null}
            autoFocus
          />
          <button 
            type="submit" 
            disabled={isCorrect !== null || !userAnswer} 
            className="bg-linear-to-br from-teal-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:from-teal-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
          >
            ตรวจคำตอบ
          </button>
        </form>

        {/* Result & Next Action */}
        {isCorrect !== null && (
          <div className={`mt-8 p-6 sm:p-8 rounded-4xl flex flex-col sm:flex-row items-center gap-6 animate-in zoom-in-95 duration-300 shadow-inner ${isCorrect ? 'bg-linear-to-br from-green-50 to-green-100 border-2 border-green-200' : 'bg-linear-to-br from-red-50 to-rose-100 border-2 border-red-200'}`}>
            <div className={`p-4 rounded-full shadow-lg ${isCorrect ? 'bg-green-500 text-white animate-bounce' : 'bg-red-500 text-white'}`}>
              {isCorrect ? <CheckCircle size={48} /> : <XCircle size={48} />}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className={`text-2xl sm:text-3xl font-black mb-3 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'ยอดเยี่ยม! ถูกต้อง 🎉' : 'อ๊ะ! ยังไม่ใช่นะ'}
              </h3>
              {!isCorrect && (
                <div className="bg-white p-4 rounded-2xl inline-block shadow-sm border border-white/50">
                  <p className="text-slate-600 font-bold text-lg flex items-center gap-3">
                    คำตอบคือ: 
                    <span className="text-3xl font-black font-mono text-red-600 tracking-widest bg-red-50 px-4 py-2 rounded-xl">
                      {answer}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => generateQuestion(difficulty)}
              className={`w-full sm:w-auto px-8 py-5 rounded-2xl font-black flex justify-center items-center gap-3 text-lg shadow-xl transition-transform hover:-translate-y-1 outline-none focus-visible:ring-4 ${isCorrect ? 'bg-green-600 hover:bg-green-500 text-white focus-visible:ring-green-400 shadow-green-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white focus-visible:ring-slate-500 shadow-slate-800/30'}`}
              autoFocus
            >
              ข้อต่อไป <ArrowRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Score Section (Right) - Sticky on desktop */}
      <div className="lg:col-span-1 bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col self-start sticky top-28">
        <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center sm:justify-start gap-3 mb-10 border-b border-slate-100 pb-6">
          <div className="bg-amber-100 p-2 rounded-xl">
            <Trophy className="text-amber-500 w-6 h-6" />
          </div>
          ผลคะแนน
        </h2>
        
        <div className="flex-1 flex flex-col items-center justify-start space-y-10">
          
          {/* Circular Progress */}
          <div className="relative w-56 h-56">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="stroke-slate-100" strokeWidth="10" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                className={`transition-all duration-1000 ease-out ${getAccuracy() >= 80 ? 'stroke-green-500' : getAccuracy() >= 50 ? 'stroke-amber-400' : 'stroke-teal-500'}`}
                strokeWidth="10" 
                fill="none" 
                strokeDasharray={`${getAccuracy() * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-slate-800 tracking-tighter">{getAccuracy()}<span className="text-3xl">%</span></span>
              <span className="text-sm text-slate-400 font-bold mt-2 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Accuracy</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="bg-green-50 p-5 rounded-2xl flex justify-between items-center border border-green-100/50">
              <span className="text-green-800 font-bold text-lg">ตอบถูก</span>
              <span className="text-3xl font-black font-mono text-green-600 bg-white px-5 py-2 rounded-xl shadow-sm">{score}</span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl flex justify-between items-center border border-slate-100/50">
              <span className="text-slate-600 font-bold text-lg">ทำทั้งหมด</span>
              <span className="text-3xl font-black font-mono text-slate-700 bg-white px-5 py-2 rounded-xl shadow-sm">{totalAttempt}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}