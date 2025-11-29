
import { useState } from "react";
import { ChevronDown, ChevronUp, Printer, Share2 } from "lucide-react";

export default function CaseSummary({ caseItem }: { caseItem: any }) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    facts: true,
    issues: true,
    arguments: true,
    reasoning: true,
    decision: true,
    principles: true
  });

  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading case details...</p>
      </div>
    );
  }

  // Helper functions to handle different data formats
  const formatListItems = (items: any): string[] => {
    if (Array.isArray(items)) {
      return items;
    } else if (typeof items === 'string') {
      return items.split('\n').filter(item => item.trim() !== '');
    } else if (items && typeof items === 'object') {
      return Object.values(items);
    }
    return [];
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (title: string, content: any, sectionKey: string) => {
    const items = formatListItems(content);

    if ((!content || (Array.isArray(items) && items.length === 0)) && typeof content !== 'string') {
      return null;
    }

    return (
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {expandedSections[sectionKey] ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {expandedSections[sectionKey] && (
          <div className="p-4 border-t border-gray-200 dark:border-white/10">
            {typeof content === 'string' ? (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{content}</p>
            ) : items.length > 0 ? (
              <ul className="space-y-2">
                {items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-primary mr-3"></span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No information available</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderArgumentsSection = () => {
    const petitionerArgs = formatListItems(caseItem.arguments?.petitioner || []);
    const respondentArgs = formatListItems(caseItem.arguments?.respondent || []);

    if (petitionerArgs.length === 0 && respondentArgs.length === 0) {
      return null;
    }

    return (
      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('arguments')}
          className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Arguments</h3>
          {expandedSections.arguments ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {expandedSections.arguments && (
          <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-6">
            {petitionerArgs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 border-l-4 border-blue-500 pl-2">Petitioner's Arguments</h4>
                <ul className="space-y-2">
                  {petitionerArgs.map((arg: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3"></span>
                      <span className="text-gray-700 dark:text-gray-300">{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {respondentArgs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 border-l-4 border-red-500 pl-2">Respondent's Arguments</h4>
                <ul className="space-y-2">
                  {respondentArgs.map((arg: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-red-500 mr-3"></span>
                      <span className="text-gray-700 dark:text-gray-300">{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Premium Header Card */}
      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-white/10 mb-10">
        {/* Decorative Top Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#5D001E] via-[#E3C598] to-[#5D001E]"></div>

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#E3C598]/10 border border-amber-100 dark:border-[#E3C598]/20 text-amber-800 dark:text-[#E3C598] text-xs font-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Supreme Court Judgment
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {caseItem.caseTitle || 'Case Title'}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-200">{caseItem.court || 'Court'}</span>
                </div>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <div className="font-mono text-xs bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                  {caseItem.citation || 'Citation'}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="p-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" title="Print">
                <Printer className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors" title="Share">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Parties Section */}
          {caseItem.parties && (
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative pl-4 border-l-2 border-emerald-500/50">
                  <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Petitioner</h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {typeof caseItem.parties === 'object' ? caseItem.parties.petitioner : 'Petitioner Name'}
                  </p>
                </div>
                <div className="relative pl-4 border-l-2 border-red-500/50">
                  <h3 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Respondent</h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {typeof caseItem.parties === 'object' ? caseItem.parties.respondent : 'Respondent Name'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {renderSection("Facts of the Case", caseItem.facts, "facts")}
        {renderSection("Key Legal Issues", caseItem.issues, "issues")}
        {renderArgumentsSection()}
        {renderSection("Court's Reasoning", caseItem.reasoning, "reasoning")}
        {renderSection("Final Decision", caseItem.decision, "decision")}
        {renderSection("Legal Principles Established", caseItem.principles, "principles")}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 text-xs text-gray-500 dark:text-gray-400">
          <span>AI-Generated Summary</span>
          <span>•</span>
          <span>Powered by IndianKanoon.org</span>
        </div>
      </div>
    </div>
  );
}
