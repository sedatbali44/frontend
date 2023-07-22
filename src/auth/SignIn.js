import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthService from './../service/AuthService';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Copyright from "./Copyright";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name,setName]=useState();
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await await AuthService.logIn(name, email, password);
      console.log(response);
      // get user ID and name from the response
      if (response.userId){
         const userId = response.userId;
         const username = response.username;
         const email = response.email;
        // Store user ID and name in the local storage
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        navigate("/home");
      }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error("Invalid credentials");
        setErrorMessage(true);
      } else {
       console.error(error);
       setErrorMessage(true);
     }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorMessage && <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Error occured, please try again — <strong>check it out!</strong>
                  </Alert>}
          <Grid container>
            <Grid item xs={12}>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
       <Grid container>
        <Grid item xs={6}></Grid>
          <Grid item xs={6}>
          <Copyright variant="h6" sx={{ mt: 24, mb: 12 }} />
        </Grid>
       </Grid>
    </Container>
  );
}
