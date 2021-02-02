import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import { base } from '../base';

//import cookie
import Cookies from 'js-cookie';

//importing brandlogo
import brandlogo from '../assets/brandlogo.svg';
import uploadbutton from '../assets/upload-button.svg';

//navbar
import Navbar from '../components/navbar';

//using pug in react
//https://github.com/pugjs/babel-plugin-transform-react-pug#syntax
class Homepage extends Component {


    state = {
        data : {
            email:"",
            file:null,
            fileUrl:""
        },
        userid:"",
        user : [],
        showMessage:false,
        emailExist : false,
        dataIsValid:true,
        dashboardState : "dashboard-sidebar-open",
        dashboardContentState : "dashboard-content-when-sidebar-open",
    }
    
    
    handleChange = ({currentTarget:input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.name === 'file'){
            data[input.name] = input.files[0]
            // data["fileUrl"] = URL.createObjectURL(input.files[0])
        }
        this.setState({ data, dataIsValid:true });
    };

     componentDidMount = async() => {

         //get user id
         const senduser = Cookies.get("user") === undefined ? "undefined" : Cookies.get("user");
         await this.setState({userid:senduser.slice(3, senduser.length-1)})

         //get user
         const { data : user } = await axios.get(base + `get-user/` + this.state.userid);
         this.setState({ user });
         if(Cookies.get("user") === undefined){
            await axios.get(base + 'logout');
            console.log("it runs")
            Redirect();
        }
     }
     

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

        e.preventDefault();

        const data = new FormData();

        data.append('_id', this.state.userid);
        data.append('file', this.state.data.file)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const { data:resp } = await axios.post(base + "designupload/", data, config)
        console.log(resp);
    }

    resetFileInput = e => {
        e.target.value = null;
        this.setState({ data : { file : null } })
    }

    closeDashBoardSideBar = () => {

        //if sidebar is open then close it else if it is closed then open it
        this.state.dashboardState === "dashboard-sidebar-open" ?  
        this.setState({ dashboardState:"dashboard-sidebar-close" }) :
        this.setState({ dashboardState:"dashboard-sidebar-open" })

        //if sidebar is close then shift the content to left else keep it as it is
        this.state.dashboardContentState === "dashboard-content-when-sidebar-open" ?
         this.setState({ dashboardContentState:"dashboard-content-when-sidebar-close" }) :
         this.setState({ dashboardContentState:"dashboard-content-when-sidebar-open" })
    }

    applyFilter = async() => {

        const payload = new FormData();        
        payload.append('file', this.state.data.file);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };

        const {data : res} = await axios.post(base + 'upload/', payload, config)

        // if (res.status === 200) console.log("image upload works!!") 
        // else {
        //     console.log("image upload failed !!", res.status)
        // }
        console.log(res)
    }

    render() {
        const imageIsPresent = this.state.data.file != null ? true : false;
        console.log(this.state.data.file)
        const username = this.state.user === undefined ? null : this.state.user.uname
        const userimage = this.state.user === undefined ? null : this.state.user.profileImg

        if(Cookies.get("user") === undefined){
            return <Redirect to="/" />
        }

        const name = this.state.data.file === null ? [] : this.state.data.file.name

        return (

            <div className="">
                <Navbar
                    sidebarBackground="#333" 
                    sideBarItems={this.state.sideBarItems} 
                    navLinks={this.navLinks} 
                    brand=""
                    navBrandLogo={brandlogo}
                    navbarColor="#fff" 
                    navbarBrandColor="#fff"
                    linkColor="#555"
                    linkOpacity="1"
                    user = {username}
                    userimage = {userimage}
                />
                <div style={{ backgroundColor:"#FAFAFA" }} className="row dashboard m-0">
                <div className={'col-md-2 dashboard-sidebar '+this.state.dashboardState}>
                    <div className="dashboard-file-upload text-center">
                        <label htmlFor="file" className="mt-3 file-upload-button"><img className="mr-1" src={uploadbutton} style={{ width:"23px" }} alt=""/>upload</label>
                        <input enctype="multipart/form-data" onChange={this.handleChange} name="file" id="file" className="file-upload" hidden type="file"/>
                    </div>
                    <ul>
                        <li>Recent Uploads</li>
                        <li>top designs</li>
                        <li>visit gallery</li>
                        <li>view saved items</li>
                    </ul>
                        <button onClick={this.closeDashBoardSideBar} className="hamBurger p-2">
                            <div className="">
                                <span class="icon-bar top-bar" style={{ height: "0.25rem" }}></span>
                                <span class="icon-bar middle-bar" style={{ height: "0.25rem" }}></span>
                                <span class="icon-bar bottom-bar" style={{ height: "0.25rem" }}></span>
                            </div>
                        </button>
                </div>
                <div className={'dashboard-content '+this.state.dashboardContentState}>

                    {imageIsPresent && <div className="d-flex filters-for-image-uploaded">
                        <span>Blur</span>
                        <span>Implode</span>
                        <span>Contrast</span>
                        <span>colorize</span>
                        <span>equalize</span>
                        <span onClick={this.applyFilter}>sepia</span>
                        <span>swirl</span>
                        <span>rotate</span>
                        <span>rotate-edge</span>
                        <span>flip-rotate-edge</span>
                    </div>
                    }

                    {/* Image */}
                    <div style={{ display:imageIsPresent === false ? "none" : null }}>
                        <div className="dashboard-image-showcase-section">
                            <div className="image-wrapper">
                                <img className=" img-fluid img dashboard-uploaded-design" src={this.state.data.fileUrl} alt=""/>
                                
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="image-effects-final-to-submit">Save changes</button>
                        </div>
                    </div> 
                </div>
                </div>
                <figure class="bg-gray-100 rounded-xl p-8">
                    <img class="w-32 h-32 rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512" />
                    <div class="pt-6 space-y-4">
                        <blockquote>
                        <p class="text-lg font-semibold">
                            “Tailwind CSS is the only framework that I've seen scale
                            on large teams. It’s easy to customize, adapts to any design,
                            and the build size is tiny.”
                        </p>
                        </blockquote>
                        <figcaption class="font-medium">
                        <div class="text-cyan-600">
                            Sarah Dayan
                        </div>
                        </figcaption>
                    </div>
                    </figure>    
                {/* <div className="container">
                        <h1 className="mb-5 mt-5 main-heading text-center">
                            It’s design<br />time !!
                            <i className="fa fa-heart fa-heart-1" aria-hidden="true"></i>
                            <i className="fa fa-heart fa-heart-2" aria-hidden="true"></i>
                            <i className="fa fa-heart fa-heart-3" aria-hidden="true"></i>
                        </h1>
                    <div className="subscriber-list-form form">
                        <div className="d-flex justify-content-center">
                            <img src={homepage_cat} className="homepage_cat img img-fluid" alt=""/>
                        </div>
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
                </div> */}
            </div>
        );
    }
}

export default Homepage;