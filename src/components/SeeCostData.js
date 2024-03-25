import React from 'react'
import PaperForm from './utils/PaperForm'
import CustomButton from './utils/CustomButton'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, Grid } from '@mui/material'
import InfoCard from './utils/InfoCard'
import CustomInput from './utils/CustomInput'
import CustomDatePicker from './utils/DatePicker'
import { getCategories, getCostDataById} from '../backend/queries'

const SeeCostData = props=> {
    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false)
    const [costData ,setCostData] = React.useState([])
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
          try {
            const [categoryResult, costDataResult] = await Promise.all([
              getCategories(),
              getCostDataById(params.id),
            ]);
            setCategories(categoryResult);
            setCostData(costDataResult);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
        
        fetchData();
      }, [params.id]);
    
    if (loading || costData.length === 0 || categories.length === 0){ 
        return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '100vh'}}>
            <CircularProgress color='blue'/>
        </div>
      )}

    return (
    <>
        <PaperForm>
            <Grid container justifyContent={'center'} spacing={2} style={{paddingTop: '25px', paddingBottom: '25px'}}>
                <Grid item xs={5}>
                    <InfoCard
                        amount={costData[0].importe}
                        amountType={costData[0].tipo}
                    ></InfoCard>
                </Grid>
                <Grid xs={5}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item xs={3}>
                            <CustomDatePicker
                                value={costData[0].fecha}
                                label={'Fecha'}
                                disabled={true}
                            ></CustomDatePicker>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomInput
                                value={costData[0].categoria.nombre}
                                label={'Categoría'}
                                disabled={true}
                            ></CustomInput>
                        </Grid>
                        <Grid item xs={3}>
                            <CustomInput
                                value={costData[0].cuenta}
                                label={'Cuenta'}
                                disabled={true}
                            ></CustomInput>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <CustomInput
                        value={costData[0].descripcion}
                        label={'Descripción'}
                        disabled={true}
                    ></CustomInput>
                </Grid>
                <Grid item xs={5}>
                    <CustomInput
                        value={costData[0].repetir}
                        label={'Repetir'}
                        disabled={true}
                    ></CustomInput>
                </Grid>
            </Grid>

        </PaperForm>
            <CustomButton
                title={'Editar importe'}
                color='blue'
                onClick={() => navigate('/editar-importe/' + params.id, {state: {title: 'Editar importe'}})}
            ></CustomButton>
    </>
  )
}

export default SeeCostData