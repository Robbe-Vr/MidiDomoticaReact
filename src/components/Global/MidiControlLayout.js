import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, Slider, Typography } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faArrowAltCircleUp, faBackward, faCaretUp, faCheck, faChevronCircleDown, faChevronCircleUp, faCircle, faForward, faImages, faMinus, faPlay, faPlayCircle, faPlus, faRecycle, faStop, faSync, faTimes, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../Global/NotificationContext";
import { faAccessibleIcon } from "@fortawesome/free-brands-svg-icons";
import { drawerWidth } from "../Drawer/AppDrawer";

const Notes = [
    "C0",
    "CSharp0",
    "D0",
    "DSharp0",
    "E0",
    "F0",
    "FSharp0",
    "G0",
    "GSharp0",
    "A0",
    "ASharp0",
    "B0",

    "C1",
    "CSharp1",
    "D1",
    "DSharp1",
    "E1",
    "F1",
    "FSharp1",
    "G1",
    "GSharp1",
    "A1",
    "ASharp1",
    "B1",

    "C2",
    "CSharp2",
    "D2",
    "DSharp2",
    "E2",
    "F2",
    "FSharp2",
    "G2",
    "GSharp2",
    "A2",
    "ASharp2",
    "B2",

    "C3",
    "CSharp3",
    "D3",
    "DSharp3",
    "E3",
    "F3",
    "FSharp3",
    "G3",
    "GSharp3",
    "A3",
    "ASharp3",
    "B3",

    "C4",
    "CSharp4",
    "D4",
    "DSharp4",
    "E4",
    "F4",
    "FSharp4",
    "G4",
    "GSharp4",
    "A4",
    "ASharp4",
    "B4",

    "C5",
    "CSharp5",
    "D5",
    "DSharp5",
    "E5",
    "F5",
    "FSharp5",
    "G5",
    "GSharp5",
    "A5",
    "ASharp5",
    "B5",

    "C6",
    "CSharp6",
    "D6",
    "DSharp6",
    "E6",
    "F6",
    "FSharp6",
    "G6",
    "GSharp6",
    "A6",
    "ASharp6",
    "B6",

    "C7",
    "CSharp7",
    "D7",
    "DSharp7",
    "E7",
    "F7",
    "FSharp7",
    "G7",
    "GSharp7",
    "A7",
    "ASharp7",
    "B7",

    "C8",
    "CSharp8",
    "D8",
    "DSharp8",
    "E8",
    "F8",
    "FSharp8",
    "G8",
    "GSharp8",
    "A8",
    "ASharp8",
    "B8",

    "C9",
    "CSharp9",
    "D9",
    "DSharp9",
    "E9",
    "F9",
    "FSharp9",
    "G9",
    "GSharp9",
    "A9",
    "ASharp9",
    "B9",

    "C10",
    "CSharp10",
    "D10",
    "DSharp10",
    "E10",
    "F10",
    "FSharp10",
    "G10",
]


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

