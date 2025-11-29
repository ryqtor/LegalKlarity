import React, { useState } from "react";
import { Search, Scale, BookOpen, ArrowRight, Loader2, Gavel } from "lucide-react";
import { caseSummaryAsync, searchCaseAsync } from "../../../store/caseSlice";
import { useAppDispatch } from "../../../hooks/redux";
import { toast } from "react-toastify";
import CaseDetail from "./CaseDetail";
import { motion } from "framer-motion";

function Spinner({ loading, detailLoading }: { loading: boolean; detailLoading: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-4">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
            </div>
            <p className="text-muted-foreground font-medium">
                {loading ? "Searching cases..." : detailLoading ? "Loading case summary..." : "Processing..."}
            </p>
        </div>
    );
}

function stripBoldTags(text: string) {
    return text.replace(/<\/?b>/g, "");
}

const CasesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCase, setSelectedCase] = useState<any | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    const handleSearch = async (searchQuery?: string) => {
        setLoading(true);
        setSelectedCase(null); // Hide detail on new search
        const queryToUse = searchQuery || query;
        if (!queryToUse || queryToUse.trim() === "") {
            setLoading(false);
            toast.error("Please enter a search query.");
            return;
        }
        try {
            const response: any = await dispatch(searchCaseAsync(queryToUse)).unwrap();

            if (response?.statusCode === 200 || response?.success === true) {
                setResults(response.data);
                setLoading(false);
                toast.success(response.message || "Search completed successfully!");
            } else {
                toast.error(response?.message || "Failed to fetch search results");
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Error fetching search results.");
        }
        setLoading(false);
    };

    const handleCaseSummary = async (tid: string) => {
        setDetailLoading(true);
        try {
            if (!tid) {
                toast.error("Invalid case ID.");
                setDetailLoading(false);
                return;
            }
            const response: any = await dispatch(caseSummaryAsync(tid)).unwrap();
            if (response?.statusCode === 200 || response?.success === true) {
                setSelectedCase(response.data);
                toast.success(response.message || "Case summary fetched successfully!");
                setDetailLoading(false);
            } else {
                toast.error(response?.message || "Failed to fetch case summary");
                setDetailLoading(false);
            }
        } catch (error) {
            toast.error("Error fetching case summary.");
        } finally {
            setDetailLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen pt-12 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
            {/* Background Elements matching RoleSelection */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#5D001E]/10 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#3E2723]/10 blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5D001E] to-[#3E2723] text-[#E3C598] shadow-xl shadow-[#5D001E]/20 border border-[#E3C598]/20">
                            <Scale className="h-10 w-10" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Legal Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3C598] to-[#D4A017]">Explorer</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Search and analyze landmark Indian legal cases with <span className="text-[#E3C598] font-medium">AI-powered insights</span>
                    </p>
                </motion.div>

                {/* Search Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative z-10 mb-16 max-w-3xl mx-auto"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#5D001E] via-[#E3C598] to-[#3E2723] rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
                        <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-[#E3C598]/20">
                            <div className="flex items-center p-2">
                                <div className="pl-4 pr-3 text-gray-400 dark:text-[#E3C598]/50">
                                    <Search className="h-6 w-6" />
                                </div>
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search by case title, citation, or legal topic..."
                                    className="flex-1 p-4 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                                />
                                <button
                                    onClick={() => handleSearch()}
                                    disabled={loading}
                                    className="ml-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#5D001E] to-[#3E2723] text-[#E3C598] font-medium hover:shadow-lg hover:shadow-[#5D001E]/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin h-5 w-5" />
                                    ) : (
                                        "Search"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 py-2">Popular:</span>
                        {['Constitutional Law', 'Criminal Law', 'Civil Law', 'Corporate Law'].map((topic) => (
                            <button
                                key={topic}
                                onClick={() => handleSearch(topic)}
                                className="px-4 py-1.5 rounded-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#E3C598]/20 text-sm text-gray-600 dark:text-gray-300 hover:border-[#E3C598] hover:text-[#E3C598] transition-colors"
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Results or Detail */}
                {loading || detailLoading ? (
                    <div className="bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-sm p-12 rounded-3xl border border-gray-200 dark:border-[#E3C598]/10 text-center">
                        <Spinner loading={loading} detailLoading={detailLoading} />
                    </div>
                ) : selectedCase ? (
                    <CaseDetail caseItem={selectedCase} />
                ) : (
                    <div className="space-y-8">
                        {results.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="flex items-center mb-8 px-2">
                                    <div className="h-8 w-1 bg-[#E3C598] rounded-full mr-4"></div>
                                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                                        Search Results <span className="text-gray-500 dark:text-gray-400 text-lg font-normal ml-2">({results.length} cases found)</span>
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {results.map((caseItem, index) => (
                                        <motion.div
                                            key={caseItem.tid}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group relative bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-gray-200 dark:border-[#E3C598]/10 hover:border-[#E3C598]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#5D001E]/5 flex flex-col h-full"
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5D001E] to-[#3E2723] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>

                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-[#E3C598]/10 text-[#8B4513] dark:text-[#E3C598]">
                                                    <Gavel size={20} />
                                                </div>
                                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                                                    {caseItem.publishdate}
                                                </span>
                                            </div>

                                            <h3 className="font-display font-bold text-gray-900 dark:text-gray-100 text-lg mb-3 line-clamp-2 group-hover:text-[#E3C598] transition-colors">
                                                {stripBoldTags(caseItem.title)}
                                            </h3>

                                            <div className="space-y-3 mb-6 flex-grow">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3C598]" />
                                                    {caseItem.docsource}
                                                </p>
                                                <div className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-xs font-mono text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                                                    {caseItem.citation}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleCaseSummary(caseItem.tid)}
                                                disabled={detailLoading}
                                                className="w-full py-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-[#5D001E] dark:hover:bg-[#5D001E] text-gray-700 dark:text-gray-300 hover:text-white border border-gray-200 dark:border-white/10 hover:border-[#5D001E] text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                View Analysis
                                                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            !loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-sm p-16 rounded-3xl border border-gray-200 dark:border-[#E3C598]/10 text-center max-w-2xl mx-auto"
                                >
                                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-amber-50 dark:bg-[#E3C598]/10 text-[#8B4513] dark:text-[#E3C598] mb-8">
                                        <Scale className="h-12 w-12" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">Start Your Legal Research</h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                        Enter a legal topic, case name, or citation above to explore landmark Indian court decisions with <span className="text-[#8B4513] dark:text-[#E3C598] font-medium">AI-powered insights</span>.
                                    </p>
                                </motion.div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CasesList;

