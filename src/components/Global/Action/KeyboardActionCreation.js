import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Dialog, DialogContent, Grid, IconButton, Slider, Typography } from "@material-ui/core";
import { AlphaPicker, PhotoshopPicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faLightbulb, faMoon, faPlus, faPlusCircle, faSun, faTimes, faTimesCircle, faUpload, } from "@fortawesome/free-solid-svg-icons";

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

export default function KeyboardActionCreation({ Api, show, setActionString, modeColor }) {

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const createActionString = () => {
        if (keys.length > 0 && keys.every(x => x && x != 'Choose'))
        {
            setActionString(`Simulate::[${keys.join(',')}]`);
        }
        else
        {
            warning('Please choose a valid key for every input!');
        }
    };

    const [keys, setKeys] = useState([]);

    const [targets, setTargets] = useState([]);
    useEffect(() => {
        if (!show) return;

        setLoaded(false);
        Api.GetKeyboardKeys().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available keyboard keys!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load available keyboard keys!`);
                console.log(`Failed to load available keyboard keys!`, res);
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
            <Grid item direction="row" style={{ maxHeight: '10%', width: '100%' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', marginLeft: '5%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: '#2F4'}}
                        onClick={() => createActionString()}
                    >
                        Create Link
                    </Button>
                </Grid>
            </Grid>
            <Grid item direction="row" style={{ maxHeight: '90%', width: '100%', padding: '10px' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'middle' }}>
                    Simulate Keys
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                    <Grid style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                        <IconButton title={`add key at start`}
                            style={{ height: '100%', margin: 'auto', verticalAlign: 'middle' }}
                            onClick={() => {
                                setKeys(keys => { var newKeys = [...keys]; newKeys.splice(0, 0, 'Choose'); return newKeys; });
                            }}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} style={{ color: '#2F4' }} />
                        </IconButton>
                    </Grid>
                    <Grid style={{ display: 'inline-block', height: '100%', width: '90%', overflowY: 'auto' }}>
                        {Array.isArray(keys) ? keys.map((key, index) => {
                            return (
                                <Grid style={{ display: 'inline-block', height: '100%', width: '20%', borderLeft: 'solid 1px white', padding: '2px', paddingLeft: '5px' }}>
                                    <Grid style={{ display: 'inline-block', height: '100%', width: '60%' }}>
                                        <UserSelectInputComponent name="Keys"
                                            style={{ color: 'white', backgroundColor: '#222', width: '100%', height: '100%' }}
                                            value={key}
                                            options={[
                                                { id: 'Choose', name: 'Choose', value: 'Choose' },
                                                ...(targets.map((target) => {
                                                    return {
                                                        id: target,
                                                        name: target,
                                                        value: target,
                                                    };
                                                }))
                                            ]}
                                            onChange={(value) => setKeys(keys => { var newKeys = [...keys]; newKeys[index] = value; return newKeys; })}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'inline-block', height: '100%', width: '20%' }}>
                                        <IconButton title={`remove key at index ${index + 1}`}
                                            style={{ height: '100%', margin: 'auto' }}
                                            onClick={() => {
                                                setKeys(keys => { var newKeys = [...keys]; newKeys.splice(index, 1); return newKeys; });
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#F24' }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid style={{ display: 'inline-block', height: '100%', width: '20%' }}>
                                        <IconButton title={`add key at index ${index + 2}`}
                                            style={{ height: '100%', margin: 'auto' }}
                                            onClick={() => {
                                                setKeys(keys => { var newKeys = [...keys]; newKeys.splice(index + 1, 0, 'Choose'); return newKeys; });
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle} style={{ color: '#2F4' }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            );
                        }) : <></>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};