import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { ICityWeather } from "../../services/weather";
import Box from "@mui/material/Box";
import useSearch from "../../hooks/useSearch";

interface IProps {
  onSelect: (city: ICityWeather) => void;
}

const SearchBox: React.FC<IProps> = (props) => {
  const { loading, data, searchPlace } = useSearch();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<ICityWeather[]>([]);

  React.useEffect(() => {
    if (data === null) {
      return;
    }

    setOptions(data.list);
  }, [data, loading]);

  React.useEffect(() => {
    if (inputValue === "" || inputValue.length < 3) {
      return;
    }
    // TODO: implement debounce to avoid a lot of API calls
    searchPlace(inputValue);
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
