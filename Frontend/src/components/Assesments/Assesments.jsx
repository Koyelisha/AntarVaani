import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const quizContent = [
    {
        q: "In the past two weeks, how often have you felt nervous, anxious, or on edge",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "How often have you felt down, depressed, or hopeless in the last two weeks?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "How would you rate the quality of your sleep in the past month?",
        ans: ["Excellent", "Good", "Average", "Poor", "Very Poor"]
    },
    {
        q: "How often do you feel tired or have little energy throughout the day?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "How frequently do you feel overwhelmed by your daily responsibilities or tasks?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "How often do you feel confident about yourself and your abilities?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "Do you find it hard to concentrate on tasks or remember things lately?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "How often do you spend time socializing or engaging in activities with friends or family?",
        ans: ["Every day", "Several times a week", "Once a week", "Rarely", "Never"]
    },
    {
        q: "How often do you feel lonely or isolated, even when surrounded by people?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "Irritability or Anger: How often do you get easily irritated, frustrated, or angry?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "When you face a difficult situation, how confident are you in your ability to handle it?",
        ans: ["Very confident", "Confident", "Neutral", "Not confident", "Very unconfident"]
    },
    {
        q: "Have you noticed any significant changes in your eating habits in the last few weeks?",
        ans: ["No change", "Eating less than usual", "Eating more than usual", "Loss of appetite"]
    },
    {
        q: "How motivated do you feel to accomplish your daily tasks or long-term goals?",
        ans: ["Very motivated", "Moderately motivated", "Neutral", "Low motivation", "No motivation"]
    },
    {
        q: "How often do you experience negative thoughts about yourself or your future?",
        ans: ["Never", "Rarely", "Sometimes", "Often", "Always"]
    },
    {
        q: "Have you lost interest in activities you once enjoyed?",
        ans: ["No", "Slightly", "Moderately", "Significantly", "Completely"]
    }
];

const Assessments = () => {
    const [answers, setAnswers] = useState(Array(quizContent.length).fill(null));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addAnswerToArray = (index, option) => {
        const newAnswers = [...answers];
        newAnswers[index] = option;
        setAnswers(newAnswers);
        setError(null);
    };

    const generateCSV = () => {
        let csvContent = "Question,Answer\n";
        quizContent.forEach((item, index) => {
            csvContent += `"${item.q.replace(/"/g, '""')}","${answers[index]}"\n`;
        });
        return new Blob([csvContent], { type: 'text/csv' });
    };

    const handleSubmit = async () => {
        if (answers.some(answer => answer === null)) {
            setError('Please answer all questions before submitting');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const csvBlob = generateCSV();
            const formData = new FormData();
            formData.append('file', csvBlob, 'mental_health_assessment.csv');

            const response = await axios.post(
                "http://localhost:5001/upload-csv",
                formData,
                { 
                    headers: { 
                        'Content-Type': 'multipart/form-data' 
                    },
                    timeout: 30000 // 30 seconds timeout
                }
            );

            if (response.data.status !== "success") {
                throw new Error(response.data.error || "Unknown error");
            }

            // Store all data for the chatbot
            localStorage.setItem('chatbotData', JSON.stringify({
                welcome: response.data.welcome_message,
                therapists: response.data.therapist_recommendation,
                selfCare: response.data.self_care_suggestions,
                assessment: response.data.assessment_summary
            }));

            navigate('/patient/chatbot');
            
        } catch (err) {
            console.error('Submission error:', err);
            const errorMsg = err.response?.data?.details || 
                           err.response?.data?.error || 
                           err.message || 
                           'Failed to submit assessment. Please try again.';
            setError(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#e8f4e4] py-28 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className='text-4xl font-bold text-[#151516] mb-3'>Mental Health Assessment</h1>
                    <p className='text-lg text-[#151516]'>
                        Your well-being matters. Answer honestly for the most accurate results.
                    </p>
                    <div className="w-full bg-[#cac6c6] h-1.5 rounded-full mt-6 overflow-hidden">
                        <div 
                            className="bg-[#151516] h-full transition-all duration-500" 
                            style={{ 
                                width: `${(answers.filter(a => a !== null).length / quizContent.length) * 100}%` 
                            }}
                        />
                    </div>
                    <p className="text-[#151516] mt-2 font-medium">
                        {answers.filter(a => a !== null).length} of {quizContent.length} questions answered
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                        <p>{error}</p>
                    </div>
                )}

                <div className='space-y-6'>
                    {quizContent.map((item, idx) => (
                        <div 
                            key={idx} 
                            className={`w-full bg-white p-6 text-left rounded-lg shadow-sm transition-all duration-300 hover:shadow-md border-l-4 ${
                                answers[idx] ? 'border-[#151516]' : 'border-transparent'
                            }`}
                        >
                            <div className="flex items-start">
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#e8f4e4] text-[#151516] font-bold mr-4 mt-0.5">
                                    {idx + 1}
                                </span>
                                <div className="flex-grow">
                                    <h1 className='text-lg font-semibold text-gray-800 mb-4'>{item.q}</h1>
                                    <div className='space-y-2'>
                                        {item.ans.map((option, i) => (
                                            <label 
                                                key={i} 
                                                className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                                                    answers[idx] === option 
                                                        ? 'bg-[#e8f4e4] border border-[#cac6c6]' 
                                                        : 'hover:bg-gray-50 border border-transparent'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`ques-${idx}`}
                                                    className='h-4 w-4 text-[#151516] focus:ring-[#3311C7] mr-3'
                                                    value={option}
                                                    checked={answers[idx] === option}
                                                    onChange={() => addAnswerToArray(idx, option)}
                                                />
                                                <span className="text-gray-700">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || answers.some(answer => answer === null)}
                        className={`px-6 py-3 rounded-md text-lg font-semibold shadow transition-all duration-300 ${
                            !isSubmitting && !answers.some(answer => answer === null)
                                ? 'bg-[#3311C7] text-white hover:bg-[#2a0eaa] hover:shadow-md'
                                : 'bg-[#cac6c6] text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Submit Assessment'
                        )}
                    </button>
                    {answers.some(answer => answer === null) && !error && (
                        <p className="text-orange-600 mt-3">Please answer all questions before submitting</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assessments;