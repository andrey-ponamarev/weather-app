import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ISettings, ISettingField } from "../../hooks/useSettings";

interface ISettingsProps {
  settings: ISettings;
  toggleField: (field: ISettingField) => void;
}

enum SettingsLabels {
  pressure = "Pressure",
  humidity = "Humidity",
  windSpeed = "Wind speed",
}

const Settings: React.FC<ISettingsProps> = ({ settings, toggleField }) => {
  const [options, setOptions] = useState<ISettingField[]>([]);

  useEffect(() => {
    if (settings) {
      const settingKeys = Object.keys(settings) as ISettingField[];

      setOptions(settingKeys);
    }
  }, [settings]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleField(event.target.name as ISettingField);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Settings</FormLabel>
        <FormGroup>
          {options.map((option: ISettingField) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={settings[option]}
                  onChange={handleChange}
                  name={option}
                />
              }
              label={SettingsLabels[option]}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default Settings;
