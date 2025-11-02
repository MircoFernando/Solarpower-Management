import { useGetWeatherQuery } from "../../../lib/redux/query";
import { Cloud, Thermometer, Droplets, Wind } from "lucide-react";

const WeatherData = () => {
  const lat = "7.342450";
  const long = "79.841667";
  const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

  const { data, isLoading, isError, error } = useGetWeatherQuery({
    lat: lat,
    lon: long,
    appid: WEATHER_KEY,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || isError) {
    return <div>Error: {error?.message || "Something went wrong"}</div>;
  }

  // Extract relevant weather data
  const condition = data.weather?.[0]?.main;
  const description = data.weather?.[0]?.description;
  const temperature = data.main?.temp;
  const humidity = data.main?.humidity;
  const windSpeed = data.wind?.speed;
  const city = data.name;
  const country = data.sys?.country;

  // Convert Kelvin to Celsius 
  const tempCelsius = (temperature - 273.15).toFixed(1);

  return (
    <section className="px-5 font-[Inter] text-white">
      <div className="mb-6">
        {/* Glass-style heading */}
        <h2
          className="text-2xl font-bold mb-4 border border-white/30 rounded-2xl p-4 
          bg-white/10 backdrop-blur-md shadow-lg text-white"
        >
          Weather Conditions in {city}, {country}
        </h2>

        {/* Weather Cards Row */}
        <div className="flex flex-wrap gap-4">
          {/* Condition */}
          <div className="flex items-center gap-2 text-xl border border-white/30 rounded-2xl p-4 
          bg-white/10 backdrop-blur-md shadow-lg flex-1 min-w-[200px]">
            <Cloud />
            <span>{condition} ({description})</span>
          </div>

          {/* Temperature */}
          <div className="flex items-center gap-2 text-xl border border-white/30 rounded-2xl p-4 
          bg-white/10 backdrop-blur-md shadow-lg flex-1 min-w-[200px]">
            <Thermometer />
            <span>{tempCelsius}°C</span>
          </div>

          {/* Humidity */}
          <div className="flex items-center gap-2 text-xl border border-white/30 rounded-2xl p-4 
          bg-white/10 backdrop-blur-md shadow-lg flex-1 min-w-[200px]">
            <Droplets />
            <span>{humidity}% Humidity</span>
          </div>

          {/* Wind */}
          <div className="flex items-center gap-2 text-xl border border-white/30 rounded-2xl p-4 
          bg-white/10 backdrop-blur-md shadow-lg flex-1 min-w-[200px]">
            <Wind />
            <span>{windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherData;
