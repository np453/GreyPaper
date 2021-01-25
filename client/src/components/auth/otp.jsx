import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Form from '../../common/Form';

class Otp extends Form {
    render() {
        return (
            <div className="container-fluid p-0">
                <div className="signup-form">
                <h3 className="text-center">Enter Otp</h3>
                    <div className="row d-flex justify-content-center m-0">
                        <div className="col-md-4">
                            {this.renderInput("otp", "Otp", "enter otp" )}
                            {this.renderButton("Submit")} 
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default Otp;