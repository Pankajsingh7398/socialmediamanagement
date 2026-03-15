import { useEffect, useRef } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import WaterCircleBackground from './WaterCircleBackground';

/**
 * Hero Section Component
 * Design: Cyberpunk Minimalism
 * Features: Water circle animated background, overlay, bold headline, animated buttons
 * Responsive: Mobile-first design optimized for all screen sizes
 * Animations: Fade-in stagger, glow effects on hover, smooth transitions
 */

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fade-in animation on mount
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.transition = 'all 0.8s ease-out';
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 pb-8 md:pb-0"
    >
      {/* Water Circle Background */}
      <WaterCircleBackground />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

      {/* Content */}
      <div ref={textRef} className="relative z-20 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full">
        {/* Accent Line */}
        <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
          <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-400" />
          <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest">WELCOME TO THE FUTURE</span>
          <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-400" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-green-400 bg-clip-text text-transparent block">
            Build Your Digital Future
          </span>
          <span className="text-white block mt-2">with Rudraksha Pvt Ltd</span>
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
          Cutting-edge technology and digital services designed to transform your business.
          From websites to apps, marketing to social media—we deliver excellence.
        </p>

        {/* Service Tags */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10 px-2">
          {['Website Development', 'App Development', 'Digital Marketing', 'Social Media Solutions'].map((service, idx) => (
            <div
              key={idx}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-cyan-400/50 text-cyan-300 text-xs sm:text-sm font-mono hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 whitespace-nowrap"
              style={{
                animation: `fadeInUp 0.6s ease-out ${0.1 + idx * 0.1}s both`,
              }}
            >
              {service}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
          {/* Primary Button */}
          <button
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-300 overflow-hidden w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, #00D9FF 0%, #00A8CC 100%)',
              color: '#0F1419',
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.8)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <span className="flex items-center gap-2 justify-center">
              <Zap size={18} className="hidden sm:block" />
              <Zap size={16} className="sm:hidden" />
              Get Started
              <ChevronRight size={18} className="hidden sm:block" />
              <ChevronRight size={16} className="sm:hidden" />
            </span>
          </button>

          {/* Secondary Button */}
          <button
            className="group px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-300 w-full sm:w-auto"
            style={{
              background: 'transparent',
              color: '#00D9FF',
              border: '2px solid #00D9FF',
              boxShadow: '0 0 10px rgba(0, 217, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.6)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(0, 217, 255, 0.1)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(0, 217, 255, 0.2)';
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <span className="flex items-center gap-2 justify-center">
              Explore Services
              <ChevronRight size={18} className="hidden sm:block" />
              <ChevronRight size={16} className="sm:hidden" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden md:flex">
        <div className="flex flex-col items-center gap-2">
          <span className="text-cyan-400 text-xs md:text-sm font-mono">SCROLL TO EXPLORE</span>
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 217, 255, 0.8);
          }
        }
      `}</style>
    </section>
  );
}
