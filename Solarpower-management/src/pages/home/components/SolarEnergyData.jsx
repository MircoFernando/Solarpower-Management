import EnergyProductionCard from "./EnergyCard";

const filteredEnergyProductionData = ({ energyProductionData = [] }) => {
  if (energyProductionData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-4">
      {energyProductionData.map((el) => (
        <EnergyProductionCard
          key={el.date}
          day={el.day}
          date={el.date}
          production={el.production}
          hasAnomaly={el.hasAnomaly}
        />
      ))}
    </div>
  );
};
export default filteredEnergyProductionData;