import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Scale, HelpCircle, FileText, Search, Download, ExternalLink } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for each section
  const legalGuidesRef = useRef<HTMLDivElement | null>(null);
  const caseLawsRef = useRef<HTMLDivElement | null>(null);
  const faqsRef = useRef<HTMLDivElement | null>(null);

  // Legal Guides Data
  const legalGuides = [
    {
      category: "Employment",
      title: "Understanding Employment Contracts",
      description: "Complete guide to job offer terms, benefits, and clauses",
      readTime: "15 min read",
      icon: BookOpen
    },
    {
      category: "Property",
      title: "Rental Agreement Essentials",
      description: "What to look for in rental contracts and lease agreements",
      readTime: "12 min read",
      icon: BookOpen
    },
    {
      category: "Finance",
      title: "Loan Agreement Decoded",
      description: "Understanding interest rates, fees, and repayment terms",
      readTime: "18 min read",
      icon: BookOpen
    },
    {
      category: "Business",
      title: "Partnership Agreement Guide",
      description: "Key clauses for business partnerships and joint ventures",
      readTime: "20 min read",
      icon: BookOpen
    },
    {
      category: "Compliance",
      title: "Government Procedures",
      description: "Step-by-step guide for common government procedures",
      readTime: "25 min read",
      icon: BookOpen
    },
    {
      category: "Consumer",
      title: "Consumer Rights & Protection",
      description: "Know your rights in service agreements and purchases",
      readTime: "14 min read",
      icon: BookOpen
    }
  ];

  // Case Laws Data
  const caseLaws = [
    {
      court: "Supreme Court",
      title: "Employment Contract Termination",
      description: "Landmark ruling on unfair termination clauses in employment contracts",
      caseName: "ABC Corp vs. Employee Union (2023)",
      summary: "Court ruled that termination clauses must provide reasonable notice periods and cannot be one-sided in favor of employers."
    },
    {
      court: "High Court",
      title: "Rental Agreement Disputes",
      description: "Important precedent on security deposit and maintenance responsibilities",
      caseName: "Landlord vs. Tenant Rights (2023)",
      summary: "Established guidelines for fair security deposit amounts and maintenance responsibility allocation in rental agreements."
    }
  ];

  // FAQs Data
  const faqs = [
    {
      question: "Is my data safe with LegalKlarity?",
      answer: "Yes, we use enterprise-grade encryption and never store your documents permanently. All analysis is done securely and your data is deleted after processing."
    },
    {
      question: "How accurate is the AI analysis?",
      answer: "Our AI has a 95% accuracy rate and is trained on thousands of legal documents. However, we always recommend consulting a lawyer for complex legal matters."
    },
    {
      question: "What document formats are supported?",
      answer: "We support PDF, DOC, DOCX, and image formats (JPG, PNG). Our OCR technology can extract text from scanned documents as well."
    },
    {
      question: "Can I use this for legal advice?",
      answer: "LegalKlarity provides analysis and insights, but not legal advice. For legal decisions, always consult with a qualified lawyer."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! You can analyze up to 3 documents for free. No credit card required to get started."
    },
    {
      question: "How long does analysis take?",
      answer: "Most documents are analyzed within 30-60 seconds. Complex documents may take up to 2-3 minutes for complete analysis."
    }
  ];

  const filteredGuides = legalGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCaseLaws = caseLaws.filter(caseLaw =>
    caseLaw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseLaw.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseLaw.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    caseLaw.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          Legal Resources & Knowledge Hub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Access comprehensive legal guides, case laws, and expert insights to enhance your understanding of legal documents and procedures.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary dark:bg-card dark:border-border dark:text-white dark:placeholder-gray-400"
            placeholder="Search legal guides, case laws, or ask a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Resource Categories */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
      >
        {/* Legal Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
        >
          <div className="flex items-center mb-6">
            <BookOpen className="h-8 w-8 text-primary mr-3 dark:text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Legal Guides</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Step-by-step guides for common legal procedures. Comprehensive guides covering everything from contract basics to government procedure navigation.
          </p>
          <button
            onClick={() => scrollToSection(legalGuidesRef)}
            className="text-primary font-medium hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition"
          >
            Browse Guides →
          </button>
        </motion.div>

        {/* Case Laws & Precedents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
        >
          <div className="flex items-center mb-6">
            <Scale className="h-8 w-8 text-primary mr-3 dark:text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Case Laws & Precedents</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Searchable database of relevant legal precedents. Access court rulings and legal precedents to understand how similar cases have been decided.
          </p>
          <button
            onClick={() => scrollToSection(caseLawsRef)}
            className="text-primary font-medium hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition"
          >
            Search Cases →
          </button>
        </motion.div>

        {/* FAQs & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
        >
          <div className="flex items-center mb-6">
            <HelpCircle className="h-8 w-8 text-primary mr-3 dark:text-accent" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">FAQs & Support</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Common questions and expert answers. Find answers to frequently asked questions about legal documents and LegalKlarity features.
          </p>
          <button
            onClick={() => scrollToSection(faqsRef)}
            className="text-primary font-medium hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition"
          >
            View FAQs →
          </button>
        </motion.div>
      </motion.div>

      {/* Legal Guides Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        ref={legalGuidesRef}
        id="legal-guides"
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <BookOpen className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-accent">Legal Guides</h2>
        </div>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Practical guides to help you navigate common legal situations with confidence.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
            >
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 dark:bg-primary/20 dark:text-accent">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3 dark:bg-primary/20 dark:text-accent">
                    {guide.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-2">{guide.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{guide.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{guide.readTime}</span>
                <button className="flex items-center text-primary font-medium hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Case Laws & Precedents Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        ref={caseLawsRef}
        id="case-laws"
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <Scale className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-accent">Case Laws & Precedents</h2>
        </div>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Search through relevant court rulings and legal precedents to understand how similar cases have been decided.
        </motion.p>

        <div className="space-y-8">
          {filteredCaseLaws.map((caseLaw, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
            >
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-6 dark:bg-primary/20 dark:text-accent">
                  <Scale className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mr-3 mb-2 dark:bg-primary/20 dark:text-accent">
                      {caseLaw.court}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{caseLaw.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{caseLaw.description}</p>
                  <p className="font-medium text-gray-900 dark:text-white mb-4">{caseLaw.caseName}</p>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{caseLaw.summary}"</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="flex items-center text-primary font-medium hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition">
                  Read Full Case
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Frequently Asked Questions Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        ref={faqsRef}
        id="faqs"
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <HelpCircle className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-accent">Frequently Asked Questions</h2>
        </div>
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Find answers to common questions about legal documents and LegalKlarity.
        </motion.p>

        <div className="space-y-8">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              className="bg-white rounded-xl p-8 hover:shadow-lg transition dark:bg-card dark:hover:shadow-slate-800/50 border border-gray-200 dark:border-border"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-card border border-gray-200 dark:border-border"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        >
          Ready to Transform Your Legal Understanding?
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          Join thousands of users who trust LegalKlarity to decode complex legal language and protect their interests.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition dark:bg-primary/80 dark:hover:bg-primary/70">
            Start Free Trial
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            Contact Support
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;