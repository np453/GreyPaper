import React, { Component } from 'react';

import Input from '../../common/authInputs';
import Form from '../../common/Form';

import googlelogo from '../../assets/googlelogo.svg';
import fblogo from '../../assets/fblogo.svg';

import { Link } from 'react-router-dom';

class Signup extends Form {

    state = {
        data : {
            name:"",
            email:"",
            password:""
        }
    }
    
    render() {
        console.log(this.state.data)
        return (
            <div className="container-fluid p-0">
                <div className="signup-form">
                <h3 className="text-center">Signup</h3>
                <div className="login-buttons text-center">
                    <button className="m-2"><img src={googlelogo} className="m-1 img img-fluid" alt=""/></button>
                    <button className="m-2"><img src={fblogo} className="m-1 img img-fluid" alt=""/></button>
                </div>
                <h6 className="text-center m-4">
                <svg width="135" height="18" viewBox="0 0 135 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.7998 12.1572C59.7998 11.2256 59.9814 10.3877 60.3447 9.64355C60.7139 8.89941 61.2236 8.3252 61.874 7.9209C62.5303 7.5166 63.2773 7.31445 64.1152 7.31445C65.4102 7.31445 66.4561 7.7627 67.2529 8.65918C68.0557 9.55566 68.457 10.748 68.457 12.2363V12.3506C68.457 13.2764 68.2783 14.1084 67.9209 14.8467C67.5693 15.5791 67.0625 16.1504 66.4004 16.5605C65.7441 16.9707 64.9883 17.1758 64.1328 17.1758C62.8438 17.1758 61.7979 16.7275 60.9951 15.8311C60.1982 14.9346 59.7998 13.748 59.7998 12.2715V12.1572ZM61.4346 12.3506C61.4346 13.4053 61.6777 14.252 62.1641 14.8906C62.6562 15.5293 63.3125 15.8486 64.1328 15.8486C64.959 15.8486 65.6152 15.5264 66.1016 14.8818C66.5879 14.2314 66.8311 13.3232 66.8311 12.1572C66.8311 11.1143 66.582 10.2705 66.084 9.62598C65.5918 8.97559 64.9355 8.65039 64.1152 8.65039C63.3125 8.65039 62.665 8.96973 62.1729 9.6084C61.6807 10.2471 61.4346 11.1611 61.4346 12.3506ZM75.0928 8.94922C74.8467 8.9082 74.5801 8.8877 74.293 8.8877C73.2266 8.8877 72.5029 9.3418 72.1221 10.25V17H70.4961V7.49023H72.0781L72.1045 8.58887C72.6377 7.73926 73.3936 7.31445 74.3721 7.31445C74.6885 7.31445 74.9287 7.35547 75.0928 7.4375V8.94922Z" fill="#939393"/>
                    <line x1="83" y1="12.5" x2="134.01" y2="12.5" stroke="#7D7D7D"/>
                    <line y1="12.5" x2="51.0098" y2="12.5" stroke="#7D7D7D"/>
                </svg>

                </h6>
                    <div className="row d-flex justify-content-center m-0">
                        <div className="col-md-4">
                            {this.renderInput("name", "Name", "name" )}
                            {this.renderInput("email", "email", "email" )}
                            {this.renderInput("password", "password", "password" )}
                            {this.renderInput("phn", "Phone Number", "phone number" )}
                            {this.renderInput("cpassword", "confirm password", "confirm password" )}   
                            {this.renderButton("Signup")} 
                            
                            <h6>If you have an account <Link to="/login">login</Link></h6>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default Signup;