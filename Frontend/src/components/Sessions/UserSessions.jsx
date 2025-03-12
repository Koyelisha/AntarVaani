import React from 'react';

const UserSessions = () => {
    return (
        <div className='h-screen bg-[#e8f4e4] py-24 px-16'>
            <h1 className='text-4xl font-bold text-[#1B0482] mb-4 text-center'>Upcoming Sessions</h1>
            <table className='w-full border-collapse shadow-md' border={1}>
                <thead className='bg-[#3311C7] text-white'>
                    <tr>
                        <th className='py-2'>Therapist</th>
                        <th>Date & Time</th>
                        <th>Session Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-[#D9D9D9]'>
                    <tr>
                        <td className='text-center py-1'>Dr. Jane Doe</td>
                        <td className='text-center py-1'>12 Mar 2025, 5:00 PM </td>
                        <td className='text-center py-1'>Online (Zoom)</td>
                        <td className='text-center py-1'>Confirmed</td>
                        <td className='text-center py-1'>Join/Cancel</td>
                    </tr>
                    <tr>
                        <td className='text-center py-1'>Dr. Jane Doe</td>
                        <td className='text-center py-1'>12 Mar 2025, 5:00 PM </td>
                        <td className='text-center py-1'>Online (Zoom)</td>
                        <td className='text-center py-1'>Confirmed</td>
                        <td className='text-center py-1'>Join/Cancel</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserSessions;