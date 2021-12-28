import { useState } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FilterListIcon from "@mui/icons-material/FilterList";
import CheckIcon from "@mui/icons-material/Check";

import useResponsive from "hooks/useResponsive";

// import { TASK_FILTERS } from "constants";
// import { TASK_LIST_FILTER, TASK_LIST_SEARCH } from "store/types";
// import { selectTasks } from "store/reducers/task";

const FilterButton = ({ value, options, badgeVisible, disabled, onChange }) => {
  const { onDesktop } = useResponsive();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <Box>
      {onDesktop ? (
        <Button
          startIcon={<FilterListIcon />}
          onClick={openMenu}
          sx={{
            textTransform: "none",
            borderRadius: 10,
            color: "text.secondary",
            px: 2.5,
          }}
          size="large"
          variant="text"
          disabled={disabled}
        >
          <Badge
            color="secondary"
            variant="dot"
            invisible={badgeVisible?.(value)}
            sx={{
              "& .MuiBadge-badge": {
                top: 8,
                right: -3,
                border: (theme) =>
                  `1.5px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            Filter
          </Badge>
        </Button>
      ) : (
        <IconButton size="large" onClick={openMenu}>
          <Badge
            color="secondary"
            variant="dot"
            invisible={badgeVisible?.(value)}
            sx={{
              "& .MuiBadge-badge": {
                top: 3,
                right: -2,
                border: (theme) =>
                  `1.5px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            <FilterListIcon />
          </Badge>
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 4 }}
        MenuListProps={{ dense: true }}
        disabled={disabled}
      >
        {options.map((item) => (
          <MenuItem
            key={item}
            onClick={() => onChange(item)}
            selected={value === item}
            disabled={disabled}
          >
            {value === item ? (
              <>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                {item}
              </>
            ) : (
              <ListItemText inset>{item}</ListItemText>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterButton;
