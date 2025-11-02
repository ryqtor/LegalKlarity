import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, Phone, ScreenShare, Users, MessageSquare, Bot, Pause, Play, RotateCcw } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

interface LegalExpert {
  name: string;
  title: string;
  experience: string;
  specialties: string[];
}

const AIVideoAdvisor: React.FC = () => {
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [chatVisible, setChatVisible] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI Legal Advisor. How can I help you understand this legal document today?",
      sender: 'ai',
      time: new Date(Date.now() - 30000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 2,
      text: "I'd like to understand the risks in my rental agreement.",
      sender: 'user',
      time: new Date(Date.now() - 20000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 3,
      text: "I'd be happy to help! I can identify key risks like liability clauses, termination conditions, and payment obligations. Please share the document you'd like to review.",
      sender: 'ai',
      time: new Date(Date.now() - 10000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [participants, setParticipants] = useState<number>(2);
  const [currentTopic, setCurrentTopic] = useState<string>("Understanding Rental Agreements");
  const [selectedExpert, setSelectedExpert] = useState<LegalExpert>({
    name: "Sophia LegalAI",
    title: "Senior AI Legal Counsel",
    experience: "10+ years equivalent experience",
    specialties: ["Contract Analysis", "Risk Assessment", "Compliance Review", "Intellectual Property", "Corporate Law"]
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AI responses to user messages with legal context
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Analyze the user's message to provide context-specific legal advice
      const analyzeMessageAndRespond = () => {
        const lowerMsg = message.toLowerCase();
        
        // Context-specific legal responses
        let response = "";
        
        if (lowerMsg.includes('risk') || lowerMsg.includes('liable') || lowerMsg.includes('liability')) {
          response = "Based on legal standards, this clause could expose you to significant liability. I recommend negotiating specific limitations on your liability, especially for indirect or consequential damages. Consider asking for caps on total liability equal to the contract value.";
        } else if (lowerMsg.includes('terminate') || lowerMsg.includes('end') || lowerMsg.includes('cancel')) {
          response = "The termination conditions in this agreement seem unusually strict. Standard practice is to allow either party to terminate with 30-90 days' written notice. I recommend adding a 60-day termination clause with proper cure periods for breaches.";
        } else if (lowerMsg.includes('payment') || lowerMsg.includes('money') || lowerMsg.includes('fee')) {
          response = "This payment schedule has some unusual terms. I recommend ensuring that payments are tied to deliverables and include a 30-day grace period for late payments. Consider adding interest charges for overdue amounts.";
        } else if (lowerMsg.includes('compliance') || lowerMsg.includes('law') || lowerMsg.includes('legal')) {
          response = "I've identified a few compliance issues with the current regulations. This agreement should reference the specific applicable laws and include compliance certifications. Consider adding a clause that addresses regulatory changes during the contract term.";
        } else if (lowerMsg.includes('indemnify') || lowerMsg.includes('indemnification')) {
          response = "The indemnification clause here is quite broad. I suggest adding specific limitations to protect your interests. The indemnifying party should only be responsible for third-party claims arising from their own negligence or breach of contract.";
        } else if (lowerMsg.includes('dispute') || lowerMsg.includes('arbitrate') || lowerMsg.includes('court')) {
          response = "I recommend reviewing the dispute resolution clause carefully. The current clause may limit your legal options. Consider adding provisions for mediation before arbitration and ensuring the venue is convenient for both parties.";
        } else if (lowerMsg.includes('contract') || lowerMsg.includes('agreement') || lowerMsg.includes('document')) {
          response = "For any legal document, I recommend focusing on the key terms: parties, scope of work, payment terms, termination conditions, and dispute resolution. Make sure all ambiguous language is clarified and all terms are defined.";
        } else if (lowerMsg.includes('employee') || lowerMsg.includes('hire') || lowerMsg.includes('work')) {
          response = "Employment contracts have specific legal requirements. Ensure the contract includes proper classification (employee vs. contractor), intellectual property clauses, non-compete restrictions, and termination procedures. Consider consulting local employment law.";
        } else {
          // General legal advice responses
          const generalResponses = [
            "That's an important legal matter. I recommend reviewing the specific terms carefully and considering the implications for your situation. Would you like me to analyze any specific clauses?",
            "From a legal perspective, this depends on the specific terms in your document. I can help you identify key areas of concern if you share more details.",
            "Legal agreements often contain complex terms that require careful analysis. I recommend reviewing this with a qualified attorney after I've highlighted the key areas of concern.",
            "This type of legal document typically includes specific provisions that may affect your rights. Let me help you understand the most important elements.",
            "Understanding your legal obligations requires a detailed review of the specific terms. I can help break down the complex language into clear explanations.",
            "Legal documents often contain terms that favor one party over another. I can identify provisions that may be negotiable or require clarification.",
            "The legal implications of this document depend on several factors including local laws, industry standards, and your specific situation. I'll help identify key considerations."
          ];
          response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        }
        
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: response,
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, aiMessage]);
      };
      
      // Simulate thinking time before responding
      setTimeout(analyzeMessageAndRespond, 1500);
    }
  };

  // Handle Enter key for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle video on/off
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  // Toggle audio on/off
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  // Toggle video play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Reset the demo
  const resetDemo = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI Legal Advisor. How can I help you understand this legal document today?",
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Legal Video Advisor</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Get instant legal advice from our AI assistant with human-like understanding
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium dark:bg-green-900/30 dark:text-green-400">
                Live Demo
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Video & Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Video Area */}
          <div className="relative bg-gray-900 h-[50vh]">
            {isVideoOn ? (
              <>
                {/* Simulated video feed with AI advisor */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Animated background for video effect */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"></div>
                      
                      {/* Animated particles */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full bg-white/10"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              width: `${Math.random() * 10 + 2}px`,
                              height: `${Math.random() * 10 + 2}px`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              x: [0, Math.random() * 10 - 5, 0],
                              opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                              duration: Math.random() * 3 + 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Centered advisor profile */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="text-center z-10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            className="mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 mb-4"
                            animate={isPlaying ? {
                              scale: [1, 1.05, 1],
                            } : {}}
                            transition={{ 
                              duration: 2,
                              repeat: isPlaying ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                          >
                            <div className="bg-gray-800 rounded-full w-32 h-32 flex items-center justify-center">
                              <Bot className="h-16 w-16 text-blue-400" />
                            </div>
                          </motion.div>
                          <motion.h3 
                            className="text-xl font-bold text-white mb-1"
                            animate={isPlaying ? { 
                              opacity: [0.7, 1, 0.7]
                            } : {}}
                            transition={{ 
                              duration: 2,
                              repeat: isPlaying ? Infinity : 0,
                              ease: "easeInOut"
                            }}
                          >
                            {selectedExpert.name}
                          </motion.h3>
                          <p className="text-gray-300">{selectedExpert.title}</p>
                          
                          {/* Status indicator */}
                          <motion.div 
                            className="inline-flex items-center mt-3 px-3 py-1 bg-green-500/20 rounded-full text-sm"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                            <span className="text-green-400">Ready to assist</span>
                          </motion.div>
                        </motion.div>
                      </div>
                      
                      {/* Simulated video effect overlay */}
                      {isPlaying && (
                        <motion.div 
                          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgogICAgICA8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz4KPC9zdmc+')] opacity-10"
                          animate={{
                            opacity: [0.05, 0.1, 0.05],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-800">
                <VideoOff className="h-16 w-16 text-gray-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Video is currently off</h2>
                <p className="text-gray-400">The AI advisor is still available for audio and chat</p>
              </div>
            )}

            {/* Active topic indicator */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                {currentTopic}
              </span>
            </div>

            {/* Connection status */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Connected
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 bg-gray-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${isAudioOn ? 'bg-red-500' : 'bg-green-500'} hover:opacity-90 transition`}
                  aria-label={isAudioOn ? "Mute" : "Unmute"}
                >
                  {isAudioOn ? (
                    <Mic className="h-6 w-6 text-white" />
                  ) : (
                    <MicOff className="h-6 w-6 text-white" />
                  )}
                </button>
                
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${isVideoOn ? 'bg-red-500' : 'bg-green-500'} hover:opacity-90 transition`}
                  aria-label={isVideoOn ? "Stop Video" : "Start Video"}
                >
                  {isVideoOn ? (
                    <Video className="h-6 w-6 text-white" />
                  ) : (
                    <VideoOff className="h-6 w-6 text-white" />
                  )}
                </button>
                
                <button
                  onClick={togglePlayPause}
                  className={`p-3 rounded-full ${isPlaying ? 'bg-blue-500' : 'bg-yellow-500'} hover:opacity-90 transition`}
                  aria-label={isPlaying ? "Pause" : "Resume"}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white" />
                  )}
                </button>
                
                <button
                  onClick={resetDemo}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition flex items-center"
                  aria-label="Reset Demo"
                >
                  <RotateCcw className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white">
                  <Bot className="h-5 w-5 mr-1" />
                  <span>{participants} participant(s)</span>
                </div>
                
                <button
                  className="p-3 bg-red-500 hover:bg-red-600 rounded-full transition flex items-center"
                  aria-label="End Session"
                >
                  <Phone className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Legal Advisor Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Bot className="h-5 w-5 mr-2 text-blue-500" />
              AI Legal Expert
            </h3>
            <div className="flex items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{selectedExpert.name}</h4>
                <p className="text-gray-600 dark:text-gray-400">{selectedExpert.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{selectedExpert.experience}</p>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</h5>
              <div className="flex flex-wrap gap-2">
                {selectedExpert.specialties.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900/30 dark:text-blue-400"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Credentials and Capabilities */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Capabilities:</h5>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">24/7 Availability</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Instant Document Analysis</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Real-time Risk Assessment</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Multi-jurisdiction Knowledge</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Document Review Features */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI-Powered Legal Analysis</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Risk Assessment</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Identify potential legal risks and liability exposure in contracts</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Clause Analysis</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Detailed explanation of complex clauses and legal jargon</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Compliance Check</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Verify document compliance with applicable laws and regulations</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg mr-3">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Negotiation Support</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Suggested improvements and negotiation strategies</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Precedent Research</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Reference to similar cases and legal precedents</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prepared Questions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ask Legal Questions</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Common questions our AI advisor helps with:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">What are the key risks in this contract?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">Which clauses should I negotiate?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">Is this agreement compliant with local laws?</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">What alternatives do I have?</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Session</h4>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Topic:</span> {currentTopic}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  <span className="font-medium">Advisor:</span> {selectedExpert.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
              AI Legal Advisor Chat
            </h3>
            <div className="flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm text-gray-600 dark:text-gray-400">AI is online</span>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto pr-2 mb-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div className={`inline-block max-w-[80%] rounded-2xl px-4 py-3 ${msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tl-none'}`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a legal question..."
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition flex items-center"
            >
              <span>Send</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIVideoAdvisor;