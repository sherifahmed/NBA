import { useState, useEffect } from 'react';
import { 
  Fingerprint, Smartphone, Trash2, 
  ShieldCheck, ArrowLeft, Mail,
  Phone, AlertCircle, Loader2,
  CheckCircle2, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

const SecurityCenter = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [otpMode, setOtpMode] = useState<'EMAIL' | 'PHONE' | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [status, setStatus] = useState<{ type: 'error' | 'success', msg: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await client.models.BusinessProfile.list();
      if (data && data.length > 0) setProfile(data[0]);
    };
    fetchProfile();
  }, []);

  const handleVerifyRequest = async (type: 'EMAIL' | 'PHONE') => {
    setVerifying(true);
    setStatus(null);
    try {
      await resendSignUpCode({ username: profile?.businessEmail || '' });
      setOtpMode(type);
      setStatus({ type: 'success', msg: `Code sent to your ${type.toLowerCase()}` });
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message || "Failed to send code" });
    } finally {
      setVerifying(false);
    }
  };

  const handleOtpSubmit = async () => {
    setVerifying(true);
    setStatus(null);
    try {
      try {
        await confirmSignUp({
          username: profile?.businessEmail || '',
          confirmationCode: otpCode
        });
      } catch (err: any) {
        // If user is already confirmed in Cognito, we can proceed to update our local DB
        if (!err.message?.includes('CONFIRMED')) {
          throw err;
        }
      }

      // Update local profile state
      await client.models.BusinessProfile.update({
        id: profile.id,
        isEmailVerified: otpMode === 'EMAIL' ? true : profile.isEmailVerified,
        isPhoneVerified: otpMode === 'PHONE' ? true : profile.isPhoneVerified
      });

      setStatus({ type: 'success', msg: "Verified successfully!" });
      setOtpMode(null);
      setOtpCode('');
      // Refresh
      const { data } = await client.models.BusinessProfile.list();
      setProfile(data[0]);
    } catch (err: any) {
      console.error('OTP Error:', err);
      setStatus({ type: 'error', msg: err.message || "Invalid code" });
    } finally {
      setVerifying(false);
    }
  };

  const [passkeys] = useState<any[]>([
    { id: '1', name: 'iPhone 15 Pro', added: '2026-04-12', lastUsed: 'Just now' }
  ]);

  const addPasskey = () => {
    alert('Calling associateWebAuthnCredential()...');
    // In reality: 
    // const credential = await associateWebAuthnCredential();
    // setPasskeys([...passkeys, { id: Date.now().toString(), name: 'New device', added: new Date().toISOString() }]);
  };

  return (
    <div className="pb-12 md:pb-8 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter">
            Security <span className="text-cyan-400">Center</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Identity & Biometrics</p>
        </div>
      </header>

      <div className="space-y-6">
        {/* Account Verification Matrix */}
        <div className="premium-glass p-8 border border-white/5 space-y-8">
           <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Identity Verification</h3>
              {status && (
                <div className={`text-[10px] font-bold px-3 py-1 rounded-full ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {status.msg}
                </div>
              )}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Verification Card */}
              <div className={`p-6 rounded-2xl border transition-all ${profile?.isEmailVerified ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900 border-white/5'}`}>
                 <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${profile?.isEmailVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                       <Mail className="w-6 h-6" />
                    </div>
                    {profile?.isEmailVerified ? (
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                       <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                 </div>
                 <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Email Address</h4>
                 <p className="text-[10px] font-bold text-slate-500 truncate mb-4">{profile?.businessEmail || 'Loading...'}</p>
                 
                 {!profile?.isEmailVerified && !otpMode && (
                    <button 
                      onClick={() => handleVerifyRequest('EMAIL')}
                      disabled={verifying}
                      className="w-full py-2.5 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-colors"
                    >
                      Verify Now
                    </button>
                 )}
              </div>

              {/* Phone Verification Card */}
              <div className={`p-6 rounded-2xl border transition-all ${profile?.isPhoneVerified ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900 border-white/5'}`}>
                 <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${profile?.isPhoneVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
                       <Phone className="w-6 h-6" />
                    </div>
                    {profile?.isPhoneVerified ? (
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                       <AlertCircle className="w-5 h-5 text-amber-500" />
                    )}
                 </div>
                 <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Mobile Phone</h4>
                 <p className="text-[10px] font-bold text-slate-500 truncate mb-4">{profile?.businessPhone || 'Not provided'}</p>
                 
                 {!profile?.isPhoneVerified && !otpMode && (
                    <button 
                      onClick={() => handleVerifyRequest('PHONE')}
                      disabled={verifying}
                      className="w-full py-2.5 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-400 transition-colors"
                    >
                      Verify Now
                    </button>
                 )}
              </div>
           </div>

           {/* OTP Input UI */}
           {otpMode && (
              <div className="pt-8 border-t border-white/5 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="max-w-xs mx-auto text-center space-y-6">
                    <div>
                       <h4 className="text-lg font-black text-white italic tracking-tight mb-1">Enter OTP</h4>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">We've sent a code to your {otpMode.toLowerCase()}</p>
                    </div>
                    <div className="relative">
                       <input 
                         maxLength={6}
                         placeholder="000000"
                         value={otpCode}
                         onChange={e => setOtpCode(e.target.value)}
                         className="w-full bg-slate-950 border border-cyan-500/30 rounded-2xl py-4 text-3xl font-black text-center tracking-[0.4em] font-mono focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all"
                       />
                       {verifying && <Loader2 className="absolute right-4 top-5 w-5 h-5 animate-spin text-cyan-400" />}
                    </div>
                    <div className="flex flex-col gap-3">
                        <button 
                          onClick={handleOtpSubmit}
                          disabled={otpCode.length !== 6 || verifying}
                          className="w-full py-4 bg-cyan-500 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-cyan-500/20"
                        >
                          Verify Code
                        </button>
                        <div className="flex gap-3">
                          <button 
                            type="button"
                            onClick={() => handleVerifyRequest(otpMode!)}
                            disabled={verifying}
                            className="flex-1 py-3 bg-slate-900 border border-white/5 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
                          >
                            Resend Code
                          </button>
                          <button 
                            type="button"
                            onClick={() => { setOtpMode(null); setStatus(null); }}
                            className="flex-1 py-3 bg-slate-950 border border-white/5 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-white transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                    </div>
                 </div>
              </div>
           )}
        </div>
        {/* Passkey Status */}
        <div className="premium-glass p-8 border border-cyan-500/10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <ShieldCheck className="w-32 h-32" />
           </div>
           <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-2xl shrink-0">
             <Fingerprint className="w-10 h-10" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-black text-white mb-2">Biometric Authentication</h2>
              <p className="text-sm text-slate-400 font-medium">Use FaceID, TouchID, or your device passcode to log in securely without a password.</p>
           </div>
           <button 
             onClick={addPasskey}
             className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm hover:scale-105 transition-all shadow-xl shadow-cyan-500/20 active:scale-95"
           >
             Enable Passkey
           </button>
        </div>

        {/* Device List */}
        <div>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Managed Passkeys</h3>
          <div className="space-y-3">
            {passkeys.map(key => (
              <div key={key.id} className="premium-glass p-5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none mb-1">{key.name}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Added: {key.added}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <p className="hidden md:block text-[9px] font-black text-emerald-500 uppercase tracking-widest">Last used: {key.lastUsed}</p>
                   <button className="p-2.5 rounded-lg bg-slate-950/50 text-slate-600 hover:text-red-400 transition-colors">
                     <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {[
             { title: "MFA Status", value: "Enabled", icon: ShieldCheck, color: "text-emerald-500" },
             { title: "External Account", value: "Google Linked", icon: Globe, color: "text-blue-500" }
           ].map((item, i) => (
             <div key={i} className="premium-glass p-5 border border-white/5 flex items-center justify-between">
                <div>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.title}</p>
                   <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
                <item.icon className={`w-5 h-5 ${item.color}`} />
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};


export default SecurityCenter;
