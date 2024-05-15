import React from 'react';
import GraphComponent from './components/GraphComponent';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/* <div className="flex justify-center">
        <h1 className="text-3xl font-bold mt-4 mb-2 ">Graph Generator</h1>
      </div> */}
      <div className="flex justify-center">
        <GraphComponent />
      </div>
      {/* <Sidebar/> */}
    </div>
  );
}

export default App;

