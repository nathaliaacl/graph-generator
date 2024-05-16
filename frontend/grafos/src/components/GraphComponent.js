import React, { useState, useEffect, useRef, useCallback } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import AdjacencyList from './AdjcencyList';
import VertexDegree from './VertexDegree';
import CheckAdjacency from './CheckAdjcency';
import OrderSize from './OrderSize';
import ShortestPath from './ShortestPath';
import DownloadGraphImage from './button/DownloadGraphImage';
import ClearGraphButton from './button/ClearGraphButton';
import RemoveLastVertexButton from './button/RemoveLastVertexButton';

import { IoIosAdd } from "react-icons/io";
import AddBatchComponent from './AddBatchComponent';

function GraphComponent() {
  const [elements, setElements] = useState([]);
  const [vertexLabel, setVertexLabel] = useState('');
  const [sourceVertex, setSourceVertex] = useState('');
  const [targetVertex, setTargetVertex] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('');
  const [isDirected, setIsDirected] = useState(false);

  
  const [graphInfo, setGraphInfo] = useState({
    numberOfNodes: 0,
    numberOfEdges: 0
  });
  const cyRef = useRef(null); 

  useEffect(() => {
  const clearAndFetchGraph = async () => {
    try {
      await fetch('http://localhost:5000/clear_graph', {
        method: 'POST'
      }).then(response => response.json())
        .then(data => {
          if (!data.message) {
            throw new Error('Failed to clear the graph');
          }
        });
      const response = await fetch('http://localhost:5000/get_graph');
      const data = await response.json();
      const formattedElements = data.nodes.concat(data.edges.map(edge => ({
        data: {
          id: `${edge.data.source}-${edge.data.target}`,
          source: edge.data.source,
          target: edge.data.target,
        }
      })));
      setElements(formattedElements);
    } catch (error) {
      console.error('Error fetching or clearing graph:', error);
    }
  };

  clearAndFetchGraph();
}, []);

const setGraphType = useCallback(async () => {
  try {
    const response = await fetch('http://localhost:5000/set_graph_type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type: isDirected })
    });
    const data = await response.json();
    if (!data.message) {
      throw new Error('Failed to set graph type');
    }
  } catch (error) {
    console.error('Error setting graph type:', error);
  }
}, [isDirected]); 

// useEffect to call setGraphType only when isDirected changes
useEffect(() => {
  setGraphType();  
}, [setGraphType]);

const fetchGraph = () => {
  fetch('http://localhost:5000/get_graph')
    .then(response => response.json())
    .then(data => {
      const formattedElements = data.nodes.concat(data.edges.map(edge => {
        // Ajuste aqui: só incluir label se o peso for diferente de zero
        const label = edge.data.weight !== 0 ? edge.data.weight.toString() : '';
        return {
          data: { 
            id: `${edge.data.source}-${edge.data.target}`,
            source: edge.data.source, 
            target: edge.data.target,
            label: label  // Usar label condicionalmente
          }
        };
      }));
      setElements(formattedElements);
    })
    .catch(error => console.error('Error fetching graph:', error));
};

  // const fetchGraph = () => {
  //   fetch('http://localhost:5000/get_graph')
  //     .then(response => response.json())
  //     .then(data => {
  //       const formattedElements = data.nodes.concat(data.edges.map(edge => ({
  //         data: { 
  //           id: `${edge.data.source}-${edge.data.target}`,
  //           source: edge.data.source, 
  //           target: edge.data.target,
  //           label: edge.data.weight
  //         }
  //       })));
  //       setElements(formattedElements);
  //     })
  //     .catch(error => console.error('Error fetching graph:', error));
  // };
  
  const updateGraphMetrics = () => {
    fetch('http://localhost:5000/graph_metrics')
      .then(response => response.json())
      .then(data => {
        setGraphInfo({
          numberOfNodes: data.order,
          numberOfEdges: data.size
        });
      })
      .catch(error => console.error('Error fetching graph metrics:', error));
  };
  
  const addVertex = () => {
    fetch('http://localhost:5000/add_vertex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: vertexLabel })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        fetchGraph(); 
        setVertexLabel('');  
        updateGraphMetrics(); 
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error adding vertex:', error);
    });
  };
 
  const addEdge = () => {
    fetch('http://localhost:5000/add_edge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ source: sourceVertex, target: targetVertex, weight: edgeWeight })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        fetchGraph();
        setSourceVertex('');
        setTargetVertex('');
        setEdgeWeight('');  
        updateGraphMetrics();
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error adding edge:', error);
    });
  };
  
  
  const clearGraph = () => {
    fetch('http://localhost:5000/clear_graph', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        fetchGraph(); 
        setGraphInfo({ 
          numberOfNodes: 0,
          numberOfEdges: 0
        });
      } else {
        alert(data.error);
      }
    })
    .catch(error => {
      console.error('Error clearing graph:', error);
    });
};

