import RefreshIcon from "@mui/icons-material/Refresh";
import Fab, { FabProps } from "@mui/material/Fab";
import { styled } from "@mui/material/styles";

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;
const RefreshButton = (props: FabProps) => (
  <StyledFab {...props} color="primary" aria-label="refresh">
    <RefreshIcon />
  </StyledFab>
);

export default RefreshButton;
