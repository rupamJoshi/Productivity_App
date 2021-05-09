import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Headers from './layout/Headers'
import Dashboard from './Tasks/dashboard';
import {Provider} from 'react-redux';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import Login from "./Users/login";
import Register from "./Users/addUserForm";
import PrivateRoute from "./comman/PrivateRoutes";
import store from '../store';
import { loadUser } from '../actions/auth_actions';
//Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                <Fragment>
                    <Headers/>
                    <div className="container">
                        <Switch>
                            <PrivateRoute exact path="/" component={ Dashboard}/>
                            <Route exact path="/register" component={ Register }/>
                            <Route exact path="/login" component={ Login} />
                        </Switch>
                    </div>
                </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));