import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  serviceName: string;
  clientType: 'brand' | 'customer';
}

export default function ServiceRequestModal({
  isOpen,
  onClose,
  serviceType,
  serviceName,
  clientType,
}: ServiceRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: serviceType,
    clientType: clientType,
    projectDescription: '',
    budget: '',
    timeline: '',
    additionalInfo: '',
    // Service-specific fields
    websiteType: '',
    appPlatform: '',
    marketingGoal: '',
    socialPlatforms: [] as string[],
    targetKeywords: [] as string[],
    influencerNiche: '',
    prObjective: '',
    memeStyle: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const submitMutation = trpc.serviceRequest.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (platform: string) => {
    setFormData({
      ...formData,
      socialPlatforms: formData.socialPlatforms.includes(platform)
        ? formData.socialPlatforms.filter(p => p !== platform)
        : [...formData.socialPlatforms, platform],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        serviceType: formData.serviceType,
        clientType: formData.clientType,
        projectDescription: formData.projectDescription,
        budget: formData.budget,
        timeline: formData.timeline,
        additionalInfo: formData.additionalInfo,
        websiteType: formData.websiteType,
        appPlatform: formData.appPlatform,
        marketingGoal: formData.marketingGoal,
        socialPlatforms: formData.socialPlatforms,
        targetKeywords: formData.targetKeywords,
        influencerNiche: formData.influencerNiche,
        prObjective: formData.prObjective,
        memeStyle: formData.memeStyle,
      });
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          companyName: '',
          serviceType: serviceType,
          clientType: clientType,
          projectDescription: '',
          budget: '',
          timeline: '',
          additionalInfo: '',
          websiteType: '',
          appPlatform: '',
          marketingGoal: '',
          socialPlatforms: [],
          targetKeywords: [],
          influencerNiche: '',
          prObjective: '',
          memeStyle: '',
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting service request:', error);
    }
  };

  if (!isOpen) return null;

  const renderServiceSpecificFields = () => {
    switch (serviceType) {
      case 'web-app-dev':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Website Type
                </label>
                <select
                  name="websiteType"
                  value={formData.websiteType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                >
                  <option value="">Select type</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="blog">Blog</option>
                  <option value="saas">SaaS</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  App Platform
                </label>
                <select
                  name="appPlatform"
                  value={formData.appPlatform}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                >
                  <option value="">Select platform</option>
                  <option value="ios">iOS</option>
                  <option value="android">Android</option>
                  <option value="both">Both (iOS & Android)</option>
                  <option value="web">Web App</option>
                </select>
              </div>
            </div>
          </>
        );

      case 'digital-marketing':
        return (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
              Marketing Goal
            </label>
            <select
              name="marketingGoal"
              value={formData.marketingGoal}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
            >
              <option value="">Select goal</option>
              <option value="brand-awareness">Brand Awareness</option>
              <option value="lead-generation">Lead Generation</option>
              <option value="sales">Sales</option>
              <option value="engagement">Engagement</option>
              <option value="traffic">Website Traffic</option>
            </select>
          </div>
        );

      case 'social-media':
        return (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
              Social Platforms
            </label>
            <div className="space-y-2">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube'].map(platform => (
                <label key={platform} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.socialPlatforms.includes(platform)}
                    onChange={() => handleCheckboxChange(platform)}
                    className="w-4 h-4 rounded bg-white/10 border border-cyan-400/20 accent-cyan-400"
                  />
                  <span className="text-sm text-gray-300">{platform}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'seo':
        return (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
              Target Keywords (comma-separated)
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all resize-none text-sm"
              placeholder="e.g., digital marketing, SEO services, online marketing"
            />
          </div>
        );

      case 'influencer':
        return (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
              Influencer Niche
            </label>
            <select
              name="influencerNiche"
              value={formData.influencerNiche}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
            >
              <option value="">Select niche</option>
              <option value="fashion">Fashion</option>
              <option value="tech">Tech</option>
              <option value="fitness">Fitness</option>
              <option value="beauty">Beauty</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>
        );

      case 'meme-marketing':
        return (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
              Meme Style
            </label>
            <select
              name="memeStyle"
              value={formData.memeStyle}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
            >
              <option value="">Select style</option>
              <option value="relatable">Relatable Humor</option>
              <option value="trending">Trending Formats</option>
              <option value="dark">Dark Humor</option>
              <option value="wholesome">Wholesome</option>
              <option value="educational">Educational</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg backdrop-blur-md bg-white/10 border border-cyan-400/30 p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-cyan-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent mb-2">
            {serviceName} Request
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            For: <span className="text-cyan-400 font-semibold capitalize">{clientType}s</span>
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-400/20 border border-green-400 flex items-center justify-center">
              <Send className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-gray-400">
              Thank you! Our team will review your {serviceName.toLowerCase()} request and contact you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Row 2: Phone & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                  placeholder="+91 (123) 456-7890"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                  placeholder="Your company"
                />
              </div>
            </div>

            {/* Service-Specific Fields */}
            {renderServiceSpecificFields()}

            {/* Row 3: Budget & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                >
                  <option value="">Select budget range</option>
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-100k">₹50,000 - ₹100,000</option>
                  <option value="100k-500k">₹100,000 - ₹500,000</option>
                  <option value="500k-1m">₹500,000 - ₹1,000,000</option>
                  <option value="above-1m">Above ₹1,000,000</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (within 2 weeks)</option>
                  <option value="1-month">1 Month</option>
                  <option value="2-3-months">2-3 Months</option>
                  <option value="3-6-months">3-6 Months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                Project Description *
              </label>
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all resize-none text-sm"
                placeholder={`Describe your ${serviceName.toLowerCase()} project requirements...`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 bg-white/5 border border-gray-400/30 text-gray-300 hover:bg-white/10 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitMutation.isPending}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #00D9FF 0%, #00A8CC 100%)',
                  color: '#0F1419',
                  boxShadow: '0 0 10px rgba(0, 217, 255, 0.2)',
                }}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
