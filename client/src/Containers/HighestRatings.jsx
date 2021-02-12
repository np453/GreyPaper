import React, { Component } from 'react';
import axios, { base } from '../axios-grey';

//Slider for carousel
import Slider from "react-slick";

class HighestRatings extends Component {

    state = {
        settings: {
            className: "center",
            centerMode: true,
            // infinite: true,
            autoplay:true,
            centerPadding: "60px",
            slidesToShow: 4,
            speed: 500,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
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
        HighestRatings : []
    }

    componentDidMount = async() => {
        const { data : HighestRatings } = await axios.get(base + 'highest-rating');
        console.log(HighestRatings)
        this.setState({ HighestRatings })
    }
    

    render() {
        return (
            <div className="highest-rating-container container-fluid mx-auto p-0">
                <h5 className="text-center">Wallarts with highest ratings</h5>
                <Slider ref={c => (this.slider = c)} {...this.state.settings } afterChange={this.nextClick}>
                    {this.state.HighestRatings.map((m, id) => 
                        <div className="highest-rating-image-wrapper d-flex justify-content-center">
                          <img id={id} onClick={ this.ImageInFocus } className="highest-rating-image" src={base + 'highest-rating/' + m.fileRoute} alt=""/>
                        </div>    
                    )}
                </Slider>
                <h6 className="text-center shop-link">
                    Shop now &nbsp;
                    <svg className="" width="6" height="11" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.705541" y1="0.952964" x2="6.23868" y2="5.79446" stroke="#2A62B5" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="6.28516" y1="6.42" x2="0.706549" y2="11.9986" stroke="#2A62B5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </h6>
            </div>
        );
    }
}

export default HighestRatings;