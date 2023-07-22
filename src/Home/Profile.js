import { Typography } from '@mui/material';
import React from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Profile() {
  //const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");
  const email =localStorage.getItem("email");
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
          <Typography>{"User Name:"}{userName}</Typography>
          <Typography>{"Email:"}{email}</Typography>
        </Box>
    </Container>
  )
}
