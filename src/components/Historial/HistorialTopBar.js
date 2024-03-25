import React from 'react'
import ShowPageBox from '../utils/pageBox/ShowPageBox'
import InfoCard from '../utils/InfoCard'
import { CircularProgress, Grid, Paper } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
      {
        label: 'Balance',
      },
    ],
    width: 630,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-5px, 0)',
      },
    },
  };
  const dataset = [
    {
      balance: 59,
      month: 'Jan',
    },
    {
      balance: 50,
      month: 'Fev',
    },
    {
      balance: 47,
      month: 'Mar',
    },
    {
      balance: 54,
      month: 'Apr',
    },
    {
      balance: 57,
      month: 'May',
    },
    {
      balance: 60,
      month: 'June',
    },
    {
      balance: 59,
      month: 'July',
    },
    {
      balance: 65,
      month: 'Aug',
    },
    {
      balance: 51,
      month: 'Sept',
    },
    {
      balance: 60,
      month: 'Oct',
    },
    {
      balance: 67,
      month: 'Nov',
    },
    {
      balance: 61,
      month: 'Dec',
    },
  ];

const HistorialTopBar = props => {
    const {cardTitle, amount, expenses, incomes, chartData} = props

  return (
    <>
        <ShowPageBox>
            <Grid container justifyContent="center" direction="row" alignItems='center'>
                <Grid item xs={5} style={{cursor: 'pointer'}}> 
                    <InfoCard
                        title={cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1)}
                        amount={amount}
                        expenses={expenses}
                        incomes={incomes}
                    ></InfoCard>
                </Grid>
                <Grid item xs={5} textAlign='center'>
                    <Paper style={{height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      {chartData.length === 0 ?
                      <CircularProgress color='blue'/> :
                      <BarChart
                      dataset={chartData}
                      xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
                      series={[
                        { dataKey: 'balance' },
                      ]}
                      {...chartSetting}
                  />
                      }
                    </Paper>
                </Grid>
            </Grid>
        </ShowPageBox>
    </>
    )
}

export default HistorialTopBar