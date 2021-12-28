import { Link, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { STATUSES, DEPARTMENTS } from "constants";
import UserAvatar from "./UserAvatar";
import TaskItemMenu from "./TaskItemMenu";

const TaskItem = ({ task, disabled }) => {
  const location = useLocation();
  const status = STATUSES.find((s) => s.code === task.status);
  const department = DEPARTMENTS.find(
    (d) => d.code === task.assignedDepartment
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea
        component={Link}
        to={"/tasks/" + task.id}
        state={{ from: location }}
        disabled={disabled}
      >
        <CardHeader
          avatar={
            <Tooltip title={`${status?.title} Task`}>
              <Chip
                sx={{
                  width: (theme) => theme.spacing(0.5),
                  height: "100%",
                  bgcolor: status?.itemColor,
                  opacity: 0.75,
                }}
              />
            </Tooltip>
          }
          action={<TaskItemMenu task={task} disabled={disabled} />}
          title={task.title}
          titleTypographyProps={{ variant: "body1" }}
          subheader={department.title}
          subheaderTypographyProps={{
            variant: "caption",
            color: "text.secondary",
            sx: { letterSpacing: 0 },
          }}
          sx={{
            pb: 0.5,
            "& > .MuiCardHeader-avatar": {
              alignSelf: "stretch",
              mr: 1.25,
            },
          }}
        />

        <CardContent sx={{ pt: 0.5 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {task.description}
            </Typography>

            <UserAvatar
              user={task.user}
              tooltipText={(userName) => `Created by ${userName}`}
              sx={{ alignSelf: "flex-end" }}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TaskItem;
