import React from 'react';
import moment from 'moment';

import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import { formConfig } from '../../../utils/asset-types-config';

import { Grid, Button } from '@material-ui/core';
import FormAsset from '../../UI/FormAsset';
import FormDatePicker from '../../UI/FormDatePicker';

const FormAddSnapshot = (props) => {
    const { fetchAllAssets, classes } = props;
    const { register, handleSubmit, errors, control } = useForm();

    const handlerFormSubmit = async (data) => {    
        const query = `
            mutation {
                createSnapshot(
                    date: "${moment(data.date).format('MMMM Do YYYY')}",
                    dateUnix: ${moment(data.date).unix()},
                    cash: {
                        krakenGBP: ${data.krakenGBP}, 
                        krakenUSDT: ${data.krakenUSDT}, 
                        krakenUSDC: ${data.krakenUSDC}, 
                        celsiusUSDT: ${data.celsiusUSDT},
                        celsiusUSDC: ${data.celsiusUSDC}, 
                        blockfiUSDT: ${data.blockfiUSDT}, 
                        blockfiUSDC: ${data.blockfiUSDC}, 
                        spainEURO: ${data.spainEURO}
                    },
                    isa: {
                        cash: ${data.cash},
                        stocks: ${data.stocks},
                        commodities: ${data.commodities},
                        bonds: ${data.bonds}
                    },
                    crypto: {
                        bitcoin: ${data.bitcoin}, 
                        ether: ${data.ether},
                        altcoins: ${data.altcoins}
                    }
                )   {
                    id
                    date
                    cash {
                        krakenGBP 
                        krakenUSDT 
                        krakenUSDC 
                        celsiusUSDT
                        celsiusUSDC 
                        blockfiUSDT 
                        blockfiUSDC
                        spainEURO
                    }
                    isa {
                        stocks
                        cash
                        bonds
                        commodities
                    }
                    crypto {
                        bitcoin
                        ether
                        altcoins
                    }
                }
            }
        `
        
        useGraphQL(query);
        fetchAllAssets();
    }

    return (
        <form 
            noValidate 
            onSubmit={handleSubmit((data) => handlerFormSubmit(data))}
        >
            <Grid container spacing={3}> 
                <Grid item xs={12} md={4}>
                    <h2>Cash</h2>
                    <FormAsset 
                        register={register} 
                        classes={classes} 
                        errors={errors} 
                        control={control} 
                        Controller={Controller} 
                        formConfig={formConfig.cash}
                    /> 
                </Grid>
                <Grid item xs={12} md={4}>
                    <h2>ISA</h2>
                    <FormAsset 
                        register={register} 
                        classes={classes} 
                        errors={errors} 
                        control={control} 
                        Controller={Controller} 
                        formConfig={formConfig.isa}
                    />  
                </Grid>
                <Grid item xs={12} md={4}>
                    <h2>Crypto</h2>
                    <FormAsset 
                        register={register} 
                        classes={classes} 
                        errors={errors} 
                        control={control} 
                        Controller={Controller} 
                        formConfig={formConfig.crypto}
                    />  
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormDatePicker
                        name="date"
                        required={true}
                        defaultValue={moment().format('YYYY-MM-DD')}
                        control={control}
                        Controller={Controller}
                    />
                </Grid> 
                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className={classes.button}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default FormAddSnapshot;