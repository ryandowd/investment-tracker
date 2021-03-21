import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useForm, Controller } from 'react-hook-form';
import useGraphQL from '../../../hooks/useGraphQL';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import SnapshotCrypto from '../../UI/SnapshotCrypto';
import FormAsset from '../../UI/FormAsset';
import { formConfig } from '../../Utils/asset-form-config';


const PageCash = ({classes}) => {
    const [cryptos, setCryptos] = useState([]);
    const { register, handleSubmit, errors, control } = useForm();

    const fetchCryptoData = () => {
        const query = `
            {
                crypto{
                    id
                    date
                    bitcoin
                    ether
                    altcoins
                }
            }
        `;
        useGraphQL(query).then(response => {
            setCryptos(response.data.crypto);
        }).catch(error => {
            console.info(error.message, 'error.message')
        });
    }

    useEffect(() => {
        fetchCryptoData();
    }, []);

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
        fetchCryptoData();
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
                                {cryptos && cryptos.map(crypto => <SnapshotCrypto key={crypto.id} data={crypto} classes={classes} fetchFunc={fetchCryptoData} />)}
                            </Grid>
                        </Grid>
                    </form>
            </Container>
        </main>
    )
}

export default PageCash;