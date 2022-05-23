import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import App from './App';
import FormList from './pages/FormList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import FormCreate from './pages/FormCreate';
import Form from './pages/Form';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/test" component={App}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/" component={FormList}/>
          <Route exact path="/form/add" component={FormCreate}/>
          <Route exact path="/form/:formId" component={Form}/>
          {/* 
          <Route exact path="/users/signup" component={SignUp}/>
          <Route exact path="/users/login" component={Login}/>
          */}
        </Switch>
      </Router>
    )
  }
}

export default Routes;