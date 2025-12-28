import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import WeatherData from "../pages/dashboard/weather/WeatherApi"
import { Badge } from "@/components/ui/badge"
import SolarImage from "../assets/solar.jpg"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetCapacityFactorQuery } from '@/lib/redux/query';
import { Activity, TrendingUp, Zap } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { useGetPeakOffPeakDistributionQuery } from '@/lib/redux/query';
import { Sun, Moon } from 'lucide-react';


export function SectionCards({ days = 90}) {

  const { data, isLoading, isError } = useGetCapacityFactorQuery(days);
  const { data:dataPeak , isLoading:LoadingPeak, isError:Peak } = useGetPeakOffPeakDistributionQuery(days);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading capacity factor data
      </div>
    );
  }

  // Get performance rating
  const getPerformanceRating = (cf) => {
    if (cf >= 80) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (cf >= 60) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (cf >= 40) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const chartData = [
    { name: 'Peak Hours (10 AM - 2 PM)', value: dataPeak.peak.energy, percentage: dataPeak.peak.percentage },
    { name: 'Off-Peak Hours', value: dataPeak.offPeak.energy, percentage: dataPeak.offPeak.percentage },
  ];

  const COLORS = ['#018790', '#00B7B5'];

  const performance = getPerformanceRating(data.capacityFactor);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-10 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card bg-cover bg-center h-[80vh] text-white border border-white/20 backdrop-blur-md"
          style={{
            backgroundImage: `url(${SolarImage})`,
          }}
        >
        {/* <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader> */}
        <WeatherData />
        {/* <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        {/* <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter> */}
      <div className="bg-white max-w-2xl h-[80vh] rounded-xl shadow-md border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Capacity Factor</h2>
          <div className={`px-4 py-2 rounded-lg ${performance.bg}`}>
            <span className={`font-semibold ${performance.color}`}>
              {performance.label}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Measures how efficiently your solar unit performs compared to its rated capacity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Overall Capacity Factor */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/20 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-gray-600">Capacity Factor</span>
          </div>
          <p className="text-3xl font-bold text-primary-dark">
            {data.capacityFactor}%
          </p>
        </div>

        {/* Actual Energy */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-200 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-green-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Actual Generated</span>
          </div>
          <p className="text-3xl font-bold text-green-700">
            {data.actualEnergy} kWh
          </p>
        </div>

        {/* Theoretical Max */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-200 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-blue-700" />
            </div>
            <span className="text-sm font-medium text-gray-600">Theoretical Max</span>
          </div>
          <p className="text-3xl font-bold text-blue-700">
            {data.theoreticalMax} kWh
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
              label={{ value: 'Capacity Factor (%)', angle: -90, position: 'insideLeft' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Capacity Factor']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend />
            <Bar 
              dataKey="capacityFactor" 
              fill="#018790" 
              name="Capacity Factor (%)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Info Box */}
      
    </div>
      </Card>
      <Card className="@container/card">
        <div className="bg-white rounded-xl h-[80vh] shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Peak vs Off-Peak Generation</h2>
      <p className="text-gray-600 text-sm mb-6">
        Distribution of energy generation during peak sun hours vs off-peak periods
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)} kWh`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <Sun className="w-6 h-6 text-primary" />
              <span className="font-semibold text-gray-700">Peak Hours</span>
            </div>
            <p className="text-2xl font-bold text-primary-dark">{dataPeak.peak.energy} kWh</p>
            <p className="text-sm text-gray-600">{dataPeak.peak.percentage}% of total</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
            <div className="flex items-center gap-3 mb-2">
              <Moon className="w-6 h-6 text-gray-600" />
              <span className="font-semibold text-gray-700">Off-Peak Hours</span>
            </div>
            <p className="text-2xl font-bold text-gray-700">{dataPeak.offPeak.energy} kWh</p>
            <p className="text-sm text-gray-600">{dataPeak.offPeak.percentage}% of total</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Peak hours (10 AM - 2 PM)</strong> typically generate 40-50% of daily energy due to optimal sun angle and intensity.
            </p>
          </div>
        </div>
      </div>
    </div>
      </Card>
    </div>
  )
}
