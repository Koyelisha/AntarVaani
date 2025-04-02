import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const UserEditProfile = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-screen bg-[#F1FAEE] pb-40">
            <div className="flex gap-20 px-24 w-3/4 h-3/4 justify-start">
                <div className="flex flex-col items-center gap-5">
                    <div className="bg-[#D9D9D9] h-64 w-64 rounded-full flex justify-center items-center p-5 shadow-md relative">
                        <img src="/User_icon/user_icon.png" className="h-48 w-48" alt="User" />
                        <button className="absolute bottom-4 right-4 bg-[#E07A5F] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </div>
                    <button className="text-[#E07A5F] font-semibold">Change Profile Picture</button>
                </div>

                <div className="w-full">
                    <div className="flex gap-4 mb-6">
                        <button 
                        onClick={()=>{navigate("/patient/profile")}}
                        className="bg-gray-400 px-5 py-2 font-semibold rounded-md shadow-md hover:bg-gray-500 transition">
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                        </button>
                        <button className="bg-[#E07A5F] px-5 py-2 font-semibold rounded-md shadow-md hover:bg-[#d86b4f] transition">
                            <FontAwesomeIcon icon={faSave} /> Save Changes
                        </button>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-medium mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    defaultValue="John Doe"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-lg font-medium mb-1">Age</label>
                                <input 
                                    type="number" 
                                    defaultValue="21"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                                />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-medium mb-1">Contact</label>
                                <input 
                                    type="tel" 
                                    defaultValue="9876543210"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-lg font-medium mb-1">Email</label>
                                <input 
                                    type="email" 
                                    defaultValue="john@example.com"
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-lg font-medium mb-1">Bio</label>
                            <textarea 
                                defaultValue="A short bio about the user"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F] h-20"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-lg font-medium mb-1">Address</label>
                            <textarea 
                                defaultValue="123, Street, 45/9 Avenue, Jonson Acres, New California, USA"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F] h-20"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-lg font-medium mb-1">Government ID</label>
                            <input 
                                type="text" 
                                defaultValue="MXISH5166G"
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                            />
                        </div>
                        
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold mb-2">Change Password</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-lg font-medium mb-1">New Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium mb-1">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#E07A5F] focus:border-[#E07A5F]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditProfile;