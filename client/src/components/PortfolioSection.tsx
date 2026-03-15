import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Portfolio Section Component
 * Design: Cyberpunk Minimalism
 * Features: Project showcase with hover effects and image backgrounds
 * Responsive: Mobile-first layout optimized for all screen sizes
 */

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration',
    category: 'Web Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663304750746/Gco9SAhKBsbRDyA4jNMmQs/services-abstract-tech-HGsVEbWpYTorpaA8HetM25.webp',
    accent: 'cyan',
  },
  {
    title: 'Mobile Fitness App',
    description: 'iOS and Android fitness tracking application',
    category: 'App Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663304750746/Gco9SAhKBsbRDyA4jNMmQs/digital-transformation-WdsVBFekACCnn3jTnLTrP.webp',
    accent: 'magenta',
  },
  {
    title: 'SaaS Dashboard',
    description: 'Enterprise analytics and reporting dashboard',
    category: 'Web Development',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663304750746/Gco9SAhKBsbRDyA4jNMmQs/innovation-network-ZGF2WBq5DtqixQHALX6tUE.webp',
    accent: 'green',
  },
  {
    title: 'Brand Identity Design',
    description: 'Complete branding and UI/UX design overhaul',
    category: 'Design',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663304750746/Gco9SAhKBsbRDyA4jNMmQs/hero-cyberpunk-tech-Zijd8DaYhvQDtP3ocd6YhS.webp',
    accent: 'cyan',
  },
  {
    title: 'Digital Marketing Campaign',
    description: 'Multi-channel marketing campaign with 300% ROI',
    category: 'Marketing',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663304750746/Gco9SAhKBsbRDyA4jNMmQs/services-abstract-tech-HGsVEbWpYTorpaA8HetM25.webp',
    accent: 'magenta',
  },
  {
    title: 'Social Media Management',
    description: 'Comprehensive social media strategy and execution',
    category: 'Social Media',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663304750746/Gco9SAhKBsbRDyA4jNMmQs/innovation-network-ZGF2WBq5DtqixQHALX6tUE.webp',
    accent: 'green',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>(new Array(projects.length).fill(false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProjects((prev) => {
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
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full py-12 md:py-20 lg:py-32 bg-gradient-to-b from-background to-slate-900/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 md:w-96 md:h-96 bg-green-400/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-24">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest">OUR WORK</span>
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Explore our recent work and see how we have helped businesses achieve their digital goals.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              data-index={idx}
              className={`group relative overflow-hidden rounded-lg transition-all duration-500 transform ${
                visibleProjects[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${idx * 100}ms`,
              }}
            >
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${project.image}')`,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />

              {/* Content */}
              <div className="relative h-64 sm:h-72 md:h-80 flex flex-col justify-end p-4 sm:p-5 md:p-6 text-white">
                {/* Category Badge */}
                <div className="mb-3 md:mb-4 inline-block">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded text-xs font-mono tracking-widest ${
                      project.accent === 'cyan'
                        ? 'bg-cyan-400/20 text-cyan-300'
                        : project.accent === 'magenta'
                        ? 'bg-magenta-400/20 text-magenta-300'
                        : 'bg-green-400/20 text-green-300'
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs sm:text-sm mb-3 md:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {project.description}
                </p>

                {/* View More Link */}
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                  <span>View Project</span>
                  <ExternalLink size={14} className="hidden sm:block" />
                  <ExternalLink size={12} className="sm:hidden" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-16 lg:mt-24">
          <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Want to see more of our work?</p>
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 rounded font-bold text-sm sm:text-base md:text-lg transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #39FF14 0%, #2ECC71 100%)',
              color: '#0F1419',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(57, 255, 20, 0.8)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            View Full Portfolio
          </button>
        </div>
      </div>
    </section>
  );
}
