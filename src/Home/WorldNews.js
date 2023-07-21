import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import WorldNewsService from './../service/WorldNewsService';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Link } from '@mui/material';

export default function WorldNews() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {news} = await WorldNewsService.getWorldNews();
        setArticles(news);
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

    return (
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedArticleData.webTitle}</DialogTitle>
        <DialogContent>
        <Typography variant="subtitle1">{selectedArticleData.title}</Typography>    
          <Typography variant="body2" color="text.secondary">
            {selectedArticleData.publish_date}
          </Typography>
          <Typography variant="subtitle2">{"Author:"}{selectedArticleData.author}</Typography>
          <Typography variant="subtitle1">Details below</Typography>
          <Link href={selectedArticleData.url} target="_blank" rel="noopener noreferrer" variant="subtitle2">
            {selectedArticleData.url}
           </Link>
           <Typography variant="body2" color="text.secondary">
            {selectedArticleData.text}
          </Typography>
          {/* Add more content or formatting as needed */}
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="worldnews.jpg"
          alt="World News"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            World News
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Original reporting and incisive analysis, direct from the Guardian every morning
          </Typography>
          {articles.map(article => (
            <div key={article.id} onClick={() => handleCardClick(article.id)}>
              <Typography variant="subtitle1">{article.title}</Typography>
              <Typography variant="subtitle2">{"Author:"}{article.author}</Typography>
              <Typography variant="body2" color="text.secondary">
                {article.publish_date}
              </Typography>
              <hr />
            </div>
          ))}
        </CardContent>
      </CardActionArea>
      <ArticleDialog />
    </Card>
  );
}