const removeLastVertex = () => {
  fetch('http://localhost:5000/remove_last_vertex', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      alert(data.message);
      fetchGraph();  // Atualiza os elementos do grafo
      setGraphInfo(prevInfo => ({
        numberOfNodes: prevInfo.numberOfNodes > 0 ? prevInfo.numberOfNodes - 1 : 0,
        numberOfEdges: Math.max(0, prevInfo.numberOfEdges - data.edgesRemoved) 
      }));
    } else {
      alert(data.error);
    }
  })
  .catch(error => {
    console.error('Error removing last vertex:', error);
  });
};

 
  return (
    <div >
      <div className='flex flex-wrap items-center justify-center gap-4 mb-2 mt-4'>
        <div className='border border-gray-300 rounded p-1 bg-white'>
            <label className="flex items-center justify-center ml-1">
                <input
                    type="checkbox"
                    checked={isDirected}
                    onChange={(e) => setIsDirected(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                /><span className="ml-2 mr-2 text-gray-400">Directed Graph</span>
            </label> 
        </div>
    <input
        type="text"
        value={vertexLabel}
        onChange={(e) => setVertexLabel(e.target.value)}
        placeholder="Vertex Label"
        className="p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
    />
    <button onClick={addVertex} className="bg-green-500 hover:bg-green-700 text-white font-bold text-base py-1 px-2 rounded my-2 mr-2 flex items-center gap-1">
        <IoIosAdd size={20}/>
        Add Vertex
    </button>
    <input
        type="text"
        value={sourceVertex}
        onChange={(e) => setSourceVertex(e.target.value)}
        placeholder="Source Vertex"
        className="p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
    />
    <input
        type="text"
        value={targetVertex}
        onChange={(e) => setTargetVertex(e.target.value)}
        placeholder="Target Vertex"
        className="p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
    />
    <input
        type="text"
        value={edgeWeight}
        onChange={(e) => setEdgeWeight(e.target.value)}
        placeholder="Edge Weight"
        className="p-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-150 ease-in-out"
    />
    <button onClick={addEdge} className="bg-green-500 hover:bg-green-700 text-white font-bold text-base py-1 px-2 rounded my-2 mr-2 flex items-center gap-1">
        <IoIosAdd size={20}/>
        Add Edge
    </button>
</div>
      
      <div className='flex flex-col items-center justify-center'>
        <div className="mt-2 mb-4 border-2 bg-white border-gray-300 rounded" style={{ width: '1200px', height: '400px' }}>
          <CytoscapeComponent elements={elements} style={{ width: '100%', height: '100%' }}  cy={(cy) => { cyRef.current = cy; }}
            stylesheet={[
              {
                selector: 'node',
                style: {
                  'background-color': '#666',
                  'label': 'data(label)',
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'color': '#fff',
                  'text-outline-color': '#666',
                  'text-outline-width': 2
                }
              },
              {
                selector: 'edge',
                style: {
                  'width': 3,
                  'line-color': '#ccc',
                  'target-arrow-color': '#ccc',
                  'target-arrow-shape': isDirected ? 'triangle' : 'none',
                  'curve-style': 'bezier',  
                  'control-point-distances': 50,  
                  'control-point-weights': 0.5, 
                  'label': 'data(label)',  
                  'text-rotation': 'autorotate',
                  'text-margin-y': -10,  
                  'font-size': '12px',
                  'color': '#333',
                  'text-background-color': '#fff',
                  'text-background-opacity': 1,
                  'text-background-padding': 2,
                  'text-background-shape': 'rectangle'
                }
              }
            ]}
          />
        </div>
      </div>

      <div className='flex justify-between bg-gray-200 rounded-md mb-2'>
        <OrderSize graphInfo={graphInfo} />
        <div className="flex justify-center items-center">
          <AddBatchComponent fetchGraph={fetchGraph} updateGraphMetrics={updateGraphMetrics} />
          <RemoveLastVertexButton removeLastVertex={removeLastVertex} />
          <ClearGraphButton clearGraph={clearGraph} />
          <DownloadGraphImage cyRef={cyRef} />
          
        </div>
      </div>
      
        <VertexDegree/>
        <AdjacencyList/>
        <CheckAdjacency/>
        <ShortestPath/> 

    </div>
  );
}

export default GraphComponent;