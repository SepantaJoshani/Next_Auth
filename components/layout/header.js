import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import { NextLinkComposed } from "./link/mui-link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Hidden, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { data: session } = useSession();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const routes = React.useMemo(() => {
    const routes = [
      {
        name: "Home",
        link: "/",
        activeIndex: 0,
      },
      {
        name: "Register",
        link: "/register",
        activeIndex: 1,
      },
      !session
        ? {
            name: "Login",
            link: "/login",
            activeIndex: 2,
          }
        : {
            name: "Profile",
            link: "/profile",
            activeIndex: 2,
          },
    ];
    return routes;
  }, [session]);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const path = typeof window !== "undefined" && window.location.pathname;

  React.useEffect(() => {
    const currentTab = routes.find((route) => route.link === path);

    if (!currentTab) {
      setValue(false);
    } else {
      setValue(currentTab.activeIndex);
    }
  }, [path]);

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid container sx direction={mdDown ? "column" : "row"}>
              <Grid md={7} xl={8} item>
                <Typography variant={mdDown ? "h5" : "h4"}>
                  Next-Auth
                </Typography>
              </Grid>
              <Hidden mdDown>
                <Grid item>
                  <Tabs
                    orientation={mdDown ? "vertical" : "horizontal"}
                    TabIndicatorProps={{ style: { display: "none" } }}
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs navigation"
                  >
                    {routes.map((router) => (
                      <Tab
                        value={router.activeIndex}
                        key={router.activeIndex}
                        label={router.name}
                        onClick={handleCloseNavMenu}
                        sx={{
                          mr: "auto",
                          color: "white",
                          display: "block",

                          "&.Mui-selected": {
                            border: "2px solid #fff",
                            color: "#fff",
                            borderRadius: 5,
                          },
                          paddingX: {
                            xs: 4,
                            xl: 6,
                          },
                        }}
                        component={NextLinkComposed}
                        to={router.link}
                      />
                    ))}
                  </Tabs>
                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
        </Container>
        <Box
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          sx={{
            position: "absolute",
            top: 12,
            right: 10,
            display: mdDown ? "block" : "none",
          }}
        >
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </Box>
      </AppBar>
      <Toolbar />
      <Hidden mdUp>
        <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => setIsDrawerOpen(true)}
        >
          <List>
            {routes.map((route) => (
              <ListItem
                onClick={() => setIsDrawerOpen(false)}
                key={route.activeIndex}
                component={NextLinkComposed}
                to={route.link}
                value={route.activeIndex}
                sx={{
                  px: 5,
                  py: 2,
                  borderBottom: "1px solid white",
                  ":hover": {
                    opacity: 0.5,
                  },
                }}
              >
                {route.name}
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
      </Hidden>
    </>
  );
};
export default Header;
