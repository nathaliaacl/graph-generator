import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";

const ClearGraphButton = ({ clearGraph }) => {
  return (
    <button onClick={clearGraph} className="bg-red-500 hover:bg-red-700 text-white font-bold text-base py-1 px-2 rounded my-2 mr-2 flex items-center gap-1">
      <RiDeleteBin6Line />
      Clean All
    </button>
  );
};

export default ClearGraphButton;
