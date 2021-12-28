import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-mui";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { SECURE_PATH } from "constants";
import { loginSchema } from "validations";
import { login } from "store/actions/auth";
import { selectAuth } from "store/reducers/auth";
import Copyright from "components/Copyright";
import { Stack } from "@mui/material";

const LoginPage = () => {
  const emailEl = useRef();
  const navigate = useNavigate();
  const from = useLocation()?.state?.from || SECURE_PATH;
  const dispatch = useDispatch();
  const { requesting } = useSelector(selectAuth());

  const onSubmit = ({ email }) => {
    dispatch(login({ email }))
      .then(() => navigate(from, { replace: true }))
      .catch(() => emailEl?.current?.focus?.());
  };

  return (
    <Container component="main" maxWidth="xs">
      <Stack flexDirection="column" alignItems="center" sx={{ mt: 8 }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Formik
          initialValues={{
            email: "",
            remember: false,
          }}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Box
              component={Form}
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Field
                inputRef={emailEl}
                component={TextField}
                type="email"
                name="email"
                label="Email Address"
                disabled={requesting}
                required
                autoFocus
                autoComplete="email"
                margin="normal"
                fullWidth
              />

              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="remember"
                color="primary"
                Label={{ label: "Remember me" }}
                disabled={requesting}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                disabled={requesting}
              >
                Login
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Stack>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
