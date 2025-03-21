import React, { useState } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";

const CustomSelect = ({ assets, selectedAsset, handleAssetSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const onOptionClick = (symbol) => {
    handleAssetSelect(symbol);
    setIsOpen(false);
  };

  const displayLabel =
    selectedAsset || (assets[0] && assets[0].symbol) || "Select";

  return (
    <div className="relative w-full">
      <div className="text-left w-full text-xl mb-2 font-bold">
        Choose Assets
      </div>
      <div
        onClick={toggleDropdown}
        className="bg-white text-black p-3 rounded-lg outline-none cursor-pointer flex items-center justify-between"
      >
        <span>{displayLabel}</span>
        <LiaAngleDownSolid className="text-black" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-black rounded-lg shadow-lg mt-1 z-10">
          {assets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => onOptionClick(asset.symbol)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {asset.symbol}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
