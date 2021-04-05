import React from 'react';
import { TextField } from '@material-ui/core';

const FormAsset = ({ register, classes, errors, control, Controller, formConfig }) => {

    const registerConfig = register({
        required: true,
        validate: (value) => !isNaN(value) || "Needs to be a number"
    });

    return (
        <>
            {formConfig.map(({name, label}) => (
                <>
                    <TextField
                        key={name}
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
        </>
    );
}

export default FormAsset;