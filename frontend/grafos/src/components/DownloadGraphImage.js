import React from 'react';
import { FaDownload } from "react-icons/fa6";

const DownloadGraphImage = ({ cyRef }) => {
  const handleDownloadGraphImage = () => {
    if (cyRef.current) {
      const imageUrl = cyRef.current.png({ full: true, scale: 1.5 });
      const downloadLink = document.createElement('a');
      downloadLink.href = imageUrl;
      downloadLink.download = "graph-image.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error('Cytoscape não está inicializado.');
    }
  };

  return (
    <button onClick={handleDownloadGraphImage} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded my-2 mr-2 w-8 h-8 flex items-center justify-center">
      <FaDownload size={20}/>
    </button>
  );
};

export default DownloadGraphImage;
