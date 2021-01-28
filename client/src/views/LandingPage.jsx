import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import brandlogo from '../assets/brandlogo.svg';

import landingpagewall1 from '../assets/landingpagewall1.png';
import landingpagewall2 from '../assets/landingpagewall2.png';
import landingpagewall3 from '../assets/landingpagewall3.png';
import landingpagewall4 from '../assets/landingpagewall4.png';
import landingpagewall5 from '../assets/landingpagewall5.png';

import googlelogo from '../assets/googlelogo.svg';
import fblogo from '../assets/fblogo.svg';

import BottomRow from '../components/bottomRow';

import Slider from "react-slick";

//import design card
import DesignCard from '../common/designCard';
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
        const data = await axios.get('http://greypaper.in/google/login');
        console.log(data);

    }


    render() {
        return (
            <div className="container-fluid landingpage p-0">
                <div className="row m-0 d-flex justify-content-center">
                    <img style={{ pointerEvents:"none" }} src={brandlogo} className="brandlogo img img-fluid" alt=""/>
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
                            <div>
                                <img className="img img-fluid" src={landingpagewall4} />     
                            </div>
                            <div>
                                <img className="img img-fluid" src={landingpagewall5} />     
                            </div>
                    </Slider>
                    {/* <div className="landingpagecontent">
                    <h3 className="text-center">
                        We're building up the interface, which will be in service shortly!
                    </h3>
                    <h3 className="text-center mb-5">
                        Soon, You'll be able to showcase your designs and participate in design events
                    </h3>
                    </div> */}
                    <h3 className="text-center">
                        Start uploading your designs
                    </h3>
                </div>
                    <div className="login-buttons text-center">
                        <a href="http://greypaper.in/google/login"><button className="m-2"><img src={googlelogo} className="m-1 img img-fluid" alt=""/></button></a>
                        <a href="http://greypaper.in/facebook/login"><button className="m-2"><img src={fblogo} className="m-1 img img-fluid" alt=""/></button></a>
                    </div>

                    <h2 className="text-center">Awesome Designs!!</h2>
                    <div className="row designs-area m-0">
                        <div className="col-md-3 design-card">
                            <DesignCard image={landingpagewall1} title="Image1" by="Devang Singh" instaid="dev__ang"/>
                        </div>
                    </div>
                <BottomRow/>
            </div>
        );
    }
}

export default LandingPage;