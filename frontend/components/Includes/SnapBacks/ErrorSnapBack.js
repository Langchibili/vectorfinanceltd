import { Alert, Snackbar } from "@mui/material"

const ErrorSnapBack = ({errorMessage})=>{
    return (<Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={true}
        autoHideDuration={5000}
        message="There is an error."
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
        {errorMessage || "!Oops. Something went wrong."}
      </Alert>
     </Snackbar>)
}
export default ErrorSnapBack