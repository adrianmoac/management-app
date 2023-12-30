import React, { useState } from 'react'
import propTypes from 'prop-types'
import { Box, Grid, Paper, makeStyles } from '@material-ui/core'

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
    color: theme.palette.lightGray.main
  },
  amount: {
    fontSize: 25,
    color: theme.palette.gray.main,
    fontWeight: 'bold'
  },
  expenses: {
    fontSize: 18,
    color: theme.palette.red.main
  },
  incomes: {
    fontSize: 18,
    color: theme.palette.green.main
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
          <Grid item xs={6} className={classes.expenses}>{expenses && `-$${expenses}`}</Grid>
          <Grid item xs={6} className={classes.incomes}>{incomes>=0 && `$${incomes}`}</Grid>
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