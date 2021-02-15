import React, { Component } from 'react';

//importing brand logo from assets
import brandlogo from '../assets/brandlogo.svg';

//importing social media logos (facebook, twitter, instagram)
import fb from '../assets/socialmedialogo/fb.svg';
import insta from '../assets/socialmedialogo/insta.svg';
import tweet from '../assets/socialmedialogo/tweet.svg';

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid p-0 footer">
                <footer>
                    <div className="container footer-wrapper">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={brandlogo} className="img img-fluid" alt=""/>
                            </div>
                            <div className="col-md-2 footer-links">
                                <h5>Links</h5>
                                <h6>Home</h6>
                                <h6>Search canvas</h6>
                                <h6>Sign out</h6>
                                <h6>Contact Us</h6>
                                <h6>Blogs</h6>
                            </div>
                            <div className="col-md-2 footer-links">
                                <h5>Categories</h5>
                                <h6>Software</h6>
                                <h6>automotive</h6>
                                <h6>food</h6>
                                <h6>Sports</h6>
                                <h6>For desks setups</h6>
                                <h6>Motivational</h6>
                            </div>
                            <div className="col-md-4 footer-socials">
                                <h5>Get in touch</h5>
                                <p className="footer-get-in-touch-email">greypaperinfo@gmail.com</p>
                                <span>
                                    <img src={fb} className="p-2 img img-fluid" alt=""/>
                                </span>
                                <span>
                                    <img src={insta} className="p-2 img img-fluid" alt=""/>
                                </span>
                                <span>
                                    <img src={tweet} className="p-2 img img-fluid" alt=""/>
                                </span>
                                <div className="footer-newsletter-section">
                                    <h6>Newsletter</h6>
                                    <p>Subscribe to know about exculsive<br/> discounts and arrivals</p>
                                    <input placeholder="your email" 
                                    name="email" id="email" 
                                    onChange={this.handleChange} 
                                    type="text"/>
                                    <button className="ml-1">Submit</button>
                                </div>
                                
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="instatagcontent">

                            </div>
                        </div>
                        <div className="legal-footer-section row d-flex justify-content-center align-items center flex-column">
                            <h6 className="text-center legal_footer_links">
                                Terms of service | Privacy policy | Refund Policy
                            </h6>
                            <h6 className="text-center">
                                &#xa9;2021, GreyPaper
                            </h6>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
} 

export default Footer;