import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import PageDashboard from './components/Pages/PageDashboard';
import PageISA from './components/Pages/PageISA';
import PageCash from './components/Pages/PageCash';
import PageCrypto from './components/Pages/PageCrypto';
// import PageSnapshots from './components/Pages/PageSnapshots';
import Navigation from './components/UI/Navigation';

import { AssetProvider } from './context/assetContext';

import useStyles from './hooks/useStyles';

import './main.css';

const App = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <AssetProvider>
          <Router>
            <Navigation classes={classes} />
            <Route exact path="/" render={() => <PageDashboard classes={classes} />} />
            <Route path="/isa" render={() => <PageISA classes={classes} />} />
            <Route path="/cash" render={() => <PageCash classes={classes} />} />
            <Route path="/crypto" render={() => <PageCrypto classes={classes} />} />
          </Router>
        </AssetProvider>
      </div>
    </>
  )
};

export default App;