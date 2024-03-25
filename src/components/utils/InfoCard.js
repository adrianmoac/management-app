import React, { useState } from 'react'
import propTypes from 'prop-types'
import { makeStyles, Box, Grid } from '@material-ui/core'
import { Typography, Paper } from '@mui/material'

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
  },
  title: {
    fontSize: 21,
  },
  amount: {
    fontSize: 25,
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
    const {title, amount, expenses, incomes, textColor='grey.main', color, amountType} = props
    const classes = useStyles()
    const total = expenses !== 0 ? incomes - expenses : incomes;
    
  return (
    <Box className={classes.box}>
      <Paper elevation={6} className={classes.paper} sx={{backgroundColor: color, borderRadius: 6}}>
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} className={classes.title}>{title}</Grid>
          {
            !amountType ?  <Grid item xs={12} className={classes.amount}><Typography color={textColor} style={{fontSize: 25, fontWeight: 'bold'}}>{expenses ? total<0 ? `-$${Math.abs(total)}` : `$${total}` : `$${amount}`}</Typography></Grid> :
            <Grid item xs={12} className={classes.amount}><Typography color={textColor} style={{fontSize: 25, fontWeight: 'bold'}}>{amountType === 'Egreso' ? `-$${amount}` : `$${amount}`}</Typography></Grid>
          }
          <Grid item xs={6} ><Typography className={classes.expenses} color='red.main'>{expenses && `-$${expenses}`}</Typography></Grid>
          <Grid item xs={6} ><Typography className={classes.incomes} color='green.main'>{incomes>=0 && `$${incomes}`}</Typography></Grid>
        </Grid>
      </Paper>
    </Box>
    )
}

InfoCard.propTypes = {
    amount: propTypes.number.isRequired,
}

export default InfoCard