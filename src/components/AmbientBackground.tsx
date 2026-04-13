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
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.5'%3E%3Cpath d='M0 100h200 M100 0v200' stroke-dasharray='2 4'/%3E%3Cpath d='M50 50h100 M50 150h100 M50 50v100 M150 50v100' stroke-opacity='0.5'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='150' cy='50' r='2'/%3E%3Ccircle cx='50' cy='150' r='2'/%3E%3Ccircle cx='150' cy='150' r='2'/%3E%3Cg fill='%23ffffff' stroke='none'%3E%3Cpath d='M90 105c0-5 20-5 20 0c0 10-10 15-10 15s-10-5-10-15z'/%3E%3Ccircle cx='85' cy='90' r='4'/%3E%3Ccircle cx='95' cy='82' r='4'/%3E%3Ccircle cx='105' cy='82' r='4'/%3E%3Ccircle cx='115' cy='90' r='4'/%3E%3C/g%3E%3Cpath d='M100 120v30h20 M85 90l-15-15h-20 M115 90l15-15h20'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} 
    />
  </div>
);
