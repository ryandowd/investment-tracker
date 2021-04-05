import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import PageDashboard from './components/Pages/PageDashboard';
import PageSnapshots from './components/Pages/PageSnapshots';
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
            <Navigation />
            <Route exact path="/" render={() => <PageDashboard />} />
            <Route exact path="/snapshots" render={() => <PageSnapshots />} />
            <Route exact path="/isa" render={() => <PageISA />} />
            <Route exact path="/cash" render={() => <PageCash />} />
            <Route exact path="/crypto" render={() => <PageCrypto />} />
          </Router>
        </AssetProvider>
      </div>
    </>
  )
};

export default App;