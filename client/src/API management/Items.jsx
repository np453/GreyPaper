import React, { Component } from 'react';
import axios, { base } from '../axios-grey';

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Items extends Component {

    state = {
        items : [],
        data :{
            name : "",
            cost : "",
            quantity : "",
            category : "",
            designation : "",
            image : [],
            description : "",
            desc : [],
            material : "",
            size : "",
            slug : "",
            discount : "",
            onSale : false,
            totalSold : "",
            shareUrl : "",
            file : null
        },
        description : [{name:'input-0', val:""}]
    }

    handleChange = ({ currentTarget : input }) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        if(input.type === 'file')data[input.name] = input.files
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

    handleSwitch = ({ currentTarget : input }) => {
        const data = {...this.state.data};
        data[input.name] = input.checked;

        this.setState({ data });
    };

    appendInput = e => {
        e.preventDefault();
        const currentListLength = this.state.description.length;
        const newInput = `input-${ currentListLength }`;
        this.setState(prevState => ({ description: prevState.description.concat([{name:newInput, val:""}]) }) );
    }

    resetFileInputs = () => {
        this.setState({ data : { file : null } })
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

    handleDescChange = (e, key) => {
        const val = e.target.value;
        const description = [...this.state.description]
        description[key].val = val;
        this.setState({ description }) 
    }

    render() {

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

        const IOSSwitch = withStyles((theme) => ({
            root: {
              width: 42,
              height: 26,
              padding: 0,
              margin: theme.spacing(1),
            },
            switchBase: {
              padding: 1,
              '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                  backgroundColor: '#3399ff',
                  opacity: 1,
                  border: 'none',
                },
              },
              '&$focusVisible $thumb': {
                color: '#3399ff',
                border: '6px solid #fff',
              },
            },
            thumb: {
              width: 24,
              height: 24,
            },
            track: {
              borderRadius: 26 / 2,
              border: `1px solid ${theme.palette.grey[400]}`,
              backgroundColor: theme.palette.grey[50],
              opacity: 1,
              transition: theme.transitions.create(['background-color', 'border']),
            },
            checked: {},
            focusVisible: {},
          }))(({ classes, ...props }) => {
            return (
              <Switch
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
                {...props}
              />
            );
          });

        const categories = this.state.categories === undefined ? null : this.state.categories.categories
        return (
            <div className="container">
                <hr/>
                <form className="add-item-form p-3" enctype="multipart/form-data">
                    <h3>Add item</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="wrapper mb-5">
                                <input type="text" name="name" id="name" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Name</div>
                            </div>
                            <div className="wrapper mb-5">
                                <input type="text" name="cost" id="cost" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Cost</div>
                            </div>
                            <div className="wrapper mb-5">
                                <input type="text" name="quantity" id="quantity" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Quantity</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="wrapper mb-5">
                                <input type="text" name="category" id="category" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Category</div>
                            </div>

                            <div className="wrapper mb-5">
                                <input type="text" name="designation" id="designation" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">designation</div>
                            </div>
                            <div className="wrapper mb-5">
                                <input type="text" name="size" id="size" required="true" onChange={this.handleChange}/>
                                <div className="placeholder">Size</div>
                            </div>
                        </div>
                        <div className="col-md-4 dynamicInput">
                            {/* <textarea 
                            rows="10" 
                            className="form-control" 
                            placeholder="Add product description here"
                            type="text" 
                            name="description" 
                            id="description" 
                            onChange={this.handleChange}/> */}
                            <div>
                                <h4>Add item description</h4>
                                <p>description should pe points wise i.e. list items</p>
                                {this.state.description.map((input, key) => 
                                <input tagKey={key} onChange={e => this.handleDescChange(e, key)} name={input.name} id={input.name} key={key} />)}
                            </div>
                            <button onClick={ (e) => this.appendInput(e) }>
                                add description
                            </button>
                            <p>{this.state.description.length != 1 ? null : "click the button to add a description point"}</p>
                        </div>
                    
                    </div>
                    <hr/>
                    <div className="image-upload-section">
                        <h3>Image Upload</h3>
                        <div className="form-group upload-file-wrapper">
                            <label className="upload-file-button" htmlFor="file">Upload images of product</label>
                            <input className="form-control" multiple onChange={this.handleChange} type="file" name="file" id="file" />
                        </div>
                        {fileDetails}
                    </div>
                    <div>
                        <hr/>
                        <h3>Discount</h3>
                        <div className="mb-4">
                            <FormControlLabel
                                control = {
                                <IOSSwitch 
                                checked={this.state.data.onSale} 
                                onChange={this.handleSwitch} 
                                name="onSale" />}
                                label="onSale"
                            />
                        </div>
                        {this.state.data.onSale && <div className="wrapper mb-5">
                            <input type="text" name="discount" id="discount" required="true" onChange={this.handleChange}/>
                            <div className="placeholder">Discount amount</div>
                        </div>}
                    </div>
                    <hr/>
                    <button name="highest-rating" onClick={this.handleSubmit} className="add-item-submit-button">Submit</button>
                </form>
            </div>
        );
    }
}

export default Items;