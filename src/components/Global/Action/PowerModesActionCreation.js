import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Dialog, DialogContent, Grid, Slider, Typography } from "@material-ui/core";
import { AlphaPicker, PhotoshopPicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faLightbulb, faMoon, faSun, faTimes, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../../Global/NotificationContext";
import { UserSelectInputComponent } from "../../Global/UserSelectInputComponent";
import { UserMultiSelectInputComponent } from "../../Global/UserMultiSelectInputComponent";


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

export default function PowerModesActionCreation({ Api, show, setActionString, modeColor }) {

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const createActionString = () => {

        setActionString(`Set::${powerMode}`);
    };

    const [powerMode, setPowerMode] = useState('');

    const [targets, setTargets] = useState([]);
    useEffect(() => {
        if (!show) return;

        setLoaded(false);
        Api.GetPowerModes().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available power modes!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load available power modes!`);
                console.log(`Failed to load available power modes!`, res);
            }
            else {
                setTargets(res);
            }

            setLoaded(true);
        });
    }, [Api, show]);

    if (!show) {
        return (
            <></>
        );
    }

    if (!loaded) {
        return (
            <Grid style={{ color: 'white', height: '100%', margin: 'auto', verticalAlign: 'middle' }}>
                <Typography variant="h6">Loading...</Typography>
                <CircularProgress size={75} style={{ marginTop: '10%', verticalAlign: 'middle', color: '#22DDFF' }} />
            </Grid>
        );
    }

    return (
        <Grid style={{ width: '100%', height: '100%', overflow: 'auto', boxShadow: 'inset 0px -7px 5px rgba(0 0 0 / 30%), inset 0px 7px 5px rgba(0 0 0 / 30%)', padding: '20px', border: 'solid 1px white', borderRadius: '1rem', overflowY: 'hidden' }}>
            <Grid item direction="row" style={{ height: '10%', width: '100%' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', marginLeft: '5%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: '#2F4'}}
                        onClick={() => createActionString()}
                    >
                        Create Link
                    </Button>
                </Grid>
            </Grid>
            <Grid item direction="row" style={{ maxHeight: '90%', width: '100%', padding: '10px' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    Power Mode
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                    <UserSelectInputComponent name="Power Modes"
                        style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                        options={targets.map((target) => {
                            return {
                                id: target.id,
                                name: target.name,
                                value: target.guid,
                            };
                        })}
                        onChange={(value) => setPowerMode(value)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};