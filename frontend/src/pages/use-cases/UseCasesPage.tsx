import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Building, Shield, Zap, CheckCircle } from 'lucide-react';

const UseCasesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-28 px-4 md:px-20">
      {/* Header - Updating to match About page style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-accent mb-4">
          Perfect for Every Legal Need
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Whether you're a student, citizen, or business owner, LegalKlarity helps you understand and navigate legal documents with confidence.
        </p>
      </motion.div>

      {/* For Students Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <User className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-accent">For Students</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h3
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Navigate Your First Legal Documents
            </motion.h3>
            <motion.p
              className="text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Starting your career? Understand job offers, internship agreements, and rental contracts before you sign.
            </motion.p>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Job Offer Analysis
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand salary structures, benefits, probation periods, and termination clauses in your employment contract.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Rental Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Decode security deposits, maintenance responsibilities, and lease termination conditions in rental contracts.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Internship Contracts
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Review stipend terms, work expectations, and intellectual property clauses in internship agreements.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Freelance Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand payment terms, project scope, revision limits, and ownership rights in freelance contracts.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Educational Loan Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Analyze interest rates, repayment schedules, grace periods, and collateral requirements in education loans.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="bg-primary/5 rounded-xl p-6 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20 mb-6">
              <div className="flex items-start mb-4">
                <div className="text-4xl font-bold text-primary dark:text-accent mr-4">"</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    LegalKlarity helped me understand that my job offer had a 6-month notice period, which was unusually long. I negotiated it down to 2 months before signing!
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 dark:bg-primary/30 dark:text-accent">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Ananya M.</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Computer Science Graduate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20">
              <div className="flex items-start mb-4">
                <div className="text-4xl font-bold text-primary dark:text-accent mr-4">"</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    I was about to sign my internship agreement when LegalKlarity flagged an IP clause that would have given my company rights to all my future projects, even personal ones. I had them remove that clause before signing!
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 dark:bg-primary/30 dark:text-accent">
                      R
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Rohan P.</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Engineering Student</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm mt-6 dark:bg-card border border-gray-200 dark:border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Student Legal Protection Metrics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-accent">85%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Better Offers</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">After Negotiation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-accent">₹75K</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Average Savings</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Per Contract</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary dark:text-accent">4x</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Faster Review</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Than Manual</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* For Citizens Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <Users className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-accent">For Citizens</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h3
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Protect Yourself in Daily Transactions
            </motion.h3>
            <motion.p
              className="text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              From loan agreements to service contracts, ensure you're not signing anything that could harm your interests.
            </motion.p>

            <motion.div
              className="bg-primary/5 rounded-xl p-6 mb-8 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">Risk Prevention</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average savings: ₹25,000 per contract</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg text-center dark:bg-card">
                  <div className="text-2xl font-bold text-green-500">✓</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Hidden Fees Detected</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avoided</div>
                </div>

                <div className="bg-white p-3 rounded-lg text-center dark:bg-card">
                  <div className="text-2xl font-bold text-yellow-500">!</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">High Interest Rate</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Flagged</div>
                </div>

                <div className="bg-white p-3 rounded-lg text-center dark:bg-card">
                  <div className="text-2xl font-bold text-red-500">⚠</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Unfair Penalty Clause</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">High Risk</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Loan Contracts
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand interest rates, processing fees, prepayment penalties, and default consequences in loan agreements.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Service Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Review terms for insurance policies, telecom services, and subscription contracts before committing.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Property Documents
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Verify property titles, sale deeds, and registration documents for compliance and authenticity.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Insurance Policies
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Decode exclusions, deductibles, claim procedures, and renewal terms in health, life, and general insurance policies.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Utility Connection Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand deposit amounts, connection charges, billing cycles, and disconnection policies for electricity, water, and gas.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div className="bg-primary/5 rounded-xl p-6 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20 mb-6">
              <div className="flex items-start mb-4">
                <div className="text-4xl font-bold text-primary dark:text-accent mr-4">"</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    LegalKlarity flagged a compound interest clause in my personal loan agreement that would have doubled my debt in just 3 years if I defaulted. I switched to a better loan option and saved lakhs!
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 dark:bg-primary/30 dark:text-accent">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Meera V.</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Software Professional</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20">
              <div className="flex items-start mb-4">
                <div className="text-4xl font-bold text-primary dark:text-accent mr-4">"</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    I almost signed a 5-year gym membership contract with a ₹50,000 penalty for early cancellation. LegalKlarity highlighted this clause and suggested negotiating a monthly payment option instead. I saved ₹45,000!
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 dark:bg-primary/30 dark:text-accent">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Arjun K.</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Marketing Manager</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm mt-6 dark:bg-card border border-gray-200 dark:border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Citizen Legal Protection Dashboard</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">92%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Risk Clauses</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Identified</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">₹2.1L</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Average Savings</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Per User</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">3.2x</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Faster</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Decision Making</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">78%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Better Terms</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Negotiated</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* For Business Owners Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.7 }}
        className="mb-20"
      >
        <div className="flex items-center mb-8">
          <Building className="h-10 w-10 text-primary dark:text-accent mr-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-accent">For Business Owners</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <motion.h3
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.9 }}
            >
              Secure Your Business Interests
            </motion.h3>
            <motion.p
              className="text-gray-600 dark:text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              Ensure vendor contracts, partnership agreements, and compliance documents protect your business and meet regulatory requirements.
            </motion.p>

            <motion.div
              className="bg-primary/5 rounded-xl p-6 mb-8 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.1 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary dark:text-accent mb-2">Business Impact</div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-4 rounded-lg dark:bg-card">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">₹2.5L</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Savings</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg dark:bg-card">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">75%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Faster Review</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Vendor Contracts
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Analyze payment terms, delivery schedules, quality standards, and liability clauses in supplier agreements.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Partnership Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Review profit sharing, decision-making authority, and exit clauses in business partnership documents.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Compliance Documents
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Ensure MOAs, AOAs, and regulatory filings meet legal requirements and protect your business interests.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Employee Contracts
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Review confidentiality clauses, non-compete terms, termination conditions, and benefit structures in employment agreements.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 dark:text-accent" />
                  Lease Agreements
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand rent escalation clauses, maintenance responsibilities, and renewal options in commercial property leases.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >
            <div className="bg-primary/5 rounded-xl p-6 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20 mb-6">
              <div className="flex items-start mb-4">
                <div className="text-4xl font-bold text-primary dark:text-accent mr-4">"</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    LegalKlarity identified a liability clause that could have cost us lakhs. We renegotiated and saved our business from potential disaster.
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 dark:bg-primary/30 dark:text-accent">
                      V
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Vikram S.</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Manufacturing Business Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 dark:bg-secondary/10 border border-primary/10 dark:border-primary/20">
              <div className="flex items-start mb-4">
                <div className="text-4xl font-bold text-primary dark:text-accent mr-4">"</div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    Our startup was about to sign a vendor contract with a 90-day payment term that would have severely impacted our cash flow. LegalKlarity helped us negotiate it down to 30 days, preserving our working capital!
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 dark:bg-primary/30 dark:text-accent">
                      N
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">Neha R.</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tech Startup Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm mt-6 dark:bg-card border border-gray-200 dark:border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Business Legal Protection Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">₹4.2L</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Average Savings</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Per Contract</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">82%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Risk Clauses</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Identified</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">65%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Better Terms</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Negotiated</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg text-center dark:bg-secondary/10">
                  <div className="text-lg font-bold text-primary dark:text-accent">3.8x</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Faster Review</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Than Manual</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="bg-gray-50 rounded-2xl p-8 text-center dark:bg-card border border-gray-200 dark:border-border"
      >
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.6 }}
        >
          Ready to Protect Your Interests?
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.7 }}
        >
          Join thousands of users who trust LegalKlarity to understand their legal documents and make informed decisions.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
            Start Your Free Trial
          </button>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Contact Sales
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UseCasesPage;