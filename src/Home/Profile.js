import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";

const style = {
   width: '100%',
   maxWidth: 360,
   bgcolor: 'background.paper',
 };

export default function Profile() {
  const userName = localStorage.getItem("username");
  const email =localStorage.getItem("email");
  return (
   <Container component="main" maxWidth="xs">
       <List sx={style} component="nav" aria-label="mailbox folders">
         <ListItem button>
           <ListItemText primary="User Name" />
          {userName}
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Email address" />
           {email}
         </ListItem>
       </List>
       <Button href="/home" variant="contained">Back to home</Button>
   </Container>  
  )
}
