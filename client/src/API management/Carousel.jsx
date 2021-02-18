import React, { Component } from 'react';
import axios, { base } from '../axios-grey';

class Carousel extends Component {

    state = {
        data : {
            file : null
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
        payload.append('file', this.state.data.file)

        const config = { headers: { 'content-type': 'multipart/form-data' } }
        const { data : uploadRes } = await axios.post(base + 'banner-carousel', payload, config );

        console.log(uploadRes)
    }

    componentDidMount = async() => {
        const { data : items } = await axios.get('api/all-items')
        const { data : categories } = await axios.get('/category');
        this.setState({ items });
        this.setState({ category : {categories} });
    }

    deleteThisFile = (e, name, index) => {
        const currentFile = [...this.state.data.file]
        if (this.state.data.file === null) {
            return;
        }
        else {
            currentFile.splice(index, 1);
            this.setState({ data : { file : currentFile } })
        }
    }

    resetFileInputs = () => {
        this.setState({ data : { file : null } })
    }

    render() {
        console.log(this.state.data.file)
        const filesLength = this.state.data.file === null ? 0 : this.state.data.file.length

        const files = [];
        for (let i =0; i < filesLength; i++) {
            files.push({name:this.state.data.file[i].name})
        }

        const fileDetails = 
            <div className="files-details">
                {filesLength === 0 ? null : <div>
                    <h6>
                        Total files selected : {this.state.data.file.length} 
                    </h6>
                    <ul>
                        {files.map((m, key) => <li><span>{m.name} <i id={key} onClick={e => this.deleteThisFile(e, m.name, key)} className="fa fa-times"></i> </span></li> )}
                    </ul>
                    <button onClick={this.resetFileInputs} className="file-reset-button"><span className="pb-2">reset</span></button>
                </div>}
            </div>

        return (
            <div className="mt-4 container">
                <form className="add-item-form">
                    <h3 className="p-3">Add Carousel</h3>
                    <div className="form-group upload-file-wrapper">
                        <label className="upload-file-button" htmlFor="file">upload carousel image</label>
                        <input className="form-control" onChange={this.handleChange} type="file" name="file" id="file" />
                    </div>
                    {fileDetails}
                </form> 
            </div>
        );
    }
}

export default Carousel;