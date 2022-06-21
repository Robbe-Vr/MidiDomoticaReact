import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faTimes, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../Global/NotificationContext";
import MidiControlLayoutPage from "../Global/MidiControlLayout";


const useStyles = makeStyles(() => ({
    form: {
        width: '95%',
        height: '100%',
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    txt: { textAlign: "center" },
    continue: {
        marginTop: "20px",
        width: "20%",
    },
}));

export default function HomePage({ setTitle, Api }) {
    useEffect(() => {
        setTitle && setTitle("Home");
    });

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);


    if (!loaded) {
        return (
            <div className={classes.form} style={{ height: window.innerHeight * 0.8 }}>
                <Grid style={{ color: 'white', height: '100%', margin: 'auto', verticalAlign: 'middle' }}>
                    <Typography variant="h6">Loading...</Typography>
                    <CircularProgress size={75} style={{ marginTop: '10%', verticalAlign: 'middle', color: '#22DDFF' }} />
                </Grid>
            </div>
        );
    }

    return (
        <div className={classes.form} style={{ height: '100%', overflowY: 'auto' }}>
            <Grid style={{ width: '100%', minHeight: '25%', maxHeight: '50%', overflow: 'auto', boxShadow: 'inset 0px -7px 5px rgba(0 0 0 / 30%), inset 0px 7px 5px rgba(0 0 0 / 30%)', padding: '20px', border: 'solid 1px white', borderRadius: '1rem', overflowY: 'hidden' }}>
                
            </Grid>
        </div>
    );
};