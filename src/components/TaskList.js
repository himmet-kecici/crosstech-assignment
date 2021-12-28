import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TaskItem from "components/TaskItem";

import useResponsive from "hooks/useResponsive";
import NoData from "./NoData";

const TaskList = ({ title, list, sx, requesting, updating }) => {
  const { onDesktop } = useResponsive();

  return (
    <Stack spacing={2} sx={sx}>
      {!!title && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <Typography
            variant={onDesktop ? "h6" : "body1"}
            color="text.disabled"
            fontWeight={400}
          >
            {title}
          </Typography>

          <Typography variant="caption" color="text.disabled">
            {list.length} {list.length < 2 ? "item" : "items"}
          </Typography>
        </Stack>
      )}

      {!requesting && !list?.length ? (
        onDesktop && <NoData />
      ) : (
        <Stack spacing={2}>
          {list.map((task) => (
            <TaskItem key={task.id} task={task} disabled={updating} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default TaskList;
