import { Link, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const NewTaskButton = () => {
  const location = useLocation();

  return (
    <Tooltip title="New Task">
      <IconButton
        color="inherit"
        component={Link}
        to="/tasks/new"
        state={{ from: location }}
      >
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default NewTaskButton;
