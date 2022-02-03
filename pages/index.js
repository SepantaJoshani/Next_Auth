import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function Component() {
  const { data: session } = useSession();
  console.log(session);


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
              {session && (
                <Typography variant="h6">Hi dear {session.user.name ||session.user.email} </Typography>
              )}
              {!session && (
                <Typography variant="h6">
                  Hi Stranger , Please Sign in{" "}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  marginBottom: {
                    xs: "1rem",
                    md: "1.5rem",
                  },
                }}
                onClick={() => {
                  if (!session) {
                    signIn("google");
                  } else {
                    signOut();
                  }
                }}
              >
                {session && "Sign out"}
                {!session && "Sign in"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
