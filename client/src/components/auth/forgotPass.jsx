import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Form from '../../common/Form';

class ForgotPass extends Form {
    render() {
        return (
            <div className="container-fluid p-0">
                <div className="signup-form">
                <h3 className="text-center">Forgot Password</h3>
                <h6 className="text-center" style={{ color:"#3597B6" }}>You will receive an otp in your email</h6>
                    <div className="row d-flex justify-content-center m-0">
                        <div className="col-md-4">
                            {this.renderInput("email", "Email", "email id" )}
                            {this.renderButton("send otp")} 
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default ForgotPass;