import React, { Component } from 'react';
import Img from '../assets/landingpagewall1.png';

class ProductQualitySection extends Component {
    render() {
        return (
            <div className="product-qualtiy-container container p-0">
                <div className="row m-0">
                    <div className="col-md-6 p-0">
                        <div className="top-shadow" />
                            <img style={{ pointerEvents:"none" }} src={Img} className="img img-fluid product-qualtiy-image" alt=""/>
                        <div className="bottom-shadow" />
                    </div>
                    <div className="col-md-6 product-quality-content">
                        <h4>High quality wall arts at reasonable price</h4>
                        <p>Quality assured designs to enlighten your place at reasonable price</p>
                        <h6 className="shop-link">
                            Shop now &nbsp;
                            <svg className="" width="6" height="11" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.705541" y1="0.952964" x2="6.23868" y2="5.79446" stroke="#2A62B5" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="6.28516" y1="6.42" x2="0.706549" y2="11.9986" stroke="#2A62B5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductQualitySection;