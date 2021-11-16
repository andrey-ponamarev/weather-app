import request from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface IResponseWeatherData {
  /** Internal parameter */
  message: string;
  /** Internal parameter */
  cod: string;
  /** City ID */
  city_id: number;
  /** Internal parameter */
  calctime: number;
  list: [
    {
      /** Time of data calculation, unix, UTC */
      dt: number;
      main: {
        /** Temperature, Kelvins */
        temp: number;
        /** Temperature, Kelvins. This temperature parameter accounts for the human perception of weather */
        feels_like: number;
        /** Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa */
        pressure: number;
        /** Humidity, % */
        humidity: number;
        /** Minimum temperature within a large city or a megalopolis (optional parameter), Kelvin */
        temp_min: number;
        /** Maximum temperature within a large city or a megalopolis (optional parameter), Kelvins */
        temp_max: number;
      };
      wind: {
        /** Wind speed. Unit: meter/sec. */
        speed: number;
        /** Wind direction, degrees (meteorological) */
        deg: number;
      };
      clouds: {
        /** Cloudiness, % */
        all: number;
      };
      weather: [
        {
          /** Weather condition id, */
          id: number;
          /** Group of weather parameters (Rain, Snow, Extreme etc.) */
          main: string;
          /** Weather condition within the group */
          description: string;
          /** Weather icon id */
          icon: string;
        }
      ];
      rain: {
        /** Rain volume for the last 1 hour */
        "1h": number;
        /** Rain volume for the last 3 hours */
        "3h": number;
      };
      snow: {
        /** Snow volume for the last 1 hour */
        "1h": number;
        /** Snow volume for the last 3 hours */
        "3h": number;
      };
    }
  ];
}

export const getWeather = async (
  city: string = "Luxembourg"
): Promise<IResponseWeatherData> => {
  const { data } = await request.get<IResponseWeatherData>(API_URL, {
    params: {
      q: city,
      appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
    },
  });

  return data;
};
