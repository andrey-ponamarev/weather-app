import Button, { ButtonProps } from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";

const RefreshButton = (props: ButtonProps) => (
  <Button variant="contained" startIcon={<RefreshIcon />} {...props}>
    Refresh
  </Button>
);

export default RefreshButton;
