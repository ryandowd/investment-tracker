import React from 'react';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';
import FormDatePicker from '../../UI/FormDatePicker';

const FormISA = ({ register, classes, errors, control, Controller }) => {

    const registerConfig = register({
        required: true,
        validate: (value) => !isNaN(value) || "Needs to be a number"
    });

    return (
        <>
            <FormDatePicker
                name="date"
                required={true}
                defaultValue={moment().format('YYYY-MM-DD')}
                control={control}
                Controller={Controller}
            />
            <TextField
                required
                id="cash"
                name="cash"
                label="Cash"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.cash && (errors.cash.message || 'Field required')}
            <TextField
                required
                id="stocks"
                name="stocks"
                label="Stocks"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.stocks && (errors.stocks.message || 'Field required')}
            <TextField
                required
                id="commodities"
                name="commodities"
                label="Commodities"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.commodities && (errors.commodities.message || 'Field required')}
            <TextField
                required
                id="bonds"
                name="bonds"
                label="Bonds"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.spainEURO && (errors.spainEURO.message || 'Field required')}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className={classes.button}>
                Save
            </Button>
        </>
    );
}

export default FormISA;