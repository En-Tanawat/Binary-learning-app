import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import QuizPage from '../app/quiz/page';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Quiz Page', () => {
  beforeEach(() => {
    // Reset Math.random to default if mocked
    vi.restoreAllMocks();
  });

  it('renders the quiz page correctly', () => {
    render(<QuizPage />);
    expect(screen.getByText(/โจทย์ทดสอบ/i)).toBeInTheDocument();
    expect(screen.getByText(/ผลคะแนน/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ตรวจคำตอบ/i })).toBeInTheDocument();
  });

  it('generates a question and handles input', () => {
    render(<QuizPage />);
    
    // The question should be visible (a string of 0s and 1s or decimal number)
    const input = screen.getByPlaceholderText(/พิมพ์เลขฐาน/i);
    expect(input).toBeInTheDocument();
    
    // Simulate user typing
    fireEvent.change(input, { target: { value: '10' } });
    expect(input).toHaveValue('10');
  });

  it('toggles hints', () => {
    render(<QuizPage />);
    
    const hintBtn = screen.getByRole('button', { name: /ขอคำใบ้หน่อย!/i });
    expect(hintBtn).toBeInTheDocument();
    
    // Click hint
    fireEvent.click(hintBtn);
    
    // Hint content should appear
    expect(screen.getByText(/ทริค:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ซ่อนคำใบ้/i })).toBeInTheDocument();
  });

  it('changes difficulty', () => {
    render(<QuizPage />);
    
    const hardBtn = screen.getByRole('button', { name: /HARD/i });
    fireEvent.click(hardBtn);
    
    // Score should reset (Accuracy 0%)
    expect(screen.getByText('0', { selector: 'span.text-6xl.font-black' })).toBeInTheDocument();
  });
});
