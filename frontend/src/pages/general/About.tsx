import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Target, Eye, Users, Award, ArrowRight } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground py-28 px-4 md:px-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary dark:text-accent mb-6">
          Democratizing Legal Access in India
        </h1>
        <p className="text-lg font-body text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          We believe everyone deserves to understand the legal documents they sign. Our AI-powered platform makes complex legal language accessible to all.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-16 bg-white dark:bg-card shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-border"
      >
        <div className="flex items-center mb-4">
          <Target className="w-8 h-8 text-primary dark:text-accent mr-3" />
          <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-accent">Our Mission</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 font-body leading-relaxed">
          To empower every individual and business in India with the tools and knowledge needed to understand legal documents, make informed decisions, and protect their interests in an increasingly complex legal landscape.
        </p>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-16 bg-white dark:bg-card shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-border"
      >
        <div className="flex items-center mb-4">
          <Eye className="w-8 h-8 text-primary dark:text-accent mr-3" />
          <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-accent">Our Vision</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 font-body leading-relaxed">
          A future where legal literacy is universal, where no one signs a document they don't understand, and where AI technology bridges the gap between complex legal language and everyday comprehension.
        </p>
      </motion.div>

      {/* Why LegalKlarity Exists Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-heading font-bold text-center text-primary dark:text-accent mb-12">
          Why LegalKlarity Exists
        </h2>
        <p className="text-lg font-body text-gray-600 dark:text-gray-300 text-center mb-12 max-w-4xl mx-auto">
          The legal complexity problem affects millions of people across India every day.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-5xl font-bold text-primary dark:text-accent mb-2">80%</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">of People</div>
            <p className="text-gray-600 dark:text-gray-300">Don't fully understand the contracts they sign, leading to costly mistakes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-5xl font-bold text-primary dark:text-accent mb-2">₹50K+</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Average Loss</div>
            <p className="text-gray-600 dark:text-gray-300">Per person due to unfavorable contract terms they didn't understand</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-5xl font-bold text-primary dark:text-accent mb-2">3 Hours</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Wasted Daily</div>
            <p className="text-gray-600 dark:text-gray-300">Trying to decode legal language that could be explained simply</p>
          </motion.div>
        </div>
      </motion.div>

      {/* The Traditional Approach Isn't Working Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-4xl mx-auto mb-16 bg-white dark:bg-card shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-border"
      >
        <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-accent mb-6">The Traditional Approach Isn't Working</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-secondary/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Legal Consultation Barriers:</h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2">
              <li>• High costs (₹5,000-₹25,000 per consultation)</li>
              <li>• Limited availability in tier-2/3 cities</li>
              <li>• Time-consuming appointment processes</li>
              <li>• Language barriers with English-only services</li>
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-secondary/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Current Solutions Fall Short:</h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Generic legal advice doesn't address specific documents</li>
              <li>• Online resources are fragmented and unreliable</li>
              <li>• No real-time analysis or risk assessment</li>
              <li>• Lack of personalized guidance for different user types</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Our AI-Powered Solution Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mb-16 text-center"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-gray-100 dark:bg-secondary/20 border border-primary text-primary dark:text-accent font-semibold text-xs tracking-wide uppercase shadow-sm mb-6">
          AI-Powered Legal Document Demystification
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-accent mb-6">
          Our AI-Powered Solution
        </h2>
        <p className="text-lg font-body text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
          LegalKlarity combines cutting-edge AI technology with legal expertise to make legal documents accessible to everyone.
        </p>
      </motion.div>

      {/* How We're Different Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-accent mb-12">
          How We're Different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-4xl font-bold text-primary dark:text-accent mb-3">1</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Instant Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Get results in seconds, not days or weeks</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-4xl font-bold text-primary dark:text-accent mb-3">2</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Affordable Access</h3>
            <p className="text-gray-600 dark:text-gray-300">99% cheaper than traditional legal consultation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-4xl font-bold text-primary dark:text-accent mb-3">3</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personalized Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">Tailored analysis based on your role and needs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-4xl font-bold text-primary dark:text-accent mb-3">4</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Multilingual Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Available in Hindi, English, and regional languages</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Impact Metrics Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-accent mb-12">
          Impact Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time Saved</div>
            <div className="text-3xl font-bold text-primary dark:text-accent mb-1">80% faster</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Cost Reduction</div>
            <div className="text-3xl font-bold text-primary dark:text-accent mb-1">99% cheaper</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Risk Prevention</div>
            <div className="text-3xl font-bold text-primary dark:text-accent mb-1">60% reduction</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Satisfaction</div>
            <div className="text-3xl font-bold text-primary dark:text-accent mb-1">4.8/5 rating</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Meet Our Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.0 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-accent mb-12">
          Meet Our Team
        </h2>
        <p className="text-lg font-body text-gray-600 dark:text-gray-300 text-center mb-12 max-w-4xl mx-auto">
          A diverse team of technologists, legal experts, and user experience designers working together to democratize legal access.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">KT</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Karan Tripathi</h3>
            <p className="text-primary dark:text-accent mb-2">Founder & CEO</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Visionary leader with a passion for making legal services accessible to everyone in India.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">SS</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Saurav Sankar</h3>
            <p className="text-primary dark:text-accent mb-2">Co-Founder</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Strategic thinker focused on building scalable solutions for legal document analysis.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">TJ</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Tejash</h3>
            <p className="text-primary dark:text-accent mb-2">CTO</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Technical expert driving innovation in AI-powered legal document processing.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">DV</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Divya</h3>
            <p className="text-primary dark:text-accent mb-2">Team Member</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Dedicated professional contributing to frontend development and user experience.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center text-primary dark:text-accent font-bold text-xl">SH</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Shruthi</h3>
            <p className="text-primary dark:text-accent mb-2">Team Member</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Valuable contributor to backend systems and database management.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Recognition & Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.0 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-accent mb-12">
          Recognition & Achievements
        </h2>
        <p className="text-lg font-body text-gray-600 dark:text-gray-300 text-center mb-12 max-w-4xl mx-auto">
          Our work in democratizing legal access has been recognized by industry leaders and innovation awards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <Award className="w-12 h-12 text-primary dark:text-accent mx-auto mb-4" />
            <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">Imaginary Hackathon 🎭</div>
            <p className="text-gray-600 dark:text-gray-300">Winner - Most Creative Demo 2024</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <Users className="w-12 h-12 text-primary dark:text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10,000+</div>
            <p className="text-gray-600 dark:text-gray-300">Documents analyzed and counting</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <BookOpen className="w-12 h-12 text-primary dark:text-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+ Cities</div>
            <p className="text-gray-600 dark:text-gray-300">Across India trust LegalKlarity</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.5 }}
            className="bg-white dark:bg-card rounded-2xl p-6 border border-gray-200 dark:border-border text-center shadow-xl"
          >
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">4.8/5</div>
            <p className="text-gray-600 dark:text-gray-300">Average user satisfaction rating</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 3.5 }}
        className="max-w-4xl mx-auto mt-20 text-center bg-white dark:bg-card rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-border"
      >
        <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-accent mb-4">
          Join Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 font-body text-lg mb-8 leading-relaxed">
          Help us democratize legal access for everyone. Start analyzing your legal documents today and be part of the change.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-6 sm:items-center">
          <Button
            onClick={() => navigate("/dashboard/role-selection")}
            className="bg-primary text-white hover:bg-primary/90 font-bold px-8 py-3 rounded-full shadow-lg transition text-lg tracking-wide border-2 border-primary inline-flex items-center gap-2 justify-center mb-4 sm:mb-0"
          >
            <span className="text-white">Get Started Free</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Button>
          <Button
            onClick={() => navigate("/contact")}
            className="bg-transparent text-gray-900 dark:text-accent hover:bg-primary/10 font-bold px-8 py-3 rounded-full shadow-lg transition text-lg tracking-wide border-2 border-gray-900 dark:border-accent inline-flex items-center gap-2 justify-center"
          >
            <span className="text-gray-900 dark:text-accent">Contact Us</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;