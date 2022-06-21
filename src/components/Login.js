import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";

import { UserInputComponent } from "./Global/UserInputComponent";

import { useAccount } from "../api/account";

import { form as formstyles } from "./common-styles";
import { useNotifications } from "./Global/NotificationContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "80%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    topForm: formstyles,
    paper: {
        width: "100%",
        height: '100%',
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        color: 'white',
    },
    txt: { textAlign: "center" },
    errorTxt: { textAlign: "center", color: "#ff0000" },
    form: {
        margin: 'auto',
        width: '100%',
        height: '80%',
    },
}));

export default function LogInPage({ setTitle, onSuccess, Api }) {
    useEffect(() => {
        setTitle && setTitle("Log In");
    });

    const { error } = useNotifications();

    const { login } = useAccount();

    const [password, setPassword] = useState("");

    async function AttemptLogIn(password) {

        var res = await login(password, Api);
        
        if (res instanceof String || typeof res == 'string') {
            if (res == 'No data recieved.')
                res = 'Servers offline! Please try again later.';

            error(res);
        }
        else if (res.status && res.status != 200) {
            error(`Failed to login! ${res.title}`);
            console.log('Failed to login!', res);

            error(res.detail);
        }
        else if (res.data && res.data.result == true) {
            onSuccess();
        }
        else if (res.data && res.data.message) {
            error(res.data.message);
        }
        else {
            error('Failed to login!');
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.topForm}>
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Typography className={classes.txt} style={{ width: '100%' }} variant="h2">
                            Log In
                        </Typography>

                        <Grid container direction="row"
                            style={{ height: '40%', color: '#22DDFF', marginTop: '20px', marginBottom: '30px', width: '100%' }}
                        >
                            <UserInputComponent name="Password" type="password" onChange={(value) => { setPassword(value); }} style={{ color: '#22DDFF', borderColor: '#22DDFF' }} onEnter={async () => { await AttemptLogIn(password); }} />
                        </Grid>

                        <Grid
                            container direction="row"
                            style={{ marginTop: '10px', width: '100%' }}
                        >
                            <Button
                                style={{ color: '#22DDFF', borderColor: '#22DDFF', textTransform: 'none', margin: 'auto' }}
                                variant="outlined"
                                className={classes.txt}
                                onClick={async () => { await AttemptLogIn(password); }}
                            >
                                Log In
                            </Button>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};