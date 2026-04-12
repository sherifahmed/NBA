import { useState } from 'react';
import { 
  ArrowLeft, Phone, MessageSquare, Plus, Edit2, 
  MoreVertical, Calendar, Download,
  ShieldCheck, FileText, 
  Info, 
  XCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id: _id } = useParams();
  const [activeTab, setActiveTab] = useState('Basic');

  const tabs = ['Basic', 'Vaccination', 'Medical', 'Notes', 'History', 'Audit Trail'];

  const mockData = {
    id: "348",
    petName: "Happy",
    parentName: "Divya",
    phone: "+91 88261 67441",
    breed: "Labrador retriever",
    age: "3Y 0M",
    gender: "Female",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80",
    address: "A10 Subhavna niketan, Pitampura, Near pitampura metro station, India",
    diet: "Non-vegetarian",
    allergies: "Na",
    weight: "24.5 kg",
    lastVax: "Feb 08, 2026",
    nextVax: "Feb 08, 2027",
    vaxStatus: "Vaccinated",
    meds: "Yes",
    medDetails: "Powder for anal gland infection",
    vetName: "Zigly pitampura",
    vetPhone: "+91 88261 67441",
    guardian: "Divya sharma",
    sessions: 1,
    recentBooking: {
      date: "Apr 12, 2026",
      amount: "500.00",
      status: "Unpaid",
      period: "Apr 12, 2026 - Apr 12, 2026",
      operationalStatus: "Active"
    }
  };

  const SectionCard = ({ title, children, onEdit, onAdd }: any) => (
    <div className="premium-glass p-5 md:p-6 border border-white/5 relative overflow-hidden mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-black text-white">{title}</h3>
        <div className="flex gap-2">
           {onEdit && <button onClick={onEdit} className="p-2 bg-slate-100/5 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors"><Edit2 className="w-4 h-4" /></button>}
           {onAdd && <button onClick={onAdd} className="p-2 bg-slate-100/5 text-slate-400 hover:text-white rounded-lg border border-white/5 transition-colors"><Plus className="w-4 h-4" /></button>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value, fullWidth = false }: any) => (
    <div className={fullWidth ? "col-span-full" : ""}>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-white leading-relaxed">{value}</p>
    </div>
  );

  return (
    <div className="pb-20 md:pb-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 px-4 h-16 flex items-center gap-4 z-40 md:relative md:bg-transparent md:border-none md:px-1 md:mb-8">
        <button onClick={() => navigate('/clients')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">Client <span className="text-cyan-400">Details</span></h2>
      </header>

      {/* Profile Section */}
      <div className="mt-20 md:mt-0 flex flex-col md:flex-row gap-6 mb-8 px-1">
        <div className="w-full md:w-48 aspect-square rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/5 bg-slate-900 flex-shrink-0">
          <img src={mockData.image} alt={mockData.petName} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-1 uppercase italic">{mockData.petName}</h1>
                <p className="text-lg md:text-xl font-bold text-slate-400 mb-4">{mockData.parentName}</p>
                <p className="text-sm font-bold text-slate-500 mb-1">{mockData.phone}</p>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">{mockData.breed} | {mockData.age} | {mockData.gender}</p>
             </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all text-sm font-bold">
               <Phone className="w-4 h-4" /> Call
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold">
               <MessageSquare className="w-4 h-4" /> Whatsapp
            </button>
          </div>
        </div>
      </div>

      {/* Operational Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3 mb-8 px-1">
         <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 text-white font-bold text-xs hover:bg-white hover:text-slate-950 transition-all uppercase tracking-widest">
           <Calendar className="w-4 h-4" /> Add Booking
         </button>
         <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 text-[10px] font-black uppercase text-slate-500 border border-white/5">
           App <XCircle className="w-4 h-4 text-red-500" />
         </div>
         <button className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all">
           <MessageSquare className="w-4 h-4" />
         </button>
         <button className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all">
           <MoreVertical className="w-4 h-4" />
         </button>
      </div>

      {/* Alerts Ribbon */}
      <div className="premium-glass p-3 px-4 flex items-center justify-between border-l-4 border-l-emerald-500 mb-8 mx-1 bg-emerald-500/5">
        <div className="flex items-center gap-3">
           <ShieldCheck className="w-5 h-5 text-emerald-500" />
           <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">No Alerts</span>
        </div>
        <div className="flex gap-1">
           <button className="p-2 text-slate-500 hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
           <button className="p-2 text-slate-500 hover:text-white transition-colors"><Plus className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Data Tabs */}
      <div className="flex border-b border-white/5 mb-8 overflow-x-auto hide-scrollbar scroll-smooth whitespace-nowrap mx-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${
              activeTab === tab ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-1 animate-in fade-in duration-500">
        {activeTab === 'Basic' && (
          <div className="space-y-4">
            <SectionCard title="Parent Information" onEdit={() => {}}>
               <InfoItem label="Parent Name" value={mockData.parentName} />
               <InfoItem label="Phone Number" value={mockData.phone} />
               <InfoItem label="Address" value={mockData.address} fullWidth />
               <div className="col-span-full pt-4">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Pet(s)</p>
                 <div className="w-16 h-16 rounded-xl overflow-hidden ring-4 ring-cyan-500/20">
                   <img src={mockData.image} alt="Pet small" className="w-full h-full object-cover" />
                 </div>
                 <p className="text-[10px] font-black text-center text-slate-500 uppercase mt-2 w-16 italic">{mockData.petName}</p>
               </div>
               <div className="col-span-full pt-4">
                 <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                   <p className="text-xs font-bold text-slate-400">Balance</p>
                   <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-[10px] font-black uppercase text-slate-200 hover:bg-slate-700 transition-colors">
                     Show
                   </button>
                 </div>
               </div>
            </SectionCard>

            <SectionCard title="Pet Details" onEdit={() => {}}>
               <InfoItem label="Pet Name" value={mockData.petName} />
               <InfoItem label="Pet ID" value={mockData.id} />
               <InfoItem label="Pet Type" value="Dog" />
               <InfoItem label="Breed" value={mockData.breed} />
            </SectionCard>

            <SectionCard title="Care & Schedule" onEdit={() => {}}>
               <InfoItem label="Dietary Preference" value={mockData.diet} />
               <InfoItem label="Allergies" value={mockData.allergies} />
            </SectionCard>

            <SectionCard title="Tracking">
               <div className="flex items-center justify-between col-span-full">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Weight</p>
                    <p className="text-sm font-bold text-slate-600 italic">No weight records</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white transition-all text-[10px] font-black uppercase">
                     <Plus className="w-3.5 h-3.5" /> Add
                  </button>
               </div>
            </SectionCard>

            <SectionCard title="Legal & Documents">
               <InfoItem label="Terms and Conditions Status" value="No Data" fullWidth />
               <div className="col-span-full pt-4">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Identity Document</p>
                 <div className="w-full h-48 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center overflow-hidden group">
                   <div className="text-center group-hover:opacity-10 transition-opacity">
                     <FileText className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                     <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Aadhaar Card Placeholder</p>
                   </div>
                 </div>
               </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'Vaccination' && (
          <div className="space-y-4">
            <SectionCard title="Vaccination Information" onEdit={() => {}}>
               <InfoItem label="Neutered or Spayed" value="No" />
               <InfoItem label="Last Heat" value="Mar 2026" />
               <InfoItem label="Vaccination Status" value="Vaccinated" />
               <InfoItem label="Vaccinations" value="Anti Rabies, DHPPiL (9-in-1), Corona, Kennel Cough" />
               
               <div className="col-span-full h-px bg-white/5 my-2" />
               
               <InfoItem label="Anti Rabies Date" value="Feb 08, 2026" />
               <InfoItem label="Anti Rabies Due" value="Feb 08, 2027" />
               
               <InfoItem label="DHPPiL Date" value="Feb 08, 2026" />
               <InfoItem label="DHPPiL Due" value="Feb 08, 2027" />

               <InfoItem label="Corona Date" value="Feb 15, 2026" />
               <InfoItem label="Corona Due" value="Feb 15, 2027" />

               <InfoItem label="Kennel Cough Date" value="Feb 15, 2026" />
               <InfoItem label="Kennel Cough Due" value="Feb 15, 2027" />

               <div className="col-span-full h-px bg-white/5 my-2" />

               <InfoItem label="Tick Prevention" value="Yes" />
               <InfoItem label="Last Tick Prev." value="Mar 28, 2026" />
               <InfoItem label="Tick Prev. Method" value="Anti-Tick Spray /Shampoo" fullWidth />
               <InfoItem label="Last Deworming Date" value="Feb 15, 2026" fullWidth />
               
               <div className="col-span-full grid grid-cols-2 gap-4 mt-4">
                  <div className="aspect-[3/4] rounded-xl bg-slate-900 border border-white/5" />
                  <div className="aspect-[3/4] rounded-xl bg-slate-900 border border-white/5" />
               </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'Medical' && (
          <div className="space-y-4">
            <SectionCard title="Medical Information" onEdit={() => {}}>
               <InfoItem label="Ongoing Medication" value={mockData.meds} />
               <InfoItem label="Medication Details" value={mockData.medDetails} />
               <InfoItem label="Major Illness History" value="Na" />
               <InfoItem label="Vet Name" value={mockData.vetName} />
               <InfoItem label="Vet Phone Number" value={mockData.vetPhone} />
               <InfoItem label="Local Guardian Name" value={mockData.guardian} />
               <InfoItem label="Local Guardian Number" value={mockData.phone} fullWidth />
            </SectionCard>
          </div>
        )}

        {activeTab === 'History' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6 px-4 py-3 bg-slate-900/50 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-slate-400">Number of Sessions: <span className="text-white">{mockData.sessions}</span></p>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-[10px] font-black uppercase text-slate-300 hover:text-white transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
            </div>

            <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
               <div className="relative">
                  <div className="absolute -left-[26px] top-1.5 w-4 h-4 rounded-full bg-slate-950 ring-4 ring-cyan-500/30 ring-offset-4 ring-offset-slate-950" />
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-900 text-[9px] font-black uppercase tracking-widest text-white mb-4">
                    {mockData.recentBooking.date}
                  </div>
                  <div className="premium-glass p-5 border border-white/5 flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-1">
                       <div className="flex justify-between md:justify-start items-center gap-4">
                          <h4 className="text-lg font-black text-white italic">Booking</h4>
                          <span className="status-badge bg-red-500/10 text-red-500 border-red-500/20">{mockData.recentBooking.status}</span>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <InfoItem label="Amount" value={`₹ ${mockData.recentBooking.amount}`} />
                          <InfoItem label="Operational Status" value={mockData.recentBooking.operationalStatus} />
                          <InfoItem label="Stay Period" value={mockData.recentBooking.period} fullWidth />
                          <InfoItem label="Notes" value="No notes" fullWidth />
                       </div>
                    </div>
                    <div className="flex md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 leading-none">
                       <button className="flex-1 md:w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all text-[10px] font-black uppercase">
                          <FileText className="w-3.5 h-3.5" /> View
                       </button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {(activeTab === 'Notes' || activeTab === 'Audit Trail') && (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-30 italic">
             <Info className="w-8 h-8 mb-4" />
             <p className="text-sm font-bold uppercase tracking-widest">Module Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
