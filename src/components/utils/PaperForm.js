import { Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from './pageBox/TopBar'
import { Box, Grid, Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.white.main
    },
    title: {
        color: theme.palette.lightGray.main,
    },
    box: {
        height: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px'
      },
      paper: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
        borderRadius: theme.spacing(2), 
      },
}))

const PaperForm = props => {
    const {children} = props
    const location = useLocation()
    const receivedData = location.state
    const classes = useStyles()

    return (
    <>
        <TopBar />
        <Grid container>
            <Grid item xs= {1}/>
            <Grid item xs={10}>
                <Typography variant='h5' className={classes.title} fontWeight='bold'>{receivedData.title}</Typography>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs= {1}/>
            <Grid item xs={10}>
                <Box className={classes.box}>
                    <Paper className={classes.paper}>
                        {children}
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    </>
  )
}

export default PaperForm