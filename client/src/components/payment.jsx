import React, { Component } from 'react';

import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

class Payment extends Component {

    state = {
        product : {
            name: "Pay for event",
            price:100000
        }
    }

    makePayment = async(token) => {
        const payload = { product:this.state.product, token }
        const { data:payData } = await axios.post('http://localhost:6161/payment', payload)

    }
    
    render() {
        return (
            <div className="container">
                <StripeCheckout 
                //https://stackoverflow.com/questions/59607312/env-variable-returns-undefined-in-react-js-app

                        stripeKey={process.env.REACT_APP_API_KEY} 
                        token={this.makePayment}
                        amount={this.state.product.price * 100} 
                        name={ this.state.product.name }>
                    <button className="btn btn-info ">Purchase</button>
                </StripeCheckout>
            </div>
        );
    }
}

export default Payment;