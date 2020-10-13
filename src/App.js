import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
// Pages
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact/>
        <Route render={() => "404"} />
      </Switch>
    </Router>
  );
}

export default App;
