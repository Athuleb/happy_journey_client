import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Fade, CardMedia } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const API_URL = "https://journey-engine.onrender.com/api/";
function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const [getSearch, setGetSearch] = useState(null)
  const [loading, setLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([
    { title: "Enter search", description: 'Explore the most beautiful countries in Europe.' },
  ]);

  const getResult = async () => {
    try {
      const response = await axios.post(`${API_URL}search/`, { query }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setGetSearch(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    finally{
      setLoading(false)
    }
    console.log(getSearch.summary);
    console.log(getSearch.image_url);


  }

  useEffect(() => {
    if (query && query !== getSearch?.query) {
      getResult();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <Box sx={{ padding: '2rem', paddingTop: '15vh', backgroundColor: '#f4f4f4', minHeight: '100vh'}}>
    <Typography variant="h4" align="center" sx={{ marginBottom: '1rem', fontWeight: 'bold', color: '#333' }}>
      Search Results for: <span style={{ color: '#00796b' }}>{query}</span>
    </Typography>

    {loading ? (
      <Typography variant="h6" align="center" sx={{ marginTop: '2rem', color: '#555' }}>
        Loading...
      </Typography>
    ) : getSearch ? (
      <Grid container spacing={2}  alignItems="center" sx={{ minHeight: '50vh' }} marginLeft="0">
        <Grid item xs={12} sm={8} md={6} lg={4} sx={{marginLeft:'20%'}}>
          <Fade in={true} timeout={1000}>
            <Card sx={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)',width:'100vh', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardContent sx={{ padding: '1.5rem', backgroundColor: '#fff' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#00796b' }}>
                  {query}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', marginTop: '1rem' }}>
                  {getSearch.summary}
                </Typography>
                {getSearch.image_url && (
                  <CardMedia 
                    component="img"
                    height="250"
                    image={getSearch.image_url}
                    alt="Search result image"
                    title="Search result image"
                  />
                )}
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    ) : (
      <Typography variant="h6" align="center" sx={{ marginTop: '2rem', color: '#555' }}>
        No results found for <span style={{ fontWeight: 'bold', color: '#00796b' }}>{query}</span>.
      </Typography>
    )}
    </Box>
  );
}

export default SearchResult;
