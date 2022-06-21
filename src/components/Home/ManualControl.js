import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faTimes, faTimesCircle, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../Global/NotificationContext";
import MidiControlLayoutPage from "../Global/MidiControlLayout";

import ActionsPage from "../Global/Actions";


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

export default function ManualControlPage({ setTitle, Api, renderMobile, drawerOpen }) {
    useEffect(() => {
        setTitle && setTitle("Manual Control");
    });

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const sendAction = () => {
        if (selectedPerformMode.length < 2 ||
            actionString.length < 2)
        {
            warning('Please fill out all fields!');
            return;
        }

        let actionGroup = selectedPerformMode;

        Api.SendInstantExecutionAction({ ActionGroup: actionGroup, ActionDataString: actionString }).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to execute action!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to execute action!`);
                console.log(`Failed to execute action!`, res);
            }
            else {
                success('Action executed!');
            }
        });
    };

    const [actionString, setActionString] = useState('');

    const [inPerformMode, setInPerformMode] = useState(true);

    const [selectedPerformMode, setSelectedPerformMode] = useState('');

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
        <div className={classes.form} style={{ height: window.innerHeight * (renderMobile ? 0.7 : 0.9), width: renderMobile ? '100%' : '95%', overflowY: 'auto', margin: '' }}>
            <Grid style={{ width: '100%', height: '100%', overflow: 'auto', padding: renderMobile ? '5px' : '20px', boxShadow: 'inset 0px -7px 5px rgba(0 0 0 / 30%), inset 0px 7px 5px rgba(0 0 0 / 30%)', border: renderMobile ? '' : 'solid 1px white', borderTop: 'solid 1px white', borderBottom: 'solid 1px white', borderRadius: renderMobile ? '' : '1rem', overflowY: 'hidden' }}>
                <Grid style={{ height: renderMobile ? '20%' : '10%', width: '100%' }}>
                    <Grid style={{ height: '50%', width: '100%', color: 'white' }}>
                        Action Data String: {actionString}
                    </Grid>
                    <Grid style={{ height: '50%', width: '100%' }}>
                        <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor: '#2DF', margin: 'auto'  }}
                            onClick={() => sendAction()}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
                <Grid style={{ width: '100%', height: renderMobile ? '80%' : '90%', color: 'white', padding: '20px' }}>
                    <Grid item direction="row" style={{ height: '100%', width: '100%', borderTop: 'solid 1px white', paddingTop: '10px' }}>
                        <Grid item direction="row" style={{ height: renderMobile ? '20%' : '10%', width: '100%' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', backgroundColor: inPerformMode ? '#2DF' : 'white', margin: 'auto'  }}
                                    onClick={() => setInPerformMode(true)}
                                >
                                    Perform
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', backgroundColor: !inPerformMode ? '#2DF' : 'white', margin: 'auto'  }}
                                    onClick={() => setInPerformMode(false)}
                                >
                                    Existing
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item direction="row" style={{ height: renderMobile ? '80%' : '90%', width: '100%', overflowY: 'auto' }}>
                            <ActionsPage renderMobile={renderMobile} Api={Api} selectedPerformMode={selectedPerformMode} setSelectedPerformMode={setSelectedPerformMode} LinkActionToEvent={setActionString} color={'#2DF'} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};