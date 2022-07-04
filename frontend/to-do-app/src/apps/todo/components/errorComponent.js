import React, { Component } from 'react';

class ErrorComponent extends Component {
    render() {
        return (
            <div className="text-danger">
                <h1>Wrong Url. Error Occured.</h1>
            </div>
        );
    }
}

export default ErrorComponent;