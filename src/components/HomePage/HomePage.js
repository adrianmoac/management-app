import React from 'react'
import HomeTopBar from './HomeTopBar'
import InfoTable from '../utils/InfoTable'
import { getCostData } from '../../backend/queries';

const HomePage = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await getCostData();
              setData(result);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();
  }, []); 
  console.log('Home page', data)


  return (
    <>
        <HomeTopBar data={data}></HomeTopBar>
        <InfoTable data={data}></InfoTable>
    </>
  )
}

export default HomePage