import React from 'react'
import {makeStyles } from '@material-ui/core'
import Box from '@mui/material/Box';

const useStyles = makeStyles(theme => ({
    box: {
        width: '100%',
        height: '35vh',
    }
}))

const TopBox = props => {
    const {children} = props
    const classes = useStyles()
  return (
    <>
    <Box className={classes.box} bgcolor='common.lightGrey'>
        {children}
    </Box>
    
    </>
  )
}

export default TopBox