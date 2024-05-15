import React from 'react';
import { IoInformationCircleOutline, IoPeople } from "react-icons/io5";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold mt-4 mb-2 ml-4">Graph Generator</h1>
        <div className="flex items-center mr-10">
          <div className="relative group mx-2 p-2">
            <IoPeople size={25} />
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 p-2 text-sm w-auto whitespace-nowrap text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <li>Alycia Lima</li>
                <li>Luiza Omena</li>
                <li>Lorena Seabra</li>
                <li>Mariana Belo</li>
                <li>Marília Santos</li>
                <li>Nathália Accioly</li>
            </span>
          </div>
          <div className="relative group mx-2 p-2">
            <IoInformationCircleOutline size={25} />
            <span className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 p-2 text-sm w-40 text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              Projeto desenvolvido durante a disciplina de Grafos da CESAR School - 5° período
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
