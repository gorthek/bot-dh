export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-background" />

      {/* Top-left violet glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />

      {/* Bottom-right blue glow */}
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px]" />

      {/* Center subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-violet-400/40 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-1 h-1 rounded-full bg-violet-300/50 animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 left-2/3 w-2 h-2 rounded-full bg-indigo-400/30 animate-float" style={{ animationDelay: '0.8s' }} />
    </div>
  );
}