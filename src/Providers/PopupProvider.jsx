import { Snackbar, Alert } from "@mui/material";
import { createContext, useState } from "react";
export const PopupContext = createContext()

const PopupProvider = ({ children }) => {
   const [snackbarProps, setSnackbarProps] = useState({
      open: false,
      variant: "",
      severity: "success",
      placement: { vertical: "top", horizontal: "center" },
      duration: 2000,
      message: ""
   })
   const showSnackbar = ({ message = "", variant = "filled", severity = "success", open, placement = { vertical: "top", horizontal: "center" }, duration = 2000, }) => {
      setSnackbarProps({
         open,
         variant,
         placement,
         duration,
         message,
         severity
      })
   }
   const handleClose = () => {


      setSnackbarProps({
         open: false,
         variant: "",
         placement: { vertical: "top", horizontal: "center" },
         duration: 2000,
         message: ""
      })
   }
   return (<PopupContext.Provider value={{ showSnackbar }}>
      <Snackbar
         anchorOrigin={{ ...snackbarProps.placement }}
         open={snackbarProps.open}
         onClose={handleClose}
         duration={snackbarProps.duration}
      ><Alert
         closeText="close"
         variant={snackbarProps.variant}
         severity={snackbarProps.severity}
         sx={{
            minWidth: "30vw",
            borderRadius: "20px",
            opacity: snackbarProps.open ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            visibility: snackbarProps.open ? "visible" : "hidden",
         }}     
          >{snackbarProps.message}
         </Alert></Snackbar>
      {children}
   </PopupContext.Provider>)
}

export default PopupProvider