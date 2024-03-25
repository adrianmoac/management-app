import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, makeStyles } from '@material-ui/core';
import { deleteImport, getCostfilteredData, upsertAvailableMoney, upsertSavings } from '../../backend/queries';
import { Button, CircularProgress, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomInput from './CustomInput'
import CustomDatePicker from './DatePicker'
import CustomButton from './CustomButton'
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E7E7E7',
    color: '#333333',
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F8F8F8',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles(theme => ({
    root: {
      flex: '1 1 auto',
      padding: '5%',
      margin: '0 auto',
    },
    icons: {
      '&:hover': {
        cursor: 'pointer'
    },
    }
  }))

const InfoTable = props => {
  const {savings, loading, data, setLoading} = props
  const classes = useStyles()
  const navigate = useNavigate()

  const [filterField, setFilterField] = React.useState('')
  const [filterDate, setFilterDate] = React.useState('')

  const onDelete = async (id, type, cost, account) => {
    setLoading(true)
    let availableOperation
    let savingsOperation
    if (type === 'Egreso') {
      availableOperation = savings[0].disponible + parseInt(cost)
      savingsOperation = savings[0].ahorro + parseInt(cost)
    } else {

      availableOperation = savings[0].disponible - parseInt(cost)
      savingsOperation = savings[0].ahorro - parseInt(cost)
    }
    const {accountError} = account === 'Disponible para gastos' ? upsertAvailableMoney(availableOperation) : upsertSavings(savingsOperation)
    accountError && console.log(accountError)

    await deleteImport(id)
    setLoading(false)
  }

  let filteredData
  if(!filterField) {
    filteredData = data
  } else {
    filteredData = data.filter(row => {
      console.log(parseInt(filterField))
      if(parseInt(filterField)) {
        return row.importe === parseInt(filterField)
      } else {
        return row.descripcion.toLowerCase().includes(filterField.toLowerCase()) || row.categoria.nombre.toLowerCase().includes(filterField.toLowerCase())
      }
    })
  }

  if (loading){ 
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '100vh'}}>
        <CircularProgress color='blue'/>
    </div>
  )}
  return (
      <Grid container className={classes.root}>
          <Grid xs={8} md={2}>
            <CustomInput
            placeholder={'Datos a buscar'}
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
          ></CustomInput>
          </Grid>
          <Grid xs={12} md={4}>
          </Grid>
          <Grid xs={0} md={2}></Grid>
          <Grid xs={6} md={2}>
            <Link to={'/agregar-gasto'} state={{title: 'Agregar gasto'}} style={{textDecoration: 'none'}}>
              <CustomButton
                title={'Agregar gasto'}
                color={'red'}
                marginTop={'0px'}
              ></CustomButton>
            </Link>
          </Grid>
          <Grid xs={6} md={2}>
            <Link to={'/agregar-ingreso'} state={{title: 'Agregar ingreso'}} style={{textDecoration: 'none'}}>
              <CustomButton
                title={'Agregar ingreso'}
                color={'green'}
                marginTop={'0px'}
              ></CustomButton>
            </Link>
          </Grid>
          <TableContainer component={Paper} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                      <StyledTableCell>Importe</StyledTableCell>
                      <StyledTableCell align="center">Fecha</StyledTableCell>
                      <StyledTableCell align="center">Categoría</StyledTableCell>
                      <StyledTableCell align="left">Descripción</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                  <TableBody>
                      {filteredData.map((row) => (
                          <StyledTableRow key={row.id}>
                              <StyledTableCell>
                                <Link style={{textDecoration: 'none'}} to={'/ver-importe/' + row.id} state={{title: 'Ver importe'}}>
                                <Typography style={{textDecoration: 'underline'}} color={row.tipo !== 'Ingreso' ? 'red.main' : 'green.main'}>{row.tipo !== 'Ingreso' ? `-$${row.importe}` : `$${row.importe}`}</Typography></Link>
                                </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography color='common.grey'>{format(new Date(row.fecha), 'dd/MM/yyyy')}</Typography>
                                </StyledTableCell>
                              <StyledTableCell align="center">
                              <Typography color='common.grey'>{row.categoria.nombre}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="left">
                              <Typography color='common.grey'>{row.descripcion}</Typography>
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                <Button variant='text'>
                                  <Typography color='common.grey' sx={{textDecoration: 'underline',cursor: 'pointer', ":hover": {color: '#5ca4a9'}}}>{row.categoria.nombre==='Fijo' && 'comparar'}</Typography>
                                </Button>
                              </StyledTableCell>

                              <StyledTableCell align="left">
                                  <IconButton color='lightGrey' onClick={() => navigate(`/editar-importe/${row.id}`, {state: {title: 'Editar importe'}})}>
                                    <EditIcon className={classes.icons}/>
                                  </IconButton>
                               </StyledTableCell>
                              <StyledTableCell align="left">
                                <IconButton color='lightGrey' onClick={() => {onDelete(row.id, row.tipo, row.importe, row.cuenta)}}>
                                    <DeleteIcon className={classes.icons}/>
                                  </IconButton>
                              </StyledTableCell>
                          </StyledTableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </Grid>
  );
}

export default InfoTable