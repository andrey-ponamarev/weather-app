import React, { useCallback, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getCountryFlag,
  getIconUrl,
  ICityWeather,
} from "../../services/weather";
import Box from "@mui/material/Box";
import useSearch from "../../hooks/useSearch";
import debounce from "lodash/debounce";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const FlagIcon = styled.img`
  height: 1rem;
  margin: auto 10px;
`;

const WeatherIcon = styled.img`
  height: 20px;
  width: 40px;
  object-fit: cover;
  margin-left: 1rem;
`;

interface IProps {
  onSelect: (city: ICityWeather) => void;
}

const SearchBox: React.FC<IProps> = (props) => {
  const { loading, data, searchPlace } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<ICityWeather[]>([]);

  const updateSearch = useCallback(debounce(searchPlace, 500), []);

  // Display options from dropdown
  useEffect(() => {
    if (data !== null) {
      setOptions(data.list);
    }
  }, [data, loading]);

  // Search for query
  useEffect(() => {
    if (inputValue.length > 3) {
      updateSearch(inputValue);
    }
  }, [inputValue]);

  return (
    <Autocomplete
      id="search-city"
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search city"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      onChange={(event, place) => {
        props.onSelect(place as ICityWeather);
      }}
      freeSolo
      renderOption={(props, option) => {
        const { main, id, sys, weather, name } = option;
        const currentWeather = weather[0];

        return (
          <Box component="li" {...props} key={id}>
            <Grid container alignContent="center" justifyContent="start">
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  {name}
                  {", "}
                  {sys.country}
                  <FlagIcon
                    alt={sys.country}
                    src={getCountryFlag(sys.country)}
                  />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">
                  {main.temp}°C
                  <WeatherIcon
                    alt="Weather icon"
                    src={getIconUrl(currentWeather.icon)}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    />
  );
};

export default SearchBox;
