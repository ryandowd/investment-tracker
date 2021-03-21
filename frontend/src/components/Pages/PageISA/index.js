import React, { useContext } from 'react';
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import SnapshotISA from '../../UI/SnapshotISA';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../Utils/asset-form-config';
import { AssetContext } from '../../../context/assetContext';

const PageISA = ({classes}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const { assetState: { isas }, dispatchAsset, fetchAllAssets } = useContext(AssetContext);

    const handlerFormSubmit = async (data) => {      
        const query = `
            mutation {
                createISA(
                    date: "${moment().format('MMMM Do YYYY')}",
                    cash: ${data.cash},
                    stocks: ${data.stocks},
                    commodities: ${data.commodities},
                    bonds: ${data.bonds}
                ) {
                    id
                    date
                    cash
                    stocks
                    commodities
                    bonds
                }
            }
        `;

        useGraphQL(query);
        fetchAllAssets(dispatchAsset);
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
                                        formConfig={formConfig.isaForm}
                                    />                                       
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Latest Snapshots
                                </Typography>
                                {isas && isas.map(isa => <SnapshotISA key={isa.id} isaData={isa} classes={classes} />)}
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </main>
    )
}

export default PageISA;