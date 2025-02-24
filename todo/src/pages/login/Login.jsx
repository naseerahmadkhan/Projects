import React,{useRef,useState} from "react"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  Button,
  IconButton,
  TextField,
  Input,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@mui/material"
import Typography from "@mui/material/Typography"
import { handleLoginWithUserAndPassword } from "../../firebase/userAuthOperations/userAuthOperations"
const Login = ({handleAuth}) => {

    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const [error, setError] = useState(false);

    const validateEmail = () => {
        const value = emailRef.current.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setError(!isValid);
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const email = emailRef.current.value;
        const pwd = pwdRef.current.value;
        handleAuth(email,pwd)
    }
  return (
    <Box sx={{display:'flex',height:"100vh",justifyContent:'center',alignItems:'center'}}>
          <Box sx={{width:'70%', textAlign:'center' }} component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input required type="email" inputRef={emailRef} id="my-input" aria-describedby="my-helper-text" inputProps={{ onBlur: validateEmail }}/>
          <FormHelperText id="my-helper-text">
          {error ? "Enter a valid email address" : "We'll never share your email."}
        </FormHelperText>
        </FormControl>

        <TextField
          inputRef={pwdRef}  
          required  
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <Button
          fullWidth
          sx={{ height: 50 }}
          variant="contained"
          onClick={() => {}}
          type="submit"
        >
          Login
        </Button>
      </Stack>
    </Box>

    </Box>
  
  )
}

export default Login
