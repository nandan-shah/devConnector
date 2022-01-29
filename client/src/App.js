import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import AllRoutes from './components/routing/AllRoutes';
//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Routes>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={AllRoutes} />
          </Switch>
        </Fragment>
      </Routes>
    </Provider>
  );
}

export default App;
