import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import WeatherData from "../pages/dashboard/weather/WeatherApi";
import { Badge } from "@/components/ui/badge";
import SolarImage from "../assets/solar.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetCapacityFactorQuery } from "@/lib/redux/query";
import { Activity, TrendingUp, Zap, Sun, Moon } from "lucide-react";
import { useGetPeakOffPeakDistributionQuery } from "@/lib/redux/query";

export function SectionCards({ days = 90 }) {
  const { data, isLoading, isError } = useGetCapacityFactorQuery(days);
  const {
    data: dataPeak,
    isLoading: LoadingPeak,
    isError: Peak,
  } = useGetPeakOffPeakDistributionQuery(days);

  if (isLoading || LoadingPeak) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !data || Peak || !dataPeak) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading dashboard data
      </div>
    );
  }

  // Get performance rating
  const getPerformanceRating = (cf) => {
    if (cf >= 80)
      return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (cf >= 60)
      return { label: "Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (cf >= 40)
      return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { label: "Poor", color: "text-red-600", bg: "bg-red-100" };
  };

  const chartData = [
    {
      name: "Peak Hours",
      value: dataPeak?.peak.energy,
      percentage: dataPeak?.peak.percentage,
    },
    {
      name: "Off-Peak",
      value: dataPeak?.offPeak.energy,
      percentage: dataPeak?.offPeak.percentage,
    },
  ];

  const COLORS = ["#018790", "#00B7B5"];
  const performance = getPerformanceRating(data.capacityFactor);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-6 w-full">
      {/* ---------------- CARD 1: WEATHER ---------------- */}
      <Card
        className="relative overflow-hidden border-0 shadow-lg text-white flex flex-col h-full min-h-[500px]"
        style={{
          backgroundImage: `url(${SolarImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-0" />

        <CardHeader className="relative z-10 pb-0">
          <CardTitle className="text-2xl font-bold text-white">
            Site Conditions
          </CardTitle>
          <CardDescription className="text-gray-200">
            Real-time weather & environment
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 flex-1 flex flex-col justify-center p-6">
          <WeatherData />
        </CardContent>
      </Card>

      {/* ---------------- CARD 2: CAPACITY FACTOR ---------------- */}
      <Card className="flex flex-col h-full shadow-lg border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">
                Capacity Factor
              </CardTitle>
              <CardDescription>Efficiency vs Rated Capacity</CardDescription>
            </div>
            <div className={`px-3 py-1 rounded-full ${performance.bg}`}>
              <span className={`text-xs font-bold ${performance.color}`}>
                {performance.label}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-6">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-primary/5 rounded-lg p-3 text-center border border-primary/10">
              <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary-dark">
                {data.capacityFactor}%
              </p>
              <p className="text-[10px] text-gray-500">Factor</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
              <Zap className="w-4 h-4 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-700">
                {data.actualEnergy}
              </p>
              <p className="text-[10px] text-gray-500">Actual kWh</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-100">
              <Activity className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-700">
                {data.theoreticalMax}
              </p>
              <p className="text-[10px] text-gray-500">Max kWh</p>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                    })
                  }
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f4f4f5" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar
                  dataKey="capacityFactor"
                  fill="#018790"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ---------------- CARD 3: PEAK vs OFF-PEAK ---------------- */}
      <Card className="flex flex-col h-full shadow-lg border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-gray-800">
            Generation Split
          </CardTitle>
          <CardDescription>Peak (10 AM - 2 PM) vs Off-Peak</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col gap-4">
          
          <div className="h-[220px] w-full relative shrink-0">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Increased from 40
                    outerRadius={85} // Increased from 60
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-bold text-gray-400">Total</span>
                <span className="text-lg font-extrabold text-gray-700">
                   {(dataPeak?.peak.energy + dataPeak?.offPeak.energy).toFixed(0)}
                </span>
                <span className="text-[10px] text-gray-400">kWh</span>
              </div>
          </div>


          <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-gray-600">
                    Peak
                  </span>
                </div>
                <p className="text-lg font-bold text-primary-dark">
                  {dataPeak?.peak.energy} <span className="text-xs font-normal text-gray-500">kWh</span>
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 flex flex-col items-center text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">
                    Off-Peak
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-700">
                  {dataPeak?.offPeak.energy} <span className="text-xs font-normal text-gray-500">kWh</span>
                </p>
              </div>
          </div>

          {/* 3. Insight Box at Bottom */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-auto">
            <p className="text-xs text-blue-800 leading-relaxed">
              <span className="font-semibold">Insight:</span> Peak hours contribute{" "}
              {dataPeak?.peak.percentage}% of total energy. Optimization suggested if below 40%.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}