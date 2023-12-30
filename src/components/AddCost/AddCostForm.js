import React from 'react'
import PaperForm from '../utils/PaperForm'
import CustomButton from '../utils/CustomButton'
import CustomInput from '../utils/CustomInput'

const AddCostForm = () => {
  return (
    <>
        <PaperForm>
          <CustomInput></CustomInput>
        </PaperForm>
        <CustomButton title='Agregar gasto' color={'#5CA4A9'} />
    </>
  )
}

export default AddCostForm