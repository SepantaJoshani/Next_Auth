import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AlertSnack from "../components/alert-snack/alert-snack";
import { AlertContext } from "../context/alert-context";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MuiLink
        color="inherit"
        sx={{ textDecoration: "none" }}
        href="https://mui.com/"
      >
        Your Website
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

 function SignUp() {
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

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, config) => {
      try {
        const { data } = await axios.post("/api/register", {
          email: values.email.toLowerCase(),
          password: values.password,
        });

        console.log(data);
      } catch (error) {
        errorHandler(error.response.data.message);
      }

      config.resetForm();
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      
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
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={
                  formik.touched.firstName && formik.errors.firstName && true
                }
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...formik.getFieldProps("firstName")}
                helperText={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={
                  formik.touched.lastName && formik.errors.lastName && true
                }
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                {...formik.getFieldProps("lastName")}
                helperText={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={formik.touched.email && formik.errors.email && true}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  formik.touched.password && formik.errors.password && true
                }
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...formik.getFieldProps("password")}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formik.isValid}
          >
            {formik.isSubmitting ? <CircularProgress color="secondary" /> : "Sign up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink href="/login" variant="body2">
                Already have an account? Sign in
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
      <AlertSnack
        open={open}
        onClose={closeHandler}
        backgroundColor={backgroundColor}
        severity={severity}
        alertMessage={message}
        autoHideDuration={false}
      />
    </Container>
  );
}


export default SignUp;
