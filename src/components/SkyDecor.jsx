export default function SkyDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.4 + 0.1,
            animationDelay: Math.random() * 4 + 's',
            animationDuration: Math.random() * 3 + 2 + 's',
          }}
        />
      ))}

      {/* Large decorative orbs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-[0.07] animate-float"
        style={{
          background: 'radial-gradient(circle, #7c3aed, transparent)',
          top: '-10%',
          right: '10%',
          animationDuration: '6s',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-[0.05] animate-float"
        style={{
          background: 'radial-gradient(circle, #4f46e5, transparent)',
          bottom: '5%',
          left: '5%',
          animationDuration: '8s',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}