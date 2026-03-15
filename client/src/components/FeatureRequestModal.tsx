import { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface FeatureRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeatureRequestModal({ isOpen, onClose }: FeatureRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    featureTitle: '',
    featureDescription: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    timeline: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const submitMutation = trpc.featureRequest.submit.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        featureTitle: formData.featureTitle,
        featureDescription: formData.featureDescription,
        priority: formData.priority,
        timeline: formData.timeline,
        budget: formData.budget,
      });
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          companyName: '',
          featureTitle: '',
          featureDescription: '',
          priority: 'medium',
          timeline: '',
          budget: '',
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feature request:', error);
    }
  };

  if (!isOpen) return null;

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
            Request Custom Feature
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Tell us about the feature you need for your business
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-400/20 border border-green-400 flex items-center justify-center">
              <Send className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
            <p className="text-gray-400">
              Thank you! Our team will review your feature request and contact you within 24 hours.
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

            {/* Feature Title */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                Feature Title *
              </label>
              <input
                type="text"
                name="featureTitle"
                value={formData.featureTitle}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                placeholder="e.g., Real-time Analytics Dashboard"
              />
            </div>

            {/* Feature Description */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                Feature Description *
              </label>
              <textarea
                name="featureDescription"
                value={formData.featureDescription}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all resize-none text-sm"
                placeholder="Describe the feature you need in detail..."
              />
            </div>

            {/* Row 3: Priority, Timeline & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white mb-2">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-cyan-400/20 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
                  <option value="immediate">Immediate (1-2 weeks)</option>
                  <option value="1-month">1 Month</option>
                  <option value="2-3-months">2-3 Months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
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
                  <option value="">Select budget</option>
                  <option value="under-50k">Under ₹50,000</option>
                  <option value="50k-100k">₹50,000 - ₹100,000</option>
                  <option value="100k-500k">₹100,000 - ₹500,000</option>
                  <option value="above-500k">Above ₹500,000</option>
                </select>
              </div>
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
