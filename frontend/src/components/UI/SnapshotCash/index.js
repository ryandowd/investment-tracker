import React from 'react';
import clsx from 'clsx';
import useGraphQL from '../../../hooks/useGraphQL';
import { Paper, Typography, IconButton, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SnapshotCash = ({data, classes, fetchFunc}) => {

    const handleOnClick = (id) => {
        const query = `
            mutation {
                deleteCash(id:"${id}") {
                    id
                }
            }
        `;
        useGraphQL(query);
        fetchFunc();
    }

    return (
        <Paper className={clsx(classes.paper, classes.snapShotSm)}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography variant="body1" component="p">
                        Date: {data.date}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Kraken (GBP): {data.krakenGBP}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Kraken (USDT): {data.krakenUSDT}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Kraken (USDC): {data.krakenUSDC}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Celsius (USDT): {data.celsiusUSDT}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Celsius (USDC): {data.celsiusUSDC}
                    </Typography>
                    <Typography variant="body1" component="p">
                        BlockFi (USDT): {data.blockfiUSDT}
                    </Typography>
                    <Typography variant="body1" component="p">
                        BlockFi (USDC): {data.blockfiUSDC}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Spain (EURO): {data.spainEURO}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleOnClick(data.id)}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SnapshotCash;