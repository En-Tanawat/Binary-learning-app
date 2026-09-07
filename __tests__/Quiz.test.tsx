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
    expect(screen.getAllByRole('button', { name: /ตรวจคำตอบ/i })[0]).toBeInTheDocument();
  });

  it('generates a question and handles input', () => {
    render(<QuizPage />);
    
    // The question should be visible (a string of 0s and 1s or decimal number)
    const input = screen.getAllByPlaceholderText(/พิมพ์เลขฐาน/i)[0];
    expect(input).toBeInTheDocument();
    
    // Simulate user typing
    fireEvent.change(input, { target: { value: '10' } });
    expect(input).toHaveValue('10');
  });

  it('toggles hints', () => {
    render(<QuizPage />);
    
    const hintBtn = screen.getAllByRole('button', { name: /ขอคำใบ้หน่อย!/i })[0];
    expect(hintBtn).toBeInTheDocument();
    
    // Click hint
    fireEvent.click(hintBtn);
    
    // Hint content should appear
    expect(screen.getAllByText(/ทริค:/i)[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /ซ่อนคำใบ้/i })[0]).toBeInTheDocument();
  });

  it('changes difficulty', () => {
    render(<QuizPage />);
    
    const hardBtn = screen.getAllByRole('button', { name: /HARD/i })[0];
    fireEvent.click(hardBtn);
    
    // Score should reset (Accuracy 0%)
    expect(screen.getAllByText('0', { selector: 'span.text-6xl.font-black' })[0]).toBeInTheDocument();
  });
});
