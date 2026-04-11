import { Search, Filter, Plus, ChevronDown, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const BookingRecords = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'upcoming';

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'active', label: 'Active' },
    { id: 'past', label: 'Past' },
    { id: 'noshow', label: 'No Show' },
  ];

  return (
    <div className="pb-12 md:pb-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10 px-1">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1 md:mb-2">Booking <span className="text-cyan-400 text-gradient">Records</span></h1>
          <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wide uppercase">Operational Management</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-cyan-500 hover:bg-cyan-400 transition-all rounded-xl text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 active:scale-95 w-fit">
          <Plus className="w-5 h-5" /> Quick Booking
        </button>
      </header>

      {/* Modern Tabs & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex p-1 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="text-sm font-semibold text-slate-500 bg-slate-900/50 premium-glass px-4 py-2 rounded-xl border border-white/5">
           Showing <span className="text-white font-black">15</span> {activeTab} bookings
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by Pet, Client or ID..." 
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900 transition-all"
          />
        </div>
        <button className="h-12 px-5 premium-glass flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
          <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Data Table */}
      <div className="premium-glass overflow-hidden border border-white/5">
        <div className="overflow-x-auto overflow-y-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 border-b border-white/5">
                <th className="py-5 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Pet Details</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Stay Period</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="py-5 px-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3].map((i) => (
                <tr 
                  key={i} 
                  onClick={() => navigate(`/bookings/BKG-${i}00X`)}
                  className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-cyan-400">B</div>
                      <div>
                         <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Buddy {i}</p>
                         <p className="text-[11px] text-slate-500">Golden Retriever • Large</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-sm font-medium text-slate-300">Rahul Sharma</p>
                    <p className="text-[11px] text-slate-500">+91 98765 43210</p>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-sm font-medium text-slate-300">Oct 12 - 15</p>
                    <p className="text-[11px] text-slate-500">Scheduled: 10:00 AM</p>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`status-badge border-cyan-500/20 text-cyan-400 bg-cyan-500/5`}>
                      {activeTab}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-50 space-x-2 group-hover:opacity-100 transition-opacity">
                      {activeTab === 'upcoming' && (
                        <>
                          <button 
                             onClick={(e) => { e.stopPropagation(); alert('Checked In!'); }}
                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-[11px] font-bold"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Check-in
                          </button>
                          <button 
                             onClick={(e) => { e.stopPropagation(); alert('Marked No Show'); }}
                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[11px] font-bold"
                          >
                            <XCircle className="w-3.5 h-3.5" /> No Show
                          </button>
                        </>
                      )}
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-cyan-500 hover:text-slate-950 transition-all text-[11px] font-bold">
                        View <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingRecords;
