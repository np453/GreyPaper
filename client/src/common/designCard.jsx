import { React } from 'react';

const DesignCard = props => {
    return (
        <div className="each_design_card">
            <img src={props.image} className="img img-fluid" alt=""/>
            <div className="design-card-content">
                <h4>{props.title}</h4>
                <h6>{props.instaid}</h6>
            </div>
        </div>
    );
}

export default DesignCard;