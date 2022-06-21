import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Dialog, DialogContent, Grid, Slider, Typography } from "@material-ui/core";
import { AlphaPicker, PhotoshopPicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faChevronCircleLeft, faChevronCircleRight, faImages, faLightbulb, faMoon, faSun, faTimes, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../../Global/NotificationContext";
import { UserSelectInputComponent } from "../../Global/UserSelectInputComponent";
import { Pagination } from "../../Global/Pagination";
import { UserInputComponent } from "../../Global/UserInputComponent";

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

export default function SoundboardActionCreation({ Api, show, setActionString, modeColor }) {

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const createActionString = () => {
        if (mode.length < 2 ||
            doValue.length < 2 ||
            target.length < 2)
        {
            warning('Please fill out all fields!');
        }

        setActionString(`${mode}::${doValue}${target != '-1' ? `::${target == 'custom' ? customMethodValue : target}` : ''}`);
    };

    const [mode, setMode] = useState('');

    const [doValue, setDoValue] = useState('');

    const [target, setTarget] = useState('');

    const [customMethodMaxValue, setCustomMethodMaxValue] = useState(100);
    const [customMethodMinValue, setCustomMethodMinValue] = useState(0);
    const [customMethodValue, setCustomMethodValue] = useState(0);

    const [soundEffects, setSoundEffects] = useState([]);
    useEffect(() => {
        if (!show || mode != 'Play' || doValue != 'Play') return;

        setLoaded(false);
        Api.GetSoundboardSoundEffects().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available sound effects!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load available sound effects!`);
                console.log(`Failed to load available sound effects!`, res);
            }
            else {
                setSoundEffects(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode, doValue]);

    const [soundEffectsPage, setSoundEffectsPage] = useState(1);
    const [maxSoundEffectsPages, setMaxSoundEffectsPages] = useState(1);

    const [targets, setTargets] = useState([]);

    const [soundEffectFolders, setSoundEffectFolders] = useState([]);
    useEffect(() => {
        if (!show || mode != 'Play' && doValue != 'Play') return;

        setLoaded(false);
        Api.GetSoundboardSoundEffectFolders().then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load available sound effect folders!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load available sound effect folders!`);
                console.log(`Failed to load available sound effect folders!`, res);
            }
            else {
                setSoundEffectFolders(res);
            }

            setLoaded(true);
        });
    }, [Api, show, mode, doValue]);

    const [folderFilter, setFolderFilter] = useState('All');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        var newTargets = 
        Array.isArray(soundEffects) ?
            soundEffects
                .filter(x => x.name.toUpperCase().indexOf(nameFilter.toUpperCase()) > -1 && (folderFilter == 'All' || x.directory == folderFilter))
            : [];

        setTargets(
            newTargets.slice((soundEffectsPage - 1) * 5, ((soundEffectsPage - 1) * 5) + 5)
        );

        setMaxSoundEffectsPages(parseInt(newTargets?.length / 5) + 1);
    }, [soundEffects, soundEffectsPage, nameFilter, folderFilter]);

    useEffect(() => {
        setSoundEffectsPage(1);
    }, [soundEffects, nameFilter, folderFilter]);

    const [audio, setAudio] = useState(null);

    const playSoundEffect = (soundEffect) => {
        var source = Api.GetSoundEffectAudioUrl(soundEffect);

        if (audio && audio.src == source)
        {
            audio.pause();

            audio.remove();

            setAudio(null);
        }
        else
        {
            if (audio) {
                audio.pause();

                audio.remove();
            }

            var newAudio = new Audio(source);

            newAudio.addEventListener('ended', (e) => {
                newAudio.pause();
            });

            newAudio.play();

            setAudio(newAudio);
        }
    };

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
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Play' ? modeColor : 'white'}}
                        onClick={() => setMode('Play')}
                    >
                        Play
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Record' ? modeColor : 'white'}}
                        onClick={() => setMode('Record')}
                    >
                        Record
                    </Button>
                </Grid>
                <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                    <Button variant="outlined" style={{ width: '100%', backgroundColor: mode == 'Passthrough' ? modeColor : 'white'}}
                        onClick={() => setMode('Passthrough')}
                    >
                        Passthrough
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
            {mode == 'Play' ?
            <>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Play/Pause/Stop
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Play', name: 'Play', value: 'Play' },
                                { id: 'Pause', name: 'Pause', value: 'Pause' },
                                { id: 'Stop', name: 'Stop', value: 'Stop' },
                            ]}
                            onChange={(value) => setDoValue(value)}
                        />
                    </Grid>
                </Grid>
                <Grid item direction="row" style={{ maxHeight: '70%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '20%', width: '10%' }}>
                        Sound Effect
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '20%', width: '90%' }}>
                        {doValue == 'Play' ?
                        <>
                            <Grid style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
                                <Pagination page={soundEffectsPage} maxPages={maxSoundEffectsPages} rpp={5} onChangePage={setSoundEffectsPage} />
                            </Grid>
                            <Grid style={{ display: 'inline-block', width: '30%' }}>
                                <UserInputComponent name="Name"
                                    style={{ color: 'white', backgroundColor: '#222', width: '90%', height: '100%' }}
                                    value={nameFilter}
                                    onChange={(value) => setNameFilter(value)}
                                />
                            </Grid>
                            <Grid style={{ display: 'inline-block', width: '20%', verticalAlign: 'top' }}>
                                <UserSelectInputComponent name="Folder"
                                    style={{ color: 'white', backgroundColor: '#222', width: '90%', height: '100%' }}
                                    defaultValue={'All'}
                                    options={[
                                        { id: 'All', name: 'All', value: 'All' },
                                        ...(
                                            soundEffectFolders.map(folder => {
                                                return {
                                                    id: folder,
                                                    name: folder,
                                                    value: folder
                                                };
                                            })
                                        )
                                    ]}
                                    onChange={(value) => setFolderFilter(value)}
                                />
                            </Grid>
                        </>
                        :
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: '{target}', name: 'Last activated by Control', value: '{target}' },
                                { id: 'All', name: 'All', value: '-1' },
                            ]}
                            onChange={(value) => setTarget(value)}
                        />}
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', maxHeight: '20%', width: '10%' }}>
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', maxHeight: '20%', width: '90%', verticalAlign: 'top' }}>
                        {doValue == 'Play' && Array.isArray(targets) && targets.length > 0 ?
                                <>
                                    <Grid style={{ display: 'inline-block', width: '90%', paddingLeft: '5px', paddingRight: '5px' }}>
                                        {targets.map((sound) =>
                                        {
                                            return (
                                                <Grid style={{ display: 'inline-block', width: '20%', paddingLeft: '5px', paddingRight: '5px', margin: 'auto', marginTop: '10px' }}>
                                                    <Button variant="outlined"
                                                        style={{ display: 'inline-block', width: '100%', height: '90%', borderColor: '#2DF', backgroundColor: target == sound.filePath ? '#2DF' : '', color: 'white', textTransform: 'none' }}
                                                        onClick={() => setTarget(sound.filePath)}
                                                        onDoubleClick={() => playSoundEffect(sound.filePath)}
                                                    >
                                                        {sound.name}<br />
                                                        from {sound.directory}
                                                    </Button>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </>
                            : <>No sound effects.</>
                        }
                    </Grid>
                </Grid>
            </>
            : mode == 'Record' ?
            <>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Start/Stop/Clip
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Start', name: 'Start', value: 'Start' },
                                { id: 'Clip', name: 'Clip', value: 'Clip' },
                                { id: 'Stop', name: 'Stop', value: 'Stop' },
                            ]}
                            onChange={(value) => setDoValue(value)}
                        />
                    </Grid>
                </Grid>
            </>
            : mode == 'Passthrough' ?
            <>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        Set
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={[
                                { id: 'Enable', name: 'Enable', value: 'Enable' },
                                { id: 'Gain', name: 'Gain', value: 'Gain' },
                                { id: 'EchoMix', name: 'EchoMix', value: 'EchoMix' },
                                { id: 'EchoDelay', name: 'EchoDelay', value: 'EchoDelay' },
                                { id: 'EchoDecay', name: 'EchoDecay', value: 'EchoDecay' },
                                { id: 'ReverbMix', name: 'ReverbMix', value: 'ReverbMix' },
                                { id: 'ReverbDelay', name: 'ReverbDelay', value: 'ReverbDelay' },
                                { id: 'ReverbDecay', name: 'ReverbDecay', value: 'ReverbDecay' },
                                { id: 'Pitch', name: 'Pitch', value: 'Pitch' },
                                { id: 'Panning', name: 'Panning', value: 'Panning' },
                                { id: 'NoiseGate', name: 'NoiseGate', value: 'NoiseGate' },
                            ]}
                            value={doValue}
                            onChange={(value) => setDoValue(value)}
                        />
                    </Grid>
                </Grid>
                <Grid item direction="row" style={{ maxHeight: '20%', width: '100%', padding: '10px' }}>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '10%' }}>
                        To
                    </Grid>
                    <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: '90%' }}>
                        <UserSelectInputComponent name="Turn Options"
                            style={{ color: 'white', backgroundColor: '#222', width: '50%', height: '100%' }}
                            options={
                            doValue == 'Enable' ?
                            [
                                { id: 'Enable', name: 'Enable', value: 'TRUE' },
                                { id: 'Disable', name: 'Disable', value: 'FALSE' },
                            ]
                            : doValue == 'Gain' ?
                            [
                                { id: '{controlValue}', name: 'Use Control Value', value: '{controlValue}/1000' },
                                { id: 'custom', name: 'Use Custom Value', value: 'custom' },
                            ]
                            : doValue == 'NoiseGate' ||
                              doValue == 'EchoMix' || doValue == 'EchoDelay' || doValue == 'EchoDecay' ||
                              doValue == 'ReverbMix' || doValue == 'ReverbDelay' || doValue == 'ReverbDecay' ?
                            [
                                { id: '{controlValue}', name: 'Use Control Value', value: '{controlValue}/100' },
                                { id: 'custom', name: 'Use Custom Value', value: 'custom' },
                            ]
                            : doValue == 'Pitch' ?
                            [
                                { id: '{controlValue}', name: 'Use Control Value', value: '{controlValue}/500/1' },
                                { id: 'custom', name: 'Use Custom Value', value: 'custom' },
                            ]
                            : doValue == 'Panning' ?
                            [
                                { id: '{controlValue}', name: 'Use Control Value', value: '{controlValue}/100/-100' },
                                { id: 'custom', name: 'Use Custom Value', value: 'custom' },
                            ]
                            : []
                            }
                            onChange={(value) =>
                                {
                                    setTarget(value);
                                    if (value == 'custom')
                                    {
                                        if (doValue == 'Pitch')
                                        {
                                            setCustomMethodMinValue(1);
                                            setCustomMethodMaxValue(500);
                                        }
                                        else if (doValue == 'Panning')
                                        {
                                            setCustomMethodMinValue(-100);
                                            setCustomMethodMaxValue(100);
                                        }
                                        else if (doValue == 'Gain')
                                        {
                                            setCustomMethodMinValue(0);
                                            setCustomMethodMaxValue(1000);
                                        }
                                        else
                                        {
                                            setCustomMethodMinValue(0);
                                            setCustomMethodMaxValue(100);
                                        }
                                    }
                                }}
                        />
                        {target == 'custom' ?
                            <Grid style={{ height: '100%', width: '50%' }}>
                                <Grid style={{ display: 'inline-block', height: '100%', width: '90%', verticalAlign: 'middle' }}>
                                    <Slider min={customMethodMinValue} max={customMethodMaxValue} step={1}
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
            : <Grid style={{ height: '100%', width: '50%', textAlign: 'center' }}><Typography variant="h6">Choose a mode</Typography></Grid>}
        </Grid>
    );
};