import React from 'react'
import { Autocomplete, Button, InputAdornment, TextField, Typography} from '@mui/material'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    label: {
        color: 'lightGrayer',
        display: 'flex',
        justifyContent: 'left'
    },
    input: {
        width: '100%',
    }
}))


const CustomInput = props => {
    const {
        type='text',
        label, 
        placeholder, 
        width,
        inputAdornment,
        largeInput,
        onChange,
        value,
        options,
        buttonName,
        handleModal,
        error
    } = props
    const classes = useStyles()

    let newArray = []
    if(options) {
        if(type==='autocompleteWithCreatableButton') {
        newArray.push('')
    }
        newArray = [...newArray, ...options.map(item => item.nombre)]
    }

  return (
    <>
        <Typography className={classes.label} sx={{fontSize: 18, fontWeight: 'bold'}}>{label}</Typography>
        {type === 'text' && <>
        <TextField className={classes.input}
            color="blue"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">{inputAdornment}</InputAdornment>,
            }}
        ></TextField>
        <Typography color='error' style={{fontSize: '12px'}}>{error}</Typography>
        </>
        }
        {type === 'autocompleteWithCreatableButton' && <>
        <Autocomplete
          className={classes.input}
          options={newArray}
          getOptionLabel={(option) => option.nombre || option} 
          onChange={(event, value) => {
            if (value === null) {
              onChange('');
            } else {
              onChange(value);
            }
          }}
          renderOption={(props, option, state) => (
            <li {...props}>
              {option === '' ? (
                <Button fullWidth onClick={() => handleModal(true)}>
                  {`Agregar ${buttonName}`}
                </Button>
              ) : (
                <Typography>{option}</Typography>
              )}
            </li>
          )}          
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              color="blue"
              variant="outlined"
            />
            )}
        ></Autocomplete>
          <Typography color='error' style={{fontSize: '12px'}}>{error}</Typography>
        </>
}
      {type === 'autocomplete' && 
      <>
        <Autocomplete
          className={classes.input}
          options={newArray}
          getOptionLabel={(option) => option.nombre || option} 
          onChange={(event, value) => {
            if (value === null) {
              onChange('');
            } else {
              onChange(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              color="blue"
              variant="outlined"
            />
            )}
        ></Autocomplete>
        <Typography color='error' style={{fontSize: '12px'}}>{error}</Typography>
            </>
          }
    </>
  )
}

export default CustomInput