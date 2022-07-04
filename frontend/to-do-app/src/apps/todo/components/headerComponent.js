import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationService from '../auth/authenticationService';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        //console.log(isUserLoggedIn);
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {isUserLoggedIn? <li><Link  className="nav-link" to="/welcome/abc">Home</Link></li> : null}
                        {isUserLoggedIn? <li><Link  className="nav-link" to="/todos">To-Do List</Link></li> : null}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn? <li><Link  className="nav-link" to="/login">Login</Link></li> : null}
                        {isUserLoggedIn? <li><Link  className="nav-link" to="/logout" onClick={AuthenticationService.removeLoginInfo}>Logout</Link></li> : null}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent;