import React from 'react'
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" target="_blank" href="https://github.com/sedatbali44">
        Sedat Bali
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  )
}
