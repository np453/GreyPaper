import React from 'react';

const Input = ({ name, label, type, placeholder , error, ...rest }) => {
    return (
        <div className="form-group auth-form-group">
            <label className="d-block" htmlFor={name}>{label}</label>
            <input {...rest} className="auth-input-box" placeholder={placeholder} name={name} type={type} id={name} />
        </div>
    );
}

export default Input;