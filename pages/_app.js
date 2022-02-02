import "../styles/globals.css";
import PropTypes from "prop-types";
import { SessionProvider } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, Paper } from "@mui/material";
import createEmotionCache from "../utility/createEmotionCache";
import lightTheme from "../styles/theme/lightTheme";
import Header from "../components/layout/header";

const clientSideEmotionCache = createEmotionCache();

export function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SessionProvider session={session}>
          <Header />
          <Paper elevation={0} sx={{ marginTop: "2rem", paddingLeft: "2rem" }}>
            <Component {...pageProps} />
          </Paper>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
