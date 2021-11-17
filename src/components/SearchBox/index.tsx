import React, { useCallback, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { ICityWeather } from "../../services/weather";
import Box from "@mui/material/Box";
import useSearch from "../../hooks/useSearch";
import debounce from "lodash/debounce";

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
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id}>
          {option.name}
        </Box>
      )}
    />
  );
};

export default SearchBox;
