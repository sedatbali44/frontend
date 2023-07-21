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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Copyright from "./Copyright";

export default function SingUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("");
  const [message, setMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      setMessage(true);
      setErrorMessage(false); 
      navigate("/home");
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
       Create an account
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
          sx={{ mt: 3, mb: 2}}
          color="success"
        >
          Sign Up
        </Button>
        {message && <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Account has been created— <strong>You can login!</strong>
                </Alert>}
        {errorMessage && <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Error occured, please try again — <strong>check it out!</strong>
                  </Alert>}        
        <Grid container>
          <Grid item>
            <Link href="/" variant="body2">
              {"Already an account? Sign In"}
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
  )
}
