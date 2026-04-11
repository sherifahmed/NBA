import { Search, Plus, MessageSquare, MoreHorizontal, UserPlus, Phone, Dog } from 'lucide-react';

const ClientDatabase = () => {
  return (
    <div className="pb-12 md:pb-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10 px-1">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1 md:mb-2">Client <span className="text-cyan-400 text-gradient">Directory</span></h1>
          <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wide uppercase">Partners & Pet Parents</p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 premium-glass rounded-xl text-xs md:text-sm font-bold text-slate-300 hover:text-white transition-colors">
            <UserPlus className="w-4 h-4 md:w-5 md:h-5" /> Add Manually
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-cyan-500 hover:bg-cyan-400 transition-all rounded-xl text-slate-950 font-bold text-xs md:text-sm shadow-xl shadow-cyan-500/20 active:scale-95">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5" /> Send Onboarding
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="relative flex-1 group w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name, email or dog name..." 
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900 transition-all"
          />
        </div>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Sherif Mohamed', pet: 'Bruno (Beagle)', phone: '+91 98765 43210', status: 'Onboarded' },
          { name: 'Anjali Verma', pet: 'Milo (Husky)', phone: '+91 91234 56789', status: 'Pending' },
          { name: 'Rahul Sharma', pet: 'Buddy (Golden)', phone: '+91 88888 77777', status: 'Onboarded' },
        ].map((client, i) => (
          <div key={i} className="premium-glass p-6 group cursor-pointer border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl accent-gradient flex items-center justify-center text-xl font-black text-white shadow-lg shadow-cyan-500/10">
                {client.name[0]}
              </div>
              <button className="p-2 text-slate-600 hover:text-white transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">{client.name}</h3>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-6 ${client.status === 'Onboarded' ? 'text-emerald-400' : 'text-amber-400'}`}>
               {client.status}
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                <Phone className="w-3.5 h-3.5 text-slate-600" /> {client.phone}
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                <Dog className="w-3.5 h-3.5 text-slate-600" /> {client.pet}
              </div>
            </div>

            <div className="flex gap-2 border-t border-white/5 pt-6">
               <button className="flex-1 h-10 rounded-xl bg-slate-950/50 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                  Profile
               </button>
               <button className="flex-1 h-10 rounded-xl bg-slate-950/50 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                  Bookings
               </button>
            </div>
          </div>
        ))}

        {/* Add button placeholder */}
        <div className="premium-glass p-6 border-dashed border-2 border-white/10 hover:border-cyan-500/30 flex flex-col items-center justify-center text-center group transition-all cursor-pointer bg-transparent">
           <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Plus className="w-6 h-6 text-slate-500 group-hover:text-cyan-400" />
           </div>
           <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200">Register Client</p>
           <p className="text-[10px] text-slate-600 mt-1 font-medium">New manual entry</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDatabase;
