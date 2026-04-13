import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';
import { 
  Plus, Copy,
  Calendar, Mail, ExternalLink,
  MessageSquare,
  Hash, Info, Check, Send
} from 'lucide-react';

const client = generateClient<Schema>();

const SuperAdminInvites = () => {
  const [activeTab, setActiveTab] = useState<'Invitations' | 'Messaging'>('Invitations');
  const [invites, setInvites] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [template, setTemplate] = useState(`Hi there!
{{businessName}} CHARGES are
{{pricing}}

Note- If your dog is on dog food (kibbles), that should be provided by the pet parent.

TERMS AND CONDITIONS
{{tAndC}}

CANCELLATION POLICY
{{cancellation}}

Please take 5 minutes to fill this ONE-TIME onboarding form {{link}}`);

  const [newInvite, setNewInvite] = useState({ name: '', email: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch existing invites on mount
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const { data } = await client.models.BusinessInvitation.list();
        setInvites(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (err) {
        console.error('Error fetching invites:', err);
      }
    };
    fetchInvites();
  }, []);

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase().replace(/(.{3})/, '$1-');
  };

  const createInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const code = generateCode();
    const expires = new Date();
    expires.setHours(expires.getHours() + 48);
    
    try {
      const { data: invite } = await client.models.BusinessInvitation.create({
        code,
        businessEmail: newInvite.email,
        businessName: newInvite.name,
        status: 'PENDING',
        expiresAt: expires.toISOString(),
      });

      if (invite) {
        setInvites([invite, ...invites]);
        setNewInvite({ name: '', email: '' });
        setShowForm(false);
      }
    } catch (err) {
      console.error('Error creating invite:', err);
      alert('Failed to save to database. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const copyInvitationMessage = (invite: any) => {
    const url = `${window.location.origin}/onboard/${invite.code}`;
    const message = `Hello ${invite.businessName || 'Business Owner'},\n\nWe are excited to invite you to the NBA (Neelus Boarding Adventure) platform! 🐾\n\nPlease use the following link to onboard your business and set up your workspace:\n\n${url}\n\n(Invitation Code: ${invite.code})\n\nLooking forward to having you on board!`;
    
    navigator.clipboard.writeText(message).then(() => {
      setCopiedId(invite.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Clipboard error:', err);
      alert('Failed to copy. Please copy manually: ' + url);
    });
  };

  return (
    <div className="pb-12 md:pb-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 px-1">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2 italic">
            Super <span className="text-cyan-400">Admin</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Control Center</p>
        </div>
        
        <nav className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5">
           {(['Invitations', 'Messaging'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
           ))}
        </nav>
      </header>

      {activeTab === 'Invitations' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-1">
             <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Business Invites</h2>
             <button 
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" /> Issue Invitation
              </button>
          </div>

          {showForm && (
            <div className="premium-glass p-8 border border-cyan-500/20 mb-8 animate-in zoom-in-95 duration-300">
               <form onSubmit={createInvite} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Company Name</label>
                    <input 
                      required
                      value={newInvite.name}
                      onChange={e => setNewInvite({...newInvite, name: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none"
                      placeholder="e.g. Suhana's Home Boarding"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Owners Email</label>
                    <input 
                      required
                      type="email"
                      value={newInvite.email}
                      onChange={e => setNewInvite({...newInvite, email: e.target.value})}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white font-bold outline-none"
                      placeholder="owner@business.com"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                     <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl text-slate-400 font-bold hover:text-white">Cancel</button>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="px-8 py-3 rounded-xl bg-white text-slate-950 font-black text-xs uppercase tracking-widest disabled:opacity-50"
                      >
                        {loading ? 'Generating...' : 'Generate Invite'}
                      </button>
                   </div>
                </form>
             </div>
           )}

           <div className="space-y-4">
             {invites.map(invite => (
               <div key={invite.id} className="premium-glass p-6 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                     <h3 className="text-xl font-black text-white italic tracking-tight">{invite.businessName || invite.name}</h3>
                     <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                       invite.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                     }`}>
                       {invite.status}
                     </span>
                   </div>
                   <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold"><Mail className="w-3.5 h-3.5" /> {invite.businessEmail || invite.email}</span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold"><Calendar className="w-3.5 h-3.5" /> 48hrs Remaining</span>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="bg-slate-950/80 px-6 py-3 rounded-2xl border border-white/10 flex items-center justify-between gap-6 min-w-[200px]">
                      <span className="text-2xl font-black text-white tracking-widest font-mono">{invite.code}</span>
                      <button 
                        onClick={() => copyInvitationMessage(invite)}
                        className={`p-2 transition-all ${copiedId === invite.id ? 'text-emerald-400 scale-125' : 'text-slate-500 hover:text-cyan-400'}`}
                        title="Copy Invitation Message"
                      >
                        {copiedId === invite.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                   </div>
                   <button className="flex items-center gap-2 p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all font-bold text-xs">
                      <Send className="w-4 h-4" /> Share
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Messaging' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="premium-glass p-10 border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-white tracking-tight italic">Global WhatsApp Template</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Base message for consumer enquiries</p>
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Template Content</label>
                       <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 italic">
                          <Info className="w-3 h-3" /> Use double braces for variables
                       </span>
                    </div>
                    <textarea 
                       value={template}
                       onChange={e => setTemplate(e.target.value)}
                       className="w-full h-80 bg-slate-950/50 border border-white/10 rounded-2xl p-6 text-slate-300 font-medium text-sm leading-relaxed focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                    />
                 </div>

                 <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5">
                    <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       <Hash className="w-3 h-3" /> Available Placeholders
                    </h4>
                    <div className="flex flex-wrap gap-2">
                       {['businessName', 'pricing', 'tAndC', 'cancellation', 'link'].map(variable => (
                          <div key={variable} className="px-3 py-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-[10px] font-black text-indigo-300 mono tracking-wider">
                             {'{{'}{variable}{'}}'}
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex justify-end pt-4">
                    <button className="px-10 py-4 rounded-2xl bg-indigo-500 text-white font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20">
                       Save Global Template
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminInvites;
