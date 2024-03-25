import theme from './theme'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from './components/HomePage/HomePage';
import AddCostForm from './components/AddCost/AddCostForm';
import SeeCostData from './components/SeeCostData';
import HistorialPage from './components/Historial/HistorialPage';

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/historico/:type' element={<HistorialPage />} />
        <Route path='/ver-importe/:id' element={<SeeCostData />} />
        <Route path='/agregar-gasto' element={<AddCostForm />} />
        <Route path='/agregar-ingreso' element={<AddCostForm />} />
        <Route path='/editar-importe/:id' element={<AddCostForm />} />
      </Routes>
    </ThemeProvider>
      </>
    );
}

export default App;
