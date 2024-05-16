import React, { useState } from 'react';
import { IoCheckmarkOutline } from "react-icons/io5";

function CheckAdjacency() {
    const [vertex1, setVertex1] = useState('');
    const [vertex2, setVertex2] = useState('');
    const [result, setResult] = useState('');
    const [isAdjacent, setIsAdjacent] = useState(null);  // Armazena se são adjacentes ou não

    const checkAdjacency = async () => {
        const response = await fetch('http://localhost:5000/check_adjacency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vertex1, vertex2 })
        });
        const data = await response.json();
        if (data.error) {
            setResult('Error: ' + data.error);
            setIsAdjacent(null);  // Não aplica cor em caso de erro
        } else {
            setResult(`Vertices ${vertex1} and ${vertex2} are ${data.are_adjacent ? '' : 'not '}adjacent`);
            setIsAdjacent(data.are_adjacent);  // Atualiza se são adjacentes ou não
        }
        setVertex1('');
        setVertex2('');
    };

    return (
        <div className='flex mb-4'>
            <div className='flex mb-1'>
               <input
                type="text"
                value={vertex1}
                onChange={(e) => setVertex1(e.target.value)}
                placeholder="Vertex 1"
                className="p-1 border w-auto border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            <input
                type="text"
                value={vertex2}
                onChange={(e) => setVertex2(e.target.value)}
                placeholder="Vertex 2"
                className="p-1 ml-2 border w-auto border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
            />
            <button onClick={checkAdjacency} className="ml-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded flex items-center gap-1">
                <IoCheckmarkOutline size={25}/>
                Check Adjacency
            </button> 
            </div>
            
            <div className={`ml-4 flex items-center text-md ${isAdjacent === null ? 'text-red-600' : isAdjacent ? 'text-green-500' : 'text-red-600'}`}>
            {result}
            </div>
        </div>
    );
}

export default CheckAdjacency;
