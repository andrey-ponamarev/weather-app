import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import useWeather from "./hooks/useWeather";
import WeatherPreview from "./components/WeatherPreview";
import Settings from "./components/Settings";
import SearchBox from "./components/SearchBox";
import useSettings from "./hooks/useSettings";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import RefreshButton from "./components/RefreshButton";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const App: React.FC = () => {
  const { loading, data, setCurrentPlace, refreshData } = useWeather();
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

      <RefreshButton onClick={refreshData} />
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : data ? (
        <WeatherPreview data={data} settings={settings} />
      ) : (
        <div>Sorry, try again later</div>
      )}
    </Container>
  );
};

export default App;
