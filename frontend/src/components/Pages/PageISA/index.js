import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import Snapshot from '../../UI/Snapshot';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../../utils/asset-types-config';
import { useAssetContext } from '../../../context/assetContext';
import { useFetchAllAssets } from '../../../hooks/useFetchAllAssets';

const PageISA = ({classes}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const { assetState: { isas }, dispatchAsset } = useAssetContext();
    const { fetchAllAssets } = useFetchAllAssets(dispatchAsset);

    useEffect(() => {
        fetchAllAssets();
    }, []);

    const handlerFormSubmit = async (data) => {    
        const query = `
            mutation {
                createIsa(
                    date: "${moment(data.date).format('MMMM Do YYYY')}",
                    dateUnix: ${moment(data.date).unix()},
                    cash: ${data.cash},
                    stocks: ${data.stocks},
                    commodities: ${data.commodities},
                    bonds: ${data.bonds}
                ) {
                    id
                    date
                    dateUnix
                    cash
                    stocks
                    commodities
                    bonds
                }
            }
        `;

        useGraphQL(query);
        fetchAllAssets();
    }

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                    <form noValidate onSubmit={handleSubmit((data) => handlerFormSubmit(data))}>
                        <Grid container  spacing={3} direction="row">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Add New ISA Snapshot
                                </Typography>
                                <Paper className={classes.paper}>
                                    <FormAsset 
                                        register={register} 
                                        classes={classes} 
                                        errors={errors} 
                                        control={control} 
                                        Controller={Controller} 
                                        formConfig={formConfig.isa}
                                    />                                       
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Latest Snapshots
                                </Typography>
                                {isas && isas.map(isa => (
                                    <Snapshot 
                                        type="isa"
                                        key={isa.id} 
                                        data={isa} 
                                        classes={classes} 
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </main>
    )
}

export default PageISA;