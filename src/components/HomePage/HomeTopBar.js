import React from 'react'
import ShowPageBox from '../utils/pageBox/ShowPageBox'
import InfoCard from '../utils/InfoCard'
import { Grid, makeStyles } from '@material-ui/core'
import InfoTable from '../utils/InfoTable'
import { Carousel } from 'antd'
import { Box } from '@mui/material'
import UpsertSavingsModal from '../utils/Modals/UpsertSavingsModal'

const useStyles = makeStyles(theme => ({
  carousel: {
    margin: 0,
    height: '245px',
    color: '#fff',
    textAlign: 'center',
  }
}))

const HomeTopBar = props => {
  const {data, savings} = props
  const classes = useStyles()

  const [todaysData, setTodaysData] = React.useState({'total': 0, 'outcomes': 0, 'incomes': 0});
  const [weeklyData, setWeeklyData] = React.useState({'total': 0, 'outcomes': 0, 'incomes': 0});
  const [monthlyData, setMonthlyData] = React.useState({'total': 0, 'outcomes': 0, 'incomes': 0});
  const [openSavingsModal, setOpenSavingsModal] = React.useState(false)
  const [openAvailableModal, setOpenAvailableModal] = React.useState(false)

  React.useEffect(() => {
    let today = new Date().toISOString().slice(0, 10)
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

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  return (
    <>
    <UpsertSavingsModal
      title={'Modificar ahorros'}
      label={'Ahorro'}
      placeholder={'Ingresa el ahorro'}
      open={openSavingsModal}
      handleClose={() => setOpenSavingsModal(false)}
      currentSaving={savings[0].ahorro}
      savings={savings}
    ></UpsertSavingsModal>
        <UpsertSavingsModal
          title={'Modificar dinero disponible'}
          label={'Dinero disponible'}
          placeholder={'Ingresa la cantidad disponible'}
          open={openAvailableModal}
          handleClose={() => setOpenAvailableModal(false)}
          currentSaving={savings[0].disponible}
          savings={savings}
    ></UpsertSavingsModal>
    <ShowPageBox>
    <Carousel afterChange={onChange}>
      <div>
      <Grid container justifyContent='space-evenly' className={classes.carousel} color='lightGrey'>
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
      </div>
      <div>
      <Grid container justifyContent='space-evenly' className={classes.carousel} color='lightGrey'>
        <Grid item xs='auto' sm='auto' md='auto'/>
        <Grid item xs={12} sm={12} md={3} onClick={() => setOpenSavingsModal(true)}>
          <InfoCard 
            title='Ahorros' 
            amount={savings[0].ahorro}
            >
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <InfoCard 
            title='Dinero acumulado' 
            amount={savings[0].ahorro + savings[0].disponible}
            >
          </InfoCard>
        </Grid>
        <Grid item xs={12} sm={12} md={3} onClick={() => setOpenAvailableModal(true)}>
          <InfoCard 
            title='Disponible' 
            amount={savings[0].disponible}
            >
          </InfoCard>
        </Grid>
        </Grid>
      </div>
    </Carousel>
    </ShowPageBox>
    </>
    )
}

export default HomeTopBar