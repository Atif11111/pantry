"use client"
import { Box, Stack, Typography, Button, TextField } from "@mui/material";
import {firestore} from '@/Firebase';
import { collection, doc, setDoc, getDocs, query, deleteDoc, getDoc, updateDoc, addDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap: 2,
  display: 'flex',
};

export default function Home() {
  const[pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({name: doc.id, ...doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      await setDoc(docRef, {count: count + 1})
    }
    else {
      await setDoc(docRef, {count: 1})
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {count: count - 1})
      }
    }
    updatePantry()
  }

  return <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={2}
  >

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Add Item
    </Typography>

    <Stack width="100%" direction={"row"} spacing={2}>
      <TextField id="outlined-basic" label="Item" variant="outlined" fullWidth={true} value={itemName} onChange={(e) => setItemName(e.target.value)}/>
      <Button 
        variant="outlined"
        onClick={() => {
          addItem(itemName);
          setItemName('');
          handleClose();
        }}
      >
        Add
      </Button>
    </Stack>

  </Box>
</Modal>


    <Button variant="contained" onClick={handleOpen}>Add Item</Button>
    <Box border={'2px lightgray solid'}>
    <Box width="800px" height="100px" color={'red'} bgcolor={'blue'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant="h2">Pantry Items</Typography>
    </Box>
    <Stack width="800px" height="600px" spacing={2} overflow={'auto'}>
      {pantry.map(({name, count}) => (
        <Stack
         key={name} 
         direction={'row'} 
         spacing={2} 
         justifyContent={'center'} 
         alignContent={'space-between'}
         >
        <Box
          key={name}
          width="100%"
          minHeight="150px"
          display={'flex'}
          justifyContent={'space-between'}
          bgcolor={'red'}
          paddingX={5}
        >
          <Typography color={'#333'} variant="h2">
            {name[0].toUpperCase() + name.slice(1)}
          </Typography>

          <Typography color={'#333'} variant="h2">
            Quantity: {count}
          </Typography>

        </Box>
        <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
        </Stack>
      ))}
    </Stack>
    </Box>
  </Box>
  
}