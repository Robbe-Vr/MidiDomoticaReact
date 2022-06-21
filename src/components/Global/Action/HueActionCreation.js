import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, Checkbox, CircularProgress, Dialog, DialogContent, Grid, Slider, Typography } from "@material-ui/core";
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

export default function HueActionCreation({ Api, show, setActionString, modeColor }) {

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const createActionString = () => {
        if (mode.length < 2 ||
            target_s.length < 1 || target_s[0].length < 2 ||
            data.length < 1 || !data.every(dat => dat.toString().length > 0))
        {
            warning('Please fill out all fields!');
        }

        setActionString(`${mode}::${target_s.length > 1 ? '[' + target_s.join(',') + ']' : target_s[0]}::` + data.join('::'));
    };

    const [mode, setMode] = useState('');

    const [target_s, setTarget_s] = useState([]);

    const [data, setData] = useState([]);

    const [brightness, setBrightness] = useState('set');

    const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 255 });

    const [usedValueAsRGBColorR, setUsedValueAsRGBColorR] = useState('set');
    const [usedValueAsRGBColorG, setUsedValueAsRGBColorG] = useState('set');
    const [usedValueAsRGBColorB, setUsedValueAsRGBColorB] = useState('set');

    useEffect(() => {
        setData(data => { data[1] = brightness != 'set' ? brightness : color.a?.toString(); data[2] = `[${usedValueAsRGBColorR != 'set' ? usedValueAsRGBColorR : color.r},${usedValueAsRGBColorG != 'set' ? usedValueAsRGBColorG : color.g},${usedValueAsRGBColorB != 'set' ? usedValueAsRGBColorB : color.b}]`; return data; });
    }, [color, brightness, usedValueAsRGBColorR, usedValueAsRGBColorG, usedValueAsRGBColorB]);

    const [colorPickerOpen, setColorPickerOpen] = useState(false);

    const [targets, setTargets] = useState([]);
    useEffect(() => {
        if (!show) return;

        setLoaded(false);
        Api.GetHueTargets(mode).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available targets!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load available targets!`);
                console.log(`Failed to load available targets!`, res);
            }
            else {
                setTargets(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode]);

    const [entertainmentModes, setEntertainmentModes] = useState([]);
    useEffect(() => {
        if (!show || mode != 'Entertainment') return;

        setData([]);

        setLoaded(false);
        Api.GetHueEntertainmentModes().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available entertainment modes!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load available entertainment modes!`);
                console.log(`Failed to load available entertainment modes!`, res);
            }
            else {
                setEntertainmentModes(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode]);

    const [entertainmentSetMode, setEntertainmentSetMode] = useState(false);

    useEffect(() => {
        if (mode != 'Entertainment') return;

        if (data[0] != 'Set' && entertainmentSetMode)
        {
            setEntertainmentSetMode(false);

            setData([]);
        }
        else if (!entertainmentSetMode)
        {
            setEntertainmentSetMode(true);
        }
    }, [mode, data]);

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
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Lights' ? modeColor : 'white'}}
                        onClick={() => setMode('Lights')}
                    >
                        Lights
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Room' ? modeColor : 'white'}}
                        onClick={() => setMode('Room')}
                    >
                        Room
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Entertainment' ? modeColor : 'white'}}
                        onClick={() => setMode('Entertainment')}
                    >
                        Entertainment
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
                    Targets
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                {mode == 'Lights' ?
                    <UserMultiSelectInputComponent name="Targets"
                        style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                        options={targets.map((target) => {
                            return {
                                id: target,
                                name: target,
                                value: target,
                            };
                        })}
                        onChange={(value) => setTarget_s(value)}
                    /> :
                    <UserSelectInputComponent name="Targets"
                        style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                        options={targets.map((target) => {
                            return {
                                id: target,
                                name: target,
                                value: target,
                            };
                        })}
                        onChange={(value) => setTarget_s([value])}
                    />
                }
                </Grid>
            </Grid>
            {mode == '' ? <Grid style={{ height: '100%', width: '50%', textAlign: 'center' }}><Typography variant="h6">Choose a mode</Typography></Grid> :
            mode == 'Entertainment' ?
            <>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Start/Stop
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Start', name: 'Start', value: 'Start' },
                                { id: 'Stop', name: 'Stop', value: 'Stop' },
                                { id: 'Set', name: 'Set', value: 'Set' },
                            ]}
                            onChange={(value) => setData(data => { var newData = [...data]; newData[0] = value; return newData; })}
                        />
                    </Grid>
                </Grid>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Entertainment Mode
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={entertainmentModes.map((mode) => {
                                return {
                                    id: mode,
                                    name: mode,
                                    value: mode,
                                };
                            })}
                            onChange={(value) => setData(data => { var newData = [...data]; newData[1] = value; return newData; })}
                        />
                    </Grid>
                </Grid>
                {data[0] == 'Set' ?
                    <>
                        <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                                Property
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                                <UserSelectInputComponent name="Property"
                                    style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                                    options={[
                                        { id: 'Mode', name: 'Mode', value: 'Mode' },
                                        { id: 'BrightnessCeiling', name: 'Brightness Ceiling', value: 'Brightness_Ceiling' },
                                    ]}
                                    onChange={(value) => setData(data => { var newData = [...data]; newData[2] = value; return newData; })}
                                />
                            </Grid>
                        </Grid>
                        <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                                Value
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                                {data[2] == 'Mode' ?
                                    <UserSelectInputComponent name="Value"
                                        style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                                        options={[
                                            { id: 'Intensity', name: 'Intensity', value: 0 },
                                            { id: 'Colorful', name: 'Colorful', value: 1 },
                                        ]}
                                        onChange={(value) => setData(data => { var newData = [...data]; newData[3] = value; return newData; })}
                                    />
                                    :
                                    <Slider
                                        style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                                        value={data[3]}
                                        onChange={(value) => setData(data => { var newData = [...data]; newData[3] = value; return newData; })}
                                    />
                                }
                            </Grid>
                        </Grid>
                    </>
                : <></>}
            </>
            :
            <>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Turn
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'On', name: 'On', value: 'On' },
                                { id: 'Off', name: 'Off', value: 'Off' },
                                { id: 'Alert', name: 'Alert', value: 'Alert' },
                                { id: 'Alert-Once', name: 'Alert-Once', value: 'Alert-Once' },
                            ]}
                            onChange={(value) => setData(data => { var newData = [...data]; newData[0] = value; return newData; })}
                        />
                    </Grid>
                </Grid>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                        Brightness
                    </Grid>
                    {brightness == 'set' ?
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%' }}>
                            <AlphaPicker name="Brightness" id={brightness}
                                color={{ ...color, a: color.a / 255 }}
                                onChange={(value) => setColor({ r: color.r, g: color.g, b: color.b, a: parseInt(value.rgb.a * 255) })}
                            />
                        </Grid>
                        :
                        <></>
                    }
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', minWidth: brightness == 'set' ? '20%' : '10%', verticalAlign: 'top' }}>
                        <UserSelectInputComponent name="Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            defaultValue={brightness}
                            options={[
                                { id: 'Keep', name: 'Keep Current Value', value: '{keep}' },
                                { id: 'ControlValue', name: 'Use Control Value', value: '{controlValue}/255' },
                                { id: 'Set', name: 'Set Custom', value: 'set' },
                            ]}
                            onChange={(value) => setBrightness(value == 'set' ? color.a : value)}
                        />
                    </Grid>
                </Grid>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                        Color
                    </Grid>
                    {usedValueAsRGBColorR == 'set' && usedValueAsRGBColorG == 'set' && usedValueAsRGBColorB == 'set' ?
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%' }}>
                            <Button variant="outlined"
                                style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 255)` }}
                                onClick={() => setColorPickerOpen(true)}
                            >
                                Choose Color
                            </Button>
                        </Grid>
                        :
                        <></>
                    }
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%' }}>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', paddingRight: '10px' }}>
                            Red:
                            <AlphaPicker name="Red"
                                color={{ ...color, a: color.r / 255 }}
                                onChange={(value) => setColor({ r: parseInt(value.rgb.a * 255), g: color.g, b: color.b, a: color.a })}
                            />
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top' }}>
                            <UserSelectInputComponent name="Options"
                                style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                                defaultValue={usedValueAsRGBColorR}
                                options={[
                                    { id: 'Keep', name: 'Keep Current Value', value: '{keep}' },
                                    { id: 'ControlValue', name: 'Use Control Value', value: '{controlValue}/255' },
                                    { id: 'Set', name: 'Set Custom', value: 'set' },
                                ]}
                                onChange={(value) => setUsedValueAsRGBColorR(value == 'set' ? color.r : value)}
                            />
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', paddingRight: '10px' }}>
                            Green:
                            <AlphaPicker name="Green"
                                color={{ ...color, a: color.g / 255 }}
                                onChange={(value) => setColor({ r: color.r, g: parseInt(value.rgb.a * 255), b: color.b, a: color.a })}
                            />
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top' }}>
                            <UserSelectInputComponent name="Options"
                                style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                                defaultValue={usedValueAsRGBColorG}
                                options={[
                                    { id: 'Keep', name: 'Keep Current Value', value: '{keep}' },
                                    { id: 'ControlValue', name: 'Use Control Value', value: '{controlValue}/255' },
                                    { id: 'Set', name: 'Set Custom', value: 'set' },
                                ]}
                                onChange={(value) => setUsedValueAsRGBColorG(value == 'set' ? color.g : value)}
                            />
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', paddingRight: '10px' }}>
                            Blue:
                            <AlphaPicker name="Blue"
                                color={{ ...color, a: color.b / 255 }}
                                onChange={(value) => setColor({ r: color.r, g: color.g, b: parseInt(value.rgb.a * 255), a: color.a })}
                            />
                        </Grid>
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top' }}>
                            <UserSelectInputComponent name="Options"
                                style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                                defaultValue={usedValueAsRGBColorB}
                                options={[
                                    { id: 'Keep', name: 'Keep Current Value', value: '{keep}' },
                                    { id: 'ControlValue', name: 'Use Control Value', value: '{controlValue}/255' },
                                    { id: 'Set', name: 'Set Custom', value: 'set' },
                                ]}
                                onChange={(value) => setUsedValueAsRGBColorB(value == 'set' ? color.b : value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog open={colorPickerOpen} onClose={() => setColorPickerOpen(false)}>
                    <DialogContent>
                        <PhotoshopPicker header="Choose a color"
                            style={{ color: modeColor }}
                            color={color}
                            onChangeComplete={(value) => setColor({ r: value.rgb.r, g: value.rgb.g, b: value.rgb.b, a: color.a })}
                        />
                    </DialogContent>
                </Dialog>
            </>
            }
        </Grid>
    );
};