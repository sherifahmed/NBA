import { useState } from 'react';
import { 
  ShieldCheck, User,
  Plus, 
  CheckCircle2, ArrowRight, Dog,
  ClipboardCheck
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const ConsumerOnboarding = () => {
  const { token } = useParams();
  console.log('Public lead token:', token);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    parentName: 'Jane Doe',
    parentPhone: '+91 98765 43210',
    email: '',
    address: '',
    city: '',
    pets: [{ name: '', breed: '', size: 'MEDIUM' }]
  });

  const nextStep = () => setStep(step + 1);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center">
      {/* Progress Header */}
      <div className="w-full max-w-lg px-6 pt-12 pb-8 flex items-center justify-between">
         <div className="flex flex-col">
            <h1 className="text-3xl font-black tracking-tighter italic">One-Time <span className="text-indigo-400">Onboarding</span></h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Suhana's Home Boarding</p>
         </div>
         <div className="flex items-center gap-1.5 bg-slate-900 border border-white/5 px-4 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full transition-all ${step >= 1 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step >= 2 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step >= 3 ? 'bg-indigo-400' : 'bg-slate-700'}`} />
         </div>
      </div>

      <main className="w-full max-w-lg px-6 pb-20">
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
            <div className="p-8 premium-glass border border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8">
                 <User className="w-3 h-3" /> Step 1: Parent Details
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      value={formData.parentName}
                      onChange={e => setFormData({...formData, parentName: e.target.value})}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mobile Phone</label>
                    <input 
                      value={formData.parentPhone}
                      onChange={e => setFormData({...formData, parentPhone: e.target.value})}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={nextStep}
              className="w-full py-5 rounded-2xl bg-indigo-500 text-white font-black text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
            >
              Continue to Pet Details <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
            <div className="p-8 premium-glass border border-white/5">
              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-8">
                 <Dog className="w-3 h-3" /> Step 2: About your Pets
              </div>

              {/* Placeholder Pet Form */}
              <div className="space-y-8">
                {formData.pets.map((_, i) => (
                  <div key={i} className="p-6 bg-slate-950/50 border border-white/5 rounded-[24px] space-y-4">
                     <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Pet #{i+1}</p>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase">Pet Name</label>
                        <input placeholder="e.g. Max" className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-500 uppercase">Breed</label>
                           <input placeholder="Indie / Golden..." className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-500 uppercase">Size</label>
                           <select className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold outline-none">
                              <option>SMALL</option>
                              <option>MEDIUM</option>
                              <option>LARGE</option>
                           </select>
                        </div>
                     </div>
                  </div>
                ))}

                <button 
                  onClick={() => setFormData({...formData, pets: [...formData.pets, { name: '', breed: '', size: 'MEDIUM' }]})}
                  className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-slate-500 font-black text-xs uppercase tracking-widest hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Another Pet
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
               <button onClick={() => setStep(1)} className="p-5 rounded-2xl bg-slate-900 border border-white/5 text-slate-500">
                  <ArrowRight className="w-5 h-5 rotate-180" />
               </button>
               <button 
                onClick={nextStep}
                className="col-span-3 py-5 rounded-2xl bg-indigo-500 text-white font-black text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
               >
                Review & Confirm <ClipboardCheck className="w-5 h-5" />
               </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 duration-500 space-y-8">
            <div className="p-8 premium-glass border border-emerald-500/20 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-white italic mb-2 tracking-tight">Records Registered!</h2>
              <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">Your details have been shared with Suhana's Home Boarding. You're all set for your next booking!</p>
              
              <div className="space-y-3">
                 <button 
                  onClick={() => window.location.href = '/'}
                  className="w-full py-4 rounded-xl bg-white text-slate-950 font-black text-sm uppercase tracking-widest"
                 >
                  Back to Website
                 </button>
                 <button className="w-full py-4 rounded-xl bg-slate-900 border border-white/5 text-slate-400 font-black text-sm uppercase tracking-widest">
                  View Booking Policy
                 </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Trust Footer */}
      <footer className="mt-auto px-6 py-8 flex items-center gap-4 text-slate-600">
         <ShieldCheck className="w-12 h-12 stroke-1" />
         <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
           Your data is protected by <span className="text-slate-400">NBA Cloud Security</span>.<br/> encrypted via AWS enterprise systems.
         </p>
      </footer>
    </div>
  );
};

export default ConsumerOnboarding;
