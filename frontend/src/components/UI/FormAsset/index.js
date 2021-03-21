import React from 'react';
import moment from 'moment';
import { TextField, Button } from '@material-ui/core';
import FormDatePicker from '../../UI/FormDatePicker';

const FormAsset = ({ register, classes, errors, control, Controller, formConfig }) => {

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
            {formConfig.map(({name, label}) => (
                <>
                    <TextField
                        required
                        id={name}
                        name={name}
                        label={label}
                        fullWidth
                        variant="standard"
                        inputRef={registerConfig}
                        className={classes.textField}
                    />
                    {errors[name] && (errors[name].message || 'Field required')}
                </>
            ))}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className={classes.button}>
                Save
            </Button>
        </>
    );
}

export default FormAsset;