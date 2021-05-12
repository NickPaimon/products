import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './ProductDetails.css';

import {mockedAPI} from "../../api/api";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class ProductEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product:{
                name: ""
            }
        };
    }
    componentDidMount() {
        mockedAPI.getProductById(this.props.match.params.id).then((response) => {
            this.setState({product: response.data});
        })
    }
    changeProduct=(key, value)=>{
        let {product}=this.state;
        product[key]=value;
        this.setState({product:product});
    };
    create = () => {
        this.props.createNewProduct(this.state.product);
        this.props.cancel()
    };

    render(){
        let {product}=this.state;

        return (
            <div className="productBlockEdit newProduct">
                <div className="productDescriptionBlock">
                    <Typography variant="subtitle2"><label>Назва:</label><br/><Input onChange={(e)=>this.changeProduct('name', e.target.value)} /> </Typography>
                    <Typography variant="subtitle2"><label>Url адресс:</label><br/><Input placeholder="optional"  onChange={(e)=>this.changeProduct('imageUrl', e.target.value)} /> </Typography>
                    <Typography variant="subtitle2"><label>Кількість одиниць:</label><br/><Input  onChange={(e)=>this.changeProduct('count', e.target.value)} /> </Typography>
                    <Typography variant="subtitle2"><label>Короткий oпис:</label><br/><Input  onChange={(e)=>this.changeProduct('shortDescription', e.target.value)}></Input> </Typography>
                    <Typography variant="subtitle2"><label>Oпис:</label><br/><Input  onChange={(e)=>this.changeProduct('description', e.target.value)}></Input> </Typography>
                    <Typography variant="subtitle2"><label>Вага:</label><br/> <Input type="number" value={product.weight || ''} onChange={(e)=>this.changeProduct('weight', e.target.value)}/>гр</Typography>
                    <div className="buttons">
                        <Button variant="contained" color="primary" onClick={this.create}>Create</Button>
                        <Button variant="contained" color="secondary" onClick={()=>this.props.cancel()}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductEdit)
