
import SolarEnergyProduction from "../../pages/home/components/SolarEnergyProduction";
import { SectionCards } from "../../components/section-cards";
import { ChartAreaInteractive } from "../../components/chart-area-interactive";

const HomeDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <SectionCards />

      <div className="flex m-3 p-2">
        <SolarEnergyProduction />
      </div>

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
};  

export default HomeDashboard;
