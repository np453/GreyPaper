import React, { Component } from 'react';

import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

class Payment extends Component {

    state = {
        product : {
            name: "Pay for event",
            price:100
        }
    }

    makePayment = async(token) => {
        const payload = { product:this.state.product, token }
        const { data:payData } = await axios.post('http://localhost:6161/payment', payload)
        console.log(payData)

    }

    render() {
        return (
            <div className="container">
                <StripeCheckout 
                        stripeKey={process.env.REACT_APP_KEY} 
                        token={this.makePayment}
                        amount={this.state.product.price * 100} 
                        name="Purchase">
                    <button className="btn btn-info ">Purchase</button>
                </StripeCheckout>
            </div>
        );
    }
}

export default Payment;