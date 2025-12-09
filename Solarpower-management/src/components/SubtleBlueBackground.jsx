const SubtleBlueBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {/* Gradient Base */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(219, 234, 254, 0.3) 0%, rgba(191, 219, 254, 0.2) 50%, rgba(147, 197, 253, 0.15) 100%)',
      }} />
      
      {/* Dot Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(96, 165, 250, 0.15) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
        opacity: 0.4,
      }} />
      
      {/* Circular Shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '25%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />
      
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '5%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147, 197, 253, 0.12) 0%, transparent 70%)',
        filter: 'blur(35px)',
      }} />
      
      {/* Diagonal Lines Pattern */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.08,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="diagonalLines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="40" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>
      
      {/* Grid Overlay (very subtle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.5,
      }} />
      
      {/* Wavy Shape at Bottom */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '200px',
          opacity: 0.15,
        }}
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,100 C300,150 600,50 900,100 C1050,125 1200,100 1200,100 L1200,200 L0,200 Z"
          fill="rgba(59, 130, 246, 0.3)"
        />
      </svg>
    </div>
  );
};

export default SubtleBlueBackground;