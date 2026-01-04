import { useState, useMemo } from "react";
import EnergyProductionCard from "./EnergyCard";
import { Button } from "@/components/ui/button";
import SolarData from "./SolarEnergyData";
import { toDate, format, isSameDay } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { AlertTriangle, Info } from "lucide-react";

import { 
  useGetEnergyGenerationRecordQuery, 
  useGetSolarUnitsByClerkUserIdQuery,
  useGetUserAnomaliesQuery // Added this query
} from "../../../lib/redux/query.js";

const SolarEnergyProduction = () => {
  const [activeTab, setActiveTab] = useState("all"); 
  const { user } = useUser();

  // 1. Fetch Solar Unit ID
  const {
    data: solarUnitData,
    isLoading: isUnitLoading,
  } = useGetSolarUnitsByClerkUserIdQuery(undefined, { skip: !user });

  const solarUnitId = solarUnitData?._id;

  // 2. Fetch Energy Data (Grouped by Date)
  const { 
    data: energyData, 
    isLoading: isEnergyLoading 
  } = useGetEnergyGenerationRecordQuery(
    { id: solarUnitId, groupBy: "date" },
    { skip: !solarUnitId }
  );

  // 3. Fetch Anomalies
  const { 
    data: anomalyData, 
    isLoading: isAnomalyLoading 
  } = useGetUserAnomaliesQuery(undefined, { skip: !solarUnitId });

  // 4. Merge Data & Process
  const processedData = useMemo(() => {
    if (!energyData) return [];

    // Slice to get last 7 days from the API response
    const recentData = energyData.slice(0, 7);

    return recentData.map((dayRecord) => {
      const recordDate = toDate(dayRecord._id.date);
      
      // Find matching anomalies for this specific date
      const matchingAnomaly = anomalyData?.find(anomaly => 
        isSameDay(new Date(anomaly.date), recordDate)
      );

      return {
        day: format(recordDate, "EEE"),
        dateLabel: format(recordDate, "MMM d"),
        fullDate: recordDate,
        production: Math.floor(dayRecord.totalEnergy),
        hasAnomaly: !!matchingAnomaly,
        anomalyDetails: matchingAnomaly ? {
          type: matchingAnomaly.anomalyType,
          description: matchingAnomaly.description,
          severity: matchingAnomaly.severity // 'CRITICAL', 'WARNING', etc.
        } : null
      };
    });
  }, [energyData, anomalyData]);

  // 5. Filter based on Tab
  const displayedData = activeTab === "all" 
    ? processedData 
    : processedData.filter(d => d.hasAnomaly);

  // loading / error states
  if (isUnitLoading || isEnergyLoading || isAnomalyLoading) {
    return <div className="p-8 text-center text-gray-500">Loading solar data...</div>;
  }

  // Calculate anomaly count for badge
  const anomalyCount = processedData.filter(d => d.hasAnomaly).length;

  return (
    <section className=" font-[Inter] max-w-5xl">
      
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Solar Energy Production</h2>
            <p className="text-gray-600">Daily energy output monitoring</p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="mt-6 flex items-center gap-2 border-b border-gray-100 pb-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === "all"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Production
          </button>
          
          <button
            onClick={() => setActiveTab("anomaly")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2 relative ${
              activeTab === "anomaly"
                ? "text-red-600 border-b-2 border-red-600 bg-red-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            Anomalies
            {anomalyCount > 0 && (
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-red-200">
                {anomalyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Data Visualization */}
      <div className="min-h-[250px]">
        {displayedData.length > 0 ? (
          <SolarData energyProductionData={displayedData} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Info className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-500 font-medium">No records found for this view</p>
          </div>
        )}
      </div>

      {/* Anomaly Insight Footer (Shows only if anomalies are present in view) */}
      {displayedData.some(d => d.hasAnomaly) && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Anomaly Insights
          </h3>
          <div className="grid gap-3">
            {displayedData.filter(d => d.hasAnomaly).map((record, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  record.anomalyDetails?.severity === 'CRITICAL' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  record.anomalyDetails?.severity === 'CRITICAL' ? 'bg-red-100' : 'bg-yellow-100'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    record.anomalyDetails?.severity === 'CRITICAL' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">
                      {record.day}, {record.dateLabel}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                       record.anomalyDetails?.severity === 'CRITICAL' 
                       ? 'bg-red-200 text-red-800' 
                       : 'bg-yellow-200 text-yellow-800'
                    }`}>
                      {record.anomalyDetails?.severity}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {record.anomalyDetails?.type?.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {record.anomalyDetails?.description || "Abnormal energy pattern detected."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SolarEnergyProduction;

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
