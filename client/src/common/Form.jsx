import React, { Component } from 'react';
import axios from 'axios';

import Input from './authInputs';

class Form extends Component {

    state = {
        data:{},
        errors:{}
    }
    handleSubmit = e => {
        e.preventDefault();
        this.doSubmit();
    };

    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.name === 'file')data[input.name] = input.files[0]
        this.setState({ data, dataIsValid:true });
    };

    renderInput(name, label, placeholder , type="text") {
        const { data, errors } = this.state;
        return (
                <Input
                name={name}
                label={label}
                placeholder={placeholder}
                value={data[name]}
                id={name}
                type={type}
                onChange={this.handleChange}
                /> 
            );
    };

    renderButton = buttonName => {
        return (
                <div className="text-center">
                    <button className="auth-button">{buttonName}</button>
                </div>
            );
    }

    resetUserInputs = () => {
        this.setState({
          data:{
            name:"",
            email:""
          },
          errors:{}
        });
    };

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Form;