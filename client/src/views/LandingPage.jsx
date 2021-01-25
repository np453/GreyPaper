import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import brandlogo from '../assets/brandlogo.svg';

import landingpagewall1 from '../assets/landingpagewall1.png';
import landingpagewall2 from '../assets/landingpagewall2.png';
import landingpagewall3 from '../assets/landingpagewall3.png';

import googlelogo from '../assets/googlelogo.svg';
import fblogo from '../assets/fblogo.svg';

import BottomRow from '../components/bottomRow';

import Slider from "react-slick";
class LandingPage extends Component {

    state = {
        settings: {
            className: "center",
            centerMode: false,
            infinite: true,
            autoplay:true,
            centerPadding: "60px",
            slidesToShow: 2,
            speed: 500,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        },
    }
    handlegooglelogin= async ()=>{
        const data = await axios.get('http://localhost:6161/google/login');
        console.log(data);

    }


    render() {
        return (
            <div className="container-fluid landingpage p-0">
                <div className="row m-0 d-flex justify-content-center">
                    <img src={brandlogo} className="brandlogo img img-fluid" alt=""/>
                </div>
                <div className="container landingpagecontent">
                    <h1 className="text-center">Why design for free <span style={{ fontFamily:"Helvetica" }}>!!</span></h1>
                    <h3 className="text-center">
                        When you can earn<br />something out of it
                    </h3>
                </div>
                <div className="container landingpagewall">
                    <Slider  {...this.state.settings}>
                            <div>
                                <img className="img img-fluid" src={landingpagewall1} />     
                            </div>
                            <div>
                                <img className="img img-fluid" src={landingpagewall2} />     
                            </div>
                            <div>
                                <img className="img img-fluid" src={landingpagewall3} />     
                            </div>
                    </Slider>
                    <h3 className="text-center">start uploading your designs</h3>
                </div>
                    <div className="login-buttons text-center">
                        <a href="http://localhost:6161/google/login"><button className="m-2"><img src={googlelogo} className="m-1 img img-fluid" alt=""/></button></a>
                        <a href="http://localhost:6161/facebook/login"><button className="m-2"><img src={fblogo} className="m-1 img img-fluid" alt=""/></button></a>
                    </div>
                <BottomRow/>
            </div>
        );
    }
}

export default LandingPage;