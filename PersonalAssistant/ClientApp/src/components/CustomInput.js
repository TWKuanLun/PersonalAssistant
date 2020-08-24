import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/moment';
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';

import { inputType } from '../helper/GeneralConstants';

const useStyles = makeStyles({

});

const CustomInput = (props) => {
    const { fieldInfo, setValues, values, index } = props;
    const classes = useStyles();
    const handleTextChange = (e) => {
        let cloneValues = [...values];
        cloneValues.slice(index, 1, e.target.value);
        setValues(cloneValues);
    };
    const handleDateTimeChange = (date) => {
        let cloneValues = [...values];
        cloneValues.slice(index, 1, date);
        setValues(cloneValues);
    };
    if (fieldInfo.type === inputType.datetime) {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    disableToolbar
                    variant='inline'
                    format='yyyy/MM/dd hh:mm:ss'
                    margin='normal'
                    label={fieldInfo.title}
                    value={values[index]}
                    onChange={handleDateTimeChange} />
            </MuiPickersUtilsProvider>
        );
    }
    if (fieldInfo.type === inputType.select) {
        return (
            <TextField
                select
                label={fieldInfo.title}
                value={values[index]}
                onChange={handleTextChange}
                helperText={fieldInfo.helperText}>
                {fieldInfo.selectOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
    if (fieldInfo.type === inputType.text) {
        return (
            <TextField
                label='Outlined'
                variant='outlined'
                required={fieldInfo.required}
                fullWidth
                value={values[index]}
                onChange={handleTextChange} />
        );
    }
    return null;

}

export default CustomInput;