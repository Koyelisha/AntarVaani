import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperclip, FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [assessmentCompleted, setAssessmentCompleted] = useState(false);
    const messagesEndRef = useRef(null);

    // Load initial data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('chatbotData');
        if (savedData) {
            const { welcome, therapists, selfCare } = JSON.parse(savedData);
            setMessages([
                { text: welcome, sender: "bot" },
                { text: "Based on your assessment, here are therapist recommendations:", sender: "bot" },
                { text: therapists, sender: "bot" },
                { text: "Some self-care suggestions for you:", sender: "bot" },
                { text: selfCare, sender: "bot" },
                { text: "How can I help you today?", sender: "bot" }
            ]);
            setAssessmentCompleted(true);
        } else {
            setMessages([
                { text: "Hello! Please complete your assessment first.", sender: "bot" }
            ]);
        }
    }, []);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        
        if (!assessmentCompleted) {
            setMessages(prev => [...prev, 
                { text: "Please complete your assessment first.", sender: "bot" }
            ]);
            return;
        }

        setLoading(true);
        setError(null);
        const userMessage = { text: trimmedInput, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        try {
            const response = await axios.post(
                "http://localhost:5001/chat",
                { message: trimmedInput },
                { headers: { "Content-Type": "application/json" } }
            );
            
            setMessages(prev => [
                ...prev,
                { text: response.data.response, sender: "bot" }
            ]);
        } catch (err) {
            console.error("Chat error:", err);
            setError(err.response?.data?.error || "Sorry, I encountered an error. Please try again.");
            setMessages(prev => [
                ...prev,
                { text: "Sorry, I couldn't process your message. Please try again.", sender: "bot" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                "http://localhost:5001/upload-csv",
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            const { welcome_message, therapist_recommendation, self_care_suggestions } = response.data;

            // Save to localStorage
            localStorage.setItem('chatbotData', JSON.stringify({
                welcome: welcome_message,
                therapists: therapist_recommendation,
                selfCare: self_care_suggestions
            }));

            setMessages([
                { text: welcome_message, sender: "bot" },
                { text: "Based on your assessment, here are therapist recommendations:", sender: "bot" },
                { text: therapist_recommendation, sender: "bot" },
                { text: "Some self-care suggestions for you:", sender: "bot" },
                { text: self_care_suggestions, sender: "bot" },
                { text: "How can I help you today?", sender: "bot" }
            ]);
            
            setAssessmentCompleted(true);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to process assessment");
            setMessages(prev => [...prev, 
                { text: "Failed to process assessment. Please try again.", sender: "bot" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#e8f4e4] p-4 py-20">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <header className="flex flex-col items-center mb-6">
                    <div className="flex items-center justify-center bg-[#3311C7] text-white p-4 rounded-full w-20 h-20 mb-3">
                        <FaRobot className="text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-[#3311C7]">AntarVaani</h1>
                    <p className="text-[#3311C7] opacity-80 font-medium">
                        Your compassionate AI mental health companion
                    </p>
                </header>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {/* Chat Container */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px] flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div 
                                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 ${
                                        msg.sender === "user" 
                                            ? "bg-[#3311C7] text-white rounded-br-none" 
                                            : "bg-[#e8f4e4] text-[#3311C7] rounded-bl-none"
                                    }`}
                                >
                                    <p className="text-sm md:text-base whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#e8f4e4] text-[#3311C7] rounded-2xl rounded-bl-none px-4 py-2">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-[#3311C7] animate-bounce"></div>
                                        <div className="w-2 h-2 rounded-full bg-[#3311C7] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-[#3311C7] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-[#cac6c6] p-3 bg-white">
                        <div className="flex items-center rounded-full bg-[#f5f5f5] px-4">
                            {!assessmentCompleted && (
                                <button 
                                    className="p-2 text-[#3311C7] hover:text-[#2a0eaa] transition"
                                    onClick={() => document.getElementById('assessment-upload').click()}
                                    aria-label="Upload assessment"
                                >
                                    <FaPaperclip />
                                    <input 
                                        id="assessment-upload"
                                        type="file" 
                                        className="hidden" 
                                        onChange={handleFileUpload}
                                        accept=".csv"
                                    />
                                </button>
                            )}
                            <input
                                className="flex-1 bg-transparent p-3 focus:outline-none text-gray-700 resize-none max-h-32"
                                placeholder={assessmentCompleted ? "Type your message..." : "Please upload your assessment first"}
                                rows="1"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                aria-label="Type your message"
                                disabled={!assessmentCompleted}
                            />
                            <div className="flex items-center space-x-2">
                                <button 
                                    className={`p-2 rounded-full transition ${
                                        input.trim() === "" || !assessmentCompleted
                                            ? "text-gray-400 cursor-not-allowed" 
                                            : "text-[#3311C7] hover:text-[#2a0eaa]"
                                    }`}
                                    onClick={sendMessage}
                                    disabled={input.trim() === "" || !assessmentCompleted || loading}
                                    aria-label="Send message"
                                >
                                    <IoSend className="text-xl" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-4 text-center text-sm text-[#3311C7] opacity-70">
                    <p>
                        MindEase is here to support you, but not a substitute for professional help.
                        <br />
                        In crisis? Please contact your local emergency services.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Chatbot;