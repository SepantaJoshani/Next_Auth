import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";
import { getSession, signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import AlertSnack from "../components/alert-snack/alert-snack";
import { AlertContext } from "../context/alert-context";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import GithubButton from "react-github-login-button";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function SignIn() {
  const router = useRouter();
  const alertCtx = React.useContext(AlertContext);
  const {
    open,
    closeHandler,
    successHandler,
    message,
    backgroundColor,
    severity,
    errorHandler,
  } = alertCtx;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, config) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email.toLowerCase(),
        password: values.password,
      });

      if (result.error) {
        errorHandler("Wrong Password");
      } else if (!result.error) {
        router.replace("/");
      }

      config.resetForm();
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={formik.touched.email && formik.errors.email && true}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...formik.getFieldProps("email")}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <TextField
              error={formik.touched.password && formik.errors.password && true}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formik.isValid}
            >
              {formik.isSubmitting ? (
                <CircularProgress color="secondary" />
              ) : (
                "Sign in"
              )}
            </Button>
            <GoogleButton
              onClick={() => {
                signIn("google");
              }}
              style={{ width: "100%", background: "#1976d2" }}
            />
            <GithubButton
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={() => signIn("github")}
            />
            <Grid
              container
              justifyContent="flex-end"
              sx={{ marginTop: "1rem" }}
            >
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <AlertSnack
        open={open}
        onClose={closeHandler}
        backgroundColor={backgroundColor}
        severity={severity}
        alertMessage={message}
        autoHideDuration={false}
      />
    </ThemeProvider>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default SignIn;
