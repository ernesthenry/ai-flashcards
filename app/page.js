'use client'

import { useState } from 'react'
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Box,
  Grid
} from '@mui/material'

import { SignedIn } from '@clerk/nextjs'; 
import { SignedOut } from '@clerk/nextjs'; 

import { UserButton } from '@clerk/nextjs';
// import UserButton from UserButton; fix this

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }


export default function Home() {
  return (
    <Box
    sx={{
      background: 'linear-gradient(180deg, #F0E6DC, #FFFFFF)',
      minHeight: '100vh',
      padding:'2rem',
    }}
    >
    <>
  <AppBar position="static">
    <Toolbar sx={{
      
      boxSizing:'border-box',
     width:'100%',
     boxShadow:'box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
     top:0,
     display:'flex',
     zIndex: 1200,
     left:0,
     position:'fixed',
     


    }}>
      <Typography variant="h6" style={{flexGrow: 1}} fontFamily={'Poppins'} color={"#5F0D06"}>
        
      </Typography>
      <SignedOut>
        <Button color="inherit" href="/sign-in" 
         sx={{
          color:'#5F0D06',
          borderRadius:'10px',
          '&:hover': {
            background:'#FAF4EE',
            borderRadius:'10px',
          },
        }} 
        >Login</Button>
        <Button color="inherit" href="/sign-up" 
        sx={{
          color:'#5F0D06',
          borderRadius:'10px',
          '&:hover': {
            background:'#FAF4EE',
            borderRadius:'10px',
          },
        }}
        >Sign Up</Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Toolbar>
</AppBar>
    <Box sx={{
      textAlign: 'center',
       my: 4,
       marginTop: '15%',

    }}>
      <Typography variant="h3" component="h1" gutterBottom fontFamily={'Poppins'} color={"#333333"}
      sx={{
        left: '567px',
        top: '312px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: '48px',
        marginBottom:'32px',
        fontsize:'16px',
      }}
      >
        Welcome to Flashca
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom fontFamily={'Poppins'}
      sx={{
        fontSize: '24px',
        fontWeight:'regular',
        marginBottom:' 32px'
      }}
      >
      you're new study buddy
      </Typography>
      <Button variant="contained" color="primary"  href="/generate"
      sx={{
        mt: 1, 
        background:'#5F0D06',
        borderRadius: '10px',
        '&:hover': {
          background:'#FAF4EE',
          color:'#5F0D06',
          border: '#ffffff',

        },

      }}
      
      >
        Get Started
      </Button>
    
    </Box>
    

  
  </>
  </Box>
  );
}
