import { useState } from "react";

export interface ISettings {
  pressure: boolean;
  humidity: boolean;
  windSpeed: boolean;
}

export type ISettingField = keyof ISettings;

const useSettings = () => {
  const [settings, setSettings] = useState<ISettings>({
    pressure: true,
    humidity: true,
    windSpeed: true,
  });

  const toggleField = (field: ISettingField) => {
    if (settings.hasOwnProperty(field)) {
      setSettings({ ...settings, [field]: !settings[field] });
    }
  };
  return { settings, toggleField };
};

export default useSettings;
