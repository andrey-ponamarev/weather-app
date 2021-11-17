import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import useWeather from "./hooks/useWeather";
import WeatherPreview from "./components/WeatherPreview";
import Settings from "./components/Settings";
import SearchBox from "./components/SearchBox";
import useSettings from "./hooks/useSettings";

const App: React.FC = () => {
  const { loading, getWeather, data } = useWeather();
  const { settings, toggleField } = useSettings();

  return (
    <React.Fragment>
      <CssBaseline />
      <h1>Weather app</h1>
      <SearchBox />
      <Settings settings={settings} toggleField={toggleField} />
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
        <WeatherPreview data={data} settings={settings} />
      ) : (
        <div>Click search button</div>
      )}
    </React.Fragment>
  );
};

export default App;
