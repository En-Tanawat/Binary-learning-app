import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../app/page';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  ),
}));

describe('Home Page', () => {
  it('renders the hero section correctly', () => {
    render(<Home />);
    
    // Check if main headings exist
    expect(screen.getByText(/ปลดล็อกสกิล/i)).toBeInTheDocument();
    expect(screen.getByText(/"เลขฐาน 2"/i)).toBeInTheDocument();
    
    // Check if the learning card is present
    expect(screen.getByText(/เริ่มบทเรียน/i)).toBeInTheDocument();
    
    // Check if the quiz card is present
    expect(screen.getByText(/เข้าห้องสอบ/i)).toBeInTheDocument();
  });

  it('contains links to learn and quiz pages', () => {
    render(<Home />);
    
    const links = screen.getAllByTestId('mock-link');
    const hrefs = links.map((link) => link.getAttribute('href'));
    
    expect(hrefs).toContain('/learn');
    expect(hrefs).toContain('/quiz');
  });
});
