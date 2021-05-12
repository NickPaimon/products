import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './ProductDetails.css';
import Button from '@material-ui/core/Button';

import {mockedAPI} from "../../api/api";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

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
    sendDataToUpperComponent=()=>{
        let newData = this.state.product;
        this.props.save(newData, this.props.match.params.id);
        this.props.cancel();
    };
    render(){
        let {product}=this.state;

        return (
            <div className="productBlockEdit">
                <div className="productImageBlock">
                    <img className="productImage" src={product.imageUrl} alt={product.name} />
                </div>
                <div className="productDescriptionBlock">
                    <Typography variant="subtitle2"><label>Назва:</label><br/><Input value={product.name || ''} onChange={(e)=>this.changeProduct('name', e.target.value)} /> </Typography>
                    <Typography variant="subtitle2"><label>Кількість одиниць:</label><br/><Input type="number" value={product.count || ''} onChange={(e)=>this.changeProduct('count', e.target.value)} /> </Typography>
                    <Typography variant="subtitle2"><label>Oпис:</label><br/><Input value={product.description || ''} onChange={(e)=>this.changeProduct('description', e.target.value)} /> </Typography>
                    <Typography variant="subtitle2"><label>Вага:</label><br/> <Input type="number" value={product.weight || ''} onChange={(e)=>this.changeProduct('weight', e.target.value)}/>гр</Typography>
                    <div className="buttons">
                        <Button variant="outlined"  onClick={this.sendDataToUpperComponent}>Save</Button>
                        <Button variant="outlined"  onClick={()=>this.props.cancel()}>Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductEdit)
