import request from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Weather fields in API response
 * @link https://openweathermap.org/current#format
 */
export interface ICoordField {
  coord: {
    /** City geo location, longitude */
    lon: number;
    /** City geo location, latitude */
    lat: number;
  };
}

export interface IWeatherField {
  /** Weather condition id, */
  id: number;
  /** Group of weather parameters (Rain, Snow, Extreme etc.) */
  main: string;
  /** Weather condition within the group */
  description: string;
  /** Weather icon id */
  icon: string;
}

export interface IMainField {
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
  /**  Atmospheric pressure on the sea level, hPa */
  sea_level: number;
  /** Atmospheric pressure on the ground level, hPa */
  grnd_level: number;
}

export interface IWindField {
  /** Wind speed. Unit: meter/sec. */
  speed: number;
  /** Wind direction, degrees (meteorological) */
  deg: number;
}

export interface ICloudsField {
  /** Cloudiness, % */
  all: number;
}

export interface IRainField {
  /** Rain volume for the last 1 hour */
  "1h": number;
  /** Rain volume for the last 3 hours */
  "3h": number;
}

export interface IShowField {
  /** Snow volume for the last 1 hour */
  "1h": number;
  /** Snow volume for the last 3 hours */
  "3h": number;
}

export interface ISysField {
  /** Internal parameter */
  id: number;
  /** Country code (GB, JP etc.) */
  country: string;
  /** Sunrise time, unix, UTC */
  sunrise: number;
  /** Sunset time, unix, UTC */
  sunset: number;
}

type Nullable<T> = { [P in keyof T]: T[P] | null };

export interface ICityWeather {
  /** City ID */
  id: number;
  /** City name */
  name: string;
  /** Time of data calculation, unix, UTC */
  dt: number;
  /** Shift in seconds from UTC */
  timezone: number;
  main: IMainField;
  wind: IWindField;
  clouds: ICloudsField;
  weather: IWeatherField[];
  rain: Nullable<IRainField>;
  snow: Nullable<IShowField>;
  sys: ISysField;
}

export interface IResponseCityList {
  count: number;
  list: ICityWeather[];
}

/**
 * Call current weather data for one location
 * @link https://openweathermap.org/current#name
 */
export const getWeatherByCityName = async (
  city: string
): Promise<ICityWeather> => {
  const { data } = await request.get<ICityWeather>(`${API_URL}/weather`, {
    params: {
      q: city,
      appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
      units: "metric", // For temperature in Celsius
    },
  });

  return data;
};

/**
 * Returns list of cities by given query
 * @link https://openweathermap.org/current#data
 */
export const getCityList = async (
  query: string
): Promise<IResponseCityList> => {
  const { data } = await request.get<IResponseCityList>(`${API_URL}/find`, {
    params: {
      q: query,
      appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
      units: "metric",
    },
  });

  return data;
};

/**
 * Provides icon url by given id
 * @link https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
 */
export const getIconUrl = (iconId: string) => {
  return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};

export const getCountryFlag = (country: string) => {
  return `https://openweathermap.org/images/flags/${country.toLocaleLowerCase()}.png`;
};
