import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import './index.css';
import App from './components/App';
import Register from './components/auth/register'
import * as serviceWorker from './serviceWorker';


const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/register' component={Register} />
        </Switch>
    </Router>
)

ReactDOM.render( <Root /> , document.getElementById('root'));


serviceWorker.register();