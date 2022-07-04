import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WelcomeService from '../api/HelloWorldService';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);

        this.state = {
            welcomeMsg: ""
        }
    }

    retrieveWelcomeMessage() {
        //WelcomeService.executeWelcomeService(this.props.params.name)
        //.then( response => this.handleSuccessfulResponse(response) )
        //.catch( error => this.handleError(error) );
    }

    handleSuccessfulResponse(response) {
        this.setState({
            welcomeMsg:  response.data.message
        })
    }

    handleError(error) {
        let errorMsg = '';
        if(error.message) {
            errorMsg += error.message;
        }
        if(error.response && error.response.data) {
            errorMsg += error.response.data.message;
        }
        this.setState({
            welcomeMsg: errorMsg
        })
    }

    render() {
        return (
            <>
            <h1>Welcome {this.props.params.name} !</h1>
            <div className="container">
                <h3>You can manage your Todos <Link to="/todos">here</Link></h3>
            </div>
            <div className="container">
                Click here
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Mesg</button>
            </div>
            <div className='container'>
                {this.state.welcomeMsg}
            </div>
            </>
        );
    }

}



export default WelcomeComponent;