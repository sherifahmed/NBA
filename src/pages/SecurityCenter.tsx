import { useState } from 'react';
import { 
  Fingerprint, Smartphone, Trash2, 
  ShieldCheck, ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SecurityCenter = () => {
  const navigate = useNavigate();
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

const Globe = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default SecurityCenter;
