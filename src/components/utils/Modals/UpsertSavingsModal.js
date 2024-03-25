import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import React from 'react'
import CustomInput from '../CustomInput'
import { CancelSubmitButton } from '../CustomButton'
import { upsertAvailableMoney, upsertSavings } from '../../../backend/queries'

const UpsertSavingsModal = props => {
    const {open, handleClose, currentSaving, savings, title, label, placeholder} = props

    const [newSaving, setNewSaving] = React.useState('')

    const handleSubmit = async () => {
        if(label === 'Ahorro') {
            await upsertSavings(newSaving)
            savings[0] = {...savings[0], ahorro: parseInt(newSaving)}
        } else {
            await upsertAvailableMoney(newSaving)
            savings[0] = {...savings[0], disponible: parseInt(newSaving)}
        }
        handleClose()
    }

    React.useEffect(() => {
        setNewSaving(currentSaving)
    }, [currentSaving])

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <CustomInput
                label={label}
                placeholder={placeholder}
                onChange={(e, value) => {setNewSaving(e.target.value)}}
                value={newSaving}
                inputAdornment={'$'}
                ></CustomInput>
        </DialogContent>
        <DialogActions>
            <CancelSubmitButton
                title={'Actualizar'}
                onCancel={handleClose}
                onSubmit={handleSubmit}
            ></CancelSubmitButton>
        </DialogActions>
    </Dialog>
  )
}

export default UpsertSavingsModal