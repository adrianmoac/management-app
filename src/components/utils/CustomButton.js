import React from 'react';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const CustomButton = props => {
  const {title, color} = props

  return (
  <>
    <Grid container>
        <Grid xs={1}/>
        <Grid item xs={10} display='flex' justifyContent='flex-end'>
            <Button variant='contained' sx={{background: color, marginTop: '20px', fontWeight: 'bold', textTransform: 'none', fontSize: 16}}>{title}</Button>
        </Grid>
    </Grid>
    </>
  )
};

export default CustomButton;
