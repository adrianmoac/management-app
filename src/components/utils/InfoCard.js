import React, { useState } from 'react'
import propTypes from 'prop-types'
import { makeStyles, Paper, Box, Grid } from '@material-ui/core'
import { Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({
  box: {
    height: '170px',
    width: '270px',
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
  title: {
    fontSize: 21,
    color: 'customLightGrey' 
  },
  amount: {
    fontSize: 25,
    color: 'customGrey',
    fontWeight: 'bold'
  },
  expenses: {
    fontSize: 18,
  },
  incomes: {
    fontSize: 18,
  }

}))

const InfoCard = props => {
    const {title, amount, expenses, incomes, data} = props
    const classes = useStyles()
    // const [total, setTotal] = useState(0)
  console.log('data in infoCard',expenses)
    // setTotal(incomes-expenses)
    const total = incomes-expenses

  return (
    <Box className={classes.box}>
      <Paper elevation={6} className={classes.paper}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} className={classes.title}>{title}</Grid>
          <Grid item xs={12} className={classes.amount}>{expenses ? total<0 ? `-$${Math.abs(total)}` : `$${total}` : `$${amount}`}</Grid>
          <Grid item xs={6} ><Typography className={classes.expenses} color='red.main'>{expenses && `-$${expenses}`}</Typography></Grid>
          <Grid item xs={6} ><Typography className={classes.incomes} color='green.main'>{incomes>=0 && `$${incomes}`}</Typography></Grid>
        </Grid>
      </Paper>
    </Box>
    )
}

InfoCard.propTypes = {
    amount: propTypes.number.isRequired,
    amountType: propTypes.number.isRequired
}

export default InfoCard