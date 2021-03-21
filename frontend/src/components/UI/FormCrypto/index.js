import React from 'react';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';
import FormDatePicker from '../../UI/FormDatePicker';

const FormCrypto = ({ register, classes, errors, control, Controller }) => {

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
                id="bitcoin"
                name="bitcoin"
                label="Bitcoin"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.bitcoin && (errors.bitcoin.message || 'Field required')}
            <TextField
                required
                id="ether"
                name="ether"
                label="Ethereum"
                fullWidth
                variant="standard"
                inputRef={registerConfig}
                className={classes.textField}
            />
            {errors.ether && (errors.ether.message || 'Field required')}
            <TextField
                required
                id="altcoins"
                name="altcoins"
                label="Altcoins"
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

export default FormCrypto;