import React, { Component } from 'react';
import axios, { base } from '../axios-grey';

//Slider for carousel
import Slider from "react-slick";


class CreatorSpecial extends Component {

    state = {
        creatorSpecial : [],
        currentSlide : 0,
        settings: {
            className: "center",
            centerMode: true,
            // infinite: true,
            autoplay:true,
            centerPadding: "60px",
            slidesToShow: 3,
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
                    slidesToShow: 2,
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
        const { data : creatorSpecial } = await axios.get(base + 'creator-special');
        console.log(creatorSpecial)
        this.setState({ creatorSpecial })
    }

    timeout = delay => {
        return new Promise( res => setTimeout(res, delay) );
    }

    ImageInFocus = async(e) => {

        //image which is clicked
        console.log(this.state.currentSlide, parseInt(e.target.id))
        if (this.state.currentSlide === this.state.creatorSpecial.length - 1 && parseInt(e.target.id) === 0) {
            
             this.slider.slickNext()
        }
        if (this.state.currentSlide === 0 && parseInt(e.target.id) ===  this.state.creatorSpecial.length - 1) {
            
            this.slider.slickPrev()
       }
        else if (e.target.id > this.state.currentSlide) {
           return this.slider.slickNext()
        }
        else if (e.target.id < this.state.currentSlide) {
           return this.slider.slickPrev()
        }
        
    }

    nextClick = e => {
        this.setState({ currentSlide : e })
    }
    
    render() {
        return (
            <div className="creator-special-container container mx-auto m-0 p-0">
                <h5 className="text-center creator-special-heading">Creator's Special</h5>
                <Slider ref={c => (this.slider = c)} {...this.state.settings } afterChange={this.nextClick}>
                    {this.state.creatorSpecial.map((m, id) => 
                        <div className="creator-special-image-wrapper d-flex justify-content-center">
                          <img id={id} onClick={ this.ImageInFocus } className="creator-special-image" src={base + 'creator-special/' + m.fileRoute} alt=""/>
                        </div>    
                    )}
                </Slider>
            </div>
        );
    }
}

export default CreatorSpecial;