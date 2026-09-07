'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type FontSize = 'small' | 'normal' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType>({
  fontSize: 'normal',
  setFontSize: () => {},
});

export const useFontSize = () => useContext(FontSizeContext);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('binlearn-font-size') as FontSize;
    if (saved) {
      setFontSize(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('binlearn-font-size', fontSize);
    
    // Apply to html element
    const html = document.documentElement;
    
    if (fontSize === 'small') {
      html.style.fontSize = '87.5%'; // ~14px if default is 16px
    } else if (fontSize === 'large') {
      html.style.fontSize = '112.5%'; // ~18px
    } else {
      html.style.fontSize = '100%'; // 16px
    }
  }, [fontSize, mounted]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}
