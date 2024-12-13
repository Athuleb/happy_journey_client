import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

import {
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    Box,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    useTheme,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection = {
    position: 'relative',
    height: '100vh',
    color: 'rgba(242, 230, 90, 1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
};

const BackgroundVideo = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    opacity: 0.6,
};



const TravelCard = ({ title, description, image }) => (
    <Card>
        <CardMedia component="img" alt={title} height="140" image={image} />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
        <CardActions>

        </CardActions>
    </Card>
);

function TravelLandingPage() {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate()

    const NavigateLogin = () => {
        navigate('login')
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <div style={HeroSection}>
                <video
                    autoPlay
                    loop
                    muted
                    style={BackgroundVideo}
                >
                    <source src="/backgroundVideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <Typography variant="h4" component="div" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                    Explore the World
                </Typography>

                <Typography variant="h1" component="h1" gutterBottom sx={{ fontFamily: 'Pacifico, cursive', fontWeight: 'normal' }}>
                    Travel<span style={{ color: '#d1c411' }}>...</span> Explore<span style={{ color: '#d1c411' }}>...</span > Discover<span style={{ color: '#d1c411' }}>...</span> <br />
                    <span style={{ position: 'relative', zIndex: 10 }}></span>
                </Typography>

                {/* <Typography variant="body1" sx={{ maxWidth: '600px', marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '1.1rem' }}>
                    Discover amazing destinations, find your dream getaway, and create unforgettable memories with our travel platform.
                </Typography> */}

                <Button
                    variant="contained"
                    color="primary"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={NavigateLogin}
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '30px',
                        textTransform: 'none',
                        transition: 'all 0.3s ease-out',
                        boxShadow: theme.shadows[4],
                        background: isHovered
                            ? 'linear-gradient(90deg, rgba(242, 230, 90, 1) 0%, rgba(208, 252, 126, 1) 100%)'
                            : theme.palette.primary.main,
                        color: isHovered ? 'black' : 'white',
                    }}
                >
                    Start Your Journey
                    <ArrowRight style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                </Button>
            </div>

            <div style={{ width: '100%', backgroundColor: '#d4f1ff', color: 'black', paddingTop: 30 }}>


                <Container>
                    <Typography variant="h4" component="div" gutterBottom align="center">
                        From Our Blog
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {[
                            { title: '10 Must-Visit Places in India', image: 'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQ4fE2qgt9z5avxqCbRKIlnfFJojAvLqmB7Lm5Ip0CvuGX73KA9Ru1n-Xu61P4NJjDd8onT-sv4xCuLkehjGuIKQj0rMtQNaHumVBRf7A', learMore: 'https://unsplash.com/' },
                            { title: 'How to Pack for Your Next Adventure', image: 'https://cdn.shopify.com/s/files/1/0554/0115/2649/files/F23_Chamonix_ACP_01-0432_1024x1024.jpg?v=1712880490', learMore: 'https://www.eaglecreek.com/blogs/articles/what-pack-ultimate-travel-packing-checklist' },
                            { title: 'The Best Street Food Around the World', image: 'https://cdn.tasteatlas.com//images/dishes/5f57d0b406c74fec9bf40c1ac1f3d83b.jpg?mw=1300', learMore: 'https://www.tasteatlas.com/best-rated-street-foods-in-the-world' },
                        ].map((blog, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <TravelCard
                                    title={blog.title}
                                    description="Read more on our blog."
                                    image={blog.image}
                                />
                                <Button size="small" color="primary" onClick={() => window.open(blog.learMore, '_blank')}>
                                    Learn More
                                </Button>
                            </Grid>

                        ))}
                    </Grid>
                </Container>


                <Container sx={{ mt: 10, pb: 5 }}>
                    <Typography variant="h4" component="div" gutterBottom align="center">
                        Explore Our Top Destinations
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {[
                            { title: 'Paris, France', description: 'The city of love and lights.', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRcNDlT7ZKhYlHBPSqlCQBI0cZ4-w8YxT8iN90Q5TBYhf7YGYi1LwGdTMlH-vxsbLcvQoUzVZWToabcPXgTXsttMRPghxgOMM0PWerjVw' },
                            { title: 'Bali, Indonesia', description: 'Tropical paradise with stunning beaches.', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSNNOlQZDtq4ApuearKcLHrnO4QAjs9xCJkZPPi1lfxCBynkETmH4wENkgHL2g0Fb8L7dyQak4kKzbTCboSiqo1naHiVpLrle2L2BUl6w' },
                            { title: 'Kerala, India', description: 'Gods own country', image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRJB4DyvnjbcjHhJJJdJ29OGKuW4qOj6mjj9HvwRDlcfGrBkoU1kX65SQG6D10zE_nn3LWhk7qlcNYG4gQF5VGAF5zYgz_WmFqpCOhmOz0' },
                        ].map((destination, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <TravelCard
                                    title={destination.title}
                                    description={destination.description}
                                    image={destination.image}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default TravelLandingPage;
