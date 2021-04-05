import React, { useEffect, useContext } from 'react';
import moment from 'moment';

import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import useStyles from '../../../hooks/useStyles';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import Snapshot from '../../UI/Snapshot';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../../utils/asset-types-config';
import { useAssetContext } from '../../../context/assetContext';
import { useFetchAllAssets } from '../../../hooks/useFetchAllAssets';
import { useDeleteSnapshot } from '../../../hooks/useDeleteSnapshot'

const PageCrypto = () => {
    const { register, handleSubmit, errors, control } = useForm();
    const { assetState: { cryptos }, dispatchAsset } = useAssetContext();
    const classes = useStyles();
    const { fetchAllAssets } = useFetchAllAssets(dispatchAsset);

    useEffect(() => {
        fetchAllAssets();
    }, []);

    const handlerFormSubmit = async (data) => {   
        const query = `
            mutation {
                createCrypto(
                    date: "${moment(data.date).format('MMMM Do YYYY')}",
                    dateUnix: ${moment(data.date).unix()},
                    bitcoin: ${data.bitcoin}, 
                    ether: ${data.ether},
                    altcoins: ${data.altcoins}
                ) {
                    id
                    date
                    dateUnix
                    bitcoin
                    ether
                    altcoins
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
                                    Add New Crypto Snapshot
                                </Typography>
                                <Paper className={classes.paper}>
                                    <FormAsset 
                                        register={register} 
                                        classes={classes} 
                                        errors={errors} 
                                        control={control} 
                                        Controller={Controller} 
                                        formConfig={formConfig.crypto}
                                    />                                
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Latest Snapshots
                                </Typography>
                                {cryptos && cryptos.map(crypto => (
                                    <Snapshot 
                                        type="crypto"
                                        key={crypto.id} 
                                        data={crypto} 
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

export default PageCrypto;