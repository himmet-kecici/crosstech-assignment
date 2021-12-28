import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import NewTaskButton from "./NewTaskButton";
import UserButton from "./UserButton";
import Copyright from "./Copyright";

const Layout = ({ children }) => (
  <Stack
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          Task Manager
        </Typography>

        <Stack direction="row" spacing={2}>
          <NewTaskButton />
          <UserButton />
        </Stack>
      </Toolbar>
    </AppBar>

    <Stack
      component="main"
      sx={{ py: 3, p: { sm: 3 }, display: "flex", flex: 1 }}
    >
      <Toolbar />
      {children}
    </Stack>

    <Copyright sx={{ p: 1 }} />
  </Stack>
);

export default Layout;
