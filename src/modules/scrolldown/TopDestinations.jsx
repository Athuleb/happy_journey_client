import React, { useEffect, useState } from 'react'
import { Grid, Card, CardMedia, Typography, CardContent, Skeleton, Modal, Box, Tooltip } from '@mui/material';
import './style.css'
import axios from 'axios'
// const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = "https://journey-engine.onrender.com/api/"


function TopDestinstions() {
  const [imgData, setImgData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalid, setModalid] = useState({ id: '', location: '', image: '',dest_describe:'' })
  const [open, setOpen] = useState(false)

  const getDestinatoins = async () => {
    try {
    
      
      //const response = await axios.get('http://127.0.0.1:8000/top-destinations/')
      console.log("response>>???",response.data);
      
      setImgData(response.data || [])
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    catch (err) {
      console.error("Error fetching destinations:", err);
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDestinatoins()
  }, []);

  const ModalDisplay = (id, location, dest_images,dest_describe) => {
    console.log("ID:", id, "Location:", location, "Image URL:", dest_images);
    setModalid({ id, location, image: dest_images,dest_describe })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }



  return (
    <div>
      <div className={open ? 'blur' : ''}>

      
      <div className="about" style={{ width: '100%', height: 'auto', paddingTop: '5.5rem', }}>
        <Typography variant="body1" fontFamily={'-apple-system'} fontWeight={'bold'} fontSize={'30px'} color="black">
          best destinations in India
        </Typography>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {
            loading
              ? Array.from(new Array(8)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ maxWidth: 330, backgroundColor: '#fff394' }} >
                    <Skeleton variant="rectangular" animation="wave" height={180} />
                    <CardContent>
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
              : imgData?.map((image) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={image.id} sx={{ fontWeight: 'bold', fontSize: '1rem' }} className='animate-img'>
                  
                  <Tooltip title={`Click to view ${image.location}`}>
                      <Card sx={{ maxWidth: 330, backgroundColor: '#fff394', color: 'black', opacity: '85%' }} className="dest-card" onClick={() => {
                        ModalDisplay(image.id, image.location, image.dest_images, image.dest_describe);
                      }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={image.dest_images}
                          alt={image.location}
                        />
                        <CardContent>
                          <Typography sx={(theme)=>({color:theme.palette.grey[700]})} variant="h6" component="div">
                            {image.location}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Tooltip>
                </Grid>
              ))}
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            
            width: '1000px', 
            minHeight: '70vh', 
            bgcolor: 'background.paper',
            boxShadow: 24,
            border:'none',
            borderRadius: 2,
            overflowY: 'auto',
            maxHeight:'80vh',
            wordWrap:'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',   
          }}>
            <CardMedia sx={{}} component="img" height="400" image={modalid.image} alt={modalid.location} />
           <CardContent>
           <Typography variant="h5" component="h2" color='primary' fontWeight="bold"> 
              {modalid.location}
            </Typography>

            <Typography variant="body1" color="black" className="typing-animation" sx={{overflowY:'auto',whiteSpace: 'normal',maxHeight:'10vh' }}>
            {modalid.dest_describe}
            </Typography>
           </CardContent>
          </Box>
        </Modal>

      </div>
      </div>
    </div>
  )
}

export default TopDestinstions