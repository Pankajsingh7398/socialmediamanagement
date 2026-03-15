import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

/**
 * Header Component
 * Design: Cyberpunk Minimalism
 * Features: Logo, responsive burger menu with navigation links
 * Responsive: Mobile-first design optimized for all screen sizes
 */

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-cyan-400/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-magenta-400 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-background font-bold" />
            </div>
            <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent hidden sm:inline">
              Rudraksha
            </span>
            <span className="text-sm sm:hidden font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              RDK
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 active:bg-white/20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-cyan-400/10 animate-in fade-in slide-in-from-top-2"
            style={{
              animation: 'slideDown 0.3s ease-out',
            }}
          >
            <nav className="container mx-auto px-4 py-3 sm:py-4 flex flex-col gap-2 sm:gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2 px-3 sm:px-4 rounded hover:bg-white/5 text-sm sm:text-base"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}

        <style>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </header>
    </>
  );
}
