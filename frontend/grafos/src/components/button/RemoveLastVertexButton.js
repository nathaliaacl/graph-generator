import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

const RemoveLastVertexButton = ({ removeLastVertex }) => {
  return (
    <button onClick={removeLastVertex} className="bg-red-500 hover:bg-red-700 text-white font-bold text-base py-1 px-2 rounded my-2 mr-2 flex items-center gap-1">
      <IoCloseOutline size={25} />
      Remove Last Vertex
    </button>
  );
};

export default RemoveLastVertexButton;