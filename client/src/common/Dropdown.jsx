import React, {Component} from 'react'
// import './dropdown.scss';
import { Link } from 'react-router-dom';

export default class Dropdown extends Component {
    state = {
        dropdown: false,
        arrow : "fa-caret-down",
    }
    ref = React.createRef();

     toggleDropdown = () => {
        this.setState({dropdown :!this.state.dropdown});
        this.setState({arrow :"fa-caret-up"})
    }
     handleClickOutside = e => {
        if (this.ref.current && !this.ref.current.contains(e.target)) {
            this.setState({dropdown :false});
            this.setState({arrow :"fa-caret-down"})
        }
    };
    handleDropDownClose = () => {
        this.setState({dropdown :false,arrow :"fa-caret-down" });
    }
    componentDidMount = () => {
        document.addEventListener('click', this.handleClickOutside, true);
        
    }
    componentWillUnmount = () => {
            document.removeEventListener('click', this.handleClickOutside, true);
    }
    

    render() {
        const dropdown = this.state.dropdown;
        const arrow = this.state.arrow;
        return (
            <div id="dd" className="dropdown ml-3 mr-3">
                        <span onClick={this.toggleDropdown} className="title">{this.props.title} <i className={"fa "+ arrow} aria-hidden="true"></i></span>
                        {dropdown && <div ref={this.ref} className="dropdown-content content ">
                            <ul className="list-group">
                                {this.props.items === undefined ? null : this.props.items.map(p => 
                                    <Link onClick={this.handleDropDownClose} style={{textDecoration:"none"}} to={ '/'+this.props.slugPrefix + p.slug+'/'}><li className={this.props.classes}>
                                        <span>{p.title}</span>
                                    </li></Link>
                                )}  
                            </ul>
                        </div>}
                    </div>
        );
    }
}