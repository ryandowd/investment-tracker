import React from 'react';
import clsx from 'clsx';
import { useDeleteSnapshot } from '../../../hooks/useDeleteSnapshot'
import { useAssetContext } from '../../../context/assetContext';
import { useFetchAllAssets } from '../../../hooks/useFetchAllAssets';
import { Paper, Typography, IconButton, Grid } from '@material-ui/core';
import { formConfig } from '../../../utils/asset-types-config';
import CloseIcon from '@material-ui/icons/Close';

const SnapshotCash = ({type, data, classes}) => {
    const { dispatchAsset } = useAssetContext()
    const { fetchAllAssets } = useFetchAllAssets(dispatchAsset);
    const { deleteSnapshot } = useDeleteSnapshot(fetchAllAssets);

    const handleOnClick = (id) => {
        deleteSnapshot(type, id);
        fetchAllAssets();
    }

    return (
        <Paper className={clsx(classes.paper, classes.snapShotSm)}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Typography variant="body1" component="p">
                        Date: {data.date}
                    </Typography>
                    {formConfig[type].map(field => {
                        return (
                            <Typography 
                                key={field.name}
                                variant="body1" 
                                component="p"
                            >
                                {field.label}: {data[field.name]}
                            </Typography>
                        )
                    })}
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