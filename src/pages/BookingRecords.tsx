import { 
  Search, Plus, CheckCircle2, XCircle, 
  Clock, Calendar, 
  Calculator, Settings2, UserPlus
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const BookingRecords = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'upcoming';

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 6 },
    { id: 'active', label: 'Active', count: 4 },
    { id: 'past', label: 'Past', count: 1424 },
    { id: 'noshow', label: 'No Show', count: 12 },
  ];

  const mockBookings = [
    {
      id: "BKG-1001",
      petName: "Penny",
      clientName: "Poorti Kathpalia",
      breed: "Indie",
      age: "4Y 11M",
      gender: "Female",
      species: "Dog",
      price: "5,400.00",
      status: "Unpaid",
      checkIn: { date: "Apr 12, 2026", time: "5:00 PM - 6:00 PM" },
      checkOut: { date: "Apr 18, 2026", time: "5:00 PM - 6:00 PM" },
    },
    {
      id: "BKG-1002",
      petName: "Sheldon",
      clientName: "Pooja",
      breed: "Labrador retriever",
      age: "4Y 3M",
      gender: "Male",
      species: "Dog",
      price: "3,600.00",
      status: "Partially paid",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80",
      checkIn: { date: "Apr 14, 2026", time: "7:00 PM - 8:00 PM" },
      checkOut: { date: "Apr 18, 2026", time: "7:00 PM - 8:00 PM" },
    }
  ];

  const BookingCard = ({ booking }: { booking: any }) => (
    <div 
      onClick={() => navigate(`/bookings/${booking.id}`)}
      className="premium-glass p-5 md:p-6 premium-glass-hover group cursor-pointer border border-white/5 flex flex-col gap-5"
    >
      {/* Header: Pet Info & Price */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          {booking.image ? (
            <img src={booking.image} alt={booking.petName} className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover ring-2 ring-white/5 ring-offset-2 ring-offset-slate-950" />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800 flex items-center justify-center font-black text-xl text-cyan-400">
              {booking.petName[0]}
            </div>
          )}
          <div>
            <h3 className="text-lg md:text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{booking.petName}</h3>
            <p className="text-xs md:text-sm font-semibold text-slate-400">{booking.clientName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm md:text-base font-black text-white">₹ {booking.price}</p>
          <span className={`status-badge mt-1 inline-block ${
            booking.status === 'Unpaid' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
            booking.status === 'Partially paid' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
            'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          }`}>
            {booking.status}
          </span>
        </div>
      </div>

      {/* Meta: Breed, Age, etc */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
        <span>{booking.breed}</span>
        <span className="text-slate-800">•</span>
        <span>{booking.age}</span>
        <span className="text-slate-800">•</span>
        <span>{booking.gender}</span>
        <span className="text-slate-800">•</span>
        <span>{booking.species}</span>
      </div>

      {/* Schedule: Checked In/Out */}
      <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
        <div>
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {booking.checkIn.date}
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium">
            <Clock className="w-3.5 h-3.5" /> {booking.checkIn.time}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs mb-1.5 justify-end">
            {booking.checkOut.date} <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium justify-end">
             {booking.checkOut.time} <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-1">
        <button 
          onClick={(e) => { e.stopPropagation(); alert('Marked No Show'); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-widest active:scale-95"
        >
          <XCircle className="w-3.5 h-3.5" /> No show
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); alert('Checked In!'); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/5 bg-slate-100 text-slate-900 hover:bg-cyan-400 hover:text-slate-950 transition-all text-[11px] font-black uppercase tracking-widest active:scale-95"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Check-In
        </button>
      </div>
    </div>
  );

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

      {/* Main Command Bar */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-3 w-full">
           <div className="relative flex-1 group">
             <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
             <input 
               type="text" 
               placeholder="Search by name, pet, phone or email..." 
               className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900 transition-all shadow-xl"
             />
           </div>
           <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg active:scale-90">
             <Plus className="w-6 h-6" />
           </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all text-xs font-bold active:scale-95">
             <UserPlus className="w-4 h-4" /> Walk-In
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 text-slate-300 border border-white/5 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold active:scale-95">
             <Calculator className="w-4 h-4" /> Cost Estimate
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 text-slate-300 border border-white/5 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold active:scale-95">
             <Settings2 className="w-4 h-4" /> Requested Changes
           </button>
           
           <div className="flex-1" />

           <label className="flex items-center gap-2 cursor-pointer group">
             <div className="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
               <input type="checkbox" className="hidden" />
               <div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
             </div>
             <span className="text-xs font-bold text-slate-500 group-hover:text-slate-300">Today Only</span>
           </label>
        </div>
      </div>

      {/* Modern Tabs & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex p-1 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`px-6 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              {tab.label} <span className={`ml-1 opacity-60 ${activeTab === tab.id ? 'text-slate-950' : ''}`}>({tab.count})</span>
            </button>
          ))}
        </div>
        <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
           Showing <span className="text-white">6 of 6</span> bookings
        </div>
      </div>

      {/* Operational Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...mockBookings, ...mockBookings, ...mockBookings].map((booking, idx) => (
          <BookingCard key={`${booking.id}-${idx}`} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingRecords;
