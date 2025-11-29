import { motion } from "framer-motion";
import { Building, User, Building2, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const exampleAgreements: Record<string, string[]> = {
  enterprise: [
    "MoA / LLP Agreement",
    "Vendor / Client Contract",
    "Employment Agreement",
    "Service Agreement",
    "IP Assignment Agreement"
  ],
  individual: [
    "Rental / Lease Agreement",
    "Loan Agreement",
    "Sale Agreement (Property/Vehicle)",
    "Will / Inheritance Agreement",
    "Power of Attorney"
  ],
  institutional: [
    "Internship Agreement",
    "Offer Letter / Employment Contract",
    "Freelance Project Contract",
    "NDA (Non-Disclosure Agreement)"
  ],
};

const roles = [
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For businesses, corporations, and commercial entities seeking legal solutions.",
    icon: <Building className="w-8 h-8" />,
    color: "from-[#5D001E]/20 to-[#3E2723]/20 text-[#E3C598]",
    borderColor: "group-hover:border-[#E3C598]/50",
    glow: "group-hover:shadow-[#E3C598]/20",
    gradient: "from-[#5D001E] to-[#3E2723]"
  },
  {
    id: "individual",
    title: "Individual",
    description: "For individuals managing personal legal documents and agreements.",
    icon: <User className="w-8 h-8" />,
    color: "from-[#3E2723]/20 to-[#5D001E]/20 text-[#E3C598]",
    borderColor: "group-hover:border-[#E3C598]/50",
    glow: "group-hover:shadow-[#E3C598]/20",
    gradient: "from-[#3E2723] to-[#5D001E]"
  },
  {
    id: "institutional",
    title: "Institutional",
    description: "For educational institutions, NGOs, and organizations managing multiple agreements.",
    icon: <Building2 className="w-8 h-8" />,
    color: "from-[#5D001E]/20 to-[#3E2723]/20 text-[#E3C598]",
    borderColor: "group-hover:border-[#E3C598]/50",
    glow: "group-hover:shadow-[#E3C598]/20",
    gradient: "from-[#5D001E] to-[#3E2723]"
  }
];

const RoleSelection = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const handleSelect = (roleId: string) => {
    navigate(`/dashboard/agreement/summary`, { state: { role: roleId } });
  };

  const handleFlip = (roleId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#5D001E]/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#3E2723]/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Select Your <span className="text-[#E3C598]">Legal Persona</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the category that best represents you to access personalized legal tools and agreement templates.
            </p>
          </motion.div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="h-[500px] perspective-1000"
            >
              <div className={`relative h-full group rounded-2xl transition-all duration-500 ${role.glow} hover:shadow-2xl`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                <div className={`glass-card h-full p-8 rounded-2xl border border-gray-200 dark:border-white/10 ${role.borderColor} transition-colors duration-300 relative z-10 flex flex-col bg-white dark:bg-[#1a1a1a]/50 backdrop-blur-xl`}>

                  {/* Icon Header */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-6 shadow-lg ring-1 ring-[#E3C598]/20`}>
                    <div className="text-[#E3C598]">
                      {role.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white text-center mb-4">
                    {role.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-center mb-8 flex-grow">
                    {role.description}
                  </p>

                  {/* Flip Card Container */}
                  <div className="relative h-48 mb-8 perspective-1000 group-hover:scale-105 transition-transform duration-300">
                    <motion.div
                      className="w-full h-full relative preserve-3d transition-transform duration-700"
                      animate={{ rotateY: flippedCards[role.id] ? 180 : 0 }}
                    >
                      {/* Front */}
                      <div className="absolute inset-0 backface-hidden">
                        <div className="w-full h-full rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col items-center justify-center p-6 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer" onClick={() => handleFlip(role.id)}>
                          <p className="text-sm text-amber-700 dark:text-[#E3C598] mb-4 text-center font-medium">View Available Agreements</p>
                          <button
                            className="px-4 py-2 rounded-lg bg-amber-100 dark:bg-[#E3C598]/10 text-amber-800 dark:text-[#E3C598] text-sm font-medium transition-colors border border-amber-200 dark:border-[#E3C598]/20"
                          >
                            Show Examples
                          </button>
                        </div>
                      </div>

                      {/* Back */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <div className="w-full h-full rounded-xl bg-white/95 dark:bg-[#0a0a0a]/90 border border-gray-200 dark:border-[#E3C598]/20 p-4 backdrop-blur-md overflow-y-auto custom-scrollbar">
                          <ul className="space-y-2">
                            {exampleAgreements[role.id].map((doc, i) => (
                              <li key={i} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                <Check size={12} className="mt-1 text-amber-600 dark:text-[#E3C598] shrink-0" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => handleFlip(role.id)}
                            className="mt-4 w-full text-xs text-gray-500 hover:text-amber-600 dark:hover:text-[#E3C598] transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <button
                    className="w-full py-3 rounded-xl flex items-center justify-center gap-2 group/btn bg-gradient-to-r from-amber-100 to-amber-50 dark:from-[#5D001E] dark:to-[#3E2723] text-amber-900 dark:text-[#E3C598] font-semibold hover:shadow-lg hover:shadow-amber-500/20 dark:hover:shadow-[#5D001E]/20 transition-all border border-amber-200 dark:border-[#E3C598]/20"
                    onClick={() => handleSelect(role.id)}
                  >
                    Select {role.title}
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-panel p-8 rounded-2xl border border-gray-200 dark:border-white/10 text-center max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a]/50"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Not Sure Which Category Fits You?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Each category provides tailored legal tools and agreement templates. You can always change your selection later in your account settings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm font-medium">
            <button className="text-amber-700 dark:text-[#E3C598] hover:text-amber-800 dark:hover:text-[#E3C598]/80 transition-colors">
              Learn more about user categories
            </button>
            <span className="hidden sm:block text-gray-700">|</span>
            <button className="text-amber-700 dark:text-[#E3C598] hover:text-amber-800 dark:hover:text-[#E3C598]/80 transition-colors">
              Contact support for help
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;

