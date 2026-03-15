import { useEffect, useRef } from 'react';
import { Zap, Target, Users, Award } from 'lucide-react';

/**
 * About Section Component
 * Design: Cyberpunk Minimalism
 * Features: Company overview, values, statistics with animated counters
 * Responsive: Mobile-first layout optimized for all screen sizes
 */

const stats = [
  { icon: Users, label: 'Happy Clients', value: '500+' },
  { icon: Award, label: 'Projects Completed', value: '1000+' },
  { icon: Zap, label: 'Years of Experience', value: '10+' },
  { icon: Target, label: 'Success Rate', value: '98%' },
];

const values = [
  {
    title: 'Innovation First',
    description: 'We stay ahead of technology trends to deliver cutting-edge solutions.',
    accent: 'cyan',
  },
  {
    title: 'Client Focused',
    description: 'Your success is our success. We prioritize your goals and vision.',
    accent: 'magenta',
  },
  {
    title: 'Quality Driven',
    description: 'Excellence in every line of code and every design decision.',
    accent: 'green',
  },
  {
    title: 'Transparent Partnership',
    description: 'Clear communication and honest collaboration throughout the project.',
    accent: 'cyan',
  },
];

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters
            const counters = statsRef.current?.querySelectorAll('[data-counter]');
            counters?.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              let current = 0;
              const increment = target / 50;

              const updateCounter = () => {
                current += increment;
                if (current < target) {
                  counter.textContent = Math.floor(current) + '+';
                  setTimeout(updateCounter, 30);
                } else {
                  counter.textContent = target + '+';
                }
              };

              updateCounter();
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative w-full py-12 md:py-20 lg:py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-magenta-400/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-24">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest">ABOUT US</span>
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Pioneering Digital Excellence
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Rudraksha Pvt Ltd is a leading technology and digital services company dedicated to transforming businesses through innovative solutions and strategic digital transformation.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-12 md:mb-16 lg:mb-32"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group p-4 sm:p-5 md:p-6 rounded-lg backdrop-blur-md bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 text-center"
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2 md:mb-4 group-hover:text-magenta-400 transition-colors" />
                <div
                  data-counter
                  data-target={parseInt(stat.value)}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 mb-1 md:mb-2"
                >
                  0+
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Values Grid */}
        <div className="mb-12 md:mb-16 lg:mb-24">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 lg:mb-12 text-center text-white">
            Our Core Values
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group p-5 sm:p-6 md:p-8 rounded-lg backdrop-blur-md bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-magenta-400/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 md:mb-2">{value.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 md:pt-12 lg:pt-20 border-t border-cyan-400/10">
          <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Join hundreds of satisfied clients who have transformed their business with us</p>
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FF006E 0%, #FF3D7F 100%)',
              color: '#F0F0F0',
              boxShadow: '0 0 20px rgba(255, 0, 110, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(255, 0, 110, 0.8)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.3)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
