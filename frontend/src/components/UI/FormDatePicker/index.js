import 'moment';
import React from "react";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const MuiDatePicker = (props) => {
  const { required } = props;

  return (
    <>
      <KeyboardDatePicker
        format="DD-MM-YYYY"
        fullWidth={true}
        InputLabelProps={{
          className: required ? "required-label" : "",
          required: required || false,
        }}
        {...props}
      />
    </>
  );
};

const FormDatePicker = (props) => {
  const { name, defaultValue, control, Controller } = props;

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Controller
          as={MuiDatePicker}
          name={name}
          control={control}
          defaultValue={defaultValue}
          {...props}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default FormDatePicker;