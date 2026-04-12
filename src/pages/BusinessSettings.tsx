import { useState } from 'react';
import { 
  Trash2, Edit2, Plus, 
  MapPin, Camera, Copy, FileEdit 
} from 'lucide-react';

// Tab buttons implementation
const Tabs = ({ tabs, activeTab, setActiveTab }: any) => (
  <div className="flex border-b border-white/5 mb-8">
    {tabs.map((tab: string) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-4 text-sm font-bold transition-all relative ${
          activeTab === tab
            ? 'text-cyan-400'
            : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        {tab}
        {activeTab === tab && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
        )}
      </button>
    ))}
  </div>
);

// Toggle Switch Component
const Toggle = ({ enabled, onChange }: any) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
      enabled ? 'bg-cyan-500' : 'bg-slate-700'
    }`}
  >
    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
      enabled ? 'translate-x-6' : 'translate-x-0'
    }`} />
  </button>
);

const PetInfoTab = () => (
  <div className="max-w-3xl space-y-4">
    {[
      { title: "Pet Type", value: "Dog" },
      { title: "Breed Sizes", value: "Small, Medium, Large" },
      { title: "Coat", value: "Short, Combination, Long" }
    ].map((item, idx) => (
      <div key={idx} className="premium-glass p-5 flex items-center justify-between border border-white/5 group">
        <div>
           <h3 className="text-sm font-semibold text-slate-400 mb-1">{item.title}</h3>
           <p className="text-lg font-black text-white">{item.value}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:text-white hover:border-white/20 transition-all font-bold text-xs shadow-sm">
           <Edit2 className="w-3.5 h-3.5" /> Edit
        </button>
      </div>
    ))}
  </div>
);

const CompanyTab = () => (
  <div className="max-w-3xl space-y-6">
    <div className="premium-glass p-6 md:p-8 flex items-center gap-8 border border-white/5">
      <div className="relative group cursor-pointer">
        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-950 shadow-xl overflow-hidden">
           <img src="/NBA-Icon.png" alt="Company Logo" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
           <Camera className="w-6 h-6 text-white absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Business Name</label>
          <input 
            type="text" 
            defaultValue="NBA (Neelus Boarding Adventures)" 
            className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><MapPin className="w-3 h-3"/> Operating Address</label>
          <textarea 
            defaultValue="Gachibowli, Hyderabad, Telangana 500032"
            rows={2}
            className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"
          />
        </div>
      </div>
    </div>
  </div>
);

const BoardingTab = () => {
  const [billing24h, setBilling24h] = useState(true);
  const [separateLateFees, setSeparateLateFees] = useState(true);

  return (
    <div className="max-w-3xl space-y-8">
      
      {/* Toggles */}
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Enable 24-hour billing cycle</h3>
            <p className="text-sm font-medium text-slate-400">Based on the checkin and checkout time, the booking can be charged for the late checkout fees during checkout time is after the 24 hr cycle on checkout day</p>
          </div>
          <Toggle enabled={billing24h} onChange={setBilling24h} />
        </div>
        
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Display late checkout fees as separate charges</h3>
            <p className="text-sm font-medium text-slate-400">When enabled, late checkout fees will appear as a separate line item in the invoice instead of being included in the boarding service charge</p>
          </div>
          <Toggle enabled={separateLateFees} onChange={setSeparateLateFees} />
        </div>
      </div>

      {/* Late Checkout Fees */}
      <div className="premium-glass p-6 md:p-8 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
        <h3 className="text-lg font-black text-white mb-6">Late Checkout Fees</h3>
        
        <div className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-white mb-2">Minutes <span className="text-red-400">*</span></label>
              <input 
                type="number" 
                defaultValue="30"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-white mb-2">Amount <span className="text-red-400">*</span></label>
              <input 
                type="number" 
                defaultValue="0"
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
            <button className="h-[46px] w-[46px] flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 transition-colors shrink-0 group">
               <Trash2 className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
            </button>
          </div>
          <p className="text-xs font-semibold text-slate-500">* Upto 30 minutes or more - extra ₹ 0 will be charged</p>
        </div>

        <button className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white font-bold text-sm hover:bg-white hover:text-slate-950 transition-all">
          <Plus className="w-4 h-4" /> Add Fee Slab
        </button>
      </div>

    </div>
  );
};


const FormsTab = () => (
  <div className="max-w-3xl space-y-4">
    
    <div className="premium-glass p-5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Sharable Onboarding and Booking Form</h3>
        <p className="text-xs text-slate-400 max-w-lg leading-relaxed">Copy this link to share with your clients. You can also add this link to your website & social media. For any help, contact Team Pettle.</p>
      </div>
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-slate-950 transition-colors font-bold text-xs shrink-0 whitespace-nowrap w-full md:w-auto">
        <Copy className="w-3.5 h-3.5" /> Click to copy
      </button>
    </div>

    <div className="premium-glass p-5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div>
        <h3 className="text-sm font-semibold text-white">Terms and Conditions</h3>
      </div>
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-bold text-xs shrink-0 whitespace-nowrap w-full md:w-auto">
        <FileEdit className="w-3.5 h-3.5" /> Modify
      </button>
    </div>

    <div className="premium-glass p-5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div>
        <h3 className="text-sm font-semibold text-white">Customize Onboarding Form</h3>
      </div>
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-bold text-xs shrink-0 whitespace-nowrap w-full md:w-auto">
        <FileEdit className="w-3.5 h-3.5" /> Modify
      </button>
    </div>

    <div className="premium-glass p-5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Consent Form</h3>
        <p className="text-xs text-slate-400 max-w-lg leading-relaxed">Form to be shared with the pet parent for booking consent/declaration. The status will be reflected in the booking</p>
      </div>
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-bold text-xs shrink-0 whitespace-nowrap w-full md:w-auto">
        <FileEdit className="w-3.5 h-3.5" /> Modify
      </button>
    </div>

    <div className="premium-glass p-5 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      <div>
        <h3 className="text-sm font-semibold text-white">Customize quick add client form</h3>
      </div>
      <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-bold text-xs shrink-0 whitespace-nowrap w-full md:w-auto">
        <FileEdit className="w-3.5 h-3.5" /> Modify
      </button>
    </div>

  </div>
);

const BusinessSettings = () => {
  const [activeTab, setActiveTab] = useState('Forms');
  const tabs = ['Forms', 'Pet Info', 'Company', 'Boarding'];

  return (
    <div className="pb-12 md:pb-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10 px-1">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-1 md:mb-2">
            My <span className="text-cyan-400 text-gradient">Business</span>
          </h1>
          <p className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wide uppercase">Workspace Configuration</p>
        </div>
      </header>

      <div className="mb-12">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="animate-in fade-in duration-500">
          {activeTab === 'Forms' && <FormsTab />}
          {activeTab === 'Pet Info' && <PetInfoTab />}
          {activeTab === 'Company' && <CompanyTab />}
          {activeTab === 'Boarding' && <BoardingTab />}
        </div>
      </div>
    </div>
  );
};

export default BusinessSettings;
