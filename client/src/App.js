import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import LandingPage from './components/view/LandingPage/LandingPage'
import LoginPage from './components/view/LoginPage/LoginPage'
import RegisterPage from './components/view/RegisterPage/RegisterPage'

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
                </Switch>
            </div>
        </Router>
    )
};  

export default App
