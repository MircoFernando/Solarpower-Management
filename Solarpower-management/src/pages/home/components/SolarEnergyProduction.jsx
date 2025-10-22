import EnergyProductionCard from "./EnergyCard";
import { Button } from "@/components/ui/button";
import SolarData from "./SolarEnergyData";
import Tab from "../../../components/ui/tab";
import getsolarUnitbyid  from "../../../lib/api/solar-unit.js";


import { useSelector } from "react-redux";
import { getenergyGenerationRecord } from "../../../lib/api/energy-generation-record.js";
import { useGetenergyGenerationRecordQuery } from "../../../lib/redux/query.js";

const SolarEnergyProduction = () => {
  const energyProductionData = [
    { day: "Mon", date: "Aug 18", production: 34.1, hasAnomaly: false },
    { day: "Tue", date: "Aug 19", production: 3.2, hasAnomaly: false },
    { day: "Wed", date: "Aug 20", production: 44.7, hasAnomaly: true },
    { day: "Thu", date: "Aug 21", production: 21.9, hasAnomaly: false },
    { day: "Fri", date: "Aug 22", production: 41.2, hasAnomaly: false },
    { day: "Sat", date: "Aug 23", production: 43, hasAnomaly: false },
    { day: "Sun", date: "Aug 24", production: 26.8, hasAnomaly: false },
  ];

  const tabs = [{label: "All", value: "all" },
                 { label: "Anomaly", value: "anomaly" }];

  const selectedTab =  useSelector((state) => state.ui.selectedHomeTab);


  const filteredEnergyProductionData = selectedTab === "all"
    ? energyProductionData
    : energyProductionData.filter((el) => el.hasAnomaly);

  // State for API data fetching
  // Example code for fetching data from API inside the component, but i am not using it now, i implemented it using RTK query
  // const [isLoading, setIsLoading] = useState(true);
  // const [energyGenerationRecord, setEnergyGenerationRecord] = useState([]);
  // const [error, setError] = useState(null);
  // const [isError, setIsError] = useState(false);
  
  // // Fetch data from API on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getenergyGenerationRecord("68e35cc7af99833de51091b1");
  //       setEnergyGenerationRecord(data);
  //     } catch (error) {
  //       console.error("Error fetching energy generation record:", error);
  //       setIsError(true);
  //       setError(error.message || "Something went wrong");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleGetdataSolarUnit = () => {
  //   getsolarUnitbyid("68e35cc7af99833de51091ae");
  // };

  //  const handleGetdataEnergyRecord = () => {
  //   getenergyGenerationRecord("68e35cc7af99833de51091b1");
  // };

  // console.log(energyGenerationRecord);

  // if (isLoading) {
    
  //   console.log("Loading...");
  // }

  //Api data fetching using RTK query 
  const {data, isLoading, isError, error}= useGetenergyGenerationRecordQuery("68ec8e314c52df21ff6fdab8");

  if 

  console.log(data);

  return (
    <section className="px-12 font-[Inter] py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
        <p className="text-gray-600">Daily energy output for the past 7 days</p>
        <div className="mt-4 flex items-center gap-2">
          {tabs.map((tab) => {
            return (
            <Tab key={tab.value} tab ={tab}
                 
                 />
          );
          })}
               
        </div>
        
      </div>
      
        <SolarData energyProductionData={filteredEnergyProductionData} />
      
      <div className="mt-4 flex gap-2">
        <Button>Click me</Button>
        {/* <Button onClick={handleGetdataSolarUnit}>Get Unit</Button>
        <Button onClick={handleGetdataEnergyRecord}>Get Energy Record</Button> */}
      </div>
    </section>
  );
};

export default SolarEnergyProduction;
