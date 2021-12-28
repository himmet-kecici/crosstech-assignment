import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { STATUSES } from "constants";
import { selectAuth } from "store/reducers/auth";
import { deleteTask } from "store/actions/task";

const TaskItemMenu = ({ task, disabled }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector(selectAuth());
  const canDelete = user.id === task.user.id;
  const sameDepartment = user.department === task.assignedDepartment;
  const canModifyStatus = task.status === 0 && sameDepartment;

  const openMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Actions">
        <span>
          <IconButton onClick={openMenu} disabled={disabled}>
            <MoreVertIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClick={(e) => e.stopPropagation()}
        MenuListProps={{ dense: true, sx: { minWidth: 200 } }}
        disabled={disabled}
        sx={{
          mt: 5,
          ...(disabled ? { filter: "grayscale(100%) blur(2px)" } : {}),
        }}
      >
        {STATUSES.filter((s) => s.action).map((status) => (
          <MenuItem
            key={status.code}
            disabled={disabled || !canModifyStatus}
            fontSize="small"
            onClick={() => dispatch(status.action(task.id))}
          >
            <ListItemIcon>
              <status.Icon fontSize="small" sx={{ color: status.itemColor }} />
            </ListItemIcon>
            Mark as {status.title}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem
          disabled={disabled || !canDelete}
          onClick={() => dispatch(deleteTask(task.id))}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskItemMenu;
