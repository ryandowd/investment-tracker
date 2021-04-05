import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TimelineIcon from '@material-ui/icons/Timeline';
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
    <Link to="/snapshots">
        <ListItem button>
        <ListItemIcon>
            <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Snapshots" />
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
    <Link to="/isa">
        <ListItem button>
        <ListItemIcon>
            <ShowChartIcon />
        </ListItemIcon>
        <ListItemText primary="ISA" />
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

