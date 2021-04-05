import React, { useEffect } from 'react';
import clsx from 'clsx';

import useStyles from '../../../hooks/useStyles';
import { Container, Grid, Paper } from '@material-ui/core';
import Chart from '../../UI/Chart';
import DashboardTotal from '../../UI/DashboardTotal';
import LatestSnapshots from '../../UI/LatestSnapshots';
import { useAssetContext } from '../../../context/assetContext';
import { useFetchAllAssets } from '../../../hooks/useFetchAllAssets';

const PageDashboard = () => {
    const { dispatchAsset } = useAssetContext();
    const classes = useStyles();
    const { fetchAllAssets } = useFetchAllAssets(dispatchAsset);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
      fetchAllAssets();
    }, []);

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <Chart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <DashboardTotal />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            {/* <LatestSnapshots /> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
    )
}

export default PageDashboard;