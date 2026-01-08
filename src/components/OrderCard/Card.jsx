import React from 'react'

const Card  = ({ 
  headText = "Pending Orders", 
  buttonText = "View", 
  color = "#3B82F6",
  description = "View pending orders",
  onClick
}) => {
  return (
   <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800 max-w-sm mx-auto hover:bg-gray-800 transition-all duration-300 hover:scale-105 w-80 h-50">
  {/* Header Section */}
  <div className="mb-6">
    <h3 className="text-white text-2xl font-semibold">{headText}</h3>  {/* Changed to text-2xl */}
    <p className="text-gray-400 text-base mt-2">{description}</p>      {/* Changed to text-base */}
  </div>

  {/* Action Button */}
  <button 
    className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg text-white text-lg"  // Added text-lg
    style={{ 
      backgroundColor: color
    }}
    onClick={onClick}
  >
    {buttonText}
  </button>
</div>
  );
};

export default Card