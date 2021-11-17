import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useSettings from "../../hooks/useSettings";

const Settings = () => {
  const { settings, toggleField } = useSettings();
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (settings) {
      const settingKeys = Object.keys(settings);

      setOptions(settingKeys);
    }
  }, [settings]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleField(event.target.name);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Settings</FormLabel>
        <FormGroup>
          {options.map((option: string) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={settings[option]}
                  onChange={handleChange}
                  name={option}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Settings;
