import React, { Component } from 'react';
import axios from 'axios';

class BottomRow extends Component {

    state = {
        data : {
            email:"",
        },
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
            email : this.state.data.email
        }

        const data = await axios.post('/subscribers-list', payload);

        if (data.data === "Email registered!!") this.setState({ showMessage : true })
        else if ( data.data === "Email already exists" ) this.setState({ emailExist : true })
        
    }
    render() {
        return (
            <div className="mt-5">
                <div className="row m-0 d-flex justify-content-around form-bottom-row">
                    <div className="col-md-6">
                        <div className="email-input form-group justify-content-center mx-auto col-md-10 d-flex flex-column">
                        <h5  className="text-center h5-2">
                            Keep the patience going and subscribe, to get a 30% discount on posters and canvas!!
                        </h5>
                        {this.state.showMessage && 
                        <p className="success-message" style={{ color:"#4B8039", border:"2px solid #64C67A", borderRadius:"3.5px" , backgroundColor:"#C5EDCE" }} className="p-2 mt-3 text-center">
                                <div>Email registered!!
                                    <i style={{ backgroundColor:"#87CE81" }} onClick={() => this.setState({ showMessage : false })} className="fa fa-times fa-times-" aria-hidden="true"></i>
                                </div>
                            </p>}
                            {this.state.emailExist && 
                            <p className="error-message" style={{ color:"#931C1C", border:"2px solid #D44343", borderRadius:"3.5px" , backgroundColor:"#E46D65" }} className="p-2 mt-3 text-center">
                                <div>Email already registered
                                    <i style={{ backgroundColor:"#D45454" }} onClick={() => this.setState({ emailExist:false })} className="fa fa-times fa-times-" aria-hidden="true"></i>
                                </div>
                            </p>}
                            <input name="email" id="email" value={this.state.data.email} onChange={this.handleChange} placeholder="email" type="email"/>
                            {this.state.dataIsValid===false ? <span style={{ color:"#44A3B8" }}>please enter a valid email</span> : null }
                            <button onClick={this.handleSubmit}>Submit</button>
                        </div>
                            </div>

                            <div className="col-md-4">
                                <div className="mx-auto mt-4">
                                    <div className="socialmedia-tag">
                                        <h5 className="socialmediah5-1">Send us your designs by tagging us in instagram</h5>
                                        <h6><span>#greypaperofficial</span></h6>
                                    </div>
                                </div>

                            </div>
                        </div>    
            </div>
        );
    }
}

export default BottomRow;