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
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='240' height='240' viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.6'%3E%3Cpath d='M0 120h240 M120 0v240' stroke-dasharray='2 8' opacity='0.3'/%3E%3Cg%3E%3Cpath d='M105 145 q15-20 30 0 q-5 10-15 8 q-10 2-15-8 z'/%3E%3Cellipse cx='98' cy='120' rx='6' ry='9' transform='rotate(-25, 98, 120)'/%3E%3Cellipse cx='113' cy='107' rx='6' ry='9' transform='rotate(-10, 113, 107)'/%3E%3Cellipse cx='127' cy='107' rx='6' ry='9' transform='rotate(10, 127, 107)'/%3E%3Cellipse cx='142' cy='120' rx='6' ry='9' transform='rotate(25, 142, 120)'/%3E%3C/g%3E%3Cpath d='M120 155v25 M98 120l-20-20 M142 120l20-20' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '240px 240px'
      }} 
    />
  </div>
);
