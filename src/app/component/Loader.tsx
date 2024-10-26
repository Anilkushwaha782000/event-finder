"use client"
import React from 'react';
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin">
      </div>
      <h3 className='mt-1'>Please wait...</h3>
    </div>
  );
};

export default Loader;
