import { 
  ArrowLeft, Edit3, Calendar, Clock, 
  MapPin, Phone, Mail, MessageCircle, 
  ShieldAlert, Dog, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const SECTION_TITLE_CLASS = "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2";

const BookingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Using the ID from router param, e.g. BKG-100X

  // Mock data representing what would traditionally be fetched
  const booking = {
    id: id || "BKG-100X",
    status: "Active",
    stayPeriod: "Oct 12 - Oct 15, 2026",
    checkIn: "10:00 AM",
    checkOut: "04:30 PM",
    pet: {
      name: "Buddy",
      breed: "Golden Retriever",
      size: "Large (32kg)",
      notes: "Allergic to chicken. Requires daily brushing.",
    },
    client: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      whatsapp: "919876543210", // Cleaned up for api link
      email: "rahul.s@example.com",
      address: "Bandra West, Mumbai",
      emergencyContact: "Anjali (+91 99887 76655)"
    }
  };

  return (
    <div className="pb-12 md:pb-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      
      {/* Header & Back Navigation */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10 px-1">
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-2 text-[10px] md:text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Back to Records
          </button>
          <div className="flex items-center gap-3 md:gap-4">
             <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">Booking <span className="text-slate-500">#{booking.id}</span></h1>
             <span className="status-badge border-cyan-500/20 text-cyan-400 bg-cyan-500/5 mt-1 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs">{booking.status}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 premium-glass rounded-xl text-xs md:text-sm font-bold text-slate-300 hover:text-white transition-colors">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> Checkout
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-cyan-500 hover:bg-cyan-400 transition-all rounded-xl text-slate-950 font-bold text-xs md:text-sm shadow-xl shadow-cyan-500/20 active:scale-95">
            <Edit3 className="w-4 h-4 md:w-5 md:h-5" /> Edit Booking
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Reservation & Pet Details */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Reservation Summary */}
           <div className="premium-glass p-6 md:p-8">
              <h2 className={SECTION_TITLE_CLASS}><Calendar className="w-4 h-4 text-cyan-500" /> Reservation Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
                 <div className="bg-slate-900/50 rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Check-in</p>
                    <p className="text-lg font-black text-white mb-1">{booking.stayPeriod.split(' - ')[0]}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Expected: {booking.checkIn}</p>
                 </div>
                 <div className="bg-slate-900/50 rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Check-out</p>
                    <p className="text-lg font-black text-white mb-1">{booking.stayPeriod.split(' - ')[1]}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Expected: {booking.checkOut}</p>
                 </div>
              </div>
           </div>

           {/* Pet Profile */}
           <div className="premium-glass p-6 md:p-8">
              <h2 className={SECTION_TITLE_CLASS}><Dog className="w-4 h-4 text-purple-500" /> Guest Details</h2>
              
              <div className="flex items-center gap-6 mb-6">
                 <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center font-black text-3xl text-purple-400 border-4 border-slate-950 shadow-xl shadow-purple-500/10">
                    {booking.pet.name[0]}
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white">{booking.pet.name}</h3>
                    <p className="text-sm text-slate-400 font-medium mt-0.5">{booking.pet.breed} • {booking.pet.size}</p>
                 </div>
              </div>

              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex items-start gap-3">
                 <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                 <div>
                    <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Important Instructions</p>
                    <p className="text-sm font-medium text-slate-300">{booking.pet.notes}</p>
                 </div>
              </div>
           </div>

        </div>

        {/* Right Column - Client Profile & Actions */}
        <div className="space-y-6">
           <div className="premium-glass p-6 md:p-8">
              <h2 className={SECTION_TITLE_CLASS}>Client Profile</h2>
              
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-6">
                 <div>
                    <p className="text-lg font-black text-white">{booking.client.name}</p>
                    <p className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1">Verified Client</p>
                 </div>
                 <button className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-slate-800 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                 </button>
              </div>

              <div className="space-y-4 mb-8">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900/80 flex items-center justify-center">
                       <MapPin className="w-4 h-4 text-slate-500" />
                    </div>
                    <p className="text-sm text-slate-300 font-medium">{booking.client.address}</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900/80 flex items-center justify-center">
                       <ShieldAlert className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Emergency Contact</p>
                       <p className="text-sm text-slate-300 font-medium">{booking.client.emergencyContact}</p>
                    </div>
                 </div>
              </div>

              {/* Communication Actions */}
              <h3 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3">Quick Connect</h3>
              <div className="grid grid-cols-1 gap-2">
                 <a 
                   href={`https://wa.me/${booking.client.whatsapp}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] transition-colors p-3 rounded-xl font-bold text-sm"
                 >
                    <MessageCircle className="w-5 h-5" /> Message on WhatsApp
                 </a>
                 <a 
                   href={`tel:${booking.client.phone.replace(/[^0-9+]/g, '')}`} 
                   className="flex items-center gap-3 w-full bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-300 hover:text-white transition-colors p-3 rounded-xl font-bold text-sm"
                 >
                    <Phone className="w-5 h-5" /> {booking.client.phone}
                 </a>
                 <a 
                   href={`mailto:${booking.client.email}`} 
                   className="flex items-center gap-3 w-full bg-slate-900 hover:bg-slate-800 border border-white/5 text-slate-300 hover:text-white transition-colors p-3 rounded-xl font-bold text-sm"
                 >
                    <Mail className="w-5 h-5" /> Send Email
                 </a>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BookingDetails;
