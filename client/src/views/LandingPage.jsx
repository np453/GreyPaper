import React, { Component } from 'react';

import axios from 'axios';
import { base } from '../base';
import { Link } from 'react-router-dom';
import brandlogo from '../assets/brandlogo.svg';

import googlelogo from '../assets/googlelogo.svg';
import fblogo from '../assets/fblogo.svg';

import BottomRow from '../components/bottomRow';

import Slider from "react-slick";

import Dropdown from '../common/Dropdown';

//styled components
import Styled from 'styled-components';

//import design card
import DesignCard from '../common/designCard';

import Navbar from '../components/navbar';
import { stat } from 'fs';

import Carousel from '../Containers/Carousel';
import CreatorSpecial from '../Containers/CreatorSpecial';
import HighestRatings from '../Containers/HighestRatings';
import ProductQualitySection from '../Containers/ProductQualitySection';
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
        hamBurgerWidth: "-300px",
        showAllCategories : false,
        searchQuery : ""
    }

    handlegooglelogin= async ()=>{
        const data = await axios.get(base + 'google/login');
        console.log(data);

    }

    toggleHamBurger = e => {
        this.setState({ hamBurgerWidth : "0px" })
    }

    search = ({ currentTarget : input }) => {
        const value = input.value;
        this.setState({ searchQuery : value });
    }

    handleClickOutside = e => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.setState({hamBurgerWidth : "-300px"})
        }
    };

    handleClickDropDownOutside = e => {
        if (this.ref1.current && !this.ref1.current.contains(e.target)) {
            this.setState({showAllCategories : false})
        }
    };

    openCategories = () => {
        let categoryState = this.state.showAllCategories;
        categoryState === false ? this.setState({ showAllCategories : true }) : this.setState({ showAllCategories : false }) 
    }

    componentDidMount = async() => {
        document.addEventListener('click', this.handleClickOutside, true);
        document.addEventListener('click', this.handleClickDropDownOutside, true);
    }
    

    ref = React.createRef();
    ref1 = React.createRef();

    render() {

        document.body.style.overflow = this.state.hamBurgerWidth !== "-300px" ? "hidden" : "visible"

        const categories = 
        <div ref={this.ref1} className="categories-list">
            <ul>
                <li>Food</li>
                <li>Sports</li>
                <li>Automotive</li>
                <li>Motivational</li>
                <li>Abstracts</li>
            </ul>
        </div>
        console.log(this.state.searchQuery)
        return (
            <div className="container-fluid landingpage p-0">

            {/* Sidebar */}
            <ul ref={this.ref} className="sideBar p-0" style={{ right:`${this.state.hamBurgerWidth}`, width: `300px`, height:"100%",  }}>
                <h1>Sidebar</h1>
            </ul>

                <nav className="shadow-sm navbar navbar-expand-lg">

                    <div className="navbar-brand">
                        <img src={brandlogo} style={{ pointerEvents:"none" }} alt=""/>
                    </div>

                    <div className="row m-0 w-100">
                        <div className="col-md-12 s-bar-wrapper d-flex justify-content-center align-items-center">
                            <input value={this.state.searchQuery} name="search" id="search" onChange={this.search} placeholder="Search for product name / category" className="s-bar" type="text"/>
                            <div className="all-categories-wrapper">
                                <span onClick={this.openCategories} className="all-categories">Category <i className="fa fa-caret-down" /></span>
                                {this.state.showAllCategories && categories}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 login-button">
                        <h6 className="mb-0">Login</h6>
                    </div>
                    <div onClick={this.toggleHamBurger} className="hamBurger-Open-Icon p-2">
                        <div className="">
                            <span class="icon-bar top-bar" style={{ height: "0.2rem" }}></span>
                            <span class="icon-bar middle-bar" style={{ height: "0.2rem" }}></span>
                            <span class="icon-bar bottom-bar" style={{ height: "0.2rem" }}></span>
                        </div>
                    </div>
                </nav>

                <Carousel />
                <CreatorSpecial/>
                <HighestRatings/>
                <ProductQualitySection/>
                {/* <div className="container landingpagewall">
                <h3 className="text-center">
                    Start uploading your designs
                </h3> 
                </div>
                <div className="login-buttons text-center">
                    <a href={base + "google/login"}><button className="m-2"><img src={googlelogo} className="m-1 img img-fluid" alt=""/></button></a>
                    <a href={base + "facebook/login"}><button className="m-2"><img src={fblogo} className="m-1 img img-fluid" alt=""/></button></a>
                </div> */}

                {/* <BottomRow/> */}
            </div>
        );
    }
}

export default LandingPage;