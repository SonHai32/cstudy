import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import Register from './components/auth/register'
import Login from './components/auth/login'
import * as serviceWorker from './serviceWorker';


const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
        </Switch>
    </Router>
)

ReactDOM.render( <Root /> , document.getElementById('root'));


serviceWorker.register();