import React, { Component } from 'react';
import axios , { base } from '../axios-grey';

class CategoryItem extends Component {

    state = {
        categoryItem : [] //particular category items array
    }

    componentDidMount = async() => {
        const { match : { params } } = this.props;
        const { data : categoryItem } = await axios.get(base + `category/${params.url}/`)
        this.setState({ categoryItem });
    }
    

    render() {
        return (
            <div>
                dfgdfgfdg
            </div>
        );
    }
}

export default CategoryItem;