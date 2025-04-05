import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function StressInput({ onSubmit, onClose }) {
  const [level, setLevel] = useState(5); // scale of 1–10

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(level);
    
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20'>
      <div className='mt-10 flex flex-col gap-5 text-black'>
        <div className='bg-[#cac6c6] max-w-sm rounded-md px-5 py-5 flex flex-col gap-5 items-center mx-4'>
          <div className='flex justify-between w-full items-center'>
            <h3 className='text-lg font-semibold'>Rate Your Stress Level</h3>
            <button onClick={onClose} className='text-gray-600 hover:text-gray-800'>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
            <div className='flex flex-col gap-2 w-full'>
              <label className='text-center'>How stressed are you feeling? (1-10)</label>
              <div className='flex items-center gap-3'>
                <span className='text-sm'>1</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className='w-full'
                />
                <span className='text-sm'>10</span>
              </div>
              <div className='text-center font-bold text-lg'>{level}</div>
            </div>
            
            <button 
              type="submit" 
              className='bg-[#3311C7] px-5 py-3 text-white rounded-md w-full hover:bg-[#2a0da5] transition-colors'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StressInput;