import React from "react";
import Avatar from "@mui/material/Avatar";
import { getIconUrl, ICityWeather } from "../../services/weather";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface IProps {
  data: ICityWeather;
}
const WeatherPreview: React.FC<IProps> = ({ data }) => {
  const { main, wind } = data;
  const currentWeather = data.weather[0];
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignContent="center"
    >
      <Grid item>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h3">{main.temp}°C</Typography>
          </Grid>
          <Grid item xs={6}>
            <Avatar
              alt="Weather icon"
              src={getIconUrl(currentWeather.icon)}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography>
          Min/Max {main.temp_min}°C/{main.temp_max}°C
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          Feels like {main.feels_like}°C. {currentWeather.description}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>Pressure: {main.pressure}</Typography>
        <Typography>Humidity: {main.humidity}</Typography>
        <Typography>Wind speed: {wind.speed}m/s</Typography>
      </Grid>
    </Grid>
  );
};

export default WeatherPreview;
