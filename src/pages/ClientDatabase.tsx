import { Search, Plus, Phone, MessageSquare, MoreVertical, SortAsc, Filter, Archive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientDatabase = () => {
  const navigate = useNavigate();

  const mockClients = [
    {
      id: "348",
      petName: "Happy",
      parentName: "Divya",
      breed: "Labrador retriever",
      age: "3Y 0M",
      gender: "Female",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "347",
      petName: "coco",
      parentName: "Sunaina",
      breed: "Shih tzu",
      age: "2Y 5M",
      gender: "Male",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "346",
      petName: "Buddy",
      parentName: "Simran",
      breed: "Beagle",
      age: "2Y 6M",
      gender: "Male",
      species: "Dog",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=100&q=80",
    }
  ];

  return (
    <div className="pb-12 md:pb-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10 px-1">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1 md:mb-2">Client <span className="text-cyan-400 text-gradient">Database</span></h1>
          <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wide uppercase">Operational Management</p>
        </div>
      </header>

      {/* Main Command Bar */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-3 w-full">
           <div className="relative flex-1 group">
             <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
             <input 
               type="text" 
               placeholder="Search by name, pet, phone number or email..." 
               className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:bg-slate-900 transition-all shadow-xl"
             />
           </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
           <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 text-slate-300 border border-white/5 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold active:scale-95">
             <SortAsc className="w-4 h-4" /> Sort
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 text-slate-300 border border-white/5 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold active:scale-95">
             <Filter className="w-4 h-4" /> Filter
           </button>
           <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/50 text-slate-300 border border-white/5 hover:bg-slate-800 hover:text-white transition-all text-xs font-bold active:scale-95">
             <MoreVertical className="w-4 h-4" /> Actions
           </button>
           
           <div className="flex-1" />

           <div className="flex items-center justify-center -translate-x-12 md:static md:translate-x-0">
             <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/20 hover:bg-cyan-400 transition-all active:scale-90 ring-4 ring-slate-950">
               <Plus className="w-6 h-6" />
             </button>
           </div>
        </div>
      </div>

      {/* Summary Info */}
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
          <Archive className="w-3.5 h-3.5" /> Archived 1
        </div>
        <div className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
           Showing <span className="text-white">347 of 347</span>
        </div>
      </div>

      {/* Grid of Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mockClients.map((client) => (
          <div 
            key={client.id}
            onClick={() => navigate(`/clients/${client.id}`)}
            className="premium-glass p-5 md:p-6 premium-glass-hover group cursor-pointer border border-white/5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <img 
                src={client.image} 
                alt={client.petName} 
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white/5 ring-offset-4 ring-offset-slate-950" 
              />
              <div>
                <h3 className="text-lg md:text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-tight">
                  {client.petName} <span className="text-slate-500">&</span> {client.parentName}
                </h3>
                <div className="flex flex-wrap gap-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  <span>{client.breed}</span>
                  <span>•</span>
                  <span>{client.age}</span>
                  <span>•</span>
                  <span>{client.gender}</span>
                  <span>•</span>
                  <span>{client.species}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">
                  Pet ID: {client.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
              <button 
                onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:+918826167441'; }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); window.location.href = 'https://wa.me/918826167441'; }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Whatsapp
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="flex items-center justify-center w-11 py-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all text-xs font-bold"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientDatabase;
