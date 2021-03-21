import React from 'react';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';
import FormDatePicker from '../../UI/FormDatePicker';

const FormCash = ({ register, classes, errors, control, Controller }) => {

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
                id="krakenGBP"
                name="krakenGBP"
                label="Kraken (GBP)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.krakenGBP && (errors.krakenGBP.message || 'Field required')}
            <TextField
                required
                id="krakenUSDT"
                name="krakenUSDT"
                label="Kraken (USDT)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.stocks && (errors.krakenUSDT.message || 'Field required')}
            <TextField
                required
                id="krakenUSDC"
                name="krakenUSDC"
                label="Kraken (USDC)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.krakenUSDC && (errors.krakenUSDC.message || 'Field required')}
            <TextField
                required
                id="celsiusUSDT"
                name="celsiusUSDT"
                label="Celsius (USDT)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.celsiusUSDT && (errors.celsiusUSDT.message || 'Field required')}
            <TextField
                required
                id="celsiusUSDC"
                name="celsiusUSDC"
                label="Celsius (USDC)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.celsiusUSDC && (errors.celsiusUSDC.message || 'Field required')}
            <TextField
                required
                id="blockfiUSDT"
                name="blockfiUSDT"
                label="BlockFi (USDT)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.blockfiUSDT && (errors.blockfiUSDT.message || 'Field required')}
            <TextField
                required
                id="blockfiUSDC"
                name="blockfiUSDC"
                label="BlockFi (USDC)"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.blockfiUSDC && (errors.blockfiUSDC.message || 'Field required')}
            <TextField
                required
                id="spainEURO"
                name="spainEURO"
                label="Spain (EURO)"
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

export default FormCash;