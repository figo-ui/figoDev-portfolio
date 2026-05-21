export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] border-t border-white/5 py-8 px-5 md:px-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-left">
        {/* Name brand with OMX Logo */}
        <div className="flex items-center gap-2 px-1 select-none">
          <div className="relative flex items-center justify-center bg-gradient-to-br from-[#4edea3] to-emerald-600 shadow-[0_0_15px_rgba(78,222,163,0.15)] w-7 h-7 rounded-lg text-black font-sans font-black text-[10px] tracking-tight">
            OMX
            <div className="absolute inset-0 rounded-lg border border-white/10 pointer-events-none" />
          </div>
          <div className="font-sans text-base md:text-lg text-white font-bold tracking-tight">
            Obsa Mustefa
          </div>
        </div>

        {/* copyright */}
        <div className="font-mono text-[11px] text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} Obsa Mustefa. Built with precision.
        </div>

        {/* Status widget icon */}
        <div className="flex items-center gap-2 bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]"></span>
          </span>
          <span className="font-mono text-[10px] text-gray-400 font-semibold tracking-wide">
            Available for work
          </span>
        </div>
      </div>
    </footer>
  );
}
