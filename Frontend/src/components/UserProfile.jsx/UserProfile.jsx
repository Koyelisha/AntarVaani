import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGear } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-[#F1FAEE]">
            <div className="flex gap-20 px-24 w-3/4 h-3/4 py-5 justify-start">
                <div>
                    <div className="bg-[#D9D9D9] h-64 w-64 rounded-full flex justify-center items-center p-5 shadow-md ">
                        <img src="/User_icon/user_icon.png" className="h-48 w-48" alt="User" />
                    </div>
                </div>

                <div>
                    <div className="flex gap-4">
                        <button className="bg-[#E07A5F] px-5 py-2 font-semibold rounded-md shadow-md">
                            <FontAwesomeIcon icon={faEdit} /> Edit Profile
                        </button>
                        <button className="bg-[#E07A5F] px-5 py-2 font-semibold rounded-md shadow-md">
                            <FontAwesomeIcon icon={faGear} /> Settings
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        <h1 className="text-5xl font-bold">Username</h1>
                        <p className="text-2xl font-semibold">A short bio about the user</p>
                        <h2 className="text-3xl font-semibold">21 yrs</h2>
                        <h3 className="text-xl">(+91) 1234567890</h3>
                        <h3 className="text-xl">abcdefgh@gmail.com</h3>
                        <h3 className="text-xl">123, Street, 45/9 Avenue, Jonson Acres,<br />New California, USA</h3>
                        <h3 className="text-xl font-semibold">MXISH5166G</h3>
                        <div className="bg-[#BFA9A9] px-28 py-4 rounded-md flex flex-col gap-3 items-center">
                            <h3 className="text-2xl font-bold">My Stress Level Tracker</h3>
                            <div className="border-4 border-black h-36 w-36 p-3 rounded-md">
                                <img src="/Line_graph/line-graph.png" alt="" />
                            </div>
                            <button className="px-14 py-2 bg-[#E07A5F] rounded-md font-semibold shadow-md">View Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;