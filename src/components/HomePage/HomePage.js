import React from 'react';
import HomeTopBar from './HomeTopBar';
import InfoTable from '../utils/InfoTable';
import { getCostData, getSavings } from '../../backend/queries';

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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HomeTopBar data={data} savings={savings}></HomeTopBar>
      <InfoTable data={data}></InfoTable>
    </>
  );
};

export default HomePage;
