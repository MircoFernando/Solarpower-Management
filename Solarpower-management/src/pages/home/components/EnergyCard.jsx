import { useState } from "react";

const EnergyProductionCard = (props) => {
 
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      className={`block cursor-pointer ${
        isSelected ? "outline-2 outline-offset-2 outline-blue-600" : ""
      } relative border ${
        props.hasAnomaly ? "border-red-500" : "border-gray-300"
      } rounded-lg`}
      onClick={handleClick}
    >
      {props.hasAnomaly && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm rounded-bl-lg">
          Anomaly
        </div>
      )}
      <div className="flex flex-col items-center gap-2 p-6 pb-2">
        <span className="block text-gray-600 text-sm font-medium">
          {props.day}
        </span>
        <span className="block text-xs text-gray-500">{props.date}</span>
      </div>
      <div className="p-6 pt-2 flex flex-col items-center">
        <span
          className={`block mb-1 text-3xl font-bold ${
            props.hasAnomaly ? "text-red-600" : "text-blue-600"
          }`}
        >
          {props.production}
        </span>
        <span className="block text-sm font-medium text-gray-500">kWh</span>
      </div>
    </button>
  );
};

export default EnergyProductionCard;
