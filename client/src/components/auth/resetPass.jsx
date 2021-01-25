import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Form from '../../common/Form';

class ResetPass extends Form {
    render() {
        return (
            <div className="container-fluid p-0">
                <div className="signup-form">
                <h3 className="text-center">Reset Password</h3>
                    <div className="row d-flex justify-content-center m-0">
                        <div className="col-md-4">
                            {this.renderInput("password", "password", "password" )}
                            {this.renderInput("cpassword", "Confirm Password", "confirm password" )}
                            {this.renderButton("Submit")} 
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default ResetPass;