import { ArrowUp, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

/**
 * Footer Component
 * Design: Cyberpunk Minimalism
 * Features: Navigation, social links, contact info, back-to-top button
 * Responsive: Mobile-first layout optimized for all screen sizes
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative w-full bg-gradient-to-b from-slate-900/50 to-black border-t border-cyan-400/10">
      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-magenta-400 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-bold text-background">R</span>
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
                Rudraksha
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Transforming businesses through cutting-edge technology and innovative digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2 md:space-y-2.5">
              {['Home', 'Services', 'About', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-3 md:mb-4">Services</h4>
            <ul className="space-y-2 md:space-y-2.5">
              {['Web Development', 'App Development', 'Digital Marketing', 'SEO Optimization'].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white mb-3 md:mb-4">Contact</h4>
            <div className="space-y-2 md:space-y-2.5">
              <a
                href="mailto:contact@rudraksha.in"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs sm:text-sm group"
              >
                <Mail size={14} className="flex-shrink-0 hidden sm:block" />
                <Mail size={12} className="flex-shrink-0 sm:hidden" />
                <span className="break-all">contact@rudraksha.in</span>
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                <Phone size={14} className="flex-shrink-0 hidden sm:block" />
                <Phone size={12} className="flex-shrink-0 sm:hidden" />
                <span>+91 (123) 456-7890</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm">
                <MapPin size={14} className="flex-shrink-0 mt-0.5 hidden sm:block" />
                <MapPin size={12} className="flex-shrink-0 mt-0.5 sm:hidden" />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-400/10 py-6 md:py-8">
          {/* Social Links */}
          <div className="flex justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            {[
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Instagram, label: 'Instagram' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 hover:text-magenta-400 hover:bg-white/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon size={16} className="hidden sm:block" />
                  <Icon size={14} className="sm:hidden" />
                </a>
              );
            })}
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} Rudraksha Pvt Ltd. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-magenta-400/20 border border-cyan-400/20 hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 hover:text-white transition-all duration-300 flex-shrink-0"
              aria-label="Back to top"
            >
              <ArrowUp size={16} className="hidden sm:block" />
              <ArrowUp size={14} className="sm:hidden" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
