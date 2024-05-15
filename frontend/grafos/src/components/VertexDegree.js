import React, { useState } from 'react';
import { BsList } from "react-icons/bs";

function VertexDegree() {
    const [vertexId, setVertexId] = useState('');
    const [degreeInfo, setDegreeInfo] = useState(null);
    const [error, setError] = useState('');

    const fetchVertexDegree = async () => {
        try {
            const response = await fetch('http://localhost:5000/get_vertex_degree', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vertex_id: vertexId })
            });
            const data = await response.json();
            if (response.ok) {
                setDegreeInfo(data);
                setError('');
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        } catch (err) {
            setError(err.message);
            setDegreeInfo(null);
        }
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
                <button onClick={fetchVertexDegree} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                    <BsList size={20}/>
                    Get Vertex Degree
                </button>
            </div>
            
            {error && <div className="text-red-500">{error}</div>}
            {degreeInfo && (
                <div>
                    {degreeInfo.degree !== undefined && <p><strong>Degree:</strong> {degreeInfo.degree}</p>}
                    {degreeInfo.in_degree !== undefined && <p><strong>In-Degree:</strong> {degreeInfo.in_degree}</p>}
                    {degreeInfo.out_degree !== undefined && <p><strong>Out-Degree:</strong> {degreeInfo.out_degree}</p>}
                </div>
            )}
        </div>
    );
}

export default VertexDegree;
