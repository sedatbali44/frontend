import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import GuardianService from './../service/GuardianService';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Link } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export default function Guardian() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response } = await GuardianService.getGuardianNews();
        setArticles(response.results);
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
         <Typography variant="body2" color="text.secondary">
            {selectedArticleData.sectionName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedArticleData.webPublicationDate}
          </Typography>
            <ThumbUpOffAltIcon/>
          <Typography variant="subtitle1">Details below</Typography>
          <Link href={selectedArticleData.webUrl} target="_blank" rel="noopener noreferrer" variant="subtitle2">
            {selectedArticleData.webUrl}
           </Link>
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
          image="guardian.jpg"
          alt="The Guardian"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            The Guardian
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Original reporting and incisive analysis, direct from the Guardian every morning
          </Typography>
          {articles.map(article => (
            <div key={article.id} onClick={() => handleCardClick(article.id)}>
              <Typography variant="subtitle1">{article.sectionName}</Typography>
              <Typography variant="subtitle2">{article.webTitle}</Typography>
              <Typography variant="body2" color="text.secondary">
                {article.webPublicationDate}
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
