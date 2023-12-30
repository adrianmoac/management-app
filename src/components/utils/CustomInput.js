import { TextField, Typography, makeStyles } from '@mui/material'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.palette.lightGray.main
    }
}))


const CustomInput = props => {
    const {
        label, 
        placeholder, 
        select, 
        width
    } = props
    const classes = useStyles()

    const [text, setText] = React.useState('')

  return (
    <>
        <Typography className={classes.labeldocker}>label</Typography>
        <TextField></TextField>
    </>
  )
}

export default CustomInput