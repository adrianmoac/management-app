import React from 'react'
import PaperForm from '../utils/PaperForm'
import CustomButton from '../utils/CustomButton'
import CustomInput from '../utils/CustomInput'
import { Grid } from '@mui/material'
import CustomDatePicker from '../utils/DatePicker'
import { getCategories, getSavings, insertNewCost, upsertAvailableMoney, upsertSavings } from '../../backend/queries'
import dayjs from 'dayjs'
import CategoryModal from '../utils/Modals/CategoryModal'
import {accounts, repeatOptions} from '../../constants'
import { useLocation } from 'react-router-dom'

const AddCostForm = props => {
  const location = useLocation()
  const receivedData = location.state
const [categoryOptions, setCategoryOptions] = React.useState([])
const [accountOptions, setAccountOptions] = React.useState([])
const [cost, setCost] = React.useState('')  
const [date, setDate] = React.useState(dayjs(new Date()))  
const [category, setCategory] = React.useState('')  
const [repeat, setRepeat] = React.useState('')
const [account, setAccount] = React.useState('Disponible para gastos')
const [description, setDescription] = React.useState('')  
const [costError, setCostError] = React.useState('')  
const [dateError, setDateError] = React.useState('')  
const [categoryError, setCategoryError] = React.useState('')  
const [accountError, setAccountError] = React.useState('')
const [loading, setLoading] = React.useState(false)

const [openCategoryModal, setOpenCategoryModal] = React.useState(false)

React.useEffect(() => {
  setLoading(true)
  const fetchData = async () => {
      try {
          const result = await getCategories();
          setCategoryOptions(result);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
      try {
        const result = await getSavings();
        setAccountOptions(result);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  fetchData();

  setLoading(false)
}, [openCategoryModal]); 

const handleChange = (e, setValue, setError) => {
  const value = e.target ? e.target.value : e;
  setError && setError('')
  setValue(value)
}

const validation = async () => {
  let valid = true;
  if (cost) {
    setCostError('');
  } else {
    setCostError('Tienes que ingresar una importe');
    valid = false;
  }
  if (date) {
    setDateError('');
  } else {
    setDateError('Tienes que ingresar una fecha');
    valid = false;
  }
  if (category) {
    setCategoryError('');
  } else {
    setCategoryError('Tienes que ingresar una categoría');
    valid = false;
  }
  if (account) {
    setCategoryError('');
  } else {
    setAccountError('Tienes que seleccionar una cuenta destino');
    valid = false;
  }
  return valid;
};

const handleSubmit = () => {
  setLoading(true)
  if (validation()) {
    let categoryId = ''
    categoryOptions.forEach(option => {
      if (option.nombre === category) {
        categoryId = option.id_categoria
      } 
    })
    const type = receivedData.title === 'Agregar ingreso' ? 'Ingreso' : 'Egreso'
    const {error} = insertNewCost(type, cost, date, categoryId, repeat, description)
    error && console.log(error)
    let availableOperation
    let savingsOperation
    if (type === 'Egreso') {
      availableOperation = accountOptions[0].disponible - parseInt(cost)
      savingsOperation = accountOptions[0].ahorro - parseInt(cost)
    } else {
      availableOperation = accountOptions[0].disponible + parseInt(cost)
      savingsOperation = accountOptions[0].ahorro + parseInt(cost)
    }
    const {accountError} = account === 'Disponible para gastos' ? upsertAvailableMoney(availableOperation) : upsertSavings(savingsOperation)
    accountError && console.log(accountError)
  }
  setLoading(false)
}
console.log(account)

if (loading){ 
  return (
  <p>Loading...</p>
)}

  return (
    <>
            <CategoryModal
              open={openCategoryModal}
              handleClose={() => setOpenCategoryModal(false)}
              onChange={setCategory}
        ></CategoryModal>
        <PaperForm>
          <Grid container spacing={8} justifyContent='center'>
            <Grid item xs={12} md={5}>
              <CustomInput 
                type={'text'}
                label={'Importe'} 
                placeholder={'0.00'} 
                inputAdornment={'$'}
                value={cost}
                error={costError}
                onChange={e => handleChange(e, setCost, setCostError)}
              ></CustomInput>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomDatePicker 
                label={'Fecha'}
                value={date}
                error={dateError}
                onChange={e => handleChange(e, setDate, setDateError)}
              ></CustomDatePicker>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomInput 
                type={'autocompleteWithCreatableButton'}
                options={categoryOptions}
                buttonName={'categoría'}
                label={'Categoría'} 
                placeholder={'Elige la categoría'}
                value={category}
                error={categoryError}
                handleModal={setOpenCategoryModal}
                onChange={e => handleChange(e, setCategory, setCategoryError)}
              ></CustomInput>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomInput 
                type={'autocomplete'}
                options={repeatOptions}
                label={'Repetir'} 
                placeholder={'Elige cuándo se repite'} 
                value={repeat}
                onChange={e => handleChange(e, setRepeat)}
              ></CustomInput>
            </Grid>
            <Grid item xs= {12} md ={5}>
              <CustomInput 
                type={'text'}
                label={'Descripción'} 
                placeholder={'Ingresa una descripción del pago'} 
                largeInput={true}
                value={description}
                onChange={e => handleChange(e, setDescription)}
              ></CustomInput>
            </Grid>
            <Grid item xs={12} md={5}>
              <CustomInput 
                type={'autocomplete'}
                options={accounts}
                error={accountError}
                label={'Cuenta'} 
                placeholder={'Selecciona la cuenta destino'} 
                value={account}
                onChange={e => handleChange(e, setAccount)}
              ></CustomInput>
            </Grid>
          </Grid>
        </PaperForm>
        <CustomButton title={receivedData.title} color={'blue'} onClick={handleSubmit}/>
    </>
  )
}

export default AddCostForm