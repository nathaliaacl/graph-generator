import React, { useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
function EulerianCheck() {
  const [isEulerian, setIsEulerian] = useState(null);

  const checkEulerianStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/is_eulerian');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setIsEulerian(data.is_eulerian);
    } catch (error) {
      console.error('Failed to fetch Eulerian status:', error);
      alert('Failed to check if the graph is Eulerian.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={checkEulerianStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1 mr-2">
        <FaRegCheckCircle size={20}/>
        Check if Graph is Eulerian
        </button>
      {isEulerian !== null && (
        <p className={`text-md ${isEulerian ? 'text-green-500' : 'text-red-500'}`}>
            <strong>
              {isEulerian ? 'The graph is Eulerian' : 'The graph is not Eulerian'}  
            </strong> 
      </p>
      )}
    </div>
  );
}

export default EulerianCheck;
