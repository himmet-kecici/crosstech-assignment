import { Routes, Route } from "react-router-dom";

import { LOGIN_PATH } from "constants";
import useInit from "hooks/useInit";
import Splash from "components/Splash";
import Logger from "components/Logger";
import RequireAuth from "components/RequireAuth";
import LoginPage from "pages/login";
import IndexPage from "pages/index";
import TasksPage from "pages/tasks";
import TaskDetailPage from "pages/taskDetail";

const App = () => {
  const loading = useInit();

  return loading ? (
    <Splash />
  ) : (
    <>
      <Logger />
      <Routes>
        <Route path={LOGIN_PATH} element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth redirectTo={LOGIN_PATH}>
              <IndexPage />
            </RequireAuth>
          }
        >
          <Route path="tasks" element={<TasksPage />}>
            <Route path=":id" element={<TaskDetailPage />} />
            <Route path="new" element={<TaskDetailPage isNew />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
