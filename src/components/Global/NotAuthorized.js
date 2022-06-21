import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faSmile, faTimes, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../Global/NotificationContext";


const useStyles = makeStyles(() => ({
    form: {
        width: '95%',
        height: '100%',
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: 'white',
    },
    txt: { textAlign: "center" },
    continue: {
        marginTop: "20px",
        width: "20%",
    },
}));

export default function NotAuthorized({ setTitle }) {
    useEffect(() => {
        setTitle && setTitle("Not Authorized!");
    });

    const classes = useStyles();

    return (
        <div className={classes.form}>
            <Typography variant="h1">
                <FontAwesomeIcon icon={faTimes} size="5x" style={{ color: 'red' }} />
            </Typography>
            <Typography variant="h3">
                You are not supposed to be here!
            </Typography>
            <Typography variant="h3">
                So go somewhere else please
            </Typography>
            <Typography variant="h1">
                <FontAwesomeIcon icon={faSmile} />
            </Typography>
        </div>
    );
};