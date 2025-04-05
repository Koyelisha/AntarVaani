import React from "react";
import {
    SparklesIcon,
    CheckCircleIcon,
    TrophyIcon,
    BoltIcon,
    ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DailyChallenge = () => {
    const [token, setToken] = useState("")
    const [decode, setDecode] = useState("")
    const [patientId, setPatientId] = useState("")
    const [status, setStatus] = useState("")
    const [challenge, setChallenge] = useState(null)
    const [patient, setPatient] = useState({})
    const [challengeType,setChallengeType] = useState("")

    useEffect(() => {
        let storedToken = (localStorage.getItem("token"))
        setToken(storedToken)
    }, [])

    useEffect(() => {
        if (token) {
            let decodedData = jwtDecode(token)
            setDecode(decodedData)
            setPatientId(decodedData.id)
        } else {
            console.log("No token found")
        }
    }, [token])

    useEffect(() => {
        axios.get("http://localhost:3000/game/daily-challenge")
            .then(response => {
                setChallenge(response.data)
                // console.log(response.data)
                setChallengeType(response.data.type)
                
            })
            .catch((err) => setStatus(err.response.data.message))
    }, [patientId])

    const completeChallenge = ()=>{
        console.log(challengeType)
        axios.post("http://localhost:3000/game/challenge-complete",{patientId,challengeType})
        .then(response=>{setStatus(response.data.message)
            // window.location.reload()
        })
        .catch(err=>setStatus(err.response.data.message))
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/patient/profile/${patientId}`)
            .then(response => setPatient(response.data))
            .catch(err => setStatus(err.response.data.message))
    }, [patientId,status])

    return (
        <div className="h-screen bg-[#e8f4e4] p-4 py-32">
            <div className="max-w-4xl w-full mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-[#E07A5F]">Wellness Tracker</h1>
                    <p className="text-gray-600">Daily progress and challenges</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Daily Challenge Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center text-gray-800">
                                <SparklesIcon className="w-5 h-5 mr-2 text-[#E07A5F]" />
                                Today's Challenge
                            </h2>
                            {challenge && <span className="bg-[#E07A5F] bg-opacity-10 text-[#E07A5F] px-3 py-1 rounded-full text-sm">
                                +{challenge.xp} XP
                            </span>}

                        </div>

                        <div className="mb-6 p-4 bg-[#F1FAEE] rounded-lg">
                            {challenge && <p className="text-gray-700">{challenge.description}</p>}
                        </div>

                        <button 
                        onClick={completeChallenge}
                        className="w-full py-2.5 px-4 bg-[#E07A5F] hover:bg-[#d86b50] text-white rounded-lg font-medium flex items-center justify-center transition-colors">
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            Complete Challenge
                        </button>
                        {status? <div className="py-2 px-1">{status}</div>:null}
                    </div>
                    

                    {/* Progress Dashboard */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress</h2>

                        {/* XP and Streak */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-3 bg-[#F1FAEE] rounded-lg">
                                <div className="flex items-center mb-1">
                                    <TrophyIcon className="w-5 h-5 mr-2 text-[#E07A5F]" />
                                    <span className="text-sm font-medium">Total XP</span>
                                </div>
                                {patient && <p className="text-2xl font-bold">{patient.xp}</p>}
                            </div>

                            <div className="p-3 bg-[#F1FAEE] rounded-lg">
                                <div className="flex items-center mb-1">
                                    <BoltIcon className="w-5 h-5 mr-2 text-[#E07A5F]" />
                                    <span className="text-sm font-medium">Current Streak</span>
                                </div>
                                {patient && <p className="text-2xl font-bold">{patient.streak} days</p>}
                            </div>
                        </div>

                        {/* Badges */}
                        <div>
                            <div className="flex items-center mb-3">
                                <ShieldCheckIcon className="w-5 h-5 mr-2 text-[#E07A5F]" />
                                <h3 className="font-medium">Earned Badges</h3>
                            </div>
                            {patient.badges &&
                                <>
                                      {patient.badges.length > 0 ? (
                                        <div className="space-y-2">
                                            {patient.badges.map((badge, index) => (
                                                <div key={index} className="flex items-center bg-[#F1FAEE] px-3 py-2 rounded-lg">
                                                    <span className="text-[#E07A5F] mr-2">•</span>
                                                    <span>{badge}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">Complete challenges to earn badges</p>
                                    )}
                                </>
                            }

                        </div>
                    </div>
                </div>

                {/* Weekly Progress */}
                <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Weekly Progress</h2>
                    <div className="h-3 bg-[#F1FAEE] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#E07A5F] rounded-full"
                            style={{ width: `${((patient.streak)/7)*100}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Completed {patient.streak} of 7 daily challenges this week</p>
                </div>
            </div>
        </div>
    );
};

export default DailyChallenge;