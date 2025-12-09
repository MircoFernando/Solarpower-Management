// AllSolarUnits.jsx
import SolarUnitCard from "./SolarUnitsCard.jsx";

const AllSolarUnits = ({ solarUnits = [] }) => {
  if (solarUnits.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
        <p className="text-gray-500 text-lg">No solar units found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {solarUnits.map((unit) => (
        <SolarUnitCard
          key={unit.id}
          SerialNumber={unit.serialNumber}
          capacity={unit.capacity}
          InstalledDate={unit.installedAt}
          status={unit.Status}
          UserID={unit.UserID}
        />
      ))} 
    </div>
  );
};

export default AllSolarUnits;