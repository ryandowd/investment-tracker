import React, { useContext } from 'react';
import moment from 'moment';

import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import SnapshotCash from '../../UI/SnapshotCash';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../Utils/asset-form-config';
import { AssetContext } from '../../../context/assetContext';

const PageCash = ({classes}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const { assetState: { cashs }, dispatchAsset, fetchAllAssets } = useContext(AssetContext);

    const handlerFormSubmit = async (data) => {   
        const query = `
            mutation {
                createCash(
                    date: "${moment(data.date).format('MMMM Do YYYY')}",
                    krakenGBP: ${data.krakenGBP}, 
                    krakenUSDT: ${data.krakenUSDT}, 
                    krakenUSDC: ${data.krakenUSDC}, 
                    celsiusUSDT: ${data.celsiusUSDT},
                    celsiusUSDC: ${data.celsiusUSDC}, 
                    blockfiUSDT: ${data.blockfiUSDT}, 
                    blockfiUSDC: ${data.blockfiUSDC}, 
                    spainEURO: ${data.spainEURO}
                ) {
                    id
                    date
                    krakenGBP
                    krakenUSDT
                    krakenUSDC
                    celsiusUSDT
                    celsiusUSDC
                    blockfiUSDT
                    blockfiUSDC
                    spainEURO
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
                                    Add New Cash Snapshot
                                </Typography>
                                <Paper className={classes.paper}>
                                    <FormAsset 
                                        register={register} 
                                        classes={classes} 
                                        errors={errors} 
                                        control={control} 
                                        Controller={Controller} 
                                        formConfig={formConfig.cashForm}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Latest Snapshots
                                </Typography>
                                {cashs && cashs.map(cash => (
                                    <SnapshotCash 
                                        key={cash.id} 
                                        data={cash} 
                                        classes={classes} 
                                        fetchFunc={null} 
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </main>
    )
}

export default PageCash;