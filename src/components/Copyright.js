import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright = ({ sx, ...props }) => (
  <Typography
    variant="body2"
    color="text.disabled"
    align="center"
    sx={{ fontSize: "small", ...sx }}
    {...props}
  >
    {"Copyright © "}
    <Link color="inherit" href="https://github.com/himmet-kecici">
      Himmet Keçici
    </Link>
    {` ${new Date().getFullYear()}.`}
  </Typography>
);

export default Copyright;
