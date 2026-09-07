import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LearnPage from '../app/learn/page';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Learn Page', () => {
  it('renders the main headers', () => {
    render(<LearnPage />);
    expect(screen.getByText(/ทฤษฎีสวิตช์ไฟ/i)).toBeInTheDocument();
    expect(screen.getByText(/ลองกดสวิตช์ไฟด้วยตัวเอง!/i)).toBeInTheDocument();
  });

  it('interacts with the Bit Flipper correctly', () => {
    render(<LearnPage />);
    
    // Initially the sum should be 0
    expect(screen.getByText('0', { selector: '.text-8xl.md\\:text-9xl' })).toBeInTheDocument();
    
    // Find the toggle buttons - they contain the aria-label we added
    const bitButtons = screen.getAllByRole('button');
    // There are 8 bits, let's click the last one (which is 1)
    // Wait, the buttons are mapped 128, 64, 32, 16, 8, 4, 2, 1
    // Let's click the 8th button (index 7, weight 1)
    fireEvent.click(bitButtons[7]);
    
    // The sum should now be 1
    expect(screen.getByText('1', { selector: '.text-8xl.md\\:text-9xl' })).toBeInTheDocument();
    
    // Click the 1st button (index 0, weight 128)
    fireEvent.click(bitButtons[0]);
    
    // The sum should now be 129
    expect(screen.getByText('129', { selector: '.text-8xl.md\\:text-9xl' })).toBeInTheDocument();
    
    // Toggle the 8th button off
    fireEvent.click(bitButtons[7]);
    
    // The sum should now be 128
    expect(screen.getByText('128', { selector: '.text-8xl.md\\:text-9xl' })).toBeInTheDocument();
  });
});
