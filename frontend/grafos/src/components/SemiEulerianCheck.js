import React, { useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";

function SemiEulerianCheck() {
  const [isSemiEulerian, setIsSemiEulerian] = useState(null);

  const checkSemiEulerianStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/is_semi_eulerian');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setIsSemiEulerian(data.is_semi_eulerian);
    } catch (error) {
      console.error('Failed to fetch semi-Eulerian status:', error);
      alert('Failed to check if the graph is semi-Eulerian.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={checkSemiEulerianStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1 mt-4 mb-6 mr-2">
        <FaRegCheckCircle size={20}/>
        Check if Graph is Semi-Eulerian
      </button>
      {isSemiEulerian !== null && (
        <strong>
        <p className={`text-md ${isSemiEulerian ? 'text-green-500' : 'text-red-500'}`}>
                
            {isSemiEulerian ? 'The graph is semi-Eulerian' : 'The graph is not semi-Eulerian'}   
         </p>
        </strong>
        
      )}
    </div>
  );
}

export default SemiEulerianCheck;
