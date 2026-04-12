import { useState } from 'react';
import { 
  Building2, Wallet, 
  ArrowRight, ShieldCheck, 
  Mail, Globe, AtSign
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const CompanyOnboarding = () => {
  const { code } = useParams();
  const [step, setStep] = useState(code ? 2 : 1);
  const [inviteCode, setInviteCode] = useState(code || '');
  const [formData, setFormData] = useState({
    name: 'Suhana\'s Home Boarding',
    address: '',
    currency: 'INR',
    email: '',
    password: ''
  });

  const currencies = [
    { code: 'INR', label: 'Indian Rupee (₹)', symbol: '₹' },
    { code: 'USD', label: 'US Dollar ($)', symbol: '$' },
    { code: 'GBP', label: 'British Pound (£)', symbol: '£' },
    { code: 'EUR', label: 'Euro (€)', symbol: '€' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center text-center mb-10">
           <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
              <img src="/NBA-Icon.png" alt="NBA Logo" className="w-12 h-12" />
           </div>
           <h1 className="text-4xl font-black tracking-tighter mb-2 italic uppercase">
             {step === 1 ? 'Join the' : 'Welcome to'} <span className="text-cyan-400">Platform</span>
           </h1>
           <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">
             {step === 1 ? 'Enter your invitation code to begin' : 'Let\'s set up your business profile'}
           </p>
        </div>

        {/* Step 1: Code Verification */}
        {step === 1 && (
          <div className="premium-glass p-8 border border-white/5 animate-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Invitation Code</label>
                   <input 
                      value={inviteCode}
                      onChange={e => setInviteCode(e.target.value.toUpperCase())}
                      placeholder="XXX-XXX"
                      className="w-full bg-slate-900 border border-white/10 rounded-2xl py-5 text-3xl font-black text-center tracking-[0.3em] font-mono focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-slate-800"
                   />
                </div>
                <button 
                   onClick={() => setStep(2)}
                   disabled={!inviteCode}
                   className="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                   Verify Invitation <ArrowRight className="w-5 h-5" />
                </button>
             </div>
          </div>
        )}

        {/* Step 2: Company Profile */}
        {step === 2 && (
          <div className="premium-glass p-8 border border-white/5 animate-in slide-in-from-right-4 duration-500 space-y-8">
             <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                     <Building2 className="w-3 h-3" /> Business Name
                   </label>
                   <input 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 text-white font-bold outline-none"
                   />
                </div>

                <div className="space-y-2">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                     <Wallet className="w-3 h-3" /> Currency
                   </label>
                   <div className="grid grid-cols-2 gap-2">
                      {currencies.map(curr => (
                        <button
                          key={curr.code}
                          onClick={() => setFormData({...formData, currency: curr.code})}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl border font-bold text-sm transition-all ${
                            formData.currency === curr.code ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-white/5 text-slate-500 hover:text-white'
                          }`}
                        >
                          {curr.label} <span>{curr.symbol}</span>
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-4">
                     Identity & Authentication
                   </label>
                   
                   <div className="space-y-3">
                      <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-slate-100 text-slate-950 font-black text-sm hover:bg-white transition-colors">
                        <Globe className="w-4 h-4" /> Continue with Google
                      </button>
                      <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-[#1877F2] text-white font-black text-sm hover:bg-[#1877F2]/90 transition-colors">
                        <AtSign className="w-4 h-4" /> Continue with Facebook
                      </button>
                      <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-[#0078D4] text-white font-black text-sm hover:bg-[#0078D4]/90 transition-colors">
                        <Mail className="w-4 h-4" /> Continue with Outlook
                      </button>
                      
                      <div className="flex items-center gap-4 py-4">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[10px] font-black text-slate-600 uppercase">OR</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>

                      <div className="space-y-3">
                         <input placeholder="Personal Email" className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm" />
                         <input type="password" placeholder="Create Password" className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm" />
                         <button className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm">Create Business Account</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className="mt-8 flex justify-center items-center gap-2 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">
           <ShieldCheck className="w-4 h-4" /> Built with AWS Cloud Security & Biometric Support
        </div>
      </div>
    </div>
  );
};

export default CompanyOnboarding;
