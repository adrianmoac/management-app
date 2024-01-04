import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomInput from '../CustomInput'
import { CancelSubmitButton } from '../CustomButton'
import { insertNewCategory } from '../../../backend/queries'

const CategoryModal = props => {
    const {open, handleClose, onChange} = props

    const [newCategory, setNewCategory] = React.useState('')

    const handleSubmit = async () => {
        await insertNewCategory(newCategory)
        onChange(newCategory)
        setNewCategory('')
        handleClose()
    }
    
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar categoría</DialogTitle>
        <DialogContent>
            <Grid container alignItems='center'>
                <Grid item sx={12} md={12}>
                    <CustomInput
                        label={'Ingresa la categoría'}
                        placeholder={'Categoría'}
                        onChange={(e, value) => {setNewCategory(e.target.value)}}
                        value={newCategory}
                    ></CustomInput>
                </Grid>
                <Grid item sx={12} md={12}>
                    <CancelSubmitButton
                        title={'Agregar'}
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                    ></CancelSubmitButton>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions></DialogActions>
    </Dialog>
  )
}

export default CategoryModal