import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import useWeather from "./hooks/useWeather";
import WeatherPreview from "./components/WeatherPreview";
import Settings from "./components/Settings";
import SearchBox from "./components/SearchBox";
import useSettings from "./hooks/useSettings";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const App: React.FC = () => {
  const { loading, getWeather, data } = useWeather();
  const { settings, toggleField } = useSettings();

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={2} alignContent="center">
        <Grid item xs={12} mt={2}>
          <SearchBox />
        </Grid>
      </Grid>
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
    </Container>
  );
};

export default App;
