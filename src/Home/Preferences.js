import  React, { useEffect, useState }  from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import PreferencesService from '../service/PreferencesService';
import { Link ,Typography} from '@mui/material';


export default function Preferences() {
  const userId = localStorage.getItem("userId");
  const [preferences, setPreferences] = useState([]);
  // const userName = localStorage.getItem("username");
  // const email =localStorage.getItem("email");
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const preferencesData = await PreferencesService.getPreferencesByUserId(
          userId
        );
        setPreferences(preferencesData.preferences);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPreferences();
  }, [userId]);
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Your preferences
      </Typography>
      <List component="nav" aria-label="mailbox folders">
        {preferences.map((preference) => (
          <React.Fragment key={preference.id}>
            <ListItem>
              <ListItemText primary="Category" />
              {preference.category}
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText primary="Source" />
              {preference.source}
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Author" />
              {preference.author}
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Url" />
              <Link href={`https://${preference.url}`} target="_blank" rel="noopener noreferrer" variant="subtitle2">
                {preference.url}
              </Link>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Button href="/home" variant="contained">
        Back to home
      </Button>
    </Container>
  )
}
