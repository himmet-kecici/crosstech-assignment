import { useSelector, useDispatch } from "react-redux";
import Toolbar from "@mui/material/Toolbar";

import { TASK_FILTERS } from "constants";
import { TASK_LIST_FILTER, TASK_LIST_SEARCH } from "store/types";
import { selectTasks } from "store/reducers/task";
import FilterButton from "./FilterButton";
import SearchField from "./SearchField";

const TasksFilter = ({ sx, disabled }) => {
  const dispatch = useDispatch();
  const { search, filter } = useSelector(selectTasks());

  const onSearchChange = (event) => {
    const value = event.target.value;
    dispatch({ type: TASK_LIST_SEARCH, payload: value });
  };

  const onFilterChange = (value) => {
    dispatch({ type: TASK_LIST_FILTER, payload: value });
  };

  return (
    <Toolbar
      variant="dense"
      sx={{
        justifyContent: "space-between",
        gap: 1,
        mt: -1,
        mb: 2,
        ...sx,
      }}
      disableGutters
    >
      <SearchField
        value={search}
        onChange={onSearchChange}
        disabled={disabled}
      />

      <FilterButton
        value={filter}
        options={Object.values(TASK_FILTERS)}
        badgeVisible={(value) => value === TASK_FILTERS.all}
        disabled={disabled}
        onChange={onFilterChange}
      />
    </Toolbar>
  );
};

export default TasksFilter;
