import React, { useEffect, useContext } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import useStyles from '../../../hooks/useStyles';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import Snapshot from '../../UI/Snapshot';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../../utils/asset-types-config';
import { useAssetContext } from '../../../context/assetContext';
import { useFetchAllAssets } from '../../../hooks/useFetchAllAssets';

const PageCash = () => {
    const { register, handleSubmit, errors, control } = useForm();
    const { assetState: { cashs }, dispatchAsset } = useAssetContext()
    const { fetchAllAssets } = useFetchAllAssets(dispatchAsset);
    const classes = useStyles();
    
    useEffect(() => {
        fetchAllAssets();
    }, []);

    const handlerFormSubmit = async (data) => {   
        const query = `
            mutation {
                createCash(
                    date: "${moment(data.date).format('MMMM Do YYYY')}",
                    dateUnix: ${moment(data.date).unix()},
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
                    dateUnix
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

        console.log(query, 'query query query')

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
                                    Add New Cash Snapshot
                                </Typography>
                                <Paper className={classes.paper}>
                                    <FormAsset 
                                        register={register} 
                                        classes={classes} 
                                        errors={errors} 
                                        control={control} 
                                        Controller={Controller} 
                                        formConfig={formConfig.cash}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Latest Snapshots
                                </Typography>
                                {cashs && cashs.map(cash => (
                                    <Snapshot 
                                        type="cash"
                                        key={cash.id} 
                                        data={cash} 
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

export default PageCash;