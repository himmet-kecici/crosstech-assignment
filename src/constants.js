import theme from "theme";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { completeTask, rejectTask } from "store/actions/task";

export const LOGIN_PATH = "/login";
export const SECURE_PATH = "/";
export const TOKEN_LOCAL_STORAGE_KEY = "token";

export const STATUSES = [
  {
    code: 0,
    title: "Pending",
    itemColor: theme.palette.text.disabled,
    titleColor: theme.palette.text.disabled,
  },
  {
    code: 1,
    title: "Completed",
    itemColor: theme.palette.success.main,
    titleColor: theme.palette.success.light,
    action: completeTask,
    Icon: CheckIcon,
  },
  {
    code: 2,
    title: "Rejected",
    itemColor: theme.palette.error.main,
    titleColor: theme.palette.error.light,
    action: rejectTask,
    Icon: DoDisturbIcon,
  },
];

export const DEPARTMENTS = [
  {
    code: 0,
    title: "Human Resources",
    color: theme.palette.info.main,
  },
  {
    code: 1,
    title: "Sales",
    color: theme.palette.success.dark,
  },
  {
    code: 2,
    title: "Marketing",
    color: theme.palette.error.dark,
  },
];

export const TASK_FILTERS = {
  all: "All",
  myTasks: "My Tasks",
  myDepTasks: "My Department Tasks",
};
