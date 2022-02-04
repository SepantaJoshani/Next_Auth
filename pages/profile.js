import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";

const Profile = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "70vh" }}
    >
      <Grid item>
        <Paper elevation={3} style={{ padding: 0 }} variant="elevation">
          <Grid item container alignItems="center" direction="column">
            <Grid
              item
              sx={{
                marginBottom: {
                  xs: "1rem",
                  md: "1.5rem",
                  lg: "2rem",
                },
                paddingX: {
                  xs: "2rem",
                  sm: "3rem",
                  md: "4rem",
                },
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Welcome
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                marginBottom: {
                  xs: "1rem",
                  md: "1.5rem",
                },
              }}
            >
              <Typography variant="h6">Hi dear</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
