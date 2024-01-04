import React from 'react'
import PaperForm from '../utils/PaperForm'
import CustomButton from '../utils/CustomButton'
import CustomInput from '../utils/CustomInput'
import { Grid } from '@mui/material'
import CustomDatePicker from '../utils/DatePicker'
import { getCategories, insertNewCost } from '../../backend/queries'
import dayjs from 'dayjs'
import CategoryModal from '../utils/Modals/CategoryModal'
import {repeatOptions} from '../../constants'

const AddCostForm = () => {
const [categoryOptions, setCategoryOptions] = React.useState([])
const [cost, setCost] = React.useState('')  
const [date, setDate] = React.useState(dayjs(new Date()))  
const [category, setCategory] = React.useState('')  
const [repeat, setRepeat] = React.useState('')
const [description, setDescription] = React.useState('')  
const [costError, setCostError] = React.useState('')  
const [dateError, setDateError] = React.useState('')  
const [categoryError, setCategoryError] = React.useState('')  

const [openCategoryModal, setOpenCategoryModal] = React.useState(false)

React.useEffect(() => {
  const fetchData = async () => {
      try {
          const result = await getCategories();
          setCategoryOptions(result);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  fetchData();

}, [openCategoryModal]); 

const handleChange = (e, setValue, setError) => {
  const value = e.target ? e.target.value : e;
  setError && setError('')
  setValue(value)
}
console.log(category)

const validation = () => {
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
  return valid;
};

const handleSubmit = () => {
  if (validation()) {
    const type = 'Egreso'
    const {error} = insertNewCost(type, cost, date, category, repeat, description)
    error && console.log(error)
  }
}

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
            <Grid item xs= {12} md ={10}>
              <CustomInput 
                type={'text'}
                label={'Descripción'} 
                placeholder={'Ingresa una descripción del pago'} 
                largeInput={true}
                value={description}
                onChange={e => handleChange(e, setDescription)}
              ></CustomInput>
            </Grid>
          </Grid>
        </PaperForm>
        <CustomButton title='Agregar gasto' color={'blue'} onClick={handleSubmit}/>
    </>
  )
}

export default AddCostForm