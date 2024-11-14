import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImg from '/bg.jpg'; // Add your background image path here
import axios from 'axios';
const API_URL = "https://journey-engine.onrender.com/api/";

// Styled components
const BackgroundContainer = styled(Box)({
 
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  color: '#fff',
});

const ContactForm = styled(Box)(({ theme }) => ({


}));

const SubmitButton = styled(Button)({
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
  width:'3rem'
});


function ContactUs() {
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    email: '',
    msg: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try{
    const response = await axios.post(
      `${API_URL}email/`, 
      formData,  
      {
          headers: {
              'Content-Type': 'application/json',  
          },
      }
  );
  console.log(response.data);
} catch (error) {
  console.error('Error sending feedback:', error);
 
}
    
  };




  return (

    <BackgroundContainer>
      <Container maxWidth="md" sx={{color:'black'}}>
        <Typography variant="h3" align="center" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
        "We'd love to hear from you! Share your thoughts and feedback by filling out the form below."
</Typography>
        <ContactForm>

        <Box
        component="form"
        method="POST"
        sx={{
          display: 'flex',
          flexDirection:'column',
          gap: 2,
          mb: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          padding: 2,
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.3)',
          }
        }}
        onSubmit={handleMessage}
      >
     <TextField
              label="First Name"
              variant="outlined"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              name="sname"
              value={formData.sname}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              type='email'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              name="msg"
              value={formData.msg}
              onChange={handleInputChange}
            />
            <SubmitButton type="submit">
              Send
            </SubmitButton>
      </Box>


        </ContactForm>
        <Box mt={4} textAlign="center" sx={{
          color:'black'
        }}>
          <Typography variant="body2">
            Or reach us directly at athultestmail0@gmail.com
          </Typography>
          <Typography variant="body2">
            Call us at ########
          </Typography>
        </Box>
      </Container>
    </BackgroundContainer>
  )}

export default ContactUs;
