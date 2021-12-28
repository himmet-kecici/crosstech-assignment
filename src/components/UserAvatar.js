import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { getFirstLetters } from "utils/string";

const UserAvatar = ({ user, tooltipText, sx, ...rest }) => (
  <Tooltip title={tooltipText?.(user?.name) || user?.name}>
    <Avatar
      {...rest}
      alt={user.name}
      src={user.imageUrl}
      sx={{
        ...sx,
        fontSize: "1rem",
        bgcolor: "text.disabled",
      }}
    >
      {getFirstLetters(user.name)}
    </Avatar>
  </Tooltip>
);

export default UserAvatar;
