
import { 
  Plus, 
  Users, 
  Calendar, 
  ClipboardCheck, 
  MessageSquare, 
  ChevronRight, 
  ArrowUpRight,
  Dog,
  Clock,
  Activity,
  LogIn,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTION_TITLE_CLASS = "text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex justify-between items-center";

const QuickAction = ({ icon: Icon, label, color }: any) => (
  <button className="flex flex-col items-center gap-1.5 md:gap-2 group active:scale-95 transition-transform">
    <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-900/80 border border-white/5 group-hover:border-${color}-500/50 transition-all duration-300 shadow-lg`}>
      <Icon className={`w-5 h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-${color}-400 transition-colors`} />
    </div>
    <span className="text-[10px] md:text-[11px] font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">{label}</span>
  </button>
);

const RequestCard = ({ name, breed, date }: any) => (
  <div className="premium-glass p-4 premium-glass-hover mb-3 flex items-center justify-between border-l-4 border-l-cyan-500/50">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold">
        {name[0]}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{name} <span className="text-xs font-normal text-slate-500">• {breed}</span></h4>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
          <Calendar className="w-3 h-3" /> {date}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-3">
       <button className="p-2 rounded-lg bg-slate-950/50 text-slate-400 hover:text-white transition-colors">
         <ArrowUpRight className="w-4 h-4" />
       </button>
    </div>
  </div>
);

const EnquiryItem = ({ client, pet, time }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-200">{client}</p>
        <p className="text-[10px] text-slate-500">{pet}</p>
      </div>
    </div>
    <span className="text-[10px] text-slate-500 font-medium">{time}</span>
  </div>
);

const ReminderItem = ({ title, date, type }: any) => (
  <div className="flex items-start gap-3 py-3 last:pb-0">
    <div className={`mt-1 w-2 h-2 rounded-full ${type === 'urgent' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-amber-500'}`} />
    <div>
      <p className="text-xs font-semibold text-slate-200">{title}</p>
      <p className="text-[10px] text-slate-500">{date}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-12 md:pb-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-10 px-1">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1 md:mb-2">
            Control <span className="text-cyan-400 text-gradient">Center</span>
          </h1>
          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-500 tracking-wider">
            <span className="flex items-center gap-1 md:gap-1.5"><Clock className="w-3 h-3 md:w-3.5 md:h-3.5" /> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1 md:gap-1.5 uppercase truncate">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
        
        <div className="hidden md:block">
           <button className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 transition-all rounded-xl text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 active:scale-95">
              <Plus className="w-5 h-5" /> New Booking
           </button>
        </div>
      </header>

      {/* Primary Operational Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12">
        <div 
           onClick={() => navigate('/bookings?tab=active')}
           className="premium-glass p-4 md:p-5 border-l-4 border-l-blue-500 cursor-pointer hover:-translate-y-1 transition-transform group"
        >
           <div className="flex justify-between items-center mb-3">
             <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Active Bookings</span>
             <Activity className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
           </div>
           <div className="flex items-end gap-2">
             <span className="text-2xl md:text-3xl font-black text-white leading-none">12</span>
             <span className="text-[10px] md:text-xs font-medium text-slate-500 mb-0.5">Dogs on site</span>
           </div>
        </div>
        
        <div 
           onClick={() => navigate('/bookings?tab=upcoming')}
           className="premium-glass p-4 md:p-5 border-l-4 border-l-emerald-500 cursor-pointer hover:-translate-y-1 transition-transform group"
        >
           <div className="flex justify-between items-center mb-3">
             <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Check-Ins Today</span>
             <LogIn className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
           </div>
           <div className="flex items-end gap-2">
             <span className="text-2xl md:text-3xl font-black text-white leading-none">1<span className="text-lg md:text-xl text-slate-600">/2</span></span>
             <span className="text-[10px] md:text-xs font-medium text-slate-500 mb-0.5">Arrived</span>
           </div>
        </div>
        
        <div 
           onClick={() => navigate('/bookings?tab=active')} // Typically departing dogs are active
           className="premium-glass p-4 md:p-5 border-l-4 border-l-amber-500 cursor-pointer hover:-translate-y-1 transition-transform group"
        >
           <div className="flex justify-between items-center mb-3">
             <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-amber-400 transition-colors">Check-Outs Today</span>
             <LogOut className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
           </div>
           <div className="flex items-end gap-2">
             <span className="text-2xl md:text-3xl font-black text-white leading-none">2<span className="text-lg md:text-xl text-slate-600">/3</span></span>
             <span className="text-[10px] md:text-xs font-medium text-slate-500 mb-0.5">Departed</span>
           </div>
        </div>
      </div>

      {/* Quick Actions Grid - Fixed 3 cols for mobile */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8 md:mb-12">
        <QuickAction icon={Dog} label="Walk-in" color="purple" />
        <QuickAction icon={Plus} label="New" color="cyan" />
        <QuickAction icon={MessageSquare} label="Enquiry" color="amber" />
        <QuickAction icon={ClipboardCheck} label="Out" color="red" />
        <QuickAction icon={Users} label="Clients" color="blue" />
        <QuickAction icon={Calendar} label="Records" color="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-6 md:space-y-10">
          <section>
            <h2 className={SECTION_TITLE_CLASS}>
              Requests
              <span className="text-cyan-400 lowercase font-medium tracking-normal flex items-center gap-1 cursor-pointer hover:underline text-[10px]">
                view all <ChevronRight className="w-3 h-3" />
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <RequestCard name="Bruno" breed="Beagle" date="May 12 - 15" />
               <RequestCard name="Milo" breed="Husky" date="May 14 - 20" />
            </div>
          </section>

          <section>
            <div className="premium-glass p-4 md:p-6">
              <h2 className={SECTION_TITLE_CLASS}>Recent Enquiries</h2>
              <div className="divide-y divide-white/5">
                <EnquiryItem client="Sherif Mohamed" pet="Golden Retriever" time="14m ago" />
                <EnquiryItem client="Anjali V." pet="Shih Tzu" time="1h ago" />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8 pb-10">
          <section className="premium-glass p-4 md:p-6 bg-slate-900 border-t-2 border-t-cyan-500/30">
            <h2 className={SECTION_TITLE_CLASS}>Reminders</h2>
            <div className="space-y-1">
              <ReminderItem title="Bruno: Rabies Expired" date="Yesterday" type="urgent" />
              <ReminderItem title="Milo: Upcoming B-Day" date="In 3 days" type="normal" />
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
