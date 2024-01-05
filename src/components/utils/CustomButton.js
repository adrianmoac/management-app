import React from 'react';
import { Button, Grid } from '@mui/material';

const CustomButton = props => {
  const {title, 
    color, 
    onClick,
    marginTop='20px'
  } = props

  return (
  <>
    <Grid container>
        <Grid xs={1}/>
        <Grid item xs={10} display='flex' justifyContent='flex-end'>
            <Button 
              variant='contained' 
              color={color} 
              onClick={onClick}
              sx={{marginTop: marginTop, fontWeight: 'bold', textTransform: 'none', fontSize: 16, borderRadius: '10px', color: 'white'}}>{title}</Button>
        </Grid>
    </Grid>
    </>
  )
};

export const CancelSubmitButton = props => {
  const {title, onCancel, onSubmit} = props

  return (
    <>
      <Grid container spacing={4}>
          <Grid item xs={6} display='flex' justifyContent='flex-start'>
              <Button 
                variant='contained' 
                color='lightGrey'
                onClick={onCancel}
                sx={{marginTop: '20px', fontWeight: 'bold', textTransform: 'none', fontSize: 16, borderRadius: '10px', color: 'white'}}>Cancelar</Button>
          </Grid>
          <Grid item xs={6} display='flex' justifyContent='flex-end'>
              <Button 
                variant='contained' 
                color='blue'
                onClick={onSubmit}
                sx={{marginTop: '20px', fontWeight: 'bold', textTransform: 'none', fontSize: 16, borderRadius: '10px', color: 'white'}}>{title}</Button>
          </Grid>
      </Grid>
      </>
    )
};

export default CustomButton;
