import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import './index.css';
import App from './components/App';
import Register from './components/auth/register'
import Login from './components/auth/login'
import * as serviceWorker from './serviceWorker';
import firebase from './firebase'
import  rootReducer from './reducers'
import {setUser, clearUser} from './actions'

const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component{

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.props.setUser(user)
                this.props.history.push("/")
            }else{
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    }


    render(){
        return(
          
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
            </Switch>

        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
})


const RootWithAuth = withRouter(connect(null,{setUser,clearUser})(Root))

ReactDOM.render( 
    <Provider store={store}>
    <Router>
        <RootWithAuth />
    </Router>
    </Provider>
    , document.getElementById('root'));


serviceWorker.register();