import React, { Component } from 'react';
import axios, { base } from '../axios-grey';

//Slider for carousel
import Slider from "react-slick";


class Carousel extends Component {

    state = {
        Carousel : [],
        settings: {
            className: "center",
            centerMode: false,
            infinite: true,
            autoplay:true,
            centerPadding: "60px",
            slidesToShow: 1,
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
        }
    }

    componentDidMount = async() => {
        const { data : bannerCarousel } = await axios.get(base + 'banner-carousel');
        console.log(bannerCarousel)
        this.setState({ Carousel : bannerCarousel })
    }
    
    
    render() {
        return (
            <div className="container-fluid m-0 p-0">
                <Slider  {...this.state.settings}>
                    {this.state.Carousel.map(m => 
                        <div className="banner-carousel-image-wrapper">
                          <div className="top-shadow" />
                          <img className="banner-carousel-image" src={base + 'banner-carousel/' + m.fileRoute} alt=""/>
                          <div className="bottom-shadow" />
                        </div>    
                    )}
                </Slider>
            </div>
        );
    }
}

export default Carousel;