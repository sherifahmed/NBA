import { useState } from 'react';
import { 
  ArrowLeft, Send, 
  MessageSquare, Copy,
  Bold, Italic, List, Link as LinkIcon, 
  Smile, Phone as PhoneIcon, User,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddEnquiry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate generation
    const token = Math.random().toString(36).substring(7);
    setGeneratedLink(`https://nba.amplifyapp.com/lead/new/${token}`);
    setShowSuccess(true);
  };

  const whatsappMessage = `Hi there!
Suhana's Home Boarding CHARGES are
Rs900/day for medium breeds (24 hours)
Rs800/day for small breeds (24 hours)
Rs500 daycare (upto 8hrs)
Rs.1000 for puppies upto 6 months/ per day (24 hours)
Home-cooked meals included in all packages

Note- If your dog is on dog food (kibbles), that should be provided by the pet parent.

TERMS AND CONDITIONS
1. For Overnight Boarding - 1hr buffer is given after 24hrs for pick up...

Please take 5 minutes to fill this ONE-TIME onboarding form ${generatedLink}`;

  return (
    <div className="max-w-xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 font-sans">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter italic">Add New <span className="text-indigo-400">Enquiry</span></h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Lead Generation</p>
        </div>
      </header>

      <div className="premium-glass border border-white/5 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
           <User className="w-32 h-32" />
        </div>

        <form onSubmit={handleSend} className="space-y-8 relative z-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                <User className="w-3 h-3 text-indigo-400" /> Parent Name <span className="text-red-500">*</span>
              </label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-950/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-800"
                placeholder="e.g. Rahul Sharma"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                <PhoneIcon className="w-3 h-3 text-indigo-400" /> Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 shrink-0">
                  <span className="text-xl">🇮🇳</span>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                </div>
                <input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl pl-20 pr-5 py-4 text-white font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                <MessageSquare className="w-3 h-3 text-indigo-400" /> Private Notes
              </label>
              <div className="bg-slate-950/50 border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-white/5 bg-white/[0.02]">
                  {[Bold, Italic, List, LinkIcon, Smile].map((Icon, i) => (
                    <button key={i} type="button" className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button type="button" className="p-2 text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <textarea 
                  rows={6}
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-transparent p-5 text-slate-300 font-medium text-sm outline-none resize-none leading-relaxed"
                  placeholder="Any specific context about this lead..."
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 rounded-2xl bg-indigo-500 text-white font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 uppercase tracking-tighter"
          >
            Send Onboarding Form <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowSuccess(false)} />
           <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-white italic tracking-tight">Enquiry <span className="text-indigo-400">Created!</span></h3>
                    <button onClick={() => setShowSuccess(false)} className="text-slate-500 hover:text-white transition-colors">&times;</button>
                 </div>

                 <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black text-lg">
                      {formData.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-black">{formData.name || 'Pet Owner'}</h4>
                      <p className="text-xs text-slate-500 font-bold">{formData.phone}</p>
                    </div>
                 </div>

                 <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6 mb-8 max-h-64 overflow-y-auto">
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">
                      <MessageSquare className="w-3 h-3" /> WhatsApp Preview
                    </div>
                    <pre className="text-xs text-slate-400 font-medium whitespace-pre-wrap leading-relaxed">
                       {whatsappMessage}
                    </pre>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => window.open(`https://wa.me/${formData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-black text-sm"
                    >
                      <PhoneIcon className="w-4 h-4 fill-white" /> Open WhatsApp
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(whatsappMessage);
                        alert('Message copied to clipboard');
                      }}
                      className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-sm"
                    >
                      <Copy className="w-4 h-4" /> Click to Copy
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AddEnquiry;
