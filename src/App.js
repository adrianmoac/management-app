import theme from './theme'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import HomePage from './components/HomePage/HomePage';
import TopBar from './components/utils/pageBox/TopBar';
import AddCostForm from './components/AddCost/AddCostForm';
import CustomInput from './components/utils/CustomInput';

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/historico' element={<TopBar />} />
        <Route path='/estimar-gasto' element={<HomePage />} />
        <Route path='/agregar-gasto' element={<AddCostForm />} />
        <Route path='/agregar-ingreso' element={<HomePage />} />
      </Routes>
    </ThemeProvider>
      </>
    );
}

export default App;
