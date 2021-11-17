import { useState } from "react";
import { getCityList, IResponseCityList } from "../services/weather";

const useSearch = () => {
  const [data, setData] = useState<IResponseCityList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlace = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getCityList(query);
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
    searchPlace,
    error,
    data,
  };
};

export default useSearch;
