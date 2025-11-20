import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, MessageCircle, CheckCircle, Globe, Zap, Video, Phone, Mic, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleProtectedNavigation = (path: string) => {
    if (isNavigating) return; // Prevent multiple clicks

    setIsNavigating(true);
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate('/login');
    }

    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  const features = [
    {
      icon: FileText,
      title: "AI Document Analysis",
      description: "Upload any legal document and get an instant, easy-to-understand summary of its key terms and obligations."
    },
    {
      icon: Shield,
      title: "Risk Detection",
      description: "Automatically identify potential risks, unfair clauses, and hidden liabilities that could harm your interests."
    },
    {
      icon: MessageCircle,
      title: "Smart Legal Chatbot",
      description: "Ask questions about your documents in plain English (or Hindi) and get instant, accurate answers."
    },
    {
      icon: CheckCircle,
      title: "Compliance Check",
      description: "Ensure your documents meet current legal standards and regulatory requirements for your specific region."
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Break language barriers with support for major Indian languages, making legal understanding accessible to all."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get comprehensive analysis in seconds, saving you hours of reading and confusion."
    },
    {
      icon: Video,
      title: "Video Advisory",
      description: "Connect with legal experts through video calls for personalized advice on complex matters."
    },
    {
      icon: Phone,
      title: "Priority Support",
      description: "Get dedicated support for urgent queries and technical assistance whenever you need it."
    },
    {
      icon: Mic,
      title: "Voice Commands",
      description: "Interact with the platform using voice commands for a hands-free and accessible experience."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-28 px-4 md:px-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-accent mb-4">
          Powerful Features for Legal Clarity
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Everything you need to understand, analyze, and navigate legal documents with confidence.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 dark:bg-primary/20 dark:text-accent">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-card border border-gray-200 dark:border-border"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Ready to Simplify Legal Documents?
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Join thousands of users who trust LegalKlarity to decode complex legal language and protect their interests.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <button
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition dark:bg-primary/80 dark:hover:bg-primary/70 flex items-center justify-center"
            onClick={() => handleProtectedNavigation('/dashboard')}
            disabled={isNavigating}
          >
            {isNavigating ? "Redirecting..." : "Start Free Trial"}
            {!isNavigating && <ArrowRight className="ml-2 h-5 w-5" />}
          </button>
          <button
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            onClick={() => {
              if (isNavigating) return;
              setIsNavigating(true);
              navigate("/demo");
              setTimeout(() => setIsNavigating(false), 1000);
            }}
            disabled={isNavigating}
          >
            {isNavigating ? "Redirecting..." : "Watch Demo"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;