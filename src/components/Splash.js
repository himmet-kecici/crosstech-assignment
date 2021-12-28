import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Splash = () => (
  <Backdrop open invisible>
    <CircularProgress color="primary" />
  </Backdrop>
);

export default Splash;
