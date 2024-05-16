import React, { useState } from 'react';

function AddBatchComponent({ fetchGraph, updateGraphMetrics }) {
  const [batchInput, setBatchInput] = useState('');

  const addBatch = () => {
    fetch('http://localhost:5000/add_batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ batch: batchInput })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        // alert(data.message);
        fetchGraph();
        setBatchInput('');
        updateGraphMetrics();
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error adding batch:', error);
    });
  };

  return (
    <div className="flex items-center gap-2 mr-2">
      <input
        type="text"
        value={batchInput}
        onChange={(e) => setBatchInput(e.target.value)}
        placeholder="Enter batch data"
        className="p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
      />
      <button onClick={addBatch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
        Add Batch
      </button>
    </div>
  );
}

export default AddBatchComponent;
