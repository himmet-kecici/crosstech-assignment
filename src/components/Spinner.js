import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ full, onClick }) =>
  full ? (
    <Backdrop
      sx={{
        color: (theme) => theme.palette.common.white,
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
      open={true}
      onClick={onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <CircularProgress />
  );

export default Spinner;
