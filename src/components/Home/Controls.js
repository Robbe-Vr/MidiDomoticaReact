import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faTimes, faTimesCircle, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../Global/NotificationContext";
import MidiControlLayoutPage from "../Global/MidiControlLayout";

import ActionsPage from "../Global/Actions";
import { Subscriptions } from "@material-ui/icons";
import Control from "../../models/Control";


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

export default function ControlsPage({ setTitle, Api, renderMobile, drawerOpen, drawerWidth }) {
    useEffect(() => {
        setTitle && setTitle("Midi Controls");
    });

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const LinkActionToEvent = (actionDataString) => {
        if (mode < 0 || mode > 8 ||
            selectedControl.length < 2 ||
            selectedControlEvent.length < 2 ||
            selectedPerformMode.length < 2 ||
            actionDataString.length < 2)
        {
            warning('Please fill out all fields!');
            return;
        }

        let eventName = selectedControl.startsWith('Global-') ?
            `${selectedControl}` :
            `Mode${mode}-${selectedControl}-${selectedControlEvent}`;
        let actionGroup = selectedPerformMode;

        Api.LinkActionToEvent(eventName, { EventName: eventName, ActionGroup: actionGroup, ActionDataString: actionDataString }).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to link action to event!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to link action to event!`);
                console.log(`Failed to link action to event!`, res);
            }
            else {
                success('Action is linked to event!');
            }
        });
    };

    const unlinkEvent = (subscription, index) => {
        let eventName = selectedControl.startsWith('Global-') ?
            `${selectedControl}` :
            `Mode${mode}-${selectedControl}-${selectedControlEvent}`;

        Api.UnlinkActionFromEvent(eventName, { EventName: eventName, ActionGroup: subscription.actionGroup, ActionDataString: subscription.actionDataString }).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to unlink action from control!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error('Failed to unlink action from control!');
                console.log('Failed to unlink action from control!', res);
            }
            else {
                success('Action is unlinked from control!');

                setSelectedControlSubscriptions(subscriptions => { var newSubscriptions = [...subscriptions]; newSubscriptions.splice(index, 1); return newSubscriptions; });
            }
        });
    };

    const [inPerformMode, setInPerformMode] = useState(true);

    const [selectedControl, setSelectedControl] = useState('');

    const [controlValue, setControlValue] = useState(127);

    const updateControlValue = (value) => {
        setControlValue(value);
    };

    const [mode, setMode] = useState(1);
    const [modeColor, setModeColor] = useState('#2DF');
    const [modeColorRGB, setModeColorRGB] = useState('34, 221, 255');

    const setControllerMode = (mode) => {
        setMode(mode);

        switch (mode) {
            case 1:
                setModeColor('#2DF');
                setModeColorRGB('34, 221, 255');
                break;

            case 2:
                setModeColor('#DE8');
                setModeColorRGB('221, 238, 136');
                break;

            case 3:
                setModeColor('#2FD');
                setModeColorRGB('34, 255, 221');
                break;

            case 4:
                setModeColor('#FC4');
                setModeColorRGB('255, 204, 68');
                break;

            case 5:
                setModeColor('#2C5');
                setModeColorRGB('34, 204, 85');
                break;

            case 6:
                setModeColor('#FEA');
                setModeColorRGB('255, 238, 170');
                break;

            case 7:
                setModeColor('#C2B');
                setModeColorRGB('204, 34, 187');
                break;

            case 8:
                setModeColor('#FBC');
                setModeColorRGB('255, 187, 204');
                break;
        }
    };

    const [selectableControlEvents, setSelectableControlEvents] = useState([
        'Changed',
        'Pressed',
        'Released',
        'Held',
        'Fired',
    ]);

    const [selectedControlEvent, setSelectedControlEvent] = useState('');

    useEffect(() => {
        if (selectedControl.indexOf('Note/Pad') > - 1) {
            setSelectableControlEvents([
                'Pressed',
                'Released',
                'Held',
            ]);
            setSelectedControlEvent('Pressed');
        }
        else if (selectedControl.indexOf('FaderButton') > - 1) {
            setSelectableControlEvents([
                'Pressed',
                'Released',
                'Held',
            ]);
            setSelectedControlEvent('Pressed');
        }
        else if (selectedControl.indexOf('Slide') > -1) {
            setSelectableControlEvents([
                'Changed',
            ]);
            setSelectedControlEvent('Changed');
        }
        else if (selectedControl.indexOf('KnobFader') > - 1) {
            setSelectableControlEvents([
                'Changed',
            ]);
            setSelectedControlEvent('Changed');
        }
        else if (selectedControl.indexOf('Wheel') > - 1) {
            setSelectableControlEvents([
                'Changed',
            ]);
            setSelectedControlEvent('Changed');
        }
        else if (selectedControl.indexOf('Global') > - 1) {
            setSelectableControlEvents([
                'Fired',
            ]);
            setSelectedControlEvent('Fired');
        }
    }, [selectedControl]);

    const [selectedControlSubscriptions, setSelectedControlSubscriptions] = useState([]);

    const [subsciptionsPage, setSubscriptionsPage] = useState(1);
    const [subscriptionsRpp, setSubscriptionsRpp] = useState(10);

    useEffect(() => {
        if (inPerformMode || (selectedControl && selectedControl.length < 1)) return;

        let eventName = selectedControl.startsWith('Global-') ?
            `${selectedControl}` :
            `Mode${mode}-${selectedControl}-${selectedControlEvent}`;

        Api.GetSubscriptionsForControl(eventName, subsciptionsPage, subscriptionsRpp).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load control\'s subsciptions!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load control\'s subsciptions!`);
                console.log(`Failed to load control\'s subsciptions!`, res);
            }
            else {
                setSelectedControlSubscriptions(res);
            }
        });
    }, [selectedControl, selectedControlEvent, subsciptionsPage, subscriptionsRpp, inPerformMode]);

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
                <Grid style={{ height: renderMobile ? 0.3 * (window.innerWidth - (drawerOpen ? drawerWidth : 0)) : 0.2 * window.innerWidth, width: '100%' }}>
                    <MidiControlLayoutPage mode={mode} setControllerMode={setControllerMode}
                        modeColor={modeColor} modeColorRGB={modeColorRGB}
                        selectedControl={selectedControl} setSelectedControl={setSelectedControl}
                        updateControlValue={updateControlValue}
                        renderMobile={renderMobile} drawerOpen={drawerOpen}
                    />
                </Grid>
                <Grid style={{ width: '100%', height: '52%', color: 'white', padding: '20px' }}>
                    <Typography variant="h5">Control: {selectedControl}</Typography>
                    <Grid item direction="row" style={{ height: renderMobile ? '20%' : '10%', width: '100%' }}>
                        <Grid item direction="column" style={{ display: renderMobile ? '' : 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%' }}>
                            <Typography variant="subtitle1">Link action on:</Typography>
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', verticalAlign: 'top' }}>
                            <Button variant="outlined" style={{ width: '100%', backgroundColor: selectableControlEvents.indexOf('Changed') > -1 ? selectedControlEvent == 'Changed' ? modeColor : 'white' : '' }}
                                disabled={selectableControlEvents.indexOf('Changed') < 0}
                                onClick={() => setSelectedControlEvent('Changed')}
                            >
                                Changed
                            </Button>
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', verticalAlign: 'top' }}>
                            <Button variant="outlined" style={{ width: '100%', backgroundColor: selectableControlEvents.indexOf('Pressed') > -1 ? selectedControlEvent == 'Pressed' ? modeColor : 'white' : '' }}
                                disabled={selectableControlEvents.indexOf('Pressed') < 0}
                                onClick={() => setSelectedControlEvent('Pressed')}
                            >
                                Pressed
                            </Button>
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', verticalAlign: 'top' }}>
                            <Button variant="outlined" style={{ width: '100%', backgroundColor: selectableControlEvents.indexOf('Released') > -1 ? selectedControlEvent == 'Released' ? modeColor : 'white' : '' }}
                                disabled={selectableControlEvents.indexOf('Released') < 0}
                                onClick={() => setSelectedControlEvent('Released')}
                            >
                                Released
                            </Button>
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', verticalAlign: 'top' }}>
                            <Button variant="outlined" style={{ width: '100%', backgroundColor: selectableControlEvents.indexOf('Held') > -1 ? selectedControlEvent == 'Held' ? modeColor : 'white' : '' }}
                                disabled={selectableControlEvents.indexOf('Held') < 0}
                                onClick={() => setSelectedControlEvent('Held')}
                            >
                                Held
                            </Button>
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', verticalAlign: 'top' }}>
                            <Button variant="outlined" style={{ width: '100%', backgroundColor: selectableControlEvents.indexOf('Fired') > -1 ? selectedControlEvent == 'Fired' ? modeColor : 'white' : '' }}
                                disabled={selectableControlEvents.indexOf('Fired') < 0}
                                onClick={() => setSelectedControlEvent('Fired')}
                            >
                                Fired
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item direction="row" style={{ height: renderMobile ? '80%' : '90%', width: '100%', borderTop: 'solid 1px white', paddingTop: '10px' }}>
                        <Grid item direction="row" style={{ height: renderMobile ? '20%' : '10%', width: '100%' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', backgroundColor: inPerformMode ? modeColor : 'white', margin: 'auto'  }}
                                    onClick={() => setInPerformMode(true)}
                                >
                                    Perform
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', backgroundColor: !inPerformMode ? modeColor : 'white', margin: 'auto'  }}
                                    onClick={() => setInPerformMode(false)}
                                >
                                    Existing
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item direction="row" style={{ height: renderMobile ? '80%' : '90%', width: '100%', overflowY: 'auto' }}>
                            {inPerformMode ?
                                <ActionsPage renderMobile={renderMobile} Api={Api} selectedPerformMode={selectedPerformMode} setSelectedPerformMode={setSelectedPerformMode} LinkActionToEvent={LinkActionToEvent} color={modeColor} />
                                :
                                <Grid style={{ width: '100%', height: '100%', padding: '20px', overflowY: 'auto' }}>
                                    {Array.isArray(selectedControlSubscriptions) && selectedControlSubscriptions.length > 0 ? selectedControlSubscriptions.map((subscription, index) =>
                                        {
                                            return (
                                                <Grid style={{ width: '100%', height: '10%', padding: '5px', border: 'solid 1px white' }}>
                                                    <Grid style={{ display: 'inline-block', width: '5%', height: '100%' }}>
                                                        {index + 1}.
                                                    </Grid>
                                                    <Grid style={{ display: 'inline-block', width: '15%', height: '100%' }}>
                                                        {subscription.actionGroup}
                                                    </Grid>
                                                    <Grid style={{ display: 'inline-block', width: '25%', height: '100%' }}>
                                                        {subscription.actionDataString}
                                                    </Grid>
                                                    <Grid style={{ display: 'inline-block', width: '15%', height: '100%' }}>
                                                        <Button variant="outlined"
                                                            style={{ color: '#F42' }}
                                                            onClick={() => unlinkEvent(subscription, index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })
                                        : <>No events for this control.</>
                                    }
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};