import React, { useState } from 'react';
import { BsList } from "react-icons/bs";

function AdjcencyList() {
    const [vertexId, setVertexId] = useState('');
    const [adjacencyList, setAdjacencyList] = useState(null);
    const [error, setError] = useState('');

    const fetchAdjacencyList = async () => {
        try {
            const response = await fetch('http://localhost:5000/get_adjacency_list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vertex_id: vertexId })
            });
            const data = await response.json();
            if (response.ok) {
                setAdjacencyList(data);
                setError('');
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch (err) {
            setError(err.message);
            setAdjacencyList(null);
        }
        // setVertexId('');
    };

    return (
        <div className='mb-2'>
            <div className='flex mb-1'>
                <input
                    type="text"
                    value={vertexId}
                    onChange={(e) => setVertexId(e.target.value)}
                    placeholder="Vertex ID"
                    className="p-1 border w-20 border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
                />
                <button onClick={fetchAdjacencyList} className="ml-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                    <BsList size={20}/>
                    Get Adjacent Vertices
                </button>
            </div>
            
            {error && <div className="text-red-500">{error}</div>}
            {adjacencyList && (
                <div>
                    {adjacencyList.successors && adjacencyList.predecessors ? (
                        <>
                            <div><strong>Successors:</strong> {adjacencyList.successors.join(', ')}</div>
                            <div><strong>Predecessors:</strong> {adjacencyList.predecessors.join(', ')}</div>
                        </>
                    ) : (
                        adjacencyList.neighbors && <div>Neighbors: {adjacencyList.neighbors.join(', ')}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdjcencyList;
