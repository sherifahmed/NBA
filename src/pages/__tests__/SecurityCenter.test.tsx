import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SecurityCenter from '../SecurityCenter';
import { MemoryRouter } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';

// Mock Amplify
vi.mock('aws-amplify/api', () => ({
  generateClient: vi.fn(() => ({
    models: {
      BusinessProfile: {
        list: vi.fn().mockResolvedValue({ 
          data: [{ 
            id: '1', 
            businessEmail: 'test@example.com', 
            isEmailVerified: false,
            businessPhone: '1234567890',
            isPhoneVerified: false
          }] 
        }),
        update: vi.fn().mockResolvedValue({ data: {} })
      }
    }
  }))
}));

vi.mock('aws-amplify/auth', () => ({
  confirmSignUp: vi.fn().mockResolvedValue({ isSignUpComplete: true }),
  resendSignUpCode: vi.fn().mockResolvedValue({})
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn())
  };
});

describe('SecurityCenter', () => {
  it('renders identity verification section with email and phone', async () => {
    render(
      <MemoryRouter>
        <SecurityCenter />
      </MemoryRouter>
    );
    
    expect(await screen.findByText(/Identity Verification/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('shows OTP input when "Verify Now" is clicked', async () => {
    render(
      <MemoryRouter>
        <SecurityCenter />
      </MemoryRouter>
    );
    
    const verifyButton = await screen.findAllByText(/Verify Now/i);
    fireEvent.click(verifyButton[0]); // Click Email verify
    
    expect(await screen.findByText(/Enter OTP/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('000000')).toBeInTheDocument();
  });
});
