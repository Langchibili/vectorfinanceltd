import { Alert, Snackbar } from "@mui/material"
const WarningSnapBack = ({errorMessage,handleOpenErrorSnapBack})=>{
    return (<Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={5000}
        message="There is an error."
        onClose={handleOpenErrorSnapBack} 
      >
        <Alert
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
        {errorMessage || "!Oops. Something went wrong."}
      </Alert>
     </Snackbar>)
}
export default WarningSnapBack