
import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button} from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  // ... (component body)


  return(
    <Box
    sx={{
      background: 'linear-gradient(180deg, #F0E6DC, #FFFFFF)',
      minHeight: '100vh',
      padding:'2rem',
    }}
    >
    <>
 
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{textAlign: 'center', my: 4}}
    >
        <Typography variant="h4" component="h1" gutterBotto fontFamily={'Poppins'}>  
            Sign In
        </Typography>
        <SignIn />
    </Box>
    </>
    </Box>
  )
}