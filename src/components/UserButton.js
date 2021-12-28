import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import RestoreIcon from "@mui/icons-material/Restore";
import LogoutIcon from "@mui/icons-material/Logout";

import { getFirstLetters } from "utils/string";
import { logout } from "store/actions/auth";
import { resetData } from "store/actions/task";
import { selectAuth } from "store/reducers/auth";
import AvatarStatusBadge from "./AvatarStatusBadge";

const UserButton = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector(selectAuth());

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const onLogout = () => dispatch(logout());
  const onResetData = () => dispatch(resetData());

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={user.name}>
        <AvatarStatusBadge>
          <IconButton onClick={openMenu} sx={{ p: 0 }}>
            <Avatar
              alt={user.name}
              src={user.imageUrl}
              sx={{
                width: { xs: 42, sm: 48 },
                height: { xs: 42, sm: 48 },
                bgcolor: (theme) => theme.palette.text.disabled,
              }}
            >
              {getFirstLetters(user.name)}
            </Avatar>
          </IconButton>
        </AvatarStatusBadge>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: "45px" }}
      >
        <MenuItem disabled>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem disabled>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          My account
        </MenuItem>

        <Divider />

        <MenuItem disabled>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={onResetData}>
          <ListItemIcon>
            <RestoreIcon fontSize="small" />
          </ListItemIcon>
          Reset Data
        </MenuItem>

        <MenuItem disabled>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        <Divider />

        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserButton;
