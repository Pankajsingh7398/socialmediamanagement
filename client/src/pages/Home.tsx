import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';

import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

/**
 * Home Page
 * Design: Cyberpunk Minimalism
 * Features: Complete landing page with header, hero, services, about, portfolio, contact, and footer
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />

      <ContactSection />
      <Footer />
    </div>
  );
}
