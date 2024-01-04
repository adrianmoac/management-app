import React from 'react'
import ShowPageBox from '../utils/pageBox/ShowPageBox'
import InfoCard from '../utils/InfoCard'
import { Grid } from '@material-ui/core'
import InfoTable from '../utils/InfoTable'

const HomeTopBar = props => {
  const {data} = props

  const [todaysData, setTodaysData] = React.useState({'total': 0, 'outcomes': 0, 'incomes': 0});
  const [weeklyData, setWeeklyData] = React.useState({'total': 0, 'outcomes': 0, 'incomes': 0});
  const [monthlyData, setMonthlyData] = React.useState({'total': 0, 'outcomes': 0, 'incomes': 0});

  React.useEffect(() => {
    let today = new Date().toISOString().slice(0, 10)
    console.log(data)
    const todaysActivities = data.filter((info) => info.fecha === today)
    const todaysOutcomes = todaysActivities.filter((info) => info.tipo !== 'Ingreso').reduce((acc, info) => acc += info.importe, 0)
    const todaysIncomes = todaysActivities.filter((info) => info.tipo === 'Ingreso').reduce((acc, info) => acc += info.importe, 0)
    const todaysBalance = todaysIncomes - todaysOutcomes
    setTodaysData(a => ({...a, total: todaysBalance, outcomes: todaysOutcomes, incomes: todaysIncomes}))

    //Obtain current week
    let completeDate = new Date()
    const dayOfWeek = completeDate.getDay()
    const startOfTheWeek = new Date(today)
    startOfTheWeek.setDate(startOfTheWeek.getDate() - dayOfWeek)
    const endOfTheWeek = new Date(startOfTheWeek)
    endOfTheWeek.setDate(startOfTheWeek.getDate() + 6)
    //Find entries on the current week
    const weeklyActivities = data.filter((info) => {
      const completeInfo = new Date(info.fecha)
      return completeInfo >= startOfTheWeek && completeInfo <= endOfTheWeek
    })
    const weeklyOutcomes = weeklyActivities.filter((info) => info.tipo !== 'Ingreso').reduce((acc, info) => acc += info.importe, 0)
    const weeklyIncomes = weeklyActivities.filter((info) => info.tipo === 'Ingreso').reduce((acc, info) => acc += info.importe, 0)
    const weeklyBalance = weeklyIncomes - weeklyOutcomes
    setWeeklyData(a => ({...a, total: weeklyBalance, outcomes: weeklyOutcomes, incomes: weeklyIncomes}))

    //Obtain current month
    const currentMonth = completeDate.getMonth()
    const monthlyActivities = data.filter((info) => {
      const completeInfo = new Date(info.fecha)
      return completeInfo.getMonth() === currentMonth
    })
    const monthlyOutcomes = monthlyActivities.filter((info) => info.tipo !== 'Ingreso').reduce((acc, info) => acc += info.importe, 0)
    const monthlyIncomes = monthlyActivities.filter((info) => info.tipo === 'Ingreso').reduce((acc, info) => acc += info.importe, 0)
    const monthlyBalance = monthlyIncomes - monthlyOutcomes
    setMonthlyData(a => ({...a, total: monthlyBalance, outcomes: monthlyOutcomes, incomes: monthlyIncomes}))
  }, [data])
  console.log('todaysTotal', todaysData)
  
  return (
    <>
    <ShowPageBox>
      <Grid container justifyContent='space-evenly'>
        <Grid item xs='auto' sm='auto' md='auto'/>
        <Grid item xs={12} sm={12} md={3}>
          <InfoCard 
            title='Diario' 
            amount={todaysData.total}
            expenses={todaysData.outcomes}
            incomes={todaysData.incomes}
            >
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <InfoCard 
            title='Semanal' 
            amount={weeklyData.total}
            expenses={weeklyData.outcomes}
            incomes={weeklyData.incomes}
            >
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <InfoCard 
            title='Mensual' 
            amount={monthlyData.total}
            expenses={monthlyData.outcomes}
            incomes={monthlyData.incomes}
            >
          </InfoCard>
        </Grid>
        </Grid>
    </ShowPageBox>
    </>
    )
}

export default HomeTopBar