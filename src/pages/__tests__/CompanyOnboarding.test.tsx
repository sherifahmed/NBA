import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CompanyOnboarding from '../CompanyOnboarding';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock Amplify libs
vi.mock('aws-amplify/api', () => ({
  generateClient: () => ({
    models: {
      BusinessInvitation: {
        list: vi.fn().mockResolvedValue({ 
          data: [{ 
            id: '1', 
            businessName: 'Test Co', 
            businessEmail: 'test@example.com',
            status: 'PENDING' 
          }] 
        })
      },
      BusinessProfile: {
        create: vi.fn().mockResolvedValue({ data: {} }),
        list: vi.fn().mockResolvedValue({ data: [] })
      }
    }
  })
}));

vi.mock('aws-amplify/auth', () => ({
  signUp: vi.fn().mockResolvedValue({ isSignUpComplete: true }),
  confirmSignUp: vi.fn().mockResolvedValue({ isSignUpComplete: true })
}));

describe('CompanyOnboarding', () => {
  it('renders the invitation code step by default', () => {
    render(
      <MemoryRouter initialEntries={['/onboard']}>
        <Routes>
          <Route path="/onboard" element={<CompanyOnboarding />} />
          <Route path="/onboard/:code" element={<CompanyOnboarding />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Verify Invitation/i)).toBeInTheDocument();
  });

  it('navigates to step 2 after valid invitation code', async () => {
    render(
      <MemoryRouter initialEntries={['/onboard']}>
        <Routes>
          <Route path="/onboard" element={<CompanyOnboarding />} />
        </Routes>
      </MemoryRouter>
    );
    
    const input = screen.getByPlaceholderText('XXX-XXX');
    fireEvent.change(input, { target: { value: 'TEST-123' } });
    
    const button = screen.getByText(/Verify Invitation/i);
    fireEvent.click(button);
    
    expect(await screen.findByText(/Initialize Business OS/i)).toBeInTheDocument();
  });

  it('renders Step 2 when code is in URL', async () => {
    render(
      <MemoryRouter initialEntries={['/onboard/F86-ZQR']}>
        <Routes>
          <Route path="/onboard/:code" element={<CompanyOnboarding />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(await screen.findByText(/Initialize Business OS/i)).toBeInTheDocument();
  });
});
