import React from 'react';
import clsx from 'clsx';
import useGraphQL from '../../../hooks/useGraphQL';
import { Paper, Typography, IconButton, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SnapshotISA = ({isaData, classes, fetchISAData}) => {

    const handleOnClick = (id) => {
        const query = `
            mutation {
                deleteISA(id:"${id}") {
                    id
                }
            }
        `;
        useGraphQL(query);
        fetchISAData();
    }

    return (
        <Paper className={clsx(classes.paper, classes.snapShotSm)}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography variant="body1" component="p">
                        Date: {isaData.date}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Cash: {isaData.cash}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Stocks: {isaData.stocks}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Commodities: {isaData.commodities}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Bonds: {isaData.bonds}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleOnClick(isaData.id)}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SnapshotISA;