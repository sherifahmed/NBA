export const AmbientBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* BBA Logo Colors Glowing Orbs */}
    <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[120px] mix-blend-screen" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
    <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-[100px] mix-blend-screen" />

    {/* Dog-Tech Circuit Pattern Watermark */}
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0 120h240 M120 0v240' stroke-dasharray='2 6'/%3E%3Cg fill='%23ffffff' stroke='none'%3E%3Cpath d='M120 125c-15 0-25 8-25 20c0 10 10 15 25 15s25-5 25-15c0-12-10-20-25-20z'/%3E%3Cpath d='M100 135c-12 0-20-15-20-25s8-15 20-15s15 10 15 25s-5 15-15 15z' transform='rotate(-25, 100, 115)'/%3E%3Cpath d='M112 120c-8 0-14-18-14-28s6-18 14-18s14 8 14 18s-6 28-14 28z' transform='rotate(-10, 112, 102)'/%3E%3Cpath d='M128 120c-8 0-14-18-14-28s6-18 14-18s14 8 14 18s-6 28-14 28z' transform='rotate(10, 128, 102)'/%3E%3Cpath d='M140 135c-12 0-20-15-20-25s8-15 20-15s20 5 20 15s-8 25-20 25z' transform='rotate(25, 140, 115)'/%3E%3C/g%3E%3Cpath d='M120 160v30 M90 125l-20-20 M150 125l20-20'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '240px 240px'
      }} 
    />
  </div>
);
