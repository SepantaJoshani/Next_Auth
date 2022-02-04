import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Slide } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref}  variant="filled" {...props} />;
});

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

const AlertSnack = ({
  open,
  backgroundColor,
  onClose,
  severity,
  alertMessage,
 
}) => {
  return (
    <Snackbar
      open={open}
      message={alertMessage}
      ContentProps={{
        style: {
          background: backgroundColor,
        },
      }}
      sx={{ width: "100%" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
      autoHideDuration={4000}
      TransitionComponent={TransitionLeft}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: {
            xs: "100%",
            sm: "300px",
          },
        }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default React.memo(AlertSnack);
