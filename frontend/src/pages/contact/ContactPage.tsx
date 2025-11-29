import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@legalklarity.ai",
      description: "For general inquiries and support"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 6969696969",
      description: "Monday to Friday, 9AM to 6PM IST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "LegalKlarity Technologies Pvt. Ltd.",
      description: "Amravati, Andhra Pradesh, India"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "Typically much faster during business hours"
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
          Get in Touch with LegalKlarity
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Have questions or need assistance? Our team is here to help you navigate the legal landscape with confidence.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-accent mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Contact Information
          </motion.h2>

          <div className="space-y-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  className="flex"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center dark:bg-primary/20 dark:text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{info.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">{info.details}</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">{info.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Chatbot Promo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/10 dark:from-primary/20 dark:to-accent/10 dark:border-primary/20"
          >
            <div className="flex items-start">
              <MessageCircle className="h-10 w-10 text-primary mr-4 dark:text-accent" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Need Instant Help?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our AI legal assistant Klarity is available 24/7 to answer your legal questions instantly.
                </p>
                <button className="text-primary font-medium hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition">
                  Open Chatbot →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-8 dark:bg-card border border-gray-200 dark:border-border"
        >
          <motion.h2
            className="text-3xl font-bold text-gray-900 dark:text-accent mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Send us a Message
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-secondary/10 dark:border-border dark:text-white dark:focus:ring-accent"
                placeholder="Your full name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-secondary/10 dark:border-border dark:text-white dark:focus:ring-accent"
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-secondary/10 dark:border-border dark:text-white dark:focus:ring-accent"
                placeholder="How can we help you?"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-secondary/10 dark:border-border dark:text-white dark:focus:ring-accent"
                placeholder="Please provide as much detail as possible..."
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition shadow-sm dark:bg-primary/80 dark:hover:bg-primary/70"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="mt-20 bg-gray-50 rounded-2xl p-8 text-center dark:bg-card border border-gray-200 dark:border-border"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Prefer to Connect Another Way?
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          We're here to help through multiple channels. Reach out through your preferred method.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition dark:bg-primary/80 dark:hover:bg-primary/70">
            Schedule a Call
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            Live Chat
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;