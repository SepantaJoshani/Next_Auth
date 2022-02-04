import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import * as Yup from "yup";
import AlertSnack from "../components/alert-snack/alert-snack";
import { AlertContext } from "../context/alert-context";
import { useRouter } from "next/router";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getSession } from "next-auth/react";

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more"),
  changePassword: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more"),
});

const Profile = () => {
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
      password: "",
      changePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, config) => {
      try {
        const { data } = await axios.put("/api/user/change-password", {
          oldPassword: values.password,
          newPassword: values.changePassword,
        });
        console.log(data);
        router.push("/");
      } catch (error) {
        console.log(error);
        errorHandler(error.response.data.message || "Sign In with credentials");
      }

      config.resetForm();
    },
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "70vh" }}
    >
      <Grid item>
        <Paper
          elevation={3}
          style={{ padding: 0 }}
          sx={{
            width: {
              sm: 400,
              md: 500,
            },
          }}
        >
          <Grid item container direction="column">
            <Grid
              item
              sx={{
                marginBottom: {
                  xs: "1rem",
                  md: "1.5rem",
                  lg: "2rem",
                },
                marginTop: "1rem",
                paddingX: {
                  xs: "2rem",
                  sm: "3rem",
                  md: "4rem",
                },
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "1.5rem",
                  },
                }}
              >
                Change Password
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ px: 2 }}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <Grid item container direction="column">
                <Grid item>
                  <TextField
                    error={
                      formik.touched.password && formik.errors.password && true
                    }
                    required
                    fullWidth
                    name="password"
                    label="old password"
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
                <Grid item>
                  <TextField
                    sx={{ mt: 2 }}
                    error={
                      formik.touched.changePassword &&
                      formik.errors.changePassword &&
                      true
                    }
                    required
                    fullWidth
                    name="changePassword"
                    label="new password"
                    type="password"
                    id="changePassword"
                    autoComplete="change-password"
                    {...formik.getFieldProps("changePassword")}
                    helperText={
                      formik.touched.changePassword &&
                      formik.errors.changePassword
                        ? formik.errors.changePassword
                        : null
                    }
                  />
                </Grid>
                <Grid item>
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
                      "Change Password"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <AlertSnack
        open={open}
        onClose={closeHandler}
        backgroundColor={backgroundColor}
        severity={severity}
        alertMessage={message}
        autoHideDuration={false}
      />
    </Grid>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });

  if (!session) {
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

export default Profile;
