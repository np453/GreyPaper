import React, { Component } from 'react';
import axios from 'axios';

//importing brandlogo
import brandlogo from '../assets/brandlogo.svg';
import homepage_cat from '../assets/homePage_cat.svg';
import uploadbutton from '../assets/upload-button.svg';
class Homepage extends Component {


    state = {
        data : {
            email:"",
            file:null
        },
        showMessage:false,
        emailExist : false,
        dataIsValid:true
    }
    
    componentDidMount= async ()=> {
        const data=await axios.get('http://localhost:6161/test');
        console.log(data);
    }
    
    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.name === 'file')data[input.name] = input.files[0]
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

    handleDesignFormSubmit = async(e) => {

        const data = new FormData();
        
        data.append('_id', "601123f866972b5550a7709a");
        data.append('file', this.state.data.file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const { data:resp } = await axios.post("http://localhost:6161/designupload/", data, config)
        console.log(resp);
    }

    resetFileInput = e => {
        e.target.value = null;
        this.setState({ data : { file : null } })
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <img src={brandlogo} className="brandlogo img img-fluid" alt=""/>
                    </div>
                        <h1 className="mb-5 main-heading text-center">
                            It’s design<br />time !!
                            <i className="fa fa-heart fa-heart-1" aria-hidden="true"></i>
                            <i className="fa fa-heart fa-heart-2" aria-hidden="true"></i>
                            <i className="fa fa-heart fa-heart-3" aria-hidden="true"></i>
                        </h1>
                    <div className="subscriber-list-form form">
                        <div className="d-flex justify-content-center">
                            <img src={homepage_cat} className="homepage_cat img img-fluid" alt=""/>
                        </div>
                        <h3 className="text-center">
                            We’re building up the store for you !!
                        </h3>
                        <h5 className="text-center h5-1">
                            By the time, upload your best designs over here.<br />
                            We’ll showcase you in our products.
                        </h5>
                        <h5  className="text-center h5-2">
                            Best designs will receive a heavy discount on products
                        </h5>
                        <div className="d-flex justify-content-center flex-column design-upload-section">
                        <div className="file-upload-wrapper">
                            <div className="p-1" style={{ border:"3px dashed #C247BD" }}>
                                <label htmlFor="file">
                                    <img className="upload-button" src={uploadbutton} alt=""/>
                                </label>
                                <input onChange={this.handleChange} name="file" id="file" className="file-upload" hidden type="file"/>
                            </div>
                        </div>
                        <button onClick={this.handleDesignFormSubmit} className="design-upload-form-button">Submit</button>
                        </div>
                        <div className="d-flex justify-content-center flex-column uploaded-files">
                            {this.state.data.file != null && <h6 className="text-center">Uploaded files</h6>}
                            {this.state.data.file != null && 
                                <span style={{ position:"relative", backgroundColor:"#BCE4C5" }} className="d-flex align-items-center p-1 rounded mx-auto text-center">
                                    <span>{this.state.data.file.name}</span>
                                    <i style={{ backgroundColor:"#96CE91" }} onClick={e => this.resetFileInput(e)} className="justify-content-end fa ml-2 mr-1 p-2 fa-times" aria-hidden="true"></i>
                                </span>
                            }
                        </div>

                        <div className="row m-0 form-bottom-row">

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

                            <div className="col-md-5">

                                <div className="mx-auto mt-4">
                                    <div className="socialmedia-tag">
                                        <h5 className="socialmediah5-1">Send us your designs by tagging us in instagram</h5>
                                        <h6><span>#greypaperofficial</span></h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;