import { useState, useEffect } from "react";
import { ICityWeather, getWeatherByCityName } from "../services/weather";

const DEFAULT_PLACE = "Luxembourg";

const useWeather = () => {
  const [data, setData] = useState<ICityWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherByCityName(city);
      setData(data);
    } catch (err) {
      setData(null);
      setError("Weather API is not working");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(DEFAULT_PLACE);
  }, []);

  const refreshData = () => {
    if (loading) {
      return;
    }

    if (data === null) {
      loadData(DEFAULT_PLACE);
    } else {
      loadData(data.name);
    }
  };

  return {
    loading,
    error,
    data,
    refreshData,
    getWeather: loadData,
    setCurrentPlace: setData,
  };
};

export default useWeather;
