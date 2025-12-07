import React, { useRef, useEffect, useState } from 'react';

interface LightPillarCSSProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: string;
}

const LightPillarCSS: React.FC<LightPillarCSSProps> = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1.0,
  rotationSpeed = 0.5,
  interactive = true,
  glowAmount = 0.01,
  pillarWidth = 1.5,
  pillarHeight = 0.5,
  noiseIntensity = 0.3,
  mixBlendMode = 'normal'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  // Mouse tracking
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Animation loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setTime(prev => prev + 0.01 * rotationSpeed);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [rotationSpeed]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ mixBlendMode: mixBlendMode as any }}
    >
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`,
          opacity: 0.3
        }}
      />

      {/* Animated gradient pillars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse ${pillarWidth * 100}% ${pillarHeight * 100}% at 50% ${50 + Math.sin(time + i) * 20}%, ${topColor} 0%, transparent 70%)`,
            opacity: intensity * 0.6,
            transform: `rotate(${time * 10 + i * 30}deg) scale(${1 + Math.sin(time + i * 0.5) * 0.1})`,
            filter: `blur(${glowAmount * 1000}px)`,
            animation: `float${i} ${5 + i}s ease-in-out infinite`,
            mixBlendMode: 'screen'
          }}
        />
      ))}

      {/* Central pillar */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse ${pillarWidth * 80}% ${pillarHeight * 150}% at ${50 + mousePos.x * 10}% ${50 + mousePos.y * 10}%, ${topColor} 0%, ${bottomColor} 50%, transparent 100%)`,
          opacity: intensity,
          filter: `blur(${glowAmount * 2000}px)`,
          transform: `scale(${1 + Math.sin(time) * 0.1})`,
          mixBlendMode: 'screen'
        }}
      />

      {/* Overlay glow effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, ${topColor}40 0%, transparent 60%)`,
          opacity: 0.5,
          mixBlendMode: 'screen'
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: noiseIntensity,
          animation: 'noise 8s steps(10) infinite',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Animated scan lines */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          animation: 'scan 3s linear infinite',
          pointerEvents: 'none'
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? topColor : bottomColor,
            opacity: 0.4,
            animation: `particle${i % 3} ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(30px) rotate(-180deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(20px) rotate(180deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(-20px) rotate(-180deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -15px) rotate(180deg); }
        }
        
        @keyframes particle0 {
          0%, 100% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.4; }
          50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
          90% { opacity: 0.4; }
        }
        @keyframes particle1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 0.5; }
          50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(1.5); }
          90% { opacity: 0.5; }
        }
        @keyframes particle2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) rotate(360deg); }
          90% { opacity: 0.3; }
        }
        
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
};

export default LightPillarCSS;
