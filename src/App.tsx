import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { 
  CalendarDays, 
  Users, 
  LayoutDashboard, 
  Moon, 
  Sun, 
  Settings,
  Building,
  LogOut,
  Key,
  UserCircle
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import BookingRecords from './pages/BookingRecords';
import BookingDetails from './pages/BookingDetails';
import ClientDatabase from './pages/ClientDatabase';
import ClientDetails from './pages/ClientDetails';
import BusinessSettings from './pages/BusinessSettings';

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const UserDropdown = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center hover:bg-slate-800 transition-colors group"
      >
        <UserCircle className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className={`absolute z-50 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-xl overflow-hidden text-sm ${isMobile ? 'right-0 top-full mt-2' : 'left-full bottom-0 ml-4'}`}>
            <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors font-bold">
              <Building className="w-4 h-4" /> My Business
            </Link>
            <div className="h-px bg-white/5 w-full" />
            <button onClick={() => { setIsOpen(false); alert('Login Flow Stub'); }} className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left font-semibold">
              <UserCircle className="w-4 h-4" /> Sign In
            </button>
            <button onClick={() => { setIsOpen(false); alert('Forgot Password Flow Stub'); }} className="w-full flex items-center gap-2 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left font-semibold border-b border-white/5">
              <Key className="w-4 h-4" /> Reset Password
            </button>
            <button onClick={() => { setIsOpen(false); alert('Logout Flow Stub'); }} className="w-full flex items-center gap-2 px-4 py-3 text-red-500 bg-red-500/5 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left font-semibold">
              <LogOut className="w-4 h-4 shrink-0" /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const AppSidebar = ({ isDark, toggleTheme, location }: any) => {
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Booking Records', path: '/bookings', icon: CalendarDays },
    { name: 'Client Database', path: '/clients', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-slate-950 border-r border-white/5 flex flex-col justify-between hidden md:flex sticky top-0 h-screen overflow-y-auto">
      <div>
        <div className="p-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
              <img src="/NBA-Icon.png" alt="NBA Logo" className="w-8 h-8 rounded-lg" />
              NBA
            </h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Neelus Boarding Adv.</span>
          </div>
        </div>
        <nav className="mt-4 px-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 flex items-center gap-3">
        <UserDropdown />
        <button
          onClick={toggleTheme}
          className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl transition-all duration-300 font-bold text-sm text-slate-500 hover:text-slate-200 bg-slate-900 border border-transparent hover:border-white/5"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-500" />}
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
    </aside>
  );
};

const MobileNav = ({ location }: any) => (
  <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-3xl border-t border-white/5 grid grid-cols-3 md:hidden z-50">
    {[
      { path: '/', icon: LayoutDashboard, label: 'Home' },
      { path: '/bookings', icon: CalendarDays, label: 'Books' },
      { path: '/clients', icon: Users, label: 'Clients' },
    ].map((item) => {
      const isActive = location.pathname === item.path;
      const Icon = item.icon;
      return (
        <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center gap-1 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}>
          <Icon className="w-5 h-5" />
          <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
          {isActive && <div className="absolute top-0 w-8 h-0.5 bg-cyan-400/50 rounded-full" />}
        </Link>
      );
    })}
  </nav>
);

const Layout = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className={`min-h-screen flex w-full overflow-x-hidden ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <AppSidebar isDark={isDark} toggleTheme={toggleTheme} location={location} />

      <main className="flex-1 flex flex-col relative w-full overflow-x-hidden min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 bg-slate-950/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex justify-between items-center z-40 shadow-sm">
          <h1 className="text-xl font-black text-white tracking-tighter flex items-center gap-2">
            <img src="/NBA-Icon.png" alt="NBA Logo" className="w-6 h-6 rounded-sm" />
            NBA
          </h1>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center">
               {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>
            <UserDropdown isMobile />
          </div>
        </header>

        <div className="flex-1 p-3 md:p-12 overflow-x-hidden pb-20 md:pb-12">
          <Outlet />
        </div>

        <MobileNav location={location} />
      </main>
    </div>
  );
};

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<BookingRecords />} />
            <Route path="bookings/:id" element={<BookingDetails />} />
            <Route path="clients" element={<ClientDatabase />} />
            <Route path="clients/:id" element={<ClientDetails />} />
            <Route path="settings" element={<BusinessSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
