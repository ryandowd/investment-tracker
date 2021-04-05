import React, { useEffect } from 'react';

import { useFetchAllAssets } from '../../../hooks/useFetchAllAssets';
import useStyles from '../../../hooks/useStyles';
import { useAssetContext } from '../../../context/assetContext';

import { Container, Paper, Typography } from '@material-ui/core';
import FormAddSnapshot from '../../UI/FormAddSnapshot';
import LatestSnapshots from '../../UI/LatestSnapshots';
import ModalTransition from '../../UI/ModalTransition';

const PageSnapshots = () => {
    const { dispatchAsset } = useAssetContext();
    const classes = useStyles();
    const { fetchAllAssets } = useFetchAllAssets(dispatchAsset);

    useEffect(() => {
        fetchAllAssets();
    }, []);
    
    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h6" gutterBottom>
                    Add New Snapshot
                </Typography>
                <Paper className={classes.paper}>
                    <FormAddSnapshot fetchAllAssets={fetchAllAssets} classes={classes} />
                </Paper>
                <Paper className={classes.paper}>
                    <ModalTransition>   
                        <LatestSnapshots classes={classes}/>
                    </ModalTransition>
                </Paper>
            </Container>
        </main>
    )
}

export default PageSnapshots;