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

export default function AudioActionCreation({ Api, show, setActionString, modeColor }) {

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const createActionString = () => {
        if (mode.length < 2 ||
            target.length < 2 ||
            method.length < 2 ||
            methodValue.length < 2)
        {
            warning('Please fill out all fields!');
        }

        let value = methodValue == 'Custom' ? customMethodValue.toString() : methodValue;

        setActionString(`Set::${mode}::${target}::${method}::${value}`);
    };

    const [mode, setMode] = useState('');

    const [target, setTarget] = useState('');

    const [method, setMethod] = useState('');

    const [methodValue, setMethodValue] = useState('');
    const [customMethodValue, setCustomMethodValue] = useState(100);

    const [outputs, setOutputs] = useState([]);
    useEffect(() => {
        if (!show || mode != 'Output') return;

        setLoaded(false);
        Api.GetAudioOutputs().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available output devices!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load output devices!`);
                console.log(`Failed to load output devices!`, res);
            }
            else {
                setOutputs(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode]);

    const [mixers, setMixers] = useState([]);
    useEffect(() => {
        if (!show || mode != 'Mixer') return;

        setLoaded(false);
        Api.GetAudioMixers().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available mixers!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load mixers!`);
                console.log(`Failed to load mixers!`, res);
            }
            else {
                setMixers(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode]);

    const [inputs, setInputs] = useState([]);
    useEffect(() => {
        if (!show || mode != 'Input') return;

        setLoaded(false);
        Api.GetAudioInputs().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available input devices!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load input devices!`);
                console.log(`Failed to load input devices!`, res);
            }
            else {
                setInputs(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode]);

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
            <Grid item direction="row" style={{ maxHeight: '10%', width: '100%' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Output' ? modeColor : 'white'}}
                        onClick={() => setMode('Output')}
                    >
                        Output
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Mixer' ? modeColor : 'white'}}
                        onClick={() => setMode('Mixer')}
                    >
                        Mixer
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Input' ? modeColor : 'white'}}
                        onClick={() => setMode('Input')}
                    >
                        Input
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', marginLeft: '5%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: '#2F4'}}
                        onClick={() => createActionString()}
                    >
                        Create Link
                    </Button>
                </Grid>
            </Grid>
            <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    {mode == 'Mixer' ? 'Mixer' : 'Device'}
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                    {mode == 'Output' ?
                        <UserSelectInputComponent name="Target"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Default', name: 'Default', value: 'Default' },
                                ...(outputs.map((target) => {
                                    return {
                                        id: target.guid,
                                        name: target.name,
                                        value: target.guid,
                                    };
                                }))
                            ]}
                            onChange={(value) => setTarget(value)}
                        /> :
                    mode == 'Mixer' ? 
                        <UserSelectInputComponent name="Target"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={mixers.map((target) => {
                                return {
                                    id: target.guid,
                                    name: target.name,
                                    value: target.name,
                                };
                            })}
                            onChange={(value) => setTarget(value)}
                        /> :
                    mode == 'Input' ?
                        <UserSelectInputComponent name="Target"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Default', name: 'Default', value: 'Default' },
                                ...(inputs.map((target) => {
                                    return {
                                        id: target.guid,
                                        name: target.name,
                                        value: target.guid,
                                    };
                                }))
                            ]}
                            onChange={(value) => setTarget(value)}
                        /> :
                        <UserSelectInputComponent name="Target"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[]}
                        />
                    }
                    
                </Grid>
            </Grid>
            {mode == '' ? <Grid style={{ height: '100%', width: '50%', textAlign: 'center' }}><Typography variant="h6">Choose a mode</Typography></Grid> :
            <>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Set
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Volume', name: 'Volume', value: 'Volume' },
                                { id: 'Mute', name: 'Mute', value: 'Mute' },
                                { id: 'Solo', name: 'Solo', value: 'Solo' },
                            ]}
                            onChange={(value) => setMethod(value)}
                        />
                    </Grid>
                </Grid>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' , verticalAlign: 'top'}}>
                        Value
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={method == 'Volume' ? 
                            [
                                { id: 'controlvalue', name: 'Use Control Value', value: '{controlValue}/100' },
                                { id: 'Custom', name: 'Custom', value: 'Custom' },
                            ]
                            :
                            [
                                { id: 'Toggle', name: 'Toggle', value: 'Toggle' },
                                { id: method == 'Mute' ? 'Mute' : 'Solo', name: method == 'Mute' ? 'Mute' : 'Solo', value: 'TRUE' },
                                { id: method == 'Mute' ? 'Unmute' : 'Unsolo', name: method == 'Mute' ? 'Unmute' : 'Unsolo', value: 'FALSE' },
                            ]}
                            onChange={(value) => setMethodValue(value)}
                        />
                        {method == 'Volume' && methodValue == 'Custom' ?
                            <Grid style={{ height: '100%', width: '50%' }}>
                                <Grid style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'middle' }}>
                                    <Slider min={0} max={100} step={1}
                                        style={{ color: modeColor }}
                                        onChange={(e, value) => setCustomMethodValue(value)}
                                    />
                                </Grid>
                                <Grid style={{ display: 'inline-block', height: '100%', width: '10%', textAlign: 'center' }}>
                                    {customMethodValue}
                                </Grid>
                            </Grid>
                        : <></>}
                    </Grid>
                </Grid>
            </>
            }
        </Grid>
    );
};