import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Drawer, IconButton, Divider, List } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { faClock, faGamepad, faList } from "@fortawesome/free-solid-svg-icons";

import DrawerItem from "./DrawerItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: '#222222',
        color: 'white',
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#222222',
        color: 'white',
    },
    drawerheader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        backgroundColor: '#222222',
        borderBottom: 'solid 1px #22DDFF',
        ...theme.mixins.toolbar,
        color: 'white',
    },
    chevron: {
        display: "flex",
        justifyContent: "flex-end",
        flex: 1,
    },
}));

function AppDrawer({ open, onOpen, rights }) {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerheader}>
                <Typography variant="h5" noWrap style={{ marginLeft: "8px" }}>
                    MidiDomotica
                </Typography>
                <div className={classes.chevron}>
                    <IconButton onClick={() => onOpen(false)} style={{ color: 'white', }}>
                        {
                            theme.direction === "itr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )
                        }
                    </IconButton>
                </div>
            </div>
            <Divider />
            <List>
                <div>
                    <DrawerItem icon={faList} link="/controls" text="Controls" />
                    <DrawerItem icon={faClock} link="/timedevents" text="Timed Events" />
                    <DrawerItem icon={faGamepad} link="/manual" text="Manual Control" />
                </div>
            </List>
        </Drawer>
    );
};

export { AppDrawer, drawerWidth };