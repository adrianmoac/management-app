import React from 'react';
import HomeTopBar from './HomeTopBar';
import InfoTable from '../utils/InfoTable';
import { getCostData, getSavings } from '../../backend/queries';
import { CircularProgress } from '@mui/material';

const HomePage = () => {
  const [data, setData] = React.useState([]);
  const [savings, setSavings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultData, resultSavings] = await Promise.all([
          getCostData(),
          getSavings(),
        ]);

        setData(resultData);
        setSavings(resultSavings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading]);

  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '100vh'}}>
        <CircularProgress color='blue'/>
    </div>
    )
  }

  return (
    <>
      <HomeTopBar data={data} savings={savings}></HomeTopBar>
      <InfoTable data={data} savings={savings} loading={loading} setLoading={setLoading}></InfoTable>
    </>
  );
};

export default HomePage;
