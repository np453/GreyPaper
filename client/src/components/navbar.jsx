import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base } from '../base';

import brandlogo from '../assets/brandlogo.svg'

const Navbar = props => {
    const [isOpen, setOpen] = useState(false);
    const [openNotificationBox, setOpenNotificationBox] = useState(false);
    const [width, setWidth] = useState("-300px");
    // const [ sideBarOpacity, setSideBarOpacity ] = useState(0);
    const [recent, setRecent] = useState([])
    const [speaker, setSpeaker] = useState([])
    const [gallery, setGallery] = useState([])
    const [email, setEmail] = useState("")
    const ref = useRef();
    const ref1 = useRef();
    const toggleSideBar = () => {
        setWidth("0px")
        // setSideBarOpacity(1)
    }
    const toggleSideBarClose = () => {
        setWidth("-300px")
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('click', handleClickOutsideNotificationBox, true);

        axios.get('/api/recent/').then(data => { setRecent(data.data) })
        axios.get('/api/speaker/').then(data => { setSpeaker(data.data) })
        axios.get('/api/gallery/img').then(data => { setGallery(data.data) })

        return () => document.removeEventListener('click', handleClickOutsideNotificationBox, true);
    }, []);
    const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            setWidth("-300px")
            // setSideBarOpacity(0);
        }
    };
    const toggleNotificationBox = () => {

        {/*Function to open notification box*/ }
        setOpenNotificationBox(!openNotificationBox)
    }
    const handleClickOutsideNotificationBox = e => {

        {/*If clicked outside of notification box, it will close*/ }
        if (ref1.current && !ref1.current.contains(e.target)) {
            setOpenNotificationBox( false )
        }
    }
    const handleForm = (e) => {
        setEmail(e.target.value);
    }

    document.body.style.overflow = width !== "-300px" ? "hidden" : "visible"
    return (
        <div style={{backgroundColor:props.navbarColor}} className="shadow-sm navbar__container container-fluid p-0">
                
                {/* Sidebar */}
                <ul ref={ref} className="sideBar p-0" style={{ left:`${width}`, width: `300px`, height:"100%",  }}>
                    <li className="sideBar-item close_sidebar" onClick={toggleSideBarClose}>
                        <div className="row">
                            <div className="ecell_sidebar_title col-md-10 d-flex justify-content-start">E-cell MNNIT</div>
                            <div className="col-md-2 d-flex justify-content-end"><i className="fa fa-times"></i></div>
                        </div>
                    </li>

                    {/* Speaker in sidebar */}
                    <li className="sideBar-item">Speakers</li>
                    <div className="row sideBar_speakers_row flex-row d-flex align-items-center m-0">
                        {speaker.slice(0, 3).map(m => 

                            <div className="m-2">
                                <img className="sideBar_speakers img img-fluid" src={ base + 'media/' + m.route + '/' + m.filename } alt=""/>
                            </div>
                        )}
                        <Link to="/speaker"><i className="d-flex align-items-center justify-content-center fa fa-arrow-right"></i></Link>
                    </div>
                     

                    {/* Gallery in sidebar */}
                    <li className="sideBar-item">Gallery</li>
                    <div className="row sideBar_speakers_row flex-row d-flex align-items-center m-0">
                        {gallery.slice(0, 3).map(m => 

                            <div className="m-2">
                                <img className="sideBar_speakers img img-fluid" src={ base + 'media/' + m.route + '/' + m.filename } alt=""/>
                            </div>
                        )}
                        <Link to="/gallery"><i className="d-flex align-items-center justify-content-center fa fa-arrow-right"></i></Link>
                    </div>
                    <hr />
                    <Link to="/sponsor"><li className="sideBar-item">Sponsors</li> </Link>
                    <Link to="/team"><li className="sideBar-item">Team</li></Link>
                    <hr/>
                    <li className="sideBar-item">Recent Notifications</li>
                    <ul>
                        {recent.slice(0, 3).reverse().map(m =>
                            <li onClick={() => setOpenNotificationBox(false)} className="notification_item">{m.content}</li>
                        )}
                        <Link onClick={() => setOpenNotificationBox(false)} style={{ fontSize: "13px" }} className="read_all_notifications_external_link" to='/notification'><li style={{ color: "#2a85ad" }}>Read all <i className="fa fa-external-link"></i></li></Link>
                    </ul>        
                    <hr/>
                    <Link to="/contact"><li className="sideBar-item">Get in touch</li></Link> 
                    <Link to="/"><h6 className="back_to_home_sideBar"><span>Back to Home</span></h6></Link>
                </ul>
                <div className={"container " + "navbar-"+props.position}>
                <nav className={"navbar navbar-expand-lg " + "navbar-"+props.position}>
                    <div className="navbar-brand" style={{color:props.navbarBrandColor}}>
                    <img src={props.navBrandLogo} style={{ pointerEvents:"none" }} alt=""/>
                        {props.brand}
                    </div>
                    <div className="collapse navbar-collapse">
                    <div className="navbar-nav ml-auto">
                        {props.navLinks.map(m => 
                            <Link to={m.link} className="p-2" style={{color:props.linkColor, textDecoration:"none", opacity:props.linkOpacity, fontFamily:"sans-serif"}}><div className="nav-links">{m.navLinkName}</div></Link>    
                        )}
                        <div className="notify_box">
                            <i onClick={toggleNotificationBox} className="fa fa-bell" aria-hidden="true" />
                            
                            {/*Load notifications list*/}
                            {openNotificationBox &&
                                    <div ref={ref1} className="notification_box">
                                        <div>
                                            <h3 className="p-2 border-bottom">Notifications</h3>
                                            <ul>
                                                {recent.slice(0).reverse().map(m =>
                                                    <Link onClick={() => setOpenNotificationBox(false)} style={{ color: "#444" }}><li className="notification_item">{m.content}</li></Link>
                                                )}
                                                <Link onClick={() => setOpenNotificationBox(false)} style={{ fontSize: "13px" }} className="read_all_notifications_external_link" to='/notification'><li style={{ color: "#2a85ad" }}>Read all <i className="fa fa-external-link"></i></li></Link>
                                            </ul>
                                        </div>
                                    </div>
                                }
                        </div>
                    </div>
                    </div>
                    <button onClick={toggleSideBar} className="ml-auto pr-0 navbar-toggler" type="button" 
                        data-toggle="collapse" 
                        aria-controls="nav__links" aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="icon-bar top-bar" ></span>
                        <span className="icon-bar middle-bar" ></span>
                        <span className="icon-bar bottom-bar" ></span>
                    </button>
                </nav>
            </div>
            </div>
    );
}

export default Navbar;