import React, { useState, useRef } from "react";
import { Upload, FileText, Loader2, Key, ClipboardList, AlertTriangle, Lightbulb, Users, Gavel, Calendar, FileQuestion, ShieldCheck, Rocket, Download, Printer, Share2, ArrowRight, Building2, Landmark } from "lucide-react";
import { jsPDF, GState } from "jspdf";
import { motion } from "framer-motion";
import api from "../../../utils/baseApi";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";

const LegalDocumentAnalyzer = () => {
  const location = useLocation();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [targetGroup, setTargetGroup] = useState(location.state?.role || "individual");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get authenticated user from Redux store
  const { user } = useAppSelector((state) => state.auth);

  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size;

      // Validate file type
      if (!fileType.match("application/pdf") &&
        !fileType.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        alert("Invalid file type: Please upload a PDF or DOCX file.");
        return;
      }

      // Validate file size (limit to 200MB)
      if (fileSize > 200 * 1024 * 1024) {
        alert("File too large: Please upload a file smaller than 200MB.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uid', user?.uid || 'test-user-id'); // Use actual user ID or fallback to test ID
      formData.append('targetGroup', targetGroup);
      formData.append('language', 'en');

      // Call the backend API for enhanced agreement analysis
      const response = await api.post('/api/v1/agreements/enhanced-analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("API Response:", response.data);

      // Access the data property from the ApiResponse object
      const responseData = response.data.data || response.data;

      setAnalysis({
        analysis: responseData.analysis,
        filename: responseData.filename,
        timestamp: responseData.timestamp || new Date().toISOString()
      });

      console.log("Analysis complete!");
      setIsAnalyzing(false);
    } catch (error: any) {
      console.error("Analysis error:", error);
      alert("Analysis failed: " + (error.message || "Failed to analyze the document. Please try again."));
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Helper function to render key terms
  const renderKeyTerms = (terms: any[] | undefined) => {
    if (!terms || terms.length === 0) {
      return <p className="text-muted-foreground">No key terms defined.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {terms.map((term: any, index: number) => {
          // Handle both string format and object format
          let key = "";
          let definition = "";

          if (typeof term === 'string') {
            [key, definition] = term.includes(": ") ? term.split(": ") : [term, ""];
          } else {
            key = term.term || term.key || "";
            definition = term.definition || term.value || "";
          }

          return (
            <div key={index} className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 hover:border-amber-500/30 dark:hover:border-[#E3C598]/30 transition-colors">
              <h4 className="font-semibold text-amber-700 dark:text-[#E3C598]">{key}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{definition}</p>
            </div>
          );
        })}
      </div>
    );
  };

  // Helper function to render clauses (for enterprise target group and main clauses)
  const renderClauses = (clauses: any[] | undefined) => {
    if (!clauses || clauses.length === 0) {
      return <p className="text-muted-foreground">No clauses available.</p>;
    }

    return (
      <div className="space-y-4">
        {clauses.map((clause: any, index: number) => (
          <div key={index} className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-gray-200 dark:border-white/10 p-4 hover:border-amber-500/30 dark:hover:border-[#E3C598]/30 transition-colors">
            <h4 className="font-semibold text-amber-700 dark:text-[#E3C598]">{clause.title || clause.name}</h4>
            {(clause.explanation || clause.description) && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{clause.explanation || clause.description}</p>
            )}
            {clause.risk && clause.risk !== "N/A" && (
              <div className="mt-2 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-500 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Risk:</strong> {clause.risk}</span>
              </div>
            )}
            {clause.improvement && clause.improvement !== "N/A" && (
              <div className="mt-2 flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-amber-600 dark:text-[#E3C598] mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300"><strong>Improvement:</strong> {clause.improvement}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Helper function to render list items
  const renderListItems = (items: any[] | undefined, icon?: React.ReactNode) => {
    if (!items || items.length === 0) {
      return <p className="text-muted-foreground">No information available.</p>;
    }

    return (
      <ul className="space-y-2">
        {items.map((item: any, index: number) => (
          <li key={index} className="flex items-start gap-2">
            {icon && <span className="mt-1 flex-shrink-0">{icon}</span>}
            <span>
              {typeof item === 'string' ? (
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              ) : item?.name && item?.role ? (
                <span className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.role}</span>
                </span>
              ) : item?.date && item?.event ? (
                <span className="flex flex-col">
                  <span className="font-medium text-amber-700 dark:text-[#E3C598]">{item.date}</span>
                  <span className="text-gray-600 dark:text-gray-300">{item.event}</span>
                </span>
              ) : item?.risk && item?.severity ? (
                <span className="flex flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{item.risk}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${item.severity.toLowerCase() === 'high' ? 'border-red-500 text-red-600 bg-red-50 dark:text-red-500 dark:bg-red-500/10' : item.severity.toLowerCase() === 'medium' ? 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:text-yellow-500 dark:bg-yellow-500/10' : 'border-green-500 text-green-600 bg-green-50 dark:text-green-500 dark:bg-green-500/10'}`}>
                      {item.severity}
                    </span>
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</span>
                </span>
              ) : item?.party && item?.responsibility ? (
                <span className="flex flex-col">
                  <span className="font-medium text-amber-700 dark:text-[#E3C598]">{item.party}</span>
                  <span className="text-gray-600 dark:text-gray-300">{item.responsibility}</span>
                </span>
              ) : item?.issue || item?.regulation ? (
                <span className="flex flex-col gap-1">
                  <span className="font-medium text-gray-900 dark:text-white">{item.issue || "Compliance Note"}</span>
                  {item.regulation && <span className="text-xs text-amber-600 dark:text-[#E3C598]">{item.regulation}</span>}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</span>
                </span>
              ) : item?.clause && item?.importance ? (
                <span className="flex flex-col gap-1">
                  <span className="font-medium text-amber-700 dark:text-[#E3C598]">{item.clause}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{item.importance}</span>
                </span>
              ) : (
                JSON.stringify(item)
              )}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Download report function
  const downloadReport = () => {
    if (!analysis) return;

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPos = 20;

      // Brand Colors (Maroon & Beach Theme)
      const primaryColor = [128, 0, 0]; // Deep Maroon #800000
      const secondaryColor = [44, 24, 16]; // Dark Brown #2C1810
      const accentColor = [212, 175, 55]; // Gold #D4AF37
      const lightBgColor = [249, 247, 242]; // Cream #F9F7F2

      // Helper to add watermark (Single Page)
      const addWatermarkToPage = () => {
        // Set transparency for watermark
        doc.setGState(new GState({ opacity: 0.1 }));

        doc.setTextColor(44, 24, 16); // Dark Brown
        doc.setFontSize(80); // Reduced from 120 as requested
        doc.setFont("helvetica", "bold");

        // Center the watermark
        const text = "LegalKlarity";
        doc.text(text, pageWidth / 2, pageHeight / 2, {
          align: "center",
          angle: 45 // jsPDF rotates CCW, CSS rotates CW? Actually 45 in jsPDF is usually fine, user said "same as summary". Summary has -45deg. Let's try 45 first as it usually looks diagonal up.
        });

        // Reset transparency and color for next content
        doc.setGState(new GState({ opacity: 1.0 }));
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      };

      // Helper to add footer (All Pages at the end)
      const addFooters = () => {
        const totalPages = doc.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(150, 140, 130); // Muted brown
          doc.text(`Generated by LegalKlarity • Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, {
            align: "center"
          });
        }
      };

      // Helper to check page break
      const checkPageBreak = (heightNeeded: number) => {
        if (yPos + heightNeeded > pageHeight - margin) {
          doc.addPage();
          addWatermarkToPage(); // Draw watermark immediately on new page (Background)
          yPos = margin + 10; // Extra space at top of new page
        }
      };

      // Helper to add text with auto-wrapping
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false, indent: number = 0, color: number[] = secondaryColor) => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setTextColor(color[0], color[1], color[2]);

        const lines = doc.splitTextToSize(text, contentWidth - indent);
        checkPageBreak(lines.length * 5);

        // Re-apply font settings in case page break (and watermark) changed them
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setTextColor(color[0], color[1], color[2]);

        doc.text(lines, margin + indent, yPos);
        yPos += (lines.length * 5) + 2;
      };

      // Helper to add section header
      const addSection = (title: string) => {
        yPos += 8;
        checkPageBreak(15);

        // Section Background (Cream)
        doc.setFillColor(lightBgColor[0], lightBgColor[1], lightBgColor[2]);
        doc.rect(margin, yPos - 6, contentWidth, 10, 'F');

        // Section Title (Maroon)
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(title.toUpperCase(), margin + 2, yPos);

        yPos += 8;
      };

      // Helper to format list items
      const addListItems = (items: any[]) => {
        if (!items || items.length === 0) {
          addText("None", 10, false, 5, secondaryColor);
          return;
        }

        items.forEach(item => {
          let text = "";
          if (typeof item === 'string') {
            text = `• ${item}`;
          } else if (item.term) {
            text = `• ${item.term}: ${item.definition || ''}`;
          } else if (item.name) {
            text = `• ${item.name}: ${item.description || ''}`;
          } else if (item.title) {
            text = `• ${item.title}: ${item.explanation || item.description || ''}`;
          } else if (item.risk) {
            text = `• ${item.risk} (${item.severity || 'N/A'}): ${item.description || ''}`;
          } else if (item.party) {
            text = `• ${item.party}: ${item.responsibility || item.role || ''}`;
          } else if (item.date) {
            text = `• ${item.date}: ${item.event || ''}`;
          } else if (item.clause) {
            text = `• ${item.clause}: ${item.importance || ''}`;
          } else if (item.issue) {
            text = `• ${item.issue}: ${item.regulation || ''}`;
          } else {
            text = `• ${JSON.stringify(item)}`;
          }
          addText(text, 10, false, 5, secondaryColor);
        });
        yPos += 4;
      };

      // --- REPORT GENERATION START ---

      // Add watermark to the first page immediately
      addWatermarkToPage();

      // Header / Branding
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text("LegalKlarity", margin, yPos);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.text("AI-Powered Legal Document Analysis", margin, yPos + 6);

      // Line separator
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos + 10, pageWidth - margin, yPos + 10);

      yPos += 20;

      // Document Info
      addText(`Document: ${analysis.filename}`, 12, true, 0, [15, 23, 42]);
      addText(`Analyzed on: ${new Date(analysis.timestamp).toLocaleString()}`, 10, false, 0, secondaryColor);
      yPos += 5;

      // Sections
      addSection("Summary");
      addText(analysis.analysis.summary || "No summary available", 10, false, 5, secondaryColor);

      addSection("Key Terms");
      addListItems(analysis.analysis.key_terms);

      addSection("Main Clauses");
      addListItems(analysis.analysis.clauses || analysis.analysis.main_clauses);

      addSection("Risks");
      addListItems(analysis.analysis.risks);

      addSection("Recommendations");
      addListItems(analysis.analysis.recommendations);

      addSection("Parties");
      addListItems(analysis.analysis.parties);

      addSection("Jurisdiction");
      addText(analysis.analysis.jurisdiction || "Not specified", 10, false, 5, secondaryColor);

      addSection("Obligations");
      addListItems(analysis.analysis.obligations);

      addSection("Critical Dates");
      addListItems(analysis.analysis.critical_dates);

      addSection("Missing or Unusual Clauses");
      addListItems(analysis.analysis.missing_clauses || analysis.analysis.missing_or_unusual);

      addSection("Compliance Issues");
      addListItems(analysis.analysis.compliance_issues || analysis.analysis.keyComplianceNotes);

      addSection("Next Steps");
      addListItems(analysis.analysis.next_steps || (analysis.analysis.finalAssessment ? analysis.analysis.finalAssessment.recommendations : null) || analysis.analysis.finalTips);

      // Apply Footers to all pages
      addFooters();

      // Save PDF
      doc.save(`LegalKlarity_Report_${analysis.filename.replace(/\.[^/.]+$/, "")}.pdf`);
    } catch (error: any) {
      console.error("PDF Generation Error:", error);
      alert("Failed to generate PDF report: " + error.message);
    }
  };

  // Print summary function
  const printSummary = () => {

    const printContent = `
<html>
<head>
  <title>Legal Document Analysis - ${analysis.filename}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
    
    body { 
      font-family: 'Inter', sans-serif; 
      margin: 40px; 
      color: #2C1810; /* Dark Brown */
      background-color: #fff;
      position: relative;
    }
    
    /* Watermark */
    body::before {
      content: "LegalKlarity";
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 120px;
      font-weight: bold;
      color: rgba(44, 24, 16, 0.05); /* Very faint dark brown */
      z-index: -1;
      pointer-events: none;
      white-space: nowrap;
    }

    h1 { 
      color: #800000; /* Deep Maroon */
      font-size: 28px;
      border-bottom: 3px solid #D4AF37; /* Gold */
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    
    .meta-info {
      color: #718096;
      font-size: 14px;
      margin-bottom: 40px;
    }

    .section { 
      margin-bottom: 30px; 
      page-break-inside: avoid;
    }
    
    .section-title { 
      background-color: #F9F7F2; /* Cream */
      color: #800000; /* Deep Maroon */
      padding: 10px 15px;
      border-left: 4px solid #800000;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    p, li {
      line-height: 1.6;
      font-size: 14px;
    }
    
    ul {
      padding-left: 20px;
    }
    
    li {
      margin-bottom: 8px;
    }
    
    strong {
      color: #800000;
    }
    
    .footer {
      margin-top: 50px;
      text-align: center;
      font-size: 12px;
      color: #a0aec0;
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <h1>LEGAL DOCUMENT ANALYSIS REPORT</h1>
  <div class="meta-info">
    <p><strong>Document:</strong> ${analysis.filename}</p>
    <p><strong>Analyzed on:</strong> ${new Date(analysis.timestamp).toLocaleString()}</p>
  </div>
  
  <div class="section">
    <h2 class="section-title">Summary</h2>
    <p>${analysis.analysis.summary || "No summary available"}</p>
  </div>
  
  <div class="section">
    <h2 class="section-title">Key Terms</h2>
    <ul>
      ${(analysis.analysis.key_terms || []).map((term: any) => {
      const text = typeof term === 'string' ? term : `<strong>${term.term}:</strong> ${term.definition}`;
      return `<li>${text}</li>`;
    }).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2 class="section-title">Main Clauses</h2>
    <ul>
      ${(analysis.analysis.clauses || analysis.analysis.main_clauses || []).map((clause: any) => {
      let text = "";
      if (typeof clause === 'string') text = clause;
      else if (clause.title) text = `<strong>${clause.title}:</strong> ${clause.explanation || clause.description}`;
      else if (clause.name) text = `<strong>${clause.name}:</strong> ${clause.description}`;
      else text = JSON.stringify(clause);
      return `<li>${text}</li>`;
    }).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2 class="section-title">Risks</h2>
    <ul>
      ${(analysis.analysis.risks || []).map((risk: any) => {
      const text = typeof risk === 'string' ? risk : `<strong>${risk.risk}</strong> (${risk.severity}): ${risk.description}`;
      return `<li>${text}</li>`;
    }).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2 class="section-title">Recommendations</h2>
    <ul>
      ${(analysis.analysis.recommendations || []).map((rec: any) => `<li>${typeof rec === 'string' ? rec : JSON.stringify(rec)}</li>`).join('')}
    </ul>
  </div>

  <div class="footer">
    Generated by LegalKlarity AI • ${new Date().getFullYear()}
  </div>
</body>
</html>`.trim();

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Share analysis function
  const shareAnalysis = async () => {
    if (!analysis) return;

    const shareData = {
      title: 'Legal Document Analysis',
      text: `Check out this legal document analysis for ${analysis.filename}: ${analysis.analysis.summary || 'No summary available'}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const textToCopy = `Legal Document Analysis for ${analysis.filename}

Summary: ${analysis.analysis.summary || 'No summary available'}

View full analysis: ${window.location.href}`;
        await navigator.clipboard.writeText(textToCopy);
        alert('Analysis link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('Failed to share. Link copied to clipboard instead.');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Tab definitions
  const tabs = [
    { id: "summary", label: "Summary", icon: <FileText className="h-4 w-4" /> },
    { id: "keyTerms", label: "Key Terms", icon: <Key className="h-4 w-4" /> },
    { id: "clauses", label: "Clauses", icon: <ClipboardList className="h-4 w-4" /> },
    { id: "risks", label: "Risks", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: "recommendations", label: "Recommendations", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "parties", label: "Parties", icon: <Users className="h-4 w-4" /> },
    { id: "more", label: "More", icon: <Gavel className="h-4 w-4" /> }
  ];

  // Target group options
  const targetGroupOptions = [
    { value: "individual", label: "Individual" },
    { value: "enterprise", label: "Enterprise" },
    { value: "institutional", label: "Institutional" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Legal <span className="text-[#E3C598]">Vault</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Secure AI Analysis Protocol Initiated
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-3xl mx-auto">
            {/* Legal Vault Upload Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`relative group rounded-3xl p-1 transition-all duration-500 ${dragActive ? "bg-gradient-to-br from-[#E3C598] to-[#5D001E] shadow-[0_0_50px_rgba(227,197,152,0.3)]" : "bg-gradient-to-br from-white/10 to-white/5 hover:from-[#E3C598]/50 hover:to-[#5D001E]/50"
                }`}
            >
              <div
                className="bg-white dark:bg-[#0a0a0a] rounded-[22px] p-12 text-center relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-transparent transition-colors"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {/* Vault Door Effect */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-10 pointer-events-none"></div>

                {/* Security Clearance Toggle (Integrated Role Selection) */}
                <div className="absolute top-8 left-0 w-full flex justify-center z-20">
                  <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full p-1 flex gap-1 shadow-sm dark:shadow-none">
                    {targetGroupOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTargetGroup(option.value);
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 ${targetGroup === option.value
                          ? "bg-amber-100 text-amber-900 dark:bg-[#E3C598] dark:text-[#3E2723] shadow-sm"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                          }`}
                      >
                        {option.value === "individual" && <Users className="w-3 h-3" />}
                        {option.value === "enterprise" && <Building2 className="w-3 h-3" />}
                        {option.value === "institutional" && <Landmark className="w-3 h-3" />}
                        <span className="capitalize">{option.label} Access</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Glowing Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 dark:bg-[#E3C598]/5 rounded-full blur-3xl group-hover:bg-amber-500/10 dark:group-hover:bg-[#E3C598]/10 transition-all duration-700"></div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  accept=".pdf,.docx"
                />

                <motion.div
                  animate={{ y: dragActive ? -10 : 0 }}
                  className="relative z-10 mb-8"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 dark:from-[#5D001E] dark:to-[#3E2723] flex items-center justify-center shadow-xl dark:shadow-2xl ring-4 ring-white dark:ring-[#0a0a0a] group-hover:scale-110 transition-transform duration-500 border border-amber-100 dark:border-transparent">
                    {isAnalyzing ? (
                      <Loader2 className="w-10 h-10 text-amber-600 dark:text-[#E3C598] animate-spin" />
                    ) : (
                      <Upload className="w-10 h-10 text-amber-600 dark:text-[#E3C598]" />
                    )}
                  </div>
                  {/* Lock Animation Ring */}
                  <div className="absolute -inset-4 border-2 border-amber-200/50 dark:border-[#E3C598]/20 rounded-full border-dashed animate-[spin_10s_linear_infinite] group-hover:border-amber-300/50 dark:group-hover:border-[#E3C598]/40"></div>
                </motion.div>

                <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3 relative z-10">
                  {isAnalyzing ? "Analyzing Document..." : file ? "Document Secured" : dragActive ? "Drop to Securely Upload" : "Initialize Analysis"}
                </h3>

                <p className="text-gray-400 mb-8 max-w-md mx-auto relative z-10">
                  {isAnalyzing
                    ? "Our AI is analyzing every clause, risk, and obligation. This may take a moment."
                    : file
                      ? `Ready to analyze: ${file.name}`
                      : "Place your legal document here to begin secure encryption and AI processing."}
                </p>

                {!isAnalyzing && (
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    {file ? (
                      <div className="flex gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="px-6 py-3 rounded-full border border-gray-300 dark:border-white/10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 transition-all"
                        >
                          Remove
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAnalyze();
                          }}
                          className="px-8 py-3 rounded-full bg-[#E3C598] text-[#3E2723] font-bold hover:bg-[#FDFBF7] transition-all shadow-lg hover:shadow-[#E3C598]/20 flex items-center gap-2"
                        >
                          <Rocket className="w-4 h-4" />
                          Analyze Protocol
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={onButtonClick}
                        className="px-8 py-3 rounded-full bg-[#E3C598] text-[#3E2723] font-bold hover:bg-[#FDFBF7] transition-all shadow-lg hover:shadow-[#E3C598]/20 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Select Document
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Supported Formats */}
            <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E3C598]"></div>
                <span>PDF Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E3C598]"></div>
                <span>DOCX Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E3C598]"></div>
                <span>Max 200MB</span>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis View */
          <div className="space-y-8">
            {!analysis.analysis ? (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-red-500/20 p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analysis Data Error</h3>
                <p className="text-gray-400 mb-6">The analysis completed, but the data structure is unexpected.</p>
                <div className="text-left bg-black/50 p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-xs text-gray-300 font-mono">
                    {JSON.stringify(analysis, null, 2)}
                  </pre>
                </div>
                <button
                  onClick={removeFile}
                  className="mt-6 px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* ... Analysis Content ... */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5D001E]/20 flex items-center justify-center text-[#E3C598]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{analysis.filename}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Analyzed on {new Date(analysis.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={removeFile}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors"
                    >
                      Analyze New File
                    </button>
                    <button
                      onClick={downloadReport}
                      className="px-4 py-2 rounded-lg bg-[#E3C598] text-[#3E2723] font-semibold hover:bg-[#FDFBF7] transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Deep Analysis Report
                    </button>
                    <button
                      onClick={printSummary}
                      className="px-4 py-2 rounded-lg bg-[#5D001E] text-[#E3C598] font-semibold hover:bg-[#7D002E] transition-colors flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Print Summary
                    </button>
                  </div>
                </div>
                {/* Tabs and Content will be rendered below */}
                <div className="flex space-x-4 border-b border-gray-200 dark:border-white/10 pb-2">
                  <button
                    onClick={() => setActiveTab("summary")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "summary"
                      ? "bg-amber-100 text-amber-900 dark:bg-[#E3C598] dark:text-[#3E2723]"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                      }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab("keyTerms")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "keyTerms"
                      ? "bg-[#E3C598] text-[#3E2723]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Key Terms
                  </button>
                  <button
                    onClick={() => setActiveTab("clauses")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "clauses"
                      ? "bg-[#E3C598] text-[#3E2723]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Clauses
                  </button>
                  <button
                    onClick={() => setActiveTab("risks")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "risks"
                      ? "bg-[#E3C598] text-[#3E2723]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Risks & Obligations
                  </button>
                  <button
                    onClick={() => setActiveTab("recommendations")}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === "recommendations"
                      ? "bg-[#E3C598] text-[#3E2723]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Recommendations
                  </button>
                </div>

                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                  {activeTab === "summary" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Summary
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{analysis.analysis.summary || "No summary available."}</p>
                    </motion.div>
                  )}

                  {activeTab === "keyTerms" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Key Terms
                      </h3>
                      {renderKeyTerms(analysis.analysis.key_terms)}
                    </motion.div>
                  )}

                  {activeTab === "clauses" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Gavel className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Main Clauses
                      </h3>
                      {renderClauses(analysis.analysis.clauses || analysis.analysis.main_clauses)}
                    </motion.div>
                  )}

                  {activeTab === "risks" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Risks & Obligations
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Identified Risks</h4>
                          {renderListItems(analysis.analysis.risks, <AlertTriangle className="h-4 w-4 text-red-500" />)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Obligations</h4>
                          {renderListItems(analysis.analysis.obligations, <ClipboardList className="h-4 w-4 text-blue-400" />)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Compliance Issues</h4>
                          {renderListItems(analysis.analysis.compliance_issues || analysis.analysis.keyComplianceNotes, <ShieldCheck className="h-4 w-4 text-green-400" />)}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "recommendations" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Recommendations & Next Steps
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Recommendations</h4>
                          {renderListItems(analysis.analysis.recommendations, <Rocket className="h-4 w-4 text-purple-400" />)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Next Steps</h4>
                          {renderListItems(analysis.analysis.next_steps || (analysis.analysis.finalAssessment ? analysis.analysis.finalAssessment.recommendations : null) || analysis.analysis.finalTips, <Share2 className="h-4 w-4 text-teal-400" />)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Missing or Unusual Clauses</h4>
                          {renderListItems(analysis.analysis.missing_clauses || analysis.analysis.missing_or_unusual, <FileQuestion className="h-4 w-4 text-orange-400" />)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Additional Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Parties Involved
                    </h3>
                    {renderListItems(analysis.analysis.parties)}
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Critical Dates
                    </h3>
                    {renderListItems(analysis.analysis.critical_dates)}
                  </div>
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-white/10 p-6 col-span-full">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Gavel className="w-5 h-5 text-amber-600 dark:text-[#E3C598]" /> Jurisdiction
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{analysis.analysis.jurisdiction || "Not specified."}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalDocumentAnalyzer;
