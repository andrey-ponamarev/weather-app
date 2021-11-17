import { useState } from "react";

interface ISettings {
  [key: string]: boolean;
}

const useSettings = () => {
  const [settings, setSettings] = useState<ISettings>({
    pressure: true,
    humidity: true,
    windSpeed: true,
  });

  const toggleField = (field: string) => {
    if (settings.hasOwnProperty(field)) {
      setSettings({ ...settings, [field]: !settings[field] });
    }
  };
  return { settings, toggleField };
};

export default useSettings;
