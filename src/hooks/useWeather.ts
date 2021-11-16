import { useState } from "react";
import { getWeather, IResponseWeatherData } from "../services/weather";

const useWeather = () => {
  const [data, setData] = useState<IResponseWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (city?: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeather(city);
      setData(data);
    } catch (err) {
      setData(null);
      setError("Weather API is not working");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getWeather: loadData,
    error,
    data,
  };
};

export default useWeather;
