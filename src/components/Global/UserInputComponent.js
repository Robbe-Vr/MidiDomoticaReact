import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inputBox: {
        
    },
}));

function UserInputComponent({ name, variant = "outlined", type = 'text', multiple = false, inputProps, defaultValue, disabled, onChange, isAsync = false, onEnter, submitIsAsync = false, isError = false, style = {} }) {
    const [value, setValue] = useState(defaultValue);

    if (!value && defaultValue) {
        setValue(defaultValue);
    }
    
    const classes = useStyles();

    if (type === 'number') {
        if (inputProps.step && inputProps.step === 1.00 && value % 1 !== 0) {
            var correction = parseInt((parseFloat(value) + 0.50).toString()).toString();
            if (correction === 0) {
                correction = 1;
            }

            setValue(correction);
            onChange(correction);
        }
    }

    return (
        <Grid style={{ width: style?.width || '100%', height: style?.height || '100%' }}>
            <TextField
                style={{ color: isError ? 'red': '', ...style, width: '100%', height: '100%' }}
                className={classes.inputBox}
                disabled={disabled}
                variant={variant}
                id={name}
                label={name}
                value={value}
                type={type}
                multiple={multiple}
                inputProps={inputProps}
                onChange={isAsync ? async (e) => {
                    setValue(e.target.value);
                    await onChange(type === 'file' ? e.target.files : e.target.value);
                } : 
                (e) => {
                    setValue(e.target.value);
                    onChange(type === 'file' ? e.target.files : e.target.value);
                }}
                onKeyDown={submitIsAsync ?
                async (e) => {
                    if (e.keyCode == 13) {
                        await onEnter();
                    }
                } : (e) => {
                    if (e.keyCode == 13) {
                        onEnter();
                    }
                }}
            />
        </Grid>
    );
};

export { UserInputComponent };