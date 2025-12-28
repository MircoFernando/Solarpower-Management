import EnergyProductionCard from "./EnergyCard";
import { Button } from "@/components/ui/button";
import SolarData from "./SolarEnergyData";
import Tab from "../../../components/ui/tab";
import { toDate, subDays, format } from "date-fns";
import { useUser} from "@clerk/clerk-react";

import { useSelector } from "react-redux";
import { getenergyGenerationRecord } from "../../../lib/api/energy-generation-record.js";
import { useGetEnergyGenerationRecordQuery, useGetSolarUnitsByClerkUserIdQuery } from "../../../lib/redux/query.js";


const SolarEnergyProduction = () => {
  /**
   * Mock data for solar energy production over the past 7 days
   */
  // const energyProductionData = [
  //   { day: "Mon", date: "Aug 18", production: 34.1, hasAnomaly: false },
  //   { day: "Tue", date: "Aug 19", production: 3.2, hasAnomaly: false },
  //   { day: "Wed", date: "Aug 20", production: 44.7, hasAnomaly: true },
  //   { day: "Thu", date: "Aug 21", production: 21.9, hasAnomaly: false },
  //   { day: "Fri", date: "Aug 22", production: 41.2, hasAnomaly: false },
  //   { day: "Sat", date: "Aug 23", production: 43, hasAnomaly: false },
  //   { day: "Sun", date: "Aug 24", production: 26.8, hasAnomaly: false },
  // ];

  const tabs = [
    { label: "All", value: "all" },
    { label: "Anomaly", value: "anomaly" },
  ];

  const selectedTab = useSelector((state) => state.ui.selectedHomeTab);

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

  const {user} = useUser();
  console.log("Clerk User:",user?.id);

  const {
    data: SolarUnitData,
    isLoading: solarUnitLoading,
    isError: solarUnitError,
    error: solarUnitFetchError,
  } = useGetSolarUnitsByClerkUserIdQuery({skip: !user});

  if (solarUnitLoading) console.log("Loading solar units...");
  if (solarUnitError)
    console.error("Error fetching solar unit:", solarUnitFetchError);

  

  //Api data fetching using RTK query
  const { data, isLoading, isError, error } = useGetEnergyGenerationRecordQuery(
    {
      id: SolarUnitData?._id,
      groupBy: "date",
    }
  );

  if (isLoading) return <p>Loading energy data...</p>;
  if (isError) return <p>Error fetchin energy record: {error?.message}</p>;
  if (!data || data.length === 0) return <p>No energy data found.</p>;
  console.log("Energy Generation Data:", data);
  console.log("id",SolarUnitData?._id);
  
// TODO: Fix the date formatting issue here and use limiter instead of slicing
  const newEnergyProductionData = (data?.slice(0, 7) || []).map((el) => {
    return {
      day: format(toDate(el._id.date), "EEE"),
      date: format(toDate(el._id.date), "MMM d"),
      production: Math.floor(el.totalEnergy),
      hasAnomaly: el.hasAnomaly,
    };
  });
  console.log(newEnergyProductionData);

  // const formattedData = data.map((el) => {
  //   return {
  //     ...el,
  //        timestamp: toDate(el.timestamp),
  //       };
  // });

  // console.log(formattedData);
  /**
   * Developed an Algorithm to Group Data - week-11*
   *
   */
  //   const latestRecord = formattedData[0];
  //   console.log("Latest Record:", latestRecord);
  //   const sevenDays = subDays(latestRecord.timestamp, 6);
  //   console.log("Seven Days Ago:", sevenDays);
  //   const recordsLast7Days = formattedData.filter((el) => el.timestamp >= sevenDays && el.timestamp <= latestRecord.timestamp);
  //   console.log("Records in Last 7 Days:", recordsLast7Days);

  //   const mappedRecords = recordsLast7Days.map((el) => {
  //     return {
  //       ...el,
  //       date: format(el.timestamp, "yyyy-MM-dd"),

  //     };
  //   });

  //   console.log("Mapped Records:", mappedRecords);

  //   const groupedData = {};

  //   mappedRecords.forEach((el) => {
  //     if (groupedData[el.date]) {
  //       groupedData[el.date].push(el);
  //     } else {
  //       groupedData[el.date] = [];
  //       groupedData[el.date].push(el);
  //     }
  //   });

  //   console.log("Grouped Data:", groupedData);

  //   const GroupedDataArray = Object.entries(groupedData);
  //   console.log("Grouped Data Array:", GroupedDataArray);

  //   const totalProduction = (data) => {
  //     let sum = 0;
  //     data.forEach((el) => {
  //       sum += Number(el.energyGenerated) || 0;
  //     });
  //     // remove decimal values, return whole number
  //     return Math.floor(sum);
  //   };

  //   const newEnergyProductionData = GroupedDataArray.map(([date, data]) => {

  //     console.log("Data for date", date, ":", data);

  //     return {
  //       day : format(new Date(date), "EEE"),
  //       date: format(new Date(date), "MMM dd"),
  //       production: totalProduction(data),
  //       hasAnomaly: data.some((record) => record.hasAnomaly),
  //     }
  //   });

  //   console.log("New Energy Production Data:", newEnergyProductionData);

  const filteredEnergyProductionData =
    selectedTab === "all"
      ? newEnergyProductionData
      : newEnergyProductionData.filter((el) => el.hasAnomaly);

  
  return (
    <section className="px-8 font-[Inter] py-6 max-w-max">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
        <p className="text-gray-600">Daily energy output for the past 6 days</p>
        <div className="mt-4 flex items-center gap-2">
          {tabs.map((tab) => {
            return <Tab key={tab.value} tab={tab} />;
          })}
        </div>
      </div>

      <SolarData energyProductionData={newEnergyProductionData} />

      <div className="mt-4 flex gap-2">
        <Button>Click me</Button>
        {/* <Button onClick={handleGetdataSolarUnit}>Get Unit</Button>
        <Button onClick={handleGetdataEnergyRecord}>Get Energy Record</Button> */}
      </div>
    </section>
  );
};

export default SolarEnergyProduction;
