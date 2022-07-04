import React, { Component } from 'react';
import AuthenticationService from '../auth/authenticationService';
import { Row, Col } from 'react-bootstrap';
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isLoginFailed: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        //console.log(this.state);
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    loginClicked() {
        /* basic authentication
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(
            () => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.navigate(`/welcome/${this.state.username}`);
            }
        )
        .catch(
            () => {
                this.setState({ showSuccessMessage: false });
                this.setState({ isLoginFailed: true });
            }
        )*/ 
        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then(
            (response) => {
                console.log(response);
                AuthenticationService.registerSuccessfulLoginForJWT(this.state.username, response.data.token);
                this.props.navigate(`/welcome/${this.state.username}`);
            }
        )
        .catch(
            () => {
                this.setState({ showSuccessMessage: false });
                this.setState({ isLoginFailed: true });
            }
        )

    }

    render() {
        return (
            <>
            <h1>Login</h1>
            <div className="container">
                {this.state.isLoginFailed? <div className='alert alert-warning'>Invalid Credential</div> : null}
            </div>

            <div className="col-xs-3">
                <Row>
                <Col>
                <h5>User Name: </h5>
                <input className="col-xs-3" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>

                <h5>Password: </h5>
                <input className="col-xs-3" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                </Col>
                </Row>
            </div>
            <Row><Col></Col></Row>
            <Row>
                <Col>
                <button className="btn btn-success position-absolute top-50 start-50 translate-middle" onClick={this.loginClicked}>
                    Login
                </button>
                </Col>
            </Row>
            </>
        )
    }
}

export default LoginComponent;