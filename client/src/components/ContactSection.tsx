import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

/**
 * Contact Section Component
 * Design: Cyberpunk Minimalism
 * Features: Minimized contact form with backend integration
 * Responsive: Mobile-first layout optimized for all screen sizes
 */

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const submitMutation = trpc.contact.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-12 md:py-20 lg:py-32 bg-gradient-to-b from-background to-slate-900/50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-magenta-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-400/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-24">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <div className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest">GET IN TOUCH</span>
            <div className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Let us Build Your Future
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Have a project in mind? Get in touch with our team and let us help you transform your vision into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-4 md:space-y-6">
            {/* Email */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-lg backdrop-blur-md bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-400/30 transition-all">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 md:mb-1">Email</h3>
                  <p className="text-gray-400 text-xs sm:text-sm break-all">contact@rudraksha.in</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-lg backdrop-blur-md bg-white/5 border border-magenta-400/20 hover:border-magenta-400/50 transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-magenta-400/20 to-magenta-400/10 flex items-center justify-center flex-shrink-0 group-hover:from-magenta-400/30 transition-all">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-magenta-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 md:mb-1">Phone</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">+91 (123) 456-7890</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="group p-4 sm:p-5 md:p-6 rounded-lg backdrop-blur-md bg-white/5 border border-green-400/20 hover:border-green-400/50 transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-green-400/20 to-green-400/10 flex items-center justify-center flex-shrink-0 group-hover:from-green-400/30 transition-all">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-0.5 md:mb-1">Location</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Bangalore, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Minimized Contact Form */}
          <div className="lg:col-span-2 p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg backdrop-blur-md bg-white/5 border border-cyan-400/20 hover:border-cyan-400/30 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 md:mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 md:mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-1.5 md:mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all duration-300 resize-none text-xs sm:text-sm"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base mt-2 md:mt-4 disabled:opacity-50"
                style={{
                  background: submitted ? 'linear-gradient(135deg, #39FF14 0%, #2ECC71 100%)' : 'linear-gradient(135deg, #00D9FF 0%, #00A8CC 100%)',
                  color: '#0F1419',
                  boxShadow: `0 0 20px ${submitted ? 'rgba(57, 255, 20, 0.3)' : 'rgba(0, 217, 255, 0.3)'}`,
                }}
                onMouseEnter={(e) => {
                  if (!submitMutation.isPending && !submitted) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.8)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitMutation.isPending && !submitted) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  }
                }}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 size={14} className="hidden sm:block animate-spin" />
                    <Loader2 size={12} className="sm:hidden animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : submitted ? (
                  <span>Message Sent!</span>
                ) : (
                  <>
                    <Send size={14} className="hidden sm:block" />
                    <Send size={12} className="sm:hidden" />
                    <span>Send</span>
                  </>
                )}
              </button>

              {submitMutation.isError && (
                <p className="text-center text-red-400 text-xs font-semibold">
                  Error submitting form. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
