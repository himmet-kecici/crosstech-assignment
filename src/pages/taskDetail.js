import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

import { SECURE_PATH, DEPARTMENTS, STATUSES } from "constants";
import { TASK_DETAIL_RESET } from "store/types";
import { selectAuth } from "store/reducers/auth";
import { selectTasks } from "store/reducers/task";
import { selectTaskDetail } from "store/reducers/taskDetail";
import { getTaskDetail, createTask, updateTask } from "store/actions/task";
import { createTaskSchema, updateTaskSchema } from "validations";
import { FormSelectField, FormTextField } from "components/FormFields";
import Spinner from "components/Spinner";
import useResponsive from "hooks/useResponsive";

const TaskDetailPage = ({ isNew }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onDesktop } = useResponsive();
  const { user } = useSelector(selectAuth());
  const { requesting: listRequesting } = useSelector(selectTasks());
  const { requesting, data } = useSelector(selectTaskDetail());
  const loading = (!isNew && requesting) || listRequesting;
  const readOnly = !isNew && (data?.user?.id !== user.id || loading);

  useEffect(() => {
    if (!isNew) dispatch(getTaskDetail(id));
  }, [isNew, dispatch, id]);

  const goBack = useCallback(() => {
    dispatch({ type: TASK_DETAIL_RESET });
    navigate(location?.state?.from || SECURE_PATH);
  }, [navigate, location?.state?.from, dispatch]);

  useEffect(() => {
    if (!isNew && !loading && !data) goBack();
  }, [isNew, loading, data, goBack]);

  const initialValues = {
    title: data?.title ?? "",
    description: data?.description ?? "",
    assignedDepartment: data?.assignedDepartment ?? "",
    status: data?.status ?? "",
  };

  const valueTypes = {
    title: { submit: true, isNum: false },
    description: { submit: true, isNum: false },
    assignedDepartment: { submit: !!isNew, isNum: true },
    status: { submit: false, isNum: true },
  };

  const onSubmit = (values) => {
    const submitParams = Object.fromEntries(
      Object.entries(values)
        .filter(([key]) => valueTypes[key]?.submit)
        .map(([key, value]) => {
          if (!value || !valueTypes[key]?.isNum) return [key, value];
          return [key, Number(value)];
        })
    );

    const submitAction = isNew
      ? createTask(submitParams)
      : updateTask(id, submitParams);

    dispatch(submitAction).then(() => goBack());
  };

  return loading ? (
    <Spinner full />
  ) : (
    (isNew || !!data) && (
      <Formik
        initialValues={initialValues}
        validationSchema={isNew ? createTaskSchema : updateTaskSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Dialog
            open={true}
            onClose={goBack}
            component={Form}
            onSubmit={handleSubmit}
          >
            <DialogTitle>
              {isNew ? "New Task" : readOnly ? "Task Detail" : "Edit Task"}
            </DialogTitle>

            <DialogContent>
              <FormTextField
                name="title"
                label="Title"
                disabled={readOnly}
                required
              />

              <FormTextField
                name="description"
                label="Description"
                disabled={readOnly}
                multiline
                minRows={3}
                maxRows={10}
              />

              <Stack
                direction={onDesktop ? "row" : "column"}
                spacing={onDesktop ? 3 : undefined}
              >
                <div>
                  <FormSelectField
                    name="assignedDepartment"
                    label="Department"
                    disabled={readOnly}
                    readOnly={!isNew}
                    required={isNew}
                  >
                    {DEPARTMENTS.map((dep) => (
                      <MenuItem key={dep.code} value={dep.code}>
                        {dep.title}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </div>

                <div>
                  {!isNew && (
                    <FormSelectField
                      name="status"
                      label="Status"
                      disabled={readOnly}
                      readOnly
                    >
                      {STATUSES.map((status) => (
                        <MenuItem key={status.code} value={status.code}>
                          {status.title}
                        </MenuItem>
                      ))}
                    </FormSelectField>
                  )}
                </div>
              </Stack>
            </DialogContent>

            <DialogActions>
              {readOnly ? (
                <Button onClick={goBack}>Close</Button>
              ) : (
                <>
                  <Button onClick={goBack}>Cancel</Button>
                  <Button type="submit" disabled={readOnly}>
                    Save
                  </Button>
                </>
              )}
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    )
  );
};

export default TaskDetailPage;
