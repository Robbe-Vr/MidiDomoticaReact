import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, MenuItem, InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inputBox: {
        
    },
}));

function UserMultiSelectInputComponent({ name, variant = "outlined", defaultValues = [], options, onChange, style, isError = false }) {
    const [values, setValues] = useState(defaultValues);

    if ((!values || values.length < 1) && (defaultValues && defaultValues.length > 0)) {
        setValues(defaultValues);
    }
    
    const classes = useStyles();

    const overrideOnChange = (value) => {
        setValues(value);
        onChange(value);
    };

    return (
        <Grid style={{ width: style?.width || '100%', height: style?.height || '100%' }}>
            <InputLabel id={name}/>
            <Select
                style={{ color: isError ? 'red' : '', ...style, width: '100%', height: '100%' }}
                multiple={true}
                className={classes.inputBox}
                variant={variant}
                id={name}
                label={name}
                value={values}
                onChange={(e) => {
                    overrideOnChange(e.target.value);
                }}
            > 
            {
                options.map(option =>
                    <MenuItem style={{ border: values.indexOf(option.value) > -1 ? 'solid 1px white' : '', borderRadius: '4px', backgroundColor: style?.backgroundColor || '', color: style?.color || '' }} key={name + "-" + option.name} id={name + "-" + option.name} value={option.value} selected={values.indexOf(option.value) > -1}>{option.name}</MenuItem>
                )
            }
            </Select>
        </Grid>
    );
};

export { UserMultiSelectInputComponent };