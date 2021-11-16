import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <h1>Weather app</h1>
      <Button variant="contained">Search</Button>
    </React.Fragment>
  );
};

export default App;