export default function MidiControlLayoutPage({ renderMobile, drawerOpen, mode, setControllerMode, modeColor, modeColorRGB, selectedControl, setSelectedControl, updateControlValue }) {

    const classes = useStyles();

    const [firstMidiKey, setFirstMidiKey] = useState(36);
    const [transpose, setTranspose] = useState(0);

    useEffect(() => {
        let newFirst = 36 + (transpose * 12);
        setFirstMidiKey(newFirst);
    }, [transpose]);

    const transposeUp = () => {
        setTranspose(transpose => { let newTranspose = transpose + 1; if (newTranspose > 3) newTranspose = 3; return newTranspose; });
    };

    const transposeDown = () => {
        setTranspose(transpose => { let newTranspose = transpose - 1; if (newTranspose < -3) newTranspose = -3; return newTranspose; });
    };

    const onMidiKey = (key) => {
        setSelectedControl('Note/Pad-' + (key >= 0 && key <= 127 ? Notes[key] : 'Unassigned'));
    };

    return (
        <div className={classes.form} style={{ height: '100%', width: '100%', overflowY: 'hidden' }}>
            <Grid style={{ width: '100%', height: '100%', boxShadow: '0px 7px 5px rgba(0 0 0 / 30%), 0px -7px -5px rgba(0 0 0 / 30%)', border: 'solid 1px rgba(0,0,0,50%)', borderRadius: '0.1rem', boxSizing: 'border-box' }}>
                <Grid container direction="row" key="midicontroller" style={{ display: 'block', height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,20%)' }}>
                    <Grid item direction="row" style={{ height: '50%', width: '100%', boxSizing: 'border-box' }}>
                        {
                            // Top Faders Row
                        }
                        <Grid item direction="column" style={{ height: '25%', width: '100%', verticalAlign: 'top' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '22%', verticalAlign: 'top' }}>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader1"} onClick={() => { setSelectedControl('KnobFader1') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader1" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader2"} onClick={() => { setSelectedControl('KnobFader2') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader2" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader3"} onClick={() => { setSelectedControl('KnobFader3') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader3" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader4"} onClick={() => { setSelectedControl('KnobFader4') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader4" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader5"} onClick={() => { setSelectedControl('KnobFader5') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader5" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader6"} onClick={() => { setSelectedControl('KnobFader6') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader6" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader7"} onClick={() => { setSelectedControl('KnobFader7') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader7" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <div name={"KnobFader8"} onClick={() => { setSelectedControl('KnobFader8') }} style={{ height: "100%", width: "100%", borderRadius: '5rem', backgroundColor: selectedControl == "KnobFader8" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 's'} style={{ color: 'rgba(0,0,0,30%)', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '58%', verticalAlign: 'top' }}>
                            </Grid>
                        </Grid>
                        {
                            // Screen Control Row
                        }
                        <Grid item direction="column" style={{ height: '25%', width: '100%', verticalAlign: 'top' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '34%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', color: 'white', fontSize: '0.25vw', textAlign: 'center', lineHeight: '1.5vh', margin: 'auto' }}>
                                            Start
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '34%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', color: 'white', fontSize: '0.25vw', textAlign: 'center', lineHeight: '1.5vh', margin: 'auto' }}>
                                            Global
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '34%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', boxSizing: 'border-box' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', boxSizing: 'border-box' }}>
                                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', boxSizing: 'border-box' }}>
                                                </Grid>
                                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', backgroundColor: 'white', verticalAlign: 'top', margin: 'auto' }}>
                                                    <Grid item direction="column" style={{ height: '100%', width: '100%', boxSizing: 'border-box' }}>
                                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', backgroundColor: 'black', border: 'solid 1px white', verticalAlign: 'top', color: 'white', fontSize: '0.2vw', textAlign: 'center', lineHeight: '1vh', margin: 'auto' }}>
                                                            IN
                                                        </Grid>
                                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '70%', verticalAlign: 'middle', color: 'black', fontSize: '0.2vw', textAlign: 'center', lineHeight: '0.525vh' }}>
                                                            CONTROL
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', boxSizing: 'border-box' }}>
                                                </Grid>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', boxSizing: 'border-box' }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '34%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', color: 'white', fontSize: '0.25vw', textAlign: 'center', lineHeight: '1.5vh', margin: 'auto' }}>
                                            Tempo
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '33%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faMinus} size={"xs"} style={{ color: 'white', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} viewBox="0 0 450 510" style={{ color: 'white', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '25%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top', backgroundColor: 'rgba(255,255,255,30%)' }}>
                                            {
                                                // Screen
                                            }
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top', backgroundColor: 'rgba(255,255,255,30%)' }}>
                                            {
                                                // Screen
                                            }
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top', backgroundColor: 'rgba(255,255,255,30%)' }}>
                                            {
                                                // Screen
                                            }
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top', backgroundColor: 'rgba(255,255,255,30%)' }}>
                                            {
                                                // Screen
                                            }
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top', backgroundColor: 'rgba(255,255,255,30%)' }}>
                                            <Grid item direction="column" style={{ height: '50%', width: '100%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'flex', height: '25%', width: '100%', color: 'white', fontSize: '0.4vw', lineHeight: '0.25vh', textAlign: 'center' }}>
                                                Octave:
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'flex', height: '25%', width: '100%', color: 'white', fontSize: '0.4vw', lineHeight: '0.25vh', textAlign: 'center' }}>
                                                {transpose}
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '23%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton1"} onClick={() => { setSelectedControl('FaderButton1') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton1" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton9"} onClick={() => { setSelectedControl('FaderButton9') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton9" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton2"} onClick={() => { setSelectedControl('FaderButton2') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton2" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton10"} onClick={() => { setSelectedControl('FaderButton10') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton10" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton3"} onClick={() => { setSelectedControl('FaderButton3') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton3" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton11"} onClick={() => { setSelectedControl('FaderButton11') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton11" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton4"} onClick={() => { setSelectedControl('FaderButton4') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton4" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton12"} onClick={() => { setSelectedControl('FaderButton12') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton12" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton5"} onClick={() => { setSelectedControl('FaderButton5') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton5" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton13"} onClick={() => { setSelectedControl('FaderButton13') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton13" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton6"} onClick={() => { setSelectedControl('FaderButton6') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton6" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton14"} onClick={() => { setSelectedControl('FaderButton14') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton14" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton7"} onClick={() => { setSelectedControl('FaderButton7') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton7" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton15"} onClick={() => { setSelectedControl('FaderButton15') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton15" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton8"} onClick={() => { setSelectedControl('FaderButton8') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton8" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"FaderButton16"} onClick={() => { setSelectedControl('FaderButton16') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "FaderButton16" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '50%', width: '90%', boxSizing: 'border-box', margin: 'auto', borderBottom: 'solid 2px ' + modeColor }}>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '6%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                <Grid style={{ height: '100%', width: '100%', color: 'white', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.8vw', lineHeight: '5vh' }}>
                                    <b>61SL</b>MkIII
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2%', verticalAlign: 'top' }}>
                            </Grid>
                        </Grid>
                        {
                            // Bottom control row
                        }
                        <Grid item direction="column" style={{ height: '50%', width: '100%', verticalAlign: 'top' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px #FA4', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: '#FA4', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px #FA4', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: '#FA4', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px #FA4', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: '#FA4', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ height: '73%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px #FA4', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: '#FA4', margin: 'auto' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                        Grid
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '3%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faChevronCircleUp} size={renderMobile ? '1x' : '2x'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faChevronCircleDown} size={renderMobile ? '1x' : '2x'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            {
                                // Pads
                            }
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 1 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode1"} onClick={() => { setControllerMode(1) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode1
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[0]} onClick={() => { onMidiKey(0) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[0] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[120]} onClick={() => { onMidiKey(120) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[120] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 2 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode2"} onClick={() => { setControllerMode(2) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode2
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[1]} onClick={() => { onMidiKey(1) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[1] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[121]} onClick={() => { onMidiKey(121) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[121] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 3 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode3"} onClick={() => { setControllerMode(3) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode3
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[2]} onClick={() => { onMidiKey(2) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[2] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[122]} onClick={() => { onMidiKey(122) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[122] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 4 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode4"} onClick={() => { setControllerMode(4) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode4
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[3]} onClick={() => { onMidiKey(3) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[3] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[123]} onClick={() => { onMidiKey(123) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[123] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 5 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode5"} onClick={() => { setControllerMode(5) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode5
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[4]} onClick={() => { onMidiKey(4) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[4] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[124]} onClick={() => { onMidiKey(124) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[124] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 6 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode6"} onClick={() => { setControllerMode(6) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode6
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[5]} onClick={() => { onMidiKey(5) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[5] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[125]} onClick={() => { onMidiKey(125) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[125] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 7 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode7"} onClick={() => { setControllerMode(7) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode7
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[6]} onClick={() => { onMidiKey(6) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[6] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[126]} onClick={() => { onMidiKey(126) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[126] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px ' + (mode == 8 ? modeColor : 'white'), boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                                <div name={"Mode8"} onClick={() => { setControllerMode(8) }} style={{ height: "100%", width: "100%" }}>
                                                    Mode8
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[7]} onClick={() => { onMidiKey(7) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[7] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '4%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', borderRadius: '0.1rem', backgroundColor: modeColor, boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"Note/Pad-" + Notes[127]} onClick={() => { onMidiKey(127) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[127] ? 'rgba(255, 255, 255, 30%)' : '' }}>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '5%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '0.5%', verticalAlign: 'top' }}>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '17%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', color: 'white', textAlign: 'center', fontSize: '0.25vw', margin: 'auto' }}>
                                        Options
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '3%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faPlayCircle} size={renderMobile ? '1x' : '2x'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '5%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '30%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                        <FontAwesomeIcon icon={faPlayCircle} size={renderMobile ? '1x' : '2x'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.75%', verticalAlign: 'top' }}>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '23%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader1"} onClick={() => { setSelectedControl('SlideFader1') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader1" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader1') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader2"} onClick={() => { setSelectedControl('SlideFader2') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader2" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader2') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader3"} onClick={() => { setSelectedControl('SlideFader3') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader3" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader3') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader4"} onClick={() => { setSelectedControl('SlideFader4') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader4" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader4') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader5"} onClick={() => { setSelectedControl('SlideFader5') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader5" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader5') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader6"} onClick={() => { setSelectedControl('SlideFader6') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader6" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader6') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader7"} onClick={() => { setSelectedControl('SlideFader7') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader7" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader7') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '12.5%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ height: '15%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '65%', width: '100%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', boxSizing: 'border-box', margin: 'auto' }}>
                                                <div name={"SlideFader8"} onClick={() => { setSelectedControl('SlideFader8') }} style={{ height: "100%", width: "100%", border: selectedControl == "SlideFader8" ? 'solid 1px rgb(' + modeColorRGB + ')' : '' }}>
                                                    <Slider orientation="vertical" style={{ color: 'black' }} min={0} max={127} step={1}
                                                        onChange={() => { setSelectedControl('SlideFader8') }}
                                                        onChangeCompleted={(e) => { updateControlValue(e.target.value); }}
                                                        sx={{
                                                            '& .MuiSlider-thumb': {
                                                                width: '1vw',
                                                                color: 'white',
                                                                borderRadius: '0.1rem'
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '20%', width: '100%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '15%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '45%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '40%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '16.66666%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                                <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                                    <FontAwesomeIcon icon={faBackward} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '16.66666%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                                <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                                    <FontAwesomeIcon icon={faForward} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '16.66666%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                                <div name={"Global-MediaStop"} onClick={() => { setSelectedControl('Global-MediaStop') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Global-MediaStop" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                                        <FontAwesomeIcon icon={faStop} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '16.66666%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                                <div name={"Global-MediaPlay"} onClick={() => { setSelectedControl('Global-MediaPlay') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Global-MediaPlay" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                                    <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px lightgreen', boxSizing: 'border-box', margin: 'auto' }}>
                                                        <FontAwesomeIcon icon={faPlay} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'lightgreen', margin: 'auto' }} />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '16.66666%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                                <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px rgba(255,255,255,30%)', boxSizing: 'border-box', margin: 'auto' }}>
                                                    <FontAwesomeIcon icon={faSync} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'rgba(255,255,255,30%)', margin: 'auto' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '16.66666%', verticalAlign: 'top' }}>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '80%', verticalAlign: 'top' }}>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '80%', width: '100%', verticalAlign: 'top' }}>
                                                <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px #F42', boxSizing: 'border-box', margin: 'auto' }}>
                                                    <FontAwesomeIcon icon={faCircle} size={renderMobile ? 'xs' : 'xs'} style={{ color: '#F42', margin: 'auto' }} />
                                                </Grid>
                                            </Grid>
                                            <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '10%', width: '100%', verticalAlign: 'top' }}>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item direction="row" style={{ height: '50%', width: '100%' }}>
                        {
                            // Wheels
                        }
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%', verticalAlign: 'top' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '8.5%', width: '100%', margin: 'auto', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                    <div name={"TransposeDown"} onClick={() => { transposeDown() }} style={{ height: "100%", width: "100%", backgroundColor: transpose > 0 ? 'rgba(0,0,0, 10%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faMinus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ height: '11.5%', width: '100%', margin: 'auto' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '50%', width: '100%', margin: 'auto', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                    <div name={"PitchWheel"} onClick={() => { setSelectedControl('PitchWheel') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "PitchWheel" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ height: '33%', width: '100%' }}>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '34%', backgroundColor: modeColor }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '34%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '33%', width: '100%' }}>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '34%', backgroundColor: modeColor }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ height: '10%', width: '100%', margin: 'auto', color: 'white', paddingTop: '2px', fontSize: '0.25vw', textAlign: 'center' }}>
                                    Pitch
                                </Grid>
                                <Grid item direction="column" style={{ height: '20%', width: '100%', margin: 'auto' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ display: 'inline-block', height: '8.5%', width: '100%', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                    <div name={"TransposeDown"} onClick={() => { transposeUp() }} style={{ height: "100%", width: "100%", backgroundColor: transpose < 0 ? 'rgba(0,0,0, 10%)' : '' }}>
                                        <Grid item direction="column" style={{ display: 'flex', height: '100%', width: '100%', border: 'solid 1px white', boxSizing: 'border-box', margin: 'auto' }}>
                                            <FontAwesomeIcon icon={faPlus} size={renderMobile ? 'xs' : 'xs'} style={{ color: 'white', margin: 'auto' }} />
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ height: '11.5%', width: '100%', margin: 'auto' }}>
                                </Grid>
                                <Grid item direction="column" style={{ height: '50%', width: '100%', backgroundColor: 'rgba(0,0,0,30%)' }}>
                                    <div name={"ModulationWheel"} onClick={() => { setSelectedControl('ModulationWheel') }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "ModulationWheel" ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        <Grid item direction="column" style={{ height: '33%', width: '100%' }}>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '34%', backgroundColor: modeColor }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '34%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                        </Grid>
                                        <Grid item direction="column" style={{ height: '33%', width: '100%' }}>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '34%', backgroundColor: modeColor }}>
                                            </Grid>
                                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '33%' }}>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item direction="column" style={{ height: '10%', width: '100%', margin: 'auto', color: 'white', paddingTop: '2px', fontSize: '0.25vw', textAlign: 'center' }}>
                                    Modulation
                                </Grid>
                                <Grid item direction="column" style={{ height: '20%', width: '100%', margin: 'auto' }}>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top' }}>
                            </Grid>
                        </Grid>

                        {
                            //Keyboard
                        }
                        <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '88%', borderTop: 'solid 1px rgba(0,0,0,50%)', borderLeft: 'solid 1px rgba(0,0,0,50%)' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey]} onClick={() => { onMidiKey(firstMidiKey) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey - 1]} onClick={() => { onMidiKey(firstMidiKey - 1) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey - 1] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey]} onClick={() => { onMidiKey(firstMidiKey) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 1]} onClick={() => { onMidiKey(firstMidiKey + 1) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 1] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 2]} onClick={() => { onMidiKey(firstMidiKey + 2) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 2] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 3]} onClick={() => { onMidiKey(firstMidiKey + 3) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 3] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)'  }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 2]} onClick={() => { onMidiKey(firstMidiKey + 2) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 2] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 3]} onClick={() => { onMidiKey(firstMidiKey + 3) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 3] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 4]} onClick={() => { onMidiKey(firstMidiKey + 4) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 4] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 4]} onClick={() => { onMidiKey(firstMidiKey + 4) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 4] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 5]} onClick={() => { onMidiKey(firstMidiKey + 5) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 5] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 6]} onClick={() => { onMidiKey(firstMidiKey + 6) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 6] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    {
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 5]} onClick={() => { onMidiKey(firstMidiKey + 5) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 5] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 6]} onClick={() => { onMidiKey(firstMidiKey + 6) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 6] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 7]} onClick={() => { onMidiKey(firstMidiKey + 7) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 7] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 8]} onClick={() => { onMidiKey(firstMidiKey + 8) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 8] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 7]} onClick={() => { onMidiKey(firstMidiKey + 7) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 7] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 8]} onClick={() => { onMidiKey(firstMidiKey + 8) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 8] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 9]} onClick={() => { onMidiKey(firstMidiKey + 9) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 9] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 10]} onClick={() => { onMidiKey(firstMidiKey + 10) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 10] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 9]} onClick={() => { onMidiKey(firstMidiKey + 9) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 9] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 10]} onClick={() => { onMidiKey(firstMidiKey + 10) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 10] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 11]} onClick={() => { onMidiKey(firstMidiKey + 11) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 11] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 10]} onClick={() => { onMidiKey(firstMidiKey + 10) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 10] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 12]} onClick={() => { onMidiKey(firstMidiKey + 12) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 12] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 13]} onClick={() => { onMidiKey(firstMidiKey + 13) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 13] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 12]} onClick={() => { onMidiKey(firstMidiKey + 12) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 12] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 13]} onClick={() => { onMidiKey(firstMidiKey + 13) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 13] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 14]} onClick={() => { onMidiKey(firstMidiKey + 14) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 14] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 15]} onClick={() => { onMidiKey(firstMidiKey + 15) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 15] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)'  }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 14]} onClick={() => { onMidiKey(firstMidiKey + 14) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 14] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 15]} onClick={() => { onMidiKey(firstMidiKey + 15) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 15] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 16]} onClick={() => { onMidiKey(firstMidiKey + 16) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 16] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 16]} onClick={() => { onMidiKey(firstMidiKey + 16) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 16] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 17]} onClick={() => { onMidiKey(firstMidiKey + 17) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 17] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 18]} onClick={() => { onMidiKey(firstMidiKey + 18) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 18] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 17]} onClick={() => { onMidiKey(firstMidiKey + 17) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 17] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 18]} onClick={() => { onMidiKey(firstMidiKey + 18) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 18] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 19]} onClick={() => { onMidiKey(firstMidiKey + 19) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 19] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 20]} onClick={() => { onMidiKey(firstMidiKey + 20) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 20] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 19]} onClick={() => { onMidiKey(firstMidiKey + 19) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 19] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 20]} onClick={() => { onMidiKey(firstMidiKey + 20) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 20] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 21]} onClick={() => { onMidiKey(firstMidiKey + 21) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 21] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 22]} onClick={() => { onMidiKey(firstMidiKey + 22) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 22] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 21]} onClick={() => { onMidiKey(firstMidiKey + 21) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 21] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 22]} onClick={() => { onMidiKey(firstMidiKey + 22) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 22] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 23]} onClick={() => { onMidiKey(firstMidiKey + 23) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 23] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 23]} onClick={() => { onMidiKey(firstMidiKey + 23) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 23] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 24]} onClick={() => { onMidiKey(firstMidiKey + 24) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 24] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 25]} onClick={() => { onMidiKey(firstMidiKey + 25) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 25] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 24]} onClick={() => { onMidiKey(firstMidiKey + 24) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 24] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 25]} onClick={() => { onMidiKey(firstMidiKey + 25) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 25] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 26]} onClick={() => { onMidiKey(firstMidiKey + 26) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 26] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 27]} onClick={() => { onMidiKey(firstMidiKey + 27) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 27] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)'  }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 26]} onClick={() => { onMidiKey(firstMidiKey + 26) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 26] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 27]} onClick={() => { onMidiKey(firstMidiKey + 27) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 27] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 28]} onClick={() => { onMidiKey(firstMidiKey + 28) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 28] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 28]} onClick={() => { onMidiKey(firstMidiKey + 28) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 28] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 29]} onClick={() => { onMidiKey(firstMidiKey + 29) }} style={{ height: "100%", width: "1s00%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 29] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 30]} onClick={() => { onMidiKey(firstMidiKey + 30) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 30] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 29]} onClick={() => { onMidiKey(firstMidiKey + 29) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 29] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 30]} onClick={() => { onMidiKey(firstMidiKey + 30) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 30] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 31]} onClick={() => { onMidiKey(firstMidiKey + 31) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 31] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 32]} onClick={() => { onMidiKey(firstMidiKey + 32) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 32] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 31]} onClick={() => { onMidiKey(firstMidiKey + 31) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 31] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 32]} onClick={() => { onMidiKey(firstMidiKey + 32) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 32] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 33]} onClick={() => { onMidiKey(firstMidiKey + 33) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 33] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 34]} onClick={() => { onMidiKey(firstMidiKey + 34) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 34] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 33]} onClick={() => { onMidiKey(firstMidiKey + 33) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 33] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 34]} onClick={() => { onMidiKey(firstMidiKey + 34) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 34] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 35]} onClick={() => { onMidiKey(firstMidiKey + 35) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 35] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 35]} onClick={() => { onMidiKey(firstMidiKey + 35) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 35] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 36]} onClick={() => { onMidiKey(firstMidiKey + 36) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 36] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 37]} onClick={() => { onMidiKey(firstMidiKey + 37) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 37] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 36]} onClick={() => { onMidiKey(firstMidiKey + 36) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 36] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 37]} onClick={() => { onMidiKey(firstMidiKey + 37) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 37] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 38]} onClick={() => { onMidiKey(firstMidiKey + 38) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 38] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 39]} onClick={() => { onMidiKey(firstMidiKey + 39) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 39] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)'  }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 38]} onClick={() => { onMidiKey(firstMidiKey + 38) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 38] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 39]} onClick={() => { onMidiKey(firstMidiKey + 39) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 39] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 40]} onClick={() => { onMidiKey(firstMidiKey + 40) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 40] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 40]} onClick={() => { onMidiKey(firstMidiKey + 40) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 40] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 41]} onClick={() => { onMidiKey(firstMidiKey + 41) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 41] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 42]} onClick={() => { onMidiKey(firstMidiKey + 42) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 42] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 41]} onClick={() => { onMidiKey(firstMidiKey + 41) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 41] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 42]} onClick={() => { onMidiKey(firstMidiKey + 42) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 42] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 43]} onClick={() => { onMidiKey(firstMidiKey + 43) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 43] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 44]} onClick={() => { onMidiKey(firstMidiKey + 44) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 44] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 43]} onClick={() => { onMidiKey(firstMidiKey + 43) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 43] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 44]} onClick={() => { onMidiKey(firstMidiKey + 44) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 44] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 45]} onClick={() => { onMidiKey(firstMidiKey + 45) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 45] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 46]} onClick={() => { onMidiKey(firstMidiKey + 46) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 46] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 45]} onClick={() => { onMidiKey(firstMidiKey + 45) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 45] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 46]} onClick={() => { onMidiKey(firstMidiKey + 46) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 46] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 47]} onClick={() => { onMidiKey(firstMidiKey + 47) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 47] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 47]} onClick={() => { onMidiKey(firstMidiKey + 47) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 47] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 48]} onClick={() => { onMidiKey(firstMidiKey + 48) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 48] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 49]} onClick={() => { onMidiKey(firstMidiKey + 49) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 49] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 48]} onClick={() => { onMidiKey(firstMidiKey + 48) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 48] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 49]} onClick={() => { onMidiKey(firstMidiKey + 49) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 49] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 50]} onClick={() => { onMidiKey(firstMidiKey + 50) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 50] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 51]} onClick={() => { onMidiKey(firstMidiKey + 51) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 51] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)'  }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 50]} onClick={() => { onMidiKey(firstMidiKey + 50) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 50] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 51]} onClick={() => { onMidiKey(firstMidiKey + 51) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 51] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 52]} onClick={() => { onMidiKey(firstMidiKey + 52) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 52] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 52]} onClick={() => { onMidiKey(firstMidiKey + 52) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 52] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 53]} onClick={() => { onMidiKey(firstMidiKey + 53) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 53] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 54]} onClick={() => { onMidiKey(firstMidiKey + 54) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 54] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 53]} onClick={() => { onMidiKey(firstMidiKey + 53) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 53] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 54]} onClick={() => { onMidiKey(firstMidiKey + 54) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 54] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 55]} onClick={() => { onMidiKey(firstMidiKey + 55) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 55] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 56]} onClick={() => { onMidiKey(firstMidiKey + 56) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 56] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 55]} onClick={() => { onMidiKey(firstMidiKey + 55) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 55] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '30%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 56]} onClick={() => { onMidiKey(firstMidiKey + 56) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 56] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '50%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 57]} onClick={() => { onMidiKey(firstMidiKey + 57) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 57] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '20%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 58]} onClick={() => { onMidiKey(firstMidiKey + 58) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 58] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 57]} onClick={() => { onMidiKey(firstMidiKey + 57) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 57] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', verticalAlign: 'top' }}>
                                <Grid item direction="column" style={{ height: '66%', width: '100%', verticalAlign: 'top' }}>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '40%', verticalAlign: 'top', backgroundColor: 'rgba(0,0,0,80%)' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 58]} onClick={() => { onMidiKey(firstMidiKey + 58) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 58] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '60%', verticalAlign: 'top' }}>
                                        <div name={"Note/Pad-" + Notes[firstMidiKey + 59]} onClick={() => { onMidiKey(firstMidiKey + 59) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 59] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item direction="column" style={{ height: '34%', width: '100%', borderLeft: 'solid 2px rgba(0,0,0,80%)' }}>
                                    <div name={"Note/Pad-" + Notes[firstMidiKey + 59]} onClick={() => { onMidiKey(firstMidiKey + 59) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 59] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                    </div>
                                </Grid>
                            </Grid>
                            
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '2.7777777777%', backgroundColor: 'white', borderLeft: 'solid 2px rgba(0,0,0,50%)', borderRight: 'solid 2px rgba(0,0,0,50%)' }}>
                                <div name={"Note/Pad-" + Notes[firstMidiKey + 60]} onClick={() => { onMidiKey(firstMidiKey + 60) }} style={{ height: "100%", width: "100%", backgroundColor: selectedControl == "Note/Pad-" + Notes[firstMidiKey + 60] ? 'rgba(' + modeColorRGB + ', 30%)' : '' }}>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};