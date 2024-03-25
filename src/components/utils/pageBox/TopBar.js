import { Grid, makeStyles } from '@material-ui/core'
import { Typography } from '@mui/material'
import React from 'react'
import {content} from '../../barContent'
import { Link, useLocation } from 'react-router-dom'

const TopBar = props => {
    const {color} = props
    const location = useLocation()

    const getAddOption = () => {return location.pathname === '/agregar-gasto' ? 'Agregar gasto' : 'Agregar ingreso'}

  return (
    <>
        <Grid container spacing={1} justifyContent='flex-end'>
            <Grid xs={12} sm={12} md={6}/>
            {Object.values(content).filter(page => page.label !== getAddOption()).map((page) => (
                <Grid item xs={6} sm={6} md='auto'>
                    <Link to={page.linkTo} state={{title: page.label}} style={{textDecoration: 'none'}}>
                        <Typography color={color === 'white' ? 'common.white' : 'common.grey'} sx={{
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
                        }}>{page.label}</Typography>
                    </Link>
                </Grid>
            ))}
        </Grid>
    </>
  )
}

export default TopBar