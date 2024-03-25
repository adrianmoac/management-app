import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import dayjs from 'dayjs'

const useStyles = makeStyles((theme) => ({
    label: {
        color: 'customLightGrey',
        display: 'flex',
        justifyContent: 'left'
    },
    input: {
        width: '100%',
    }
}))

const CustomDatePicker = props => {
    const {
        label,
        value,
        onChange,
        defaultValue,
        disabled
    } = props
    const classes = useStyles()
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Typography className={classes.label} sx={{fontSize: 18, fontWeight: 'bold'}}>{label}</Typography>
        <DatePicker className={classes.input} slotProps={{textField: () => ({
            color: 'blue',
        })}}
        format="D/M/YYYY"
        disabled={disabled}
        defaultValue={defaultValue}
        autoOk={true}
        inputFormat="dd.MM.yyyy"
        value={value && dayjs(value)}
        onChange={onChange}
        ></DatePicker>
    </LocalizationProvider>
  )
}

export default CustomDatePicker