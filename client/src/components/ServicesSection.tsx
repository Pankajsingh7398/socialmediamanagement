import { useState, useEffect, useRef } from 'react';
import { Code2, Smartphone, TrendingUp, Share2, Search, Megaphone, Briefcase, Smile } from 'lucide-react';
import ServiceRequestModal from './ServiceRequestModal';

/**
 * Services Section Component
 * Design: Cyberpunk Minimalism with Glassmorphism
 * Features: Service cards with glass effect, hover animations, neon accents, service-specific modals
 * Responsive: Mobile-first grid layout optimized for all screen sizes
 * Animations: Stagger fade-in on scroll, scale on hover, glow effects
 */

const services = [
  {
    id: 'web-app-dev',
    icon: Code2,
    title: 'Web & App Development',
    description: 'Modern, responsive websites and native/cross-platform mobile applications designed for seamless user experiences.',
    accent: 'cyan',
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Strategic digital marketing campaigns to boost your online presence and drive conversions.',
    accent: 'magenta',
  },
  {
    id: 'social-media',
    icon: Share2,
    title: 'Social Media Management',
    description: 'Engaging content strategies and community management across all major social platforms.',
    accent: 'green',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO Optimization',
    description: 'Comprehensive SEO strategies to improve rankings and organic traffic to your website.',
    accent: 'cyan',
  },
  {
    id: 'influencer',
    icon: Megaphone,
    title: 'Influencer Marketing',
    description: 'Connect with top influencers to amplify your brand message and reach targeted audiences effectively.',
    accent: 'magenta',
  },
  {
    id: 'meme-marketing',
    icon: Smile,
    title: 'Meme Marketing',
    description: 'Viral-worthy meme content creation and distribution to engage younger demographics and boost brand awareness.',
    accent: 'green',
  },
];

const accentColors = {
  cyan: {
    border: 'border-cyan-400/30 hover:border-cyan-400',
    glow: 'hover:shadow-[0_0_30px_rgba(0,217,255,0.4)]',
    text: 'text-cyan-400',
    bg: 'hover:bg-cyan-400/5',
  },
  magenta: {
    border: 'border-magenta-400/30 hover:border-magenta-400',
    glow: 'hover:shadow-[0_0_30px_rgba(255,0,110,0.4)]',
    text: 'text-magenta-400',
    bg: 'hover:bg-magenta-400/5',
  },
  green: {
    border: 'border-green-400/30 hover:border-green-400',
    glow: 'hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]',
    text: 'text-green-400',
    bg: 'hover:bg-green-400/5',
  },
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false));
  const [selectedService, setSelectedService] = useState<{ id: string; name: string } | null>(null);
  const [clientType, setClientType] = useState<'brand' | 'customer'>('brand');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        className="relative w-full py-12 md:py-20 lg:py-32 bg-gradient-to-b from-background via-background to-slate-900/20 overflow-hidden"
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 217, 255, 0.05) 25%, rgba(0, 217, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 217, 255, 0.05) 75%, rgba(0, 217, 255, 0.05) 76%, transparent 77%, transparent)',
              backgroundSize: '100px 100px',
            }}
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-24">
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-400" />
              <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest">OUR SERVICES</span>
              <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                Comprehensive Digital Solutions
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 mb-6">
              We offer a complete range of digital services to help your business thrive in the modern digital landscape.
            </p>

            {/* Client Type Toggle */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setClientType('brand')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  clientType === 'brand'
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-background shadow-lg shadow-cyan-400/50'
                    : 'bg-white/5 border border-cyan-400/30 text-cyan-400 hover:bg-white/10'
                }`}
              >
                For Brands
              </button>
              <button
                onClick={() => setClientType('customer')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                  clientType === 'customer'
                    ? 'bg-gradient-to-r from-magenta-400 to-magenta-500 text-background shadow-lg shadow-magenta-400/50'
                    : 'bg-white/5 border border-magenta-400/30 text-magenta-400 hover:bg-white/10'
                }`}
              >
                For Customers
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const colors = accentColors[service.accent as keyof typeof accentColors];

              return (
                <div
                  key={service.id}
                  data-index={idx}
                  className={`group relative transition-all duration-500 transform cursor-pointer ${
                    visibleCards[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${idx * 100}ms`,
                  }}
                  onClick={() => setSelectedService({ id: service.id, name: service.title })}
                >
                  {/* Card Background */}
                  <div
                    className={`absolute inset-0 rounded-lg backdrop-blur-md bg-white/5 border transition-all duration-300 ${colors.border} ${colors.bg} ${colors.glow}`}
                  />

                  {/* Card Content */}
                  <div className="relative p-5 sm:p-6 md:p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className={`mb-4 md:mb-6 p-3 sm:p-4 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border transition-all duration-300 ${colors.border} w-fit`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${colors.text}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 md:mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-grow mb-3 md:mb-4">
                      {service.description}
                    </p>

                    {/* Request Button */}
                    <div
                      className={`flex items-center gap-2 font-semibold text-xs sm:text-sm transition-all duration-300 ${colors.text} group-hover:translate-x-2`}
                    >
                      <span>Request Now</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Hover Accent Line */}
                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r transition-all duration-300 rounded-full group-hover:w-full`}
                      style={{
                        width: '0%',
                        background:
                          service.accent === 'cyan'
                            ? 'linear-gradient(90deg, #00D9FF, transparent)'
                            : service.accent === 'magenta'
                              ? 'linear-gradient(90deg, #FF006E, transparent)'
                              : 'linear-gradient(90deg, #39FF14, transparent)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-magenta-400/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Service Request Modal */}
      {selectedService && (
        <ServiceRequestModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          serviceType={selectedService.id}
          serviceName={selectedService.name}
          clientType={clientType}
        />
      )}
    </>
  );
}
