import React from 'react'
import InfoTable from '../utils/InfoTable'
import { getCostData, getDataByDateRange, getSavings } from '../../backend/queries';
import HistorialTopBar from './HistorialTopBar';
import { useParams } from 'react-router-dom';
import { monthsInOrder, month, today, week } from '../../constants';
import { CircularProgress } from '@mui/material';

// const months = [
//   {
//     name: 'Jan', 
//     number: 0, 
//     balance: 0
//   },
//   {
//     name: 'Fev', 
//     number: 1, 
//     balance: 0
//   },
//   {
//     name: 'Mar', 
//     number: 2, 
//     balance: 0
//   },
//   {
//     name: 'Apr', 
//     number: 3, 
//     balance: 0
//   },
//   {
//     name: 'May', 
//     number: 4, 
//     balance: 0
//   },
//   {
//     name: 'Jun', 
//     number: 5, 
//     balance: 0
//   },
//   {
//     name: 'Jul', 
//     number: 6, 
//     balance: 0
//   },
//   {
//     name: 'Aug', 
//     number: 7, 
//     balance: 0
//   },
//   {
//     name: 'Sep', 
//     number: 8, 
//     balance: 0
//   },
//   {
//     name: 'Oct', 
//     number: 9, 
//     balance: 0
//   },
//   {
//     name: 'Nov', 
//     number: 10, 
//     balance: 0
//   },
//   {
//     name: 'Dec', 
//     number: 11, 
//     balance: 0
//   },
// ]

const weeks = [
  {
    name: '1', 
    number: 0, 
    balance: 0
  },
  {
    name: '2', 
    number: 1, 
    balance: 0
  },
  {
    name: '3', 
    number: 2, 
    balance: 0
  },
  {
    name: '4', 
    number: 3, 
    balance: 0
  },
  {
    name: '5', 
    number: 4, 
    balance: 0
  },
]

const days = [
  {
    name: '1', 
    number: 0, 
    balance: 0
  },
  {
    name: '2', 
    number: 1, 
    balance: 0
  },
  {
    name: '3', 
    number: 2, 
    balance: 0
  },
  {
    name: '4', 
    number: 3, 
    balance: 0
  },
  {
    name: '5', 
    number: 4, 
    balance: 0
  },
  {
    name: '6', 
    number: 5, 
    balance: 0
  },
  {
    name: '7', 
    number: 6, 
    balance: 0
  },
]

const HistorialPage = () => {
    const { type } = useParams()

    const [rangeData, setRangeData] = React.useState([]);
    const [savings, setSavings] = React.useState([]);
    const [chartData, setChartData] = React.useState([])
    const [totalIncomes, setTotalIncomes] = React.useState('');
    const [totalOutcomes, setTotalOutcomes] = React.useState('');

    const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
      const fetchData = async () => {
        let dateRange = []
        switch(type) {
            case 'mensual': 
                dateRange = month()
                break
            case 'semanal':
                dateRange = week(new Date())
                break
            case 'diario':
                dateRange = today()
                break
            default: month()
        }
        try {
          const [resultRangeData, resultSavings, resultData] = await Promise.all([
            getDataByDateRange(dateRange[0], dateRange[1]),
            getSavings(),
            getCostData()
          ]);
          let totalI, totalO = 0
          resultRangeData.forEach(activity => {
            activity.tipo === 'Ingreso' ? totalI = activity.importe : totalO += activity.importe
          })
          setTotalIncomes(totalI)
          setTotalOutcomes(totalO)
          setRangeData(resultRangeData);
          setSavings(resultSavings)
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [loading, type]);

    React.useEffect(() => {
      setLoading(true);
    
      const fetchData = async () => {
        try {
          const datas = [];
          if (type === 'mensual') {    
            let actualMonth = new Date();
            const months = monthsInOrder(actualMonth.getMonth())
            const dates = month(actualMonth);
            for (let i = 0; i < months.length; i++) {
              const element = months[i];
              const startDate = dates[0];
              const endDate = dates[1];
              const result = await getDataByDateRange(startDate, endDate);
              datas.push(result);
              actualMonth.setMonth(actualMonth.getMonth() - 1);
              const newDates = month(actualMonth);
              dates[0] = newDates[0];
              dates[1] = newDates[1];    
              result.forEach(costData => {
                if (costData.tipo === 'Egreso') {
                  element.balance -= costData.importe;
                } else {
                  element.balance += costData.importe;
                }
              });    
            }
            setChartData(months.reverse())
          } else if (type === 'semanal') {    
            let actualWeek = new Date()
            const dates = week(actualWeek)
            for (let i = weeks.length - 1; i >= 0; i--) {
              const element = weeks[i];
              const startDate = dates[0];
              const endDate = dates[1];
              const result = await getDataByDateRange(startDate, endDate);
              datas.push(result);
              actualWeek.setDate(actualWeek.getDate() - 7);
              const newDates = week(actualWeek);
              dates[0] = newDates[0];
              dates[1] = newDates[1];    
              result.forEach(costData => {
                if (costData.tipo === 'Egreso') {
                  element.balance -= costData.importe;
                } else {
                  element.balance += costData.importe;
                }
              });    
            }
            setChartData(weeks)
          } else if (type === 'diario') {    
            let actualDay = new Date()
            const dates = today(actualDay)
            for (let i = days.length - 1; i >= 0; i--) {
              const element = days[i];
              const startDate = dates[0];
              const endDate = dates[1];
              const result = await getDataByDateRange(startDate, endDate);
              datas.push(result);
              actualDay.setDate(actualDay.getDate() - 1);
              const newDates = today(actualDay);
              dates[0] = newDates[0];
              dates[1] = newDates[1];    
              result.forEach(costData => {
                if (costData.tipo === 'Egreso') {
                  element.balance -= costData.importe;
                } else {
                  element.balance += costData.importe;
                }
              });    
            }
            setChartData(days)
          }
          
        } catch (error) {
          console.error('An error occurred:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [type]);
    

    if (loading) {
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '100vh'}}>
        <CircularProgress color='blue'/>
    </div>;
    }
  return (
    <>
        <HistorialTopBar cardTitle={type} incomes={totalIncomes} expenses={totalOutcomes} amount={totalIncomes? totalIncomes-totalOutcomes : ''} chartData={chartData}></HistorialTopBar>
        <InfoTable data={rangeData} setLoading={setLoading} savings={savings}></InfoTable>
    </>
  )
}

export default HistorialPage