import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TimelineIcon from '@material-ui/icons/Timeline';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LanguageIcon from '@material-ui/icons/Language';

export const navigationItems = (
  <div>
    <Link to="/">
        <ListItem button>
        <ListItemIcon>
            <TimelineIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItem>
    </Link>
    <Divider />
    <Link to="/isa">
        <ListItem button>
        <ListItemIcon>
            <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="ISA" />
        </ListItem>
    </Link>
    <Link to="/cash">
        <ListItem button>
        <ListItemIcon>
            <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Cash" />
        </ListItem>
    </Link>
    <Link to="/crypto">
        <ListItem button>
        <ListItemIcon>
            <LanguageIcon />
        </ListItemIcon>
        <ListItemText primary="Crypto" />
        </ListItem>
    </Link>
  </div>
);

