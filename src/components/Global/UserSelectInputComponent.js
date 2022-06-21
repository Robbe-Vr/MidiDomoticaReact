import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inputBox: {
        
    },
}));

function UserSelectInputComponent({ name, variant = "outlined", defaultValue = '', options, style, onChange, isError = false }) {
    const [value, setValue] = useState(defaultValue);

    if (!value && defaultValue) {
        setValue(defaultValue);
    }
    
    const classes = useStyles();

    return (
        <Grid style={{ width: style?.width || '100%', height: style?.height || '100%' }}>
            <Select
                style={{ color: isError ? 'red' : '', ...style, width: '100%', height: '100%' }}
                className={classes.inputBox}
                variant={variant}
                id={name}
                label={name}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
            > 
            {
                options.map(option =>
                    <MenuItem style={{ backgroundColor: style?.backgroundColor || '', color: style?.color || '' }} key={option.id ?? options.name + '-' + option.value} value={option.value} selected={option.value === defaultValue}>{option.name}</MenuItem>
                )
            }
            </Select>
        </Grid>
    );
};

export { UserSelectInputComponent };