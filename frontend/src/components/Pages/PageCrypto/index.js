import React, { useContext } from 'react';
import moment from 'moment';

import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import SnapshotCrypto from '../../UI/SnapshotCrypto';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../Utils/asset-form-config';
import { AssetContext } from '../../../context/assetContext';

const PageCrypto = ({classes}) => {
    const { register, handleSubmit, errors, control } = useForm();
    const { assetState: { cryptos }, dispatchAsset, fetchAllAssets } = useContext(AssetContext);

    const handlerFormSubmit = async (data) => {   
        const query = `
            mutation {
                createCrypto(
                    date: "${moment(data.date).format('MMMM Do YYYY')}",
                    bitcoin: ${data.bitcoin}, 
                    ether: ${data.ether},
                    altcoins: ${data.altcoins}
                ) {
                    id
                    date
                    bitcoin
                    ether
                    altcoins
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
                                    Add New Crypto Snapshot
                                </Typography>
                                <Paper className={classes.paper}>
                                    <FormAsset 
                                        register={register} 
                                        classes={classes} 
                                        errors={errors} 
                                        control={control} 
                                        Controller={Controller} 
                                        formConfig={formConfig.cryptoForm}
                                    />                                
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                    Latest Snapshots
                                </Typography>
                                {cryptos && cryptos.map(crypto => <SnapshotCrypto key={crypto.id} data={crypto} classes={classes} />)}
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </main>
    )
}

export default PageCrypto;