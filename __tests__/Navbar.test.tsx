import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../app/components/Navbar';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ children, href, className, onClick }: any) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe('Navbar Component', () => {
  it('renders the logo and links', () => {
    render(<Navbar />);
    expect(screen.getByText(/Bin/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn/i)).toBeInTheDocument();
    
    // Links should be present
    expect(screen.getAllByText(/หน้าแรก/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/บทเรียน/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/แบบฝึกหัด/i).length).toBeGreaterThan(0);
  });

  it('toggles mobile menu', () => {
    render(<Navbar />);
    
    // In desktop view, mobile menu is hidden but DOM elements might be conditional
    // Find the toggle button
    const toggleBtn = screen.getAllByRole('button', { name: /Toggle Menu/i })[0];
    expect(toggleBtn).toBeInTheDocument();
    
    // Initially the mobile menu dropdown might not be in the document
    // Actually the links are rendered twice when open, once when closed
    const initialLinksCount = screen.getAllByText(/หน้าแรก/i).length;
    
    fireEvent.click(toggleBtn);
    
    // After clicking, the mobile menu links should be present (count increases)
    const expandedLinksCount = screen.getAllByText(/หน้าแรก/i).length;
    expect(expandedLinksCount).toBeGreaterThan(initialLinksCount);
  });
});
