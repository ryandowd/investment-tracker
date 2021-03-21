import React from 'react';
import clsx from 'clsx';
import useGraphQL from '../../../hooks/useGraphQL';
import { Paper, Typography, IconButton, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SnapshotCrypto = ({data, classes, fetchFunc}) => {

    const handleOnClick = (id) => {
        const query = `
            mutation {
                deleteCrypto(id:"${id}") {
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
                        Bitcoin: {data.bitcoin}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Ether: {data.ether}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Altcoins: {data.altcoins}
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

export default SnapshotCrypto;