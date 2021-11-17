import React from "react";
import Avatar from "@mui/material/Avatar";
import { getIconUrl, ICityWeather } from "../../services/weather";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ISettings } from "../../hooks/useSettings";

interface IProps {
  data: ICityWeather;
  settings: ISettings;
}

const WeatherPreview: React.FC<IProps> = ({ data, settings }) => {
  const { main, wind, name } = data;
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
        <Typography variant="h6">{name}</Typography>
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
        {settings.pressure && (
          <Typography>Pressure: {main.pressure}</Typography>
        )}
        {settings.humidity && (
          <Typography>Humidity: {main.humidity}</Typography>
        )}
        {settings.windSpeed && (
          <Typography>Wind speed: {wind.speed}m/s</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default WeatherPreview;
