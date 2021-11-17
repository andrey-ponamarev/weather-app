import React from "react";
import Avatar from "@mui/material/Avatar";
import { getIconUrl, ICityWeather } from "../../services/weather";

interface IProps {
  data: ICityWeather;
}
const WeatherPreview: React.FC<IProps> = ({ data }) => {
  const { main, wind } = data;
  const currentWeather = data.weather[0];
  return (
    <>
      temp: {main.temp}
      temp_max: {main.temp_max}
      temp_min: {main.temp_min}
      feels_like: {main.feels_like}
      pressure: {main.pressure}
      humidity: {main.humidity}
      <div>
        speed: {wind.speed}
        deg: {wind.deg}
      </div>
      <Avatar
        alt="Weather icon"
        src={getIconUrl(currentWeather.icon)}
        sx={{ width: 56, height: 56 }}
      />
    </>
  );
};

export default WeatherPreview;
