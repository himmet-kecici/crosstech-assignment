import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useResponsive = () => {
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return { onDesktop };
};

export default useResponsive;
