import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { STATUSES } from "constants";
import { getTaskList } from "store/actions/task";
import { selectFilteredTaskList, selectTasks } from "store/reducers/task";
import TaskList from "components/TaskList";
import Spinner from "components/Spinner";
import TasksFilter from "components/TasksFilter";
import useResponsive from "hooks/useResponsive";

const TasksPage = () => {
  const dispatch = useDispatch();
  const { onDesktop } = useResponsive();
  const { requesting, updating } = useSelector(selectTasks());
  const list = useSelector(selectFilteredTaskList);

  useEffect(() => {
    dispatch(getTaskList());
  }, [dispatch]);

  return (
    <>
      <Stack sx={{ flex: 1 }}>
        <TasksFilter
          sx={updating ? { filter: "grayscale(100%) blur(2px)" } : {}}
          disabled={updating}
        />

        <Stack
          spacing={2}
          direction={onDesktop ? "row" : "column"}
          justifyContent={onDesktop ? "center" : undefined}
          divider={
            onDesktop && (
              <Divider
                orientation={onDesktop ? "vertical" : "horizontal"}
                sx={
                  !onDesktop
                    ? {}
                    : {
                        mt: (theme) => `${theme.spacing(-1)} !important`,
                        mb: (theme) => `${theme.spacing(-2)} !important`,
                      }
                }
                flexItem
              />
            )
          }
          sx={{
            flex: 1,
            ...(updating ? { filter: "grayscale(100%) blur(2px)" } : {}),
          }}
        >
          {STATUSES.map((status) => (
            <TaskList
              key={status.code}
              title={status.title}
              color={status.titleColor}
              list={list.filter((item) => item.status === status.code)}
              sx={{ flex: { xs: undefined, sm: "0 1 100%" } }}
              requesting={requesting}
              updating={updating}
            />
          ))}
        </Stack>
      </Stack>

      <Outlet />

      {requesting && <Spinner full />}
    </>
  );
};

export default TasksPage;
