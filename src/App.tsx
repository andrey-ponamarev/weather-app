import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Skeleton from "@mui/material/Skeleton";
import useWeather from "./hooks/useWeather";
import WeatherPreview from "./components/WeatherPreview";
import Settings from "./components/Settings";
import SearchBox from "./components/SearchBox";
import useSettings from "./hooks/useSettings";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import RefreshButton from "./components/RefreshButton";

const App: React.FC = () => {
  const { loading, getWeather, data, setCurrentPlace } = useWeather();
  const { settings, toggleField } = useSettings();

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={2} alignContent="center">
        <Grid item xs={12} mt={2}>
          <SearchBox onSelect={setCurrentPlace} />
        </Grid>
      </Grid>
      <Settings settings={settings} toggleField={toggleField} />

      <RefreshButton onClick={() => getWeather("London")} />
      {loading ? (
        <Skeleton />
      ) : data ? (
        <WeatherPreview data={data} settings={settings} />
      ) : (
        <div>Sorry, try again later</div>
      )}
    </Container>
  );
};

export default App;
