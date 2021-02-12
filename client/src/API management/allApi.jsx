import React, { Component } from 'react';
import axios, { base } from 'axios-grey';


class AllApi extends Component {

    state = {
        BannerCarousel : []
    }

    componentDidMount = async() => {
        const { data : BannerCarousel } = await axios.get('/banner-carousel');
        console.log(BannerCarousel)
        this.setState({ BannerCarousel })
    }
    

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default AllApi;