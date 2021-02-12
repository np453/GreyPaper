import React, { Component } from 'react';
import axios, { base } from '../axios-grey';

class AdminManagement extends Component {

    state = {
        data : {
            file : null,
            CSfile : null,
            HRfile : null
        }
    }

    handleChange = ({ currentTarget : input }) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.type === 'file')data[input.name] = input.files[0]
        this.setState({ data });    
    }

    handleSubmit = async e => {
        
        e.preventDefault();
        const payload = new FormData() 
        if (e.target.name === 'banner-carousel') {

            payload.append('file', this.state.data.file)
            const config = { headers: { 'content-type': 'multipart/form-data' } }
            const { data : uploadRes } = await axios.post(base + 'banner-carousel', payload, config );
            console.log(uploadRes)

        }
        else if (e.target.name === 'creator-special') {

            payload.append('file', this.state.data.CSfile)
            const config = { headers: { 'content-type': 'multipart/form-data' } }
            const { data : uploadRes } = await axios.post(base + 'creator-special', payload, config );
            console.log(uploadRes)

        }

        else if (e.target.name === 'highest-rating') {
            payload.append('file', this.state.data.HRfile)
            const config = { headers: { 'content-type': 'multipart/form-data' } }
            const { data : uploadRes } = await axios.post(base + 'highest-rating', payload, config );
            console.log(uploadRes)
        }

        
        
    }

    render() {
        console.log(this.state.data.file)
        return (
            <div className="container pt-5">
                <h5>Banner carousel</h5>
                <form enctype="multipart/form-data">
                    <input onChange={this.handleChange} type="file" name="file" />
                    <button name="banner-carousel" onClick={this.handleSubmit} className="btn btn-info">Submit</button>
                </form>
                <hr/>
                <h5>Creator Special</h5>
                <form enctype="multipart/form-data">
                    <input onChange={this.handleChange} type="file" name="CSfile" />
                    <button name="creator-special" onClick={this.handleSubmit} className="btn btn-info">Submit</button>
                </form>
                <hr/>
                <h5>Highest Ratings</h5>
                <form enctype="multipart/form-data">
                    <input onChange={this.handleChange} type="file" name="HRfile" />
                    <button name="highest-rating" onClick={this.handleSubmit} className="btn btn-info">Submit</button>
                </form>
            </div>
        );
    }
}

export default AdminManagement;