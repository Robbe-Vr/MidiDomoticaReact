import React, { useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { drawerWidth } from "./components/Drawer/AppDrawer";
import { drawerHeight } from "./components/Drawer/MobileAppDrawer";

import HomePage from "./components/Home/Index";
import ControlsPage from "./components/Home/Controls";
import TimedEventsPage from "./components/Home/TimedEvents";
import ManualControlPage from "./components/Home/ManualControl";

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: '25px',
        maxHeight: '100%',
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
}));

export default function MainContent({ Api, setTitle, drawerOpen, renderMobile, windowWidth, userName, rights }) {
    const classes = useStyles();

    return (
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: !renderMobile && drawerOpen
            })}
        >
            <div className={classes.drawerHeader} />
            <div
                style={{
                    width: windowWidth - 50 - (!renderMobile && drawerOpen ? drawerWidth : 0),
                    overflow: 'auto',
                    marginBottom: renderMobile ? `${drawerHeight}px` : '0'
                }}
            >
                <Switch>
                    <Route exact path={["/home/index", "/home"]}>
                        <HomePage renderMobile={renderMobile}
                            Api={Api} setTitle={setTitle}
                        />
                    </Route>
                    <Route exact path={["/controls/index", "/controls"]}>
                        <ControlsPage renderMobile={renderMobile}
                            Api={Api} setTitle={setTitle} drawerOpen={drawerOpen}
                        />
                    </Route>
                    <Route exact path={["/timedevents/index", "/timedevents"]}>
                        <TimedEventsPage renderMobile={renderMobile}
                            Api={Api} setTitle={setTitle} drawerOpen={drawerOpen}
                        />
                    </Route>
                    <Route exact path={["/manual/index", "/manual"]}>
                        <ManualControlPage renderMobile={renderMobile}
                            Api={Api} setTitle={setTitle} drawerOpen={drawerOpen}
                        />
                    </Route>
                    <Redirect strict from="/" to="/home" />
                </Switch>
            </div>
        </main>
    );
};