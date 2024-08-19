'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { doc, collection, getDoc, writeBatch } from 'firebase/firestore'
import { db } from '../firebase'

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CardContent,
  Card,
  DialogActions,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@mui/material'


export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }
  
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })
  
      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }
  
      const data = await response.json()
      console.log('Received data:', data); // Debugging line
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)


  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  console.log(flashcards)

  return (
    <Box
      sx={{
        background: '#F9F3F0',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
    
      <Box sx={{ position: 'relative',
          width: '500px',
          height: '600px',
          background: ' #FFFFFF',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '10px',
          border:'#D3D3D3',
          p: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', }}>
        <Typography variant="h4" component="h1" gutterBottom fontSize={20} fontFamily={"Poppins"}
        sx={{
          color: '#5F0D06',
          
          

        }}
        >
          Create Flashcards
          
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fontFamily="Poppins"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          sx={{ mb: 2,
            boxSizing: 'border-box',
            background: '#FFFFFF',
            borderRadius:'8px',
            border: '1px solid #D3D3D3',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          
          sx={{
            boxSizing:'border-box',
            width:'107px',
            height:'33px',
            background:'#5F0D06',
            border: '1px solid #5F0D06',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '8px',
            '&: hover':{
                background:'#FAF4EE',
                boder:'#FFFFFF',
                color:'#5F0D06',
            },
            
            //do hover

          }}

        >
          Create
        </Button>
      </Box>
      
      {flashcards.length > 0 && (
    <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
        Generated Flashcards
        </Typography>
        <Grid container spacing={2}>
        {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
                <CardContent>
                <Typography variant="h6">Front:</Typography>
                <Typography>{flashcard.front}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                <Typography>{flashcard.back}</Typography>
                </CardContent>
            </Card>
            </Grid>
        ))}
        {flashcards.length > 0 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Save Flashcards
                </Button>
            </Box>
        )}
        </Grid>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Save Flashcard Set</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please enter a name for your flashcard set.
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                label="Set Name"
                type="text"
                fullWidth
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={saveFlashcards} color="primary">
                Save
                </Button>
            </DialogActions>
            </Dialog>
            </Box>
            )}
    
    </Box>
  )
}
