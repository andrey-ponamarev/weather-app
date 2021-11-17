import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import useWeather from "./hooks/useWeather";
import WeatherPreview from "./components/WeatherPreview";

const App: React.FC = () => {
  const { loading, getWeather, data } = useWeather();

  return (
    <React.Fragment>
      <CssBaseline />
      <h1>Weather app</h1>

      <Button
        variant="contained"
        onClick={() => {
          getWeather("London");
        }}
      >
        Refresh
      </Button>

      {loading ? (
        <Skeleton />
      ) : data ? (
        <WeatherPreview data={data} />
      ) : (
        <div>Click search button</div>
      )}
    </React.Fragment>
  );
};

export default App;
