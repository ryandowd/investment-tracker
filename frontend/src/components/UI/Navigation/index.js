import React, { useState } from 'react';
import clsx from 'clsx';
import { useLocation } from "react-router-dom";

import useStyles from '../../../hooks/useStyles';
import { AppBar, Toolbar, IconButton, Typography, List, Divider, Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { navigationItems } from '../NavigationItems';

const Navigation = () => {
    const location = useLocation();
    const [open, setOpen] = useState(true);
    const classes = useStyles();

    console.log(open, 'open open open open')

    const handleDrawerToggle = () => {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    // const handleDrawerOpen = () => {
    //   setOpen(true);
    // };
    // const handleDrawerClose = () => {
    //   setOpen(false);
    // };

    const pageName = location.pathname === '/isa' ? 'ISA' : location.pathname === '/' ? 'Dashboard' : location.pathname;

    console.log(pageName.replace('/', ''), 'pageName pageName pageName pageName')
    
    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    {pageName.replace('/', '')}
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeftIcon />
                </IconButton>
                </div>
                <Divider />
                <List>{navigationItems}</List>
            </Drawer>
        </>
    )
}

export default Navigation;