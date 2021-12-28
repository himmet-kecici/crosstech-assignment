import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { forwardRef } from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.light,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const AvatarStatusBadge = forwardRef((props, ref) => (
  <StyledBadge
    ref={ref}
    overlap="circular"
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    variant="dot"
    {...props}
  />
));

export default AvatarStatusBadge;
