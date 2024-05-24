import React, { useState } from 'react';
import { PiPath } from "react-icons/pi";

function ShortestPath() {
  const [sourceVertex, setSourceVertex] = useState('');
  const [targetVertex, setTargetVertex] = useState('');
  const [result, setResult] = useState(null);

  const findShortestPath = async () => {
    const response = await fetch('http://localhost:5000/shortest_path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ source: sourceVertex, target: targetVertex })
    });
    const data = await response.json();
    if (response.ok) {
      setResult(data);
    } else {
      alert(data.error || 'Failed to find shortest path');
    }
  };

  return (
    <div className='mb-6 flex'>
      <div className='flex mb-1'>
        <input
        type="text"
        value={sourceVertex}
        onChange={(e) => setSourceVertex(e.target.value)}
        placeholder="Source Vertex"
        className="p-1 border  border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
      />
      <input
        type="text"
        value={targetVertex}
        onChange={(e) => setTargetVertex(e.target.value)}
        placeholder="Target Vertex"
        className="p-1 ml-2 border  border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
      />
      <button onClick={findShortestPath} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2 flex items-center gap-1">
        <PiPath size={25}/>
        Find Shortest Path
      </button>
      </div>
      
      {result && (
        <div className='flex ml-4 justify-center items-center gap-6'>
          <div className='text-black'><strong>Path: </strong>{result.path.join(' -> ')}</div>
          <div className='text-black'><strong>Cost: </strong>{result.cost}</div>
        </div>
      )}
    </div>
  );
}

export default ShortestPath;
