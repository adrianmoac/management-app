import { Grid, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import {content} from '../../barContent'
import { Link } from 'react-router-dom'  

const useStyles = makeStyles(theme => ({
    barWhite: {
        fontSize: '18px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '40px',
        paddingTop: '10px',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        },
        color: theme.palette.white.main
    },
    barBlack: {
        fontSize: '18px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '40px',
        paddingTop: '10px',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        },
        color: theme.palette.lightGray.main
    }
}))

const TopBar = props => {
    const {color} = props

    const classes = useStyles()

  return (
    <>
        <Grid container spacing={1} justifyContent='flex-end'>
            <Grid xs={12} sm={12} md={6}/>
            {Object.values(content).filter(page => page.label !== 'Agregar ingreso').map((page) => (
                <Grid item xs={6} sm={6} md='auto'>
                    <Link to={page.linkTo} state={{title: page.label}} style={{textDecoration: 'none'}}>
                        <Typography className={color === 'white' ? classes.barWhite : classes.barBlack}>{page.label}</Typography>
                    </Link>
                </Grid>
            ))}
        </Grid>
    </>
  )
}

export default TopBar