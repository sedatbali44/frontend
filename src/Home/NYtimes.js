import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import NYtimesService from './../service/NYtimesService';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Link } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import PreferencesService from '../service/PreferencesService';

export default function NYtimes() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isThumbUpClicked, setIsThumbUpClicked] = useState(false); // New state variable
  const userName = localStorage.getItem("username");
  const userId =localStorage.getItem("userId");
  const  [likedNewsId, setLikedNewsId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {results} = await NYtimesService.getNYtimesNews();
        setArticles(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleCardClick = (articleId) => {
    setSelectedArticle(articleId);
    setOpenDialog(true);
  };

  const ArticleDialog = () => {
    // Find the selected article based on its ID
    const selectedArticleData = articles.find(article => article.id === selectedArticle);

    // Return null if no article is selected or not found
    if (!selectedArticleData) return null;
    const saveLikedNews= async () => { //save liked news
      setIsThumbUpClicked(!isThumbUpClicked);
       try{ 
        if(!isThumbUpClicked) { const { likedNews } = await PreferencesService.createPreferencesWithUserIdAndName(userId,userName,selectedArticleData.section,
          selectedArticleData.byline,selectedArticleData.source, selectedArticleData.url); 
         console.log(likedNews.message);
         setLikedNewsId(likedNews.preference.id);
         console.log("likedNewsId",likedNewsId);
        } 
        if(isThumbUpClicked) {
          const { deleteNews } = await PreferencesService.deleteLikedNewsByid(likedNewsId);
          console.log(deleteNews);
          }
        }
       catch(error){
        console.error("Invalid credentials");
       }
      }
    return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedArticleData.title}</DialogTitle>
        <DialogContent>
        <Typography variant="subtitle1">{selectedArticleData.byline}</Typography>    
          <Typography variant="body2" color="text.secondary">
            {selectedArticleData.published_date}
          </Typography>
          <ThumbUpOffAltIcon style={{ color: isThumbUpClicked ? "orange" : "black" }}
            onClick={() => {saveLikedNews() }} />
          <Typography variant="subtitle2">{"Source:"}{selectedArticleData.source}</Typography>
          <Typography variant="subtitle1">Details below</Typography>
          <Link href={selectedArticleData.url} target="_blank" rel="noopener noreferrer" variant="subtitle2">
            {selectedArticleData.url}
           </Link>
           <Typography variant="body2" color="text.secondary">
            {selectedArticleData.abstract}
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          weight="160"
          image="nytimes.jpg"
          alt="The New York Times"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            The New York Times
          </Typography>
          <Typography variant="caption" color="text.secondary">
            All the News That's Fit to Print
          </Typography>
          {articles.map(article => (
            <div key={article.id} onClick={() => handleCardClick(article.id)}>
              <Typography variant="subtitle1">{article.section}</Typography>
              <Typography variant="subtitle2">{"Source:"}{article.source}</Typography>
              <Typography variant="subtitle2">{"Author:"}{article.byline}</Typography>
              <Typography variant="body2" color="text.secondary">
                {article.published_date}
              </Typography>
              <Typography variant="subtitle2">{"Author:"}{article.title}</Typography>
              <Typography variant="subtitle2">{"Author:"}{article.abstract}</Typography>
              <hr />
            </div>
          ))}
        </CardContent>
      </CardActionArea>
      <ArticleDialog />
    </Card>
  );
}
