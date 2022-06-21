import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";

import HueActionCreation from "./Action/HueActionCreation";
import PowerModesActionCreation from "./Action/PowerModesActionCreation";
import KeyboardActionCreation from "./Action/KeyboardActionCreation";
import AudioActionCreation from "./Action/AudioActionCreation";
import SoundboardActionCreation from "./Action/SoundboardActionCreation";


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

export default function ActionsPage({ renderMobile, Api, setSelectedPerformMode, selectedPerformMode, LinkActionToEvent, color }) {

    const classes = useStyles();

    return (
        <>
            <Grid item direction="row" style={{ height: renderMobile ? '20%' : '10%', width: '100%' }}>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: selectedPerformMode == 'Hue' ? color : 'white', margin: 'auto'  }}
                        onClick={() => setSelectedPerformMode('Hue')}
                    >
                        Hue
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor:  selectedPerformMode == 'PowerModes' ? color : 'white', margin: 'auto'  }}
                        onClick={() => setSelectedPerformMode('PowerModes')}
                    >
                        PowerModes
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: selectedPerformMode == 'Keyboard' ? color : 'white', margin: 'auto'  }}
                        onClick={() => setSelectedPerformMode('Keyboard')}
                    >
                        Keyboard
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: selectedPerformMode == 'WindowsAudio' ? color : 'white', margin: 'auto'  }}
                        onClick={() => setSelectedPerformMode('WindowsAudio')}
                    >
                        Audio
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: selectedPerformMode == 'Soundboard' ? color : 'white', margin: 'auto'  }}
                        onClick={() => setSelectedPerformMode('Soundboard')}
                    >
                        Soundboard
                    </Button>
                </Grid>
            </Grid>
            <Grid item direction="row" style={{ height: renderMobile ? '80%' : '90%', width: '100%' }}>
                <HueActionCreation show={selectedPerformMode == 'Hue'} Api={Api} setActionString={LinkActionToEvent} modeColor={color} />
                <PowerModesActionCreation show={selectedPerformMode == 'PowerModes'} Api={Api} setActionString={LinkActionToEvent} modeColor={color} />
                <KeyboardActionCreation show={selectedPerformMode == 'Keyboard'} Api={Api} setActionString={LinkActionToEvent} modeColor={color} />
                <AudioActionCreation show={selectedPerformMode == 'WindowsAudio'} Api={Api} setActionString={LinkActionToEvent} modeColor={color} />
                <SoundboardActionCreation show={selectedPerformMode == 'Soundboard'} Api={Api} setActionString={LinkActionToEvent} modeColor={color} />
            </Grid>
        </>
    );
};