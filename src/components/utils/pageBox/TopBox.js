import { Box, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.lightGray.main,
        width: '100%',
        height: '35vh',
    }
}))

const TopBox = props => {
    const {children} = props
    const classes = useStyles()
  return (
    <>
    <Box className={classes.box}>
        {children}
    </Box>
    
    </>
  )
}

export default TopBox