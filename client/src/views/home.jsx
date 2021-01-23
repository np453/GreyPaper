import React, { Component } from 'react';
import axios from 'axios';

//importing brandlogo
import brandlogo from '../assets/brandlogo.svg';
class Homepage extends Component {


    state = {
        data : {
            email:""
        },
        dataIsValid:true
    }
    
    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, dataIsValid:true });
    };

    handleSubmit = async(e) => {
        e.preventDefault();
        if (this.state.data.email.length === 0) {
          return this.setState({ dataIsValid : false })
        }
        if (!this.state.data.email.includes("@")) {
            return this.setState({ dataIsValid : false })
          }
        const payload = {
            email : this.state.email
        }

        const { data:resp } = axios.post('/subscriber-list', payload);
        console.log(resp)
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <img src={brandlogo} className="brandlogo img img-fluid" alt=""/>
                    </div>
                    <div className="subscriber-list-form form">
                        <h1 className="main-heading text-center">
                            Our store will be<br />live after feb !!
                        </h1>
                        <h3 className="text-center">
                            Keep the patience going and subscribe 
                            to the mailing list to get 30% off on exculsive 
                            canvas wallarts and posters 
                            <svg className="pl-2" width="29" height="29" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)">
                                <path d="M12.8033 2.19671C11.3867 0.78014 9.50331 0 7.49999 0C5.49666 0 3.61326 0.78014 2.19671 2.19671C0.780169 3.61329 0 5.49666 0 7.50001C0 9.50333 0.78014 11.3867 2.19671 12.8033C3.61329 14.2199 5.49669 15 7.50001 15C9.50333 15 11.3867 14.2199 12.8033 12.8033C14.2199 11.3867 15 9.50333 15 7.50001C15 5.49666 14.2199 3.61326 12.8033 2.19671V2.19671ZM12.1818 12.1818C10.9312 13.4323 9.26854 14.121 7.49999 14.121C5.73143 14.121 4.06875 13.4323 2.81818 12.1818C1.56766 10.9312 0.878932 9.26854 0.878932 7.50001C0.878932 5.73149 1.56766 4.06875 2.81821 2.81821C4.06875 1.56763 5.73146 0.878932 7.49999 0.878932C9.26851 0.878932 10.9312 1.56763 12.1818 2.81821C13.4323 4.06875 14.121 5.73146 14.121 7.50001C14.121 9.26857 13.4323 10.9312 12.1818 12.1818V12.1818Z"
                                 fill="#444"/>
                                <path d="M4.8352 7.39306C5.66942 7.39306 6.34814 6.71435 6.34814 5.88012C6.34814 5.0459 5.66942 4.36719 4.8352 4.36719C4.00098 4.36719 3.32227 5.0459 3.32227 5.88012C3.32227 6.71435 4.00098 7.39306 4.8352 7.39306V7.39306ZM4.8352 5.24615C5.18478 5.24615 5.4692 5.53057 5.4692 5.88015C5.4692 6.22973 5.18478 6.51415 4.8352 6.51415C4.48562 6.51415 4.2012 6.22973 4.2012 5.88015C4.2012 5.53057 4.48562 5.24615 4.8352 5.24615V5.24615Z"
                                 fill="#444"/>
                                <path d="M11.5274 8.66537C11.3026 8.57384 11.0462 8.68189 10.9546 8.9067C10.3657 10.3535 9.01194 11.2883 7.50586 11.2883C5.99978 11.2883 4.64605 10.3535 4.05707 8.9067C3.96555 8.68189 3.7091 8.5739 3.48433 8.66537C3.25953 8.7569 3.15148 9.01331 3.24301 9.23811C3.96739 11.0175 5.64068 12.1673 7.50586 12.1673C9.37104 12.1673 11.0443 11.0175 11.7687 9.23811C11.8602 9.01331 11.7522 8.7569 11.5274 8.66537Z"
                                 fill="#444"/>
                                <path d="M8.57032 6.28204L10.4935 7.39239C10.5627 7.43235 10.6383 7.45134 10.7128 7.45134C10.8647 7.45134 11.0124 7.37253 11.0938 7.23155C11.2152 7.02136 11.1432 6.75259 10.933 6.63123L9.66898 5.90146L10.933 5.17168C11.1432 5.05033 11.2152 4.78155 11.0938 4.57137C10.9725 4.36119 10.7037 4.28914 10.4935 4.41052L8.57032 5.52088C8.43435 5.59937 8.35059 5.74445 8.35059 5.90146C8.35059 6.05846 8.43435 6.20355 8.57032 6.28204V6.28204Z"
                                 fill="#444"/>
                                </g>
                                <defs>
                                <clipPath id="clip0">
                                <rect width="15" height="15" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </h3>
                        <div className="email-input form-group justify-content-center mx-auto col-md-4 d-flex flex-column">
                            <input name="email" id="email" value={this.state.data.email} onChange={this.handleChange} placeholder="email" type="email"/>
                            {this.state.dataIsValid===false ? <span>please enter a valid data</span> : null }
                            <button onClick={this.handleSubmit}>Submit</button>
                        </div>

                        <div className="mx-auto col-md-5">
                            <div className="socialmedia-tag">
                                <h5>Send us your designs by tagging us in instagram</h5>
                                <h6><span>#greypaperofficial</span></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;