import { useState } from 'react';
import { 
  Plus, Copy,
  Calendar, Mail, ExternalLink 
} from 'lucide-react';

const SuperAdminInvites = () => {
  const [invites, setInvites] = useState<any[]>([
    { id: '1', code: 'A7K2-W', email: 'doggy-daycare@test.com', name: 'Happy Paws Ltd', status: 'PENDING', expiresAt: '2026-04-14T10:00:00Z' }
  ]);
  
  const [newInvite, setNewInvite] = useState({ name: '', email: '' });
  const [showForm, setShowForm] = useState(false);

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase().replace(/(.{3})/, '$1-');
  };

  const createInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateCode();
    const expires = new Date();
    expires.setHours(expires.getHours() + 48);
    
    setInvites([{
      id: Date.now().toString(),
      code,
      email: newInvite.email,
      name: newInvite.name,
      status: 'PENDING',
      expiresAt: expires.toISOString()
    }, ...invites]);
    
    setNewInvite({ name: '', email: '' });
    setShowForm(false);
  };

  return (
    <div className="pb-12 md:pb-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-12 px-1">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">
            Super <span className="text-cyan-400">Admin</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">Business Invitation Management</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/20"
        >
          <Plus className="w-5 h-5" /> Issue New Invitation
        </button>
      </header>

      {showForm && (
        <div className="premium-glass p-8 border border-cyan-500/20 mb-12 animate-in zoom-in-95 duration-300">
           <form onSubmit={createInvite} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Company Name</label>
                <input 
                  required
                  value={newInvite.name}
                  onChange={e => setNewInvite({...newInvite, name: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:ring-2 focus:ring-cyan-500/20 outline-none"
                  placeholder="e.g. Suhana's Home Boarding"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Owners Email</label>
                <input 
                  required
                  type="email"
                  value={newInvite.email}
                  onChange={e => setNewInvite({...newInvite, email: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:ring-2 focus:ring-cyan-500/20 outline-none"
                  placeholder="owner@business.com"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                 <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl text-slate-400 font-bold hover:text-white transition-colors">Cancel</button>
                 <button type="submit" className="px-8 py-3 rounded-xl bg-white text-slate-950 font-black">Generate Invite Code</button>
              </div>
           </form>
        </div>
      )}

      {/* Invitations List */}
      <div className="space-y-4">
        {invites.map(invite => (
          <div key={invite.id} className="premium-glass p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                 <h3 className="text-xl font-black text-white italic">{invite.name}</h3>
                 <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                   invite.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                 }`}>
                   {invite.status}
                 </span>
               </div>
               <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold"><Mail className="w-3.5 h-3.5" /> {invite.email}</span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold"><Calendar className="w-3.5 h-3.5" /> Expires in 41 hrs</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="bg-slate-950/80 px-6 py-3 rounded-2xl border border-white/10 flex items-center justify-between gap-6 min-w-[200px]">
                  <span className="text-2xl font-black text-white tracking-widest font-mono">{invite.code}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`https://nba.amplifyapp.com/onboard/${invite.code}`);
                      alert('Copied link!');
                    }}
                    className="p-2 text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
               </div>
               <button className="flex items-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                  <ExternalLink className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminInvites;
