import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid, IconButton, Typography } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCheck, faImages, faTimes, faTimesCircle, faUpload, } from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useNotifications } from "../Global/NotificationContext";
import MidiControlLayoutPage from "../Global/MidiControlLayout";

import { MuiPickersUtilsProvider, DatePicker, DateTimePicker, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import ActionsPage from "../Global/Actions";
import { UserMultiSelectInputComponent } from "../Global/UserMultiSelectInputComponent";
import { UserInputComponent } from "../Global/UserInputComponent";
import { UserSelectInputComponent } from "../Global/UserSelectInputComponent";


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

export default function TimedEventsPage({ setTitle, Api, renderMobile, drawerOpen }) {
    useEffect(() => {
        setTitle && setTitle("Timed Events");
    });

    const classes = useStyles();

    const { error, warning, success } = useNotifications();

    const history = useHistory();

    const [loaded, setLoaded] = useState(true);

    const LinkActionToTimedEvent = (actionDataString) => {
        if (selectedTimerTriggerMode.length < 2 ||
            selectedPerformMode.length < 2 ||
            actionDataString.length < 2)
        {
            warning('Please fill out all fields!');
            return;
        }

        const timedEventName = selectedTimerTriggerMode.replace('{unit}', unit);
        const actionGroup = selectedPerformMode;

        var formData = new FormData();

        const useAtTime = selectedTimerTriggerMode == 'once' || selectedTimerTriggerMode == 'weekschedule';

        formData.append('ActionGroup', actionGroup);
        formData.append('MethodStr', actionDataString);

        formData.append('Second', startingAtTime.getSeconds());
        formData.append('Minute', useAtTime ? atTime.getMinutes() : startingAtTime.getMinutes());
        formData.append('Hour', (useAtTime ? atTime.getHours() : startingAtTime.getHours()) + 1);

        formData.append('DayOfMonth', startingAtDate.getDate());
        formData.append('Month', startingAtDate.getMonth());
        formData.append('Year', startingAtDate.getFullYear());

        let weekdaysValue = 0;

        if (Array.isArray(weekdays) && weekdays.length > 0)
        {
            if (weekdays.indexOf('Monday') > -1) weekdaysValue += 1;
            if (weekdays.indexOf('Tuesday') > -1) weekdaysValue += 2;
            if (weekdays.indexOf('Wednesday') > -1) weekdaysValue += 4;
            if (weekdays.indexOf('Thursday') > -1) weekdaysValue += 8;
            if (weekdays.indexOf('Friday') > -1) weekdaysValue += 16;
            if (weekdays.indexOf('Saturday') > -1) weekdaysValue += 32;
            if (weekdays.indexOf('Sunday') > -1) weekdaysValue += 64;
        }
        else weekdaysValue = 127;

        formData.append('DaysOfWeek', weekdaysValue);

        Api.CreateTimedEvent(timedEventName, formData).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to create timed event!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to create timed event!`);
                console.log(`Failed to create timed event!`, res);
            }
            else {
                success('Timed event has been created!');
            }
        });
    };

    const removeTimedEvent = (subscription, index) => {
        
        Api.RemoveTimedEvent(subscription.ActionGroup, subscription.Methodstr).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to remove timed event!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error('Failed to remove timed event!');
                console.log('Failed to remove timed event!', res);
            }
            else {
                success('Timed event has been removed!');

                setUpcomingEvents(subscriptions => { var newSubscriptions = [...subscriptions]; newSubscriptions.splice(index, 1); return newSubscriptions; });
            }
        });
    };

    const [inPerformMode, setInPerformMode] = useState(true);

    const [subsciptionsPage, setSubscriptionsPage] = useState(1);
    const [subscriptionsRpp, setSubscriptionsRpp] = useState(10);

    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        if (inPerformMode) return;

        Api.GetUpcomingTimedEvents(subsciptionsPage, subscriptionsRpp).then((res) => {
            if (res instanceof String || typeof res == 'string') {
                error('Failed to load timed events!');
            }
            else if (res.status && res.status != 200) {
                if (res.detail) {
                    error(`Sorry! ${res.detail}`);
                }
                else error(`Failed to load timed events!`);
                console.log(`Failed to load timed events!`, res);
            }
            else {
                setUpcomingEvents(res);
            }
        });
    }, [subsciptionsPage, subscriptionsRpp, inPerformMode]);

    const color = '#2DF';

    const [selectedTimerTriggerMode, setSelectedTimerTriggerMode] = useState('');

    const [startingAtDate, setStartingAtDate] = useState(new Date());
    const [startingAtTime, setStartingAtTime] = useState(new Date());

    const [atTime, setAtTime] = useState(new Date());

    const [unit, setUnit] = useState('second(s)');

    const [weekdays, setWeekdays] = useState([]);

    const [X, setX] = useState(0);

    const [amount, setAmount] = useState(0);

    const [selectedPerformMode, setSelectedPerformMode] = useState('');

    useEffect(() => {
        if (selectedTimerTriggerMode == 'once' || selectedTimerTriggerMode == 'weekschedule')
        {
            startingAtTime.setMinutes(atTime.getMinutes());
            startingAtTime.setHours(atTime.getHours());
        }
    }, [startingAtTime, atTime]);

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

    const unitlyMode = selectedTimerTriggerMode.startsWith('{unit}ly');

    const everyXMode = selectedTimerTriggerMode.startsWith('everyX');

    const atAmountMode = selectedTimerTriggerMode.indexOf('AtAmount') > -1;

    return (
        <div className={classes.form} style={{ height: window.innerHeight * (renderMobile ? 0.7 : 0.9), width: renderMobile ? '100%' : '95%', overflowY: 'auto', margin: '' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid style={{ width: '100%', height: '100%', overflow: 'auto', padding: renderMobile ? '5px' : '20px', boxShadow: 'inset 0px -7px 5px rgba(0 0 0 / 30%), inset 0px 7px 5px rgba(0 0 0 / 30%)', border: renderMobile ? '' : 'solid 1px white', borderTop: 'solid 1px white', borderBottom: 'solid 1px white', borderRadius: renderMobile ? '' : '1rem', overflowY: 'hidden' }}>
                    <Grid style={{ height: '40%', width: '100%' }}>
                        <Grid item direction="row" style={{ height: '40%', width: '100%' }}>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor: selectedTimerTriggerMode == 'once' ? color : 'white', margin: 'auto'  }}
                                    onClick={() => setSelectedTimerTriggerMode('once')}
                                >
                                    Once
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor:  selectedTimerTriggerMode == 'weekschedule' ? color : 'white', margin: 'auto'  }}
                                    onClick={() => setSelectedTimerTriggerMode('weekschedule')}
                                >
                                    Weekly
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor: selectedTimerTriggerMode == '{unit}ly' ? color : 'white', margin: 'auto'  }}
                                    onClick={() => setSelectedTimerTriggerMode('{unit}ly')}
                                >
                                    Every interval of single unit forever
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor: selectedTimerTriggerMode == '{unit}lyAtAmount' ? color : 'white', margin: 'auto'  }}
                                    onClick={() => setSelectedTimerTriggerMode('{unit}lyAtAmount')}
                                >
                                    Every interval of single unit for amount
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor: selectedTimerTriggerMode == 'everyX{unit}' ? color : 'white', margin: 'auto'  }}
                                    onClick={() => setSelectedTimerTriggerMode('everyX{unit}')}
                                >
                                    Every interval of X units forever
                                </Button>
                            </Grid>
                            <Grid item direction="column" style={{ display: 'inline-block', height: '100%', width: renderMobile ? '20%' : '10%', margin: 'auto' }}>
                                <Button variant="outlined" style={{ width: '100%', height: '100%', backgroundColor: selectedTimerTriggerMode == 'everyX{unit}AtAmount' ? color : 'white', margin: 'auto'  }}
                                    onClick={() => setSelectedTimerTriggerMode('everyX{unit}AtAmount')}
                                >
                                    Every interval of X unit for amount
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid style={{ width: '100%', height: '30%', padding: '10px', color: 'white' }}>
                            {
                                everyXMode ?
                                    <>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            {'Execute every '}
                                        </Grid>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            <UserInputComponent type="number" name="X"
                                                style={{ display: 'inline-block', color: 'white', backgroundColor: '#222' }}
                                                inputProps={{
                                                    style: { color: 'white' },
                                                    min: 1,
                                                    max: 999,
                                                    step: 1
                                                }}
                                                defaultValue={X}
                                                onChange={(value) => setX(value)}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            <UserSelectInputComponent name="unit"
                                                style={{ display: 'inline-block', color: 'white', backgroundColor: '#222' }}
                                                options={[
                                                    { id: 'second(s)', name: 'second(s)', value: 'second' },
                                                    { id: 'minute(s)', name: 'minute(s)', value: 'minute' },
                                                    { id: 'hour(s)', name: 'hour(s)', value: 'hour' },
                                                    { id: 'day(s)', name: 'day(s)', value: 'day' },
                                                    { id: 'week(s)', name: 'week(s)', value: 'week' },
                                                    { id: 'month(s)', name: 'month(s)', value: 'month' },
                                                    { id: 'year(s)', name: 'year(s)', value: 'year' },
                                                ]}
                                                defaultValue={unit}
                                                onChange={(value) => setUnit(value)}
                                            />
                                        </Grid>
                                        {atAmountMode ?
                                            <>
                                                <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                    {' for '}
                                                </Grid>
                                                <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                    <UserInputComponent type="number" name="X"
                                                        style={{ display: 'inline-block', color: 'white', backgroundColor: '#222' }}
                                                        inputProps={{
                                                            style: { color: 'white' },
                                                            min: 1,
                                                            max: 999,
                                                            step: 1
                                                        }}
                                                        defaultValue={amount}
                                                        onChange={(value) => setAmount(value)}
                                                    />
                                                </Grid>
                                                <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                    {' times'}
                                                </Grid>
                                            </>
                                        : <></>}
                                    </>
                                : unitlyMode ?
                                    <>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            {'Execute every single '}
                                        </Grid>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            <UserSelectInputComponent name="unit"
                                                style={{ display: 'inline-block', color: 'white', backgroundColor: '#222' }}
                                                options={[
                                                    { id: 'second(s)', name: 'second', value: 'second' },
                                                    { id: 'minute(s)', name: 'minute', value: 'minute' },
                                                    { id: 'hour(s)', name: 'hour', value: 'hour' },
                                                    { id: 'day(s)', name: 'day', value: 'day' },
                                                    { id: 'week(s)', name: 'week', value: 'week' },
                                                    { id: 'month(s)', name: 'month', value: 'month' },
                                                    { id: 'year(s)', name: 'year', value: 'year' },
                                                ]}
                                                defaultValue={unit}
                                                onChange={(value) => setUnit(value)}
                                            />
                                        </Grid>
                                        {atAmountMode ?
                                            <>
                                                <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                    {' for '}
                                                </Grid>
                                                <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                    <UserInputComponent type="number" name="X"
                                                        style={{ display: 'inline-block', color: 'white', backgroundColor: '#222' }}
                                                        inputProps={{
                                                            style: { color: 'white' },
                                                            min: 1,
                                                            max: 999,
                                                            step: 1
                                                        }}
                                                        defaultValue={amount}
                                                        onChange={(value) => setAmount(value)}
                                                    />
                                                </Grid>
                                                <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                    {' times.'}
                                                </Grid>
                                            </>
                                        : <></>}
                                    </>
                                : selectedTimerTriggerMode == 'once' ?
                                    <>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            {'Execute once at '}
                                            <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                <TimePicker
                                                    style={{ color: 'white', backgroundColor: '#222' }}
                                                    inputProps={{ style: { color: 'white', backgroundColor: '#222' } }}
                                                    value={atTime}
                                                    onChange={(value) => setAtTime(value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>
                                : selectedTimerTriggerMode == 'weekschedule' ?
                                    <>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            {'Execute every '}
                                        </Grid>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            <UserMultiSelectInputComponent name="unit"
                                                style={{ display: 'inline-block', color: 'white', backgroundColor: '#222' }}
                                                options={[
                                                    { id: 'Monday', name: 'Monday', value: 'Monday' },
                                                    { id: 'Tuesday', name: 'Tuesday', value: 'Tuesday' },
                                                    { id: 'Wednesday', name: 'Wednesday', value: 'Wednesday' },
                                                    { id: 'Thursday', name: 'Thursday', value: 'Thursday' },
                                                    { id: 'Friday', name: 'Friday', value: 'Friday' },
                                                    { id: 'Saturday', name: 'Saturday', value: 'Saturday' },
                                                    { id: 'Sunday', name: 'Sunday', value: 'Sunday' },
                                                ]}
                                                defaultValue={unit}
                                                onChange={(values) => setWeekdays(values)}
                                            />
                                        </Grid>
                                        <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                            {'of every week at '}
                                            <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                                <TimePicker
                                                    views={['hours','minutes','seconds']}
                                                    style={{ color: 'white', backgroundColor: '#222' }}
                                                    inputProps={{ style: { color: 'white', backgroundColor: '#222' } }}
                                                    value={atTime}
                                                    onChange={(value) => setAtTime(value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>
                                : 'Choose a trigger mode.'
                            }
                        </Grid>
                        <Grid style={{ width: '100%', height: '30%', padding: '10px', color: 'white' }}>
                            <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                Starting at
                            </Grid>
                            <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                <DatePicker
                                    views={['year','month','date']}
                                    style={{ color: 'white', backgroundColor: '#222' }}
                                    inputProps={{ style: { color: 'white', backgroundColor: '#222' } }}
                                    value={startingAtDate}
                                    onChange={(value) => setStartingAtDate(value)}
                                />
                            </Grid>
                            <Grid style={{ display: 'inline-block', paddingRight: '5px', verticalAlign: 'middle' }}>
                                <TimePicker
                                    views={['hours','minutes','seconds']}
                                    style={{ color: 'white', backgroundColor: '#222' }}
                                    inputProps={{ style: { color: 'white', backgroundColor: '#222' } }}
                                    value={startingAtTime}
                                    onChange={(value) => setStartingAtTime(value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{ width: '100%', height: '60%', color: 'white', padding: '20px' }}>
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
                                {inPerformMode ?
                                    <ActionsPage renderMobile={renderMobile} Api={Api} selectedPerformMode={selectedPerformMode} setSelectedPerformMode={setSelectedPerformMode} LinkActionToEvent={LinkActionToTimedEvent} color={color} />
                                    :
                                    <Grid style={{ width: '100%', height: '100%', padding: '20px', overflowY: 'auto' }}>
                                        {Array.isArray(upcomingEvents) && upcomingEvents.length > 0 ? upcomingEvents.map((subscription, index) =>
                                            {
                                                return (
                                                    <Grid style={{ width: '100%', height: '10%', padding: '5px', border: 'solid 1px white' }}>
                                                        <Grid style={{ display: 'inline-block', width: '5%', height: '100%' }}>
                                                            {index + 1}.
                                                        </Grid>
                                                        <Grid style={{ display: 'inline-block', width: '15%', height: '100%' }}>
                                                            {subscription.ActionGroup}
                                                        </Grid>
                                                        <Grid style={{ display: 'inline-block', width: '25%', height: '100%' }}>
                                                            {subscription.MethodStr}
                                                        </Grid>
                                                        <Grid style={{ display: 'inline-block', width: '40%', height: '100%' }}>
                                                            {Array.isArray(subscription.FireTimes) && subscription.FireTimes.length > 0 ? subscription.FireTimes.map(fireTime =>
                                                                {
                                                                    return (
                                                                        <>
                                                                            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][fireTime.getDay() - 1]} {fireTime.toLocaleString('nl')}
                                                                        </>
                                                                    );
                                                                })
                                                                : <>No fire times for this timed event.</>
                                                            }
                                                        </Grid>
                                                        <Grid style={{ display: 'inline-block', width: '15%', height: '100%' }}>
                                                            <Button variant="outlined"
                                                                style={{ color: '#F42' }}
                                                                onClick={() => removeTimedEvent(subscription, index)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                );
                                            })
                                            : <>No timed events.</>
                                        }
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
};