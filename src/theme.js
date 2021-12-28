import { createTheme } from "@mui/material/styles";
import { blue, grey, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    background: {
      default: grey[200],
    },
    secondary: {
      main: blue[900],
    },
    primary: {
      main: indigo[700],
    },
  },
});

export default theme;
