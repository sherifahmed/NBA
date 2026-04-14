import { useState } from 'react';
import { 
  Building2, 
  ArrowRight, ShieldCheck, 
  Mail, Loader2,
  AlertCircle, Phone, MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

const countries = [
  { name: 'India', code: 'IN', prefix: '+91', currency: 'INR', flag: '🇮🇳' },
  { name: 'United Kingdom', code: 'GB', prefix: '+44', currency: 'GBP', flag: '🇬🇧' },
  { name: 'United States', code: 'US', prefix: '+1', currency: 'USD', flag: '🇺🇸' },
  { name: 'United Arab Emirates', code: 'AE', prefix: '+971', currency: 'AED', flag: '🇦🇪' },
  { name: 'Singapore', code: 'SG', prefix: '+65', currency: 'SGD', flag: '🇸🇬' },
  { name: 'Australia', code: 'AU', prefix: '+61', currency: 'AUD', flag: '🇦🇺' },
];

const CompanyOnboarding = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(code ? 2 : 1);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [inviteCode, setInviteCode] = useState(code || '');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [geoStatus, setGeoStatus] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    currency: 'INR',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    preferredMethod: 'EMAIL' as 'EMAIL' | 'SMS' | 'WHATSAPP',
  });

  const handleVerify = async () => {
    if (!inviteCode) return;
    setVerifying(true);
    setError(null);

    // Master Bypass for initial Production Setup
    if (inviteCode === 'NBA-BOOTSTRAP-2026') {
      setFormData(prev => ({
        ...prev,
        email: 'sherif@bbaconsult.com'
      }));
      setStep(2);
      setVerifying(false);
      return;
    }
    
    try {
      const { data } = await client.models.BusinessInvitation.list({
        filter: { code: { eq: inviteCode } }
      });
      
      const invite = data[0];
      if (invite && invite.status === 'PENDING') {
        setFormData(prev => ({
          ...prev,
          name: invite.businessName || '',
          email: invite.businessEmail || ''
        }));
        setStep(2);
      } else {
        setError('Invalid or expired invitation code.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not verify code. Please check your connection.');
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setVerifying(true);
    setError(null);
    try {
      // 1. Sign Up in Cognito
      setGeoStatus("Creating your account...");
      await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            phone_number: `${selectedCountry.prefix}${formData.phone.replace(/\s/g, '')}`,
          }
        }
      });

      // 2. Resolve Location - Now with user feedback
      setGeoStatus("Pinpointing your business location...");
      let lat = 0, lon = 0;
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`, {
          headers: {
            'User-Agent': 'NBA-Onboarding-App/1.0'
          }
        });
        const geoData = await geoRes.json();
        if (geoData[0]) {
          lat = parseFloat(geoData[0].lat);
          lon = parseFloat(geoData[0].lon);
          setGeoStatus("Location detected successfully!");
        } else {
          setGeoStatus("Note: Precise location could not be detected. Proceeding with manual cleanup later.");
        }
      } catch (e) { 
        console.warn('Geocoding failed', e); 
        setGeoStatus("Location detection service unavailable. Proceeding...");
      }

      // 3. Create Profile
      setGeoStatus("Initializing workflow environment...");
      await client.models.BusinessProfile.create({
        name: formData.name,
        ownerEmail: formData.email,
        businessEmail: formData.email,
        businessPhone: `${selectedCountry.prefix}${formData.phone}`,
        isEmailVerified: false,
        isPhoneVerified: false,
        preferredCommunicationMethod: formData.preferredMethod,
        countryCode: selectedCountry.code,
        phonePrefix: selectedCountry.prefix,
        address: formData.address,
        currency: selectedCountry.currency,
        latitude: lat,
        longitude: lon,
      });

      // 4. Proceed to confirmation
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to setup profile.');
    } finally {
      setVerifying(false);
      setGeoStatus(null);
    }
  };

  const handleConfirm = async () => {
    if (confirmationCode.length !== 6) return;
    setVerifying(true);
    setError(null);
    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: confirmationCode
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Verification failed.');
    } finally {
      setVerifying(false);
    }
  };

  const passRules = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    symbol: /[^A-Za-z0-9]/.test(formData.password),
    match: formData.password === formData.confirmPassword && formData.password.length > 0
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center text-center mb-10">
           <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
              <img src="/NBA-Icon.png" alt="NBA Logo" className="w-12 h-12" />
           </div>
           <h1 className="text-4xl font-black tracking-tighter mb-2 italic uppercase">
             {step === 1 ? 'Join the' : 'Welcome to'} <span className="text-cyan-400">NBA</span>
           </h1>
           <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">
             {step === 1 ? 'Enter your invitation code to begin' : "Neelu's Boarding Adventures"}
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
                      onChange={e => {
                        setInviteCode(e.target.value.toUpperCase());
                        setError(null);
                      }}
                      placeholder="XXX-XXX"
                      className={`w-full bg-slate-900 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 text-3xl font-black text-center tracking-[0.3em] font-mono focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-slate-800`}
                   />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-in fade-in zoom-in-95">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </div>
                )}

                <button 
                   onClick={handleVerify}
                   disabled={!inviteCode || verifying}
                   className="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                   {verifying ? (
                     <Loader2 className="w-6 h-6 animate-spin" />
                   ) : (
                     <>Verify Invitation <ArrowRight className="w-5 h-5" /></>
                   )}
                </button>
             </div>
          </div>
        )}

        {/* Step 2: Complex Business DNA */}
        {step === 2 && (
          <div className="premium-glass p-8 border border-white/5 animate-in slide-in-from-right-4 duration-500 space-y-6">
             <div className="space-y-6">
                {/* Branding & Name */}
                <div className="space-y-2">
                   <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                     <Building2 className="w-3 h-3 text-cyan-500" /> Business Identity
                   </label>
                   <input 
                      placeholder="Business Name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-inner"
                   />
                </div>

                {/* Regional Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Home Country</label>
                    <div className="relative">
                      <select 
                        onChange={(e) => {
                          const country = countries.find(c => c.code === e.target.value)!;
                          setSelectedCountry(country);
                          setFormData(prev => ({ ...prev, currency: country.currency }));
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none appearance-none cursor-pointer"
                      >
                        {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Currency</label>
                    <div className="w-full bg-slate-900/50 border border-white/5 rounded-xl px-4 py-3 text-cyan-400 font-black flex items-center justify-between">
                      {selectedCountry.currency} <span>{selectedCountry.code}</span>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none block">Primary Communication Channel</label>
                   <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'EMAIL', icon: Mail, label: 'Email' },
                        { id: 'WHATSAPP', icon: MessageSquare, label: 'WhatsApp' },
                        { id: 'SMS', icon: Phone, label: 'SMS' }
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => setFormData({...formData, preferredMethod: method.id as any})}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                            formData.preferredMethod === method.id 
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/10' 
                            : 'bg-slate-950 border-white/5 text-slate-500 hover:text-white'
                          }`}
                        >
                          <method.icon className="w-5 h-5" />
                          <span className="text-[9px] font-black uppercase tracking-tighter">{method.label}</span>
                        </button>
                      ))}
                   </div>
                </div>

                {/* Contact & Location */}
                <div className="space-y-4">
                   <div className="flex flex-col md:flex-row gap-4">
                     <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Official Phone</label>
                        <div className="flex gap-2">
                           <div className="bg-slate-900 border border-white/10 rounded-xl px-3 flex items-center text-xs font-bold text-slate-400">{selectedCountry.prefix}</div>
                           <input 
                              placeholder="Phone number"
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none ring-offset-slate-950 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                           />
                        </div>
                     </div>
                     <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Login Email</label>
                        <input 
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                        />
                     </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Business Address</label>
                      <textarea 
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        placeholder="Full physical address for location detection..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none min-h-[60px] focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      />
                   </div>
                </div>

                {/* Credentials */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                   <div className="flex flex-col md:flex-row gap-4">
                     <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Create Password</label>
                        <input 
                          type="password"
                          value={formData.password}
                          onChange={e => setFormData({...formData, password: e.target.value})}
                          className={`w-full bg-slate-950 border ${formData.password.length > 0 && Object.values(passRules).slice(0, 5).every(v => v) ? 'border-emerald-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white font-bold outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all`}
                        />
                        <div className="grid grid-cols-2 gap-y-1 gap-x-4 px-1 mt-2">
                           {[
                             { key: 'length', label: '8+ Characters' },
                             { key: 'upper', label: 'Uppercase' },
                             { key: 'number', label: 'Numbers' },
                             { key: 'symbol', label: 'Symbols' }
                           ].map(rule => (
                             <div key={rule.key} className={`flex items-center gap-1.5 text-[8px] font-black uppercase tracking-tighter ${passRules[rule.key as keyof typeof passRules] ? 'text-emerald-500' : 'text-slate-700'}`}>
                               <div className={`w-1 h-1 rounded-full ${passRules[rule.key as keyof typeof passRules] ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                               {rule.label}
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="flex-1 space-y-2">
                        <label className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                          Confirm Password
                          {passRules.match && <span className="text-emerald-500 flex items-center gap-1 animate-in fade-in slide-in-from-right-2"><CheckCircle2 className="w-3 h-3" /> MATCHED</span>}
                        </label>
                        <div className="relative">
                          <input 
                            type="password"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                            className={`w-full bg-slate-950 border ${passRules.match ? 'border-emerald-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white font-bold outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all`}
                          />
                          {passRules.match && <CheckCircle2 className="absolute right-3 top-3.5 w-4 h-4 text-emerald-500" />}
                        </div>
                     </div>
                   </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-pulse">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </div>
                )}

                {geoStatus && (
                  <div className="text-[10px] font-black text-cyan-400 animate-pulse text-center mb-4 uppercase tracking-[0.2em]">
                    {geoStatus}
                  </div>
                )}

                <button 
                   onClick={handleSubmit}
                   disabled={verifying}
                   className="w-full py-4 rounded-2xl bg-white text-slate-950 font-black text-lg hover:bg-cyan-400 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-2xl shadow-cyan-500/20"
                >
                   {verifying ? (
                     <Loader2 className="w-6 h-6 animate-spin text-slate-950" />
                   ) : (
                     <>Initialize Business OS <ArrowRight className="w-5 h-5" /></>
                   )}
                </button>
             </div>
          </div>
        )}

        {/* Step 3: Verification Checkpoint (Standard Norms) */}
        {step === 3 && (
          <div className="premium-glass p-10 border border-cyan-500/20 animate-in zoom-in-95 duration-500 text-center">
             <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/20">
                <Mail className="w-10 h-10 text-cyan-400" />
             </div>
             <h2 className="text-2xl font-black text-white italic mb-2 uppercase tracking-tight">Verify Identity</h2>
             <p className="text-slate-400 text-sm font-bold mb-8 max-w-xs mx-auto">
               We've sent a 6-digit code to <span className="text-white italic">{formData.email}</span>. Enter it below to unlock your workspace.
             </p>
             
             <div className="space-y-6">
                <div className="relative">
                  <input 
                    placeholder="000000"
                    maxLength={6}
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 text-4xl font-black text-center tracking-[0.5em] font-mono focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                  {verifying && <Loader2 className="absolute right-4 top-6 w-6 h-6 animate-spin text-cyan-400" />}
                </div>

                {error && (
                  <div className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-bounce">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button 
                    onClick={handleConfirm}
                    disabled={confirmationCode.length !== 6 || verifying}
                    className="py-4 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-xl shadow-cyan-500/20"
                  >
                    Confirm Code
                  </button>
                  <button 
                    onClick={() => navigate('/')}
                    className="py-4 rounded-xl bg-slate-900 border border-white/5 text-slate-400 font-bold text-sm hover:text-white transition-all"
                  >
                    Skip for Now
                  </button>
                </div>
                
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] pt-4">
                  Note: You can also verify later from your security settings.
                </p>
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
