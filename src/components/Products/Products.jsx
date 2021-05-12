import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {mockedAPI} from "../../api/api";

import './Products.css'
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';
import ProductEditNew from "../ProductDetails/ProductEditNew";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";


class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchForm: '',
            open: false
        }
    }

    getProductsAPICALL = () => {
        mockedAPI.getProducts().then((response) => {
            this.setState({products: response.data})
        })
    };

    componentDidMount() {
        this.getProductsAPICALL();
    }

    onDeleteProduct = (id) => {
        if (window.confirm("are yo sure?")) {
            mockedAPI.deleteProduct(id).then((response) => {
                if (response.statusText === "OK") {
                    this.getProductsAPICALL();
                }
            })
        }
    };
    handleOpen = () => {
        this.setState({open: true});
        console.log(this.props)
    };

    handleClose = () => {
        this.setState({open: false});
    };

    createNewProduct = (data) => {
        mockedAPI.createNewProduct(data).then((response) => {
            if (response.statusText === "Created") {
                this.getProductsAPICALL();
            }
        });
    };

    render() {
        let {products} = this.state;
        let {searchForm} = this.state;
        return (
            <div>
                <div className="searchBlock">
                    <Input type="text"
                           className="searchInput"
                           placeholder="Search by name and count"
                           onChange={(event) => {
                               this.setState({searchForm: event.target.value});
                           }}/>
                    <Button variant="outlined" color="tertiary" onClick={this.handleOpen}>Add new</Button>
                    <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-modal-title"
                           aria-describedby="simple-modal-description">
                        <div className="modal">
                            <ProductEditNew createNewProduct={this.createNewProduct} cancel={this.handleClose}/>
                        </div>
                    </Modal>
                </div>
                <div className="productsBlock">
                    {products.filter((item) => {
                        if (searchForm === '') {
                            return item
                        } else if (item.name.toLowerCase().includes(searchForm.toLowerCase())) {
                            return item
                        } else if (item.count.toString().includes(searchForm)) {
                            return item
                        }
                    }).map(item => {
                        return (<div className="productBlock" key={item.id}>
                            <div className="productImageBlock">
                                <img className="productImage"
                                     src={item.imageUrl}
                                     alt="product"/>
                            </div>
                            <div className="productDescriptionBlock">
                                <Typography variant="subtitle2">Назва: {item.name}</Typography>
                                <Typography variant="subtitle2">Короткий опис: {item.shortDescription}</Typography>
                                <Typography variant="subtitle2">Кількість одиниць: {item.count}</Typography>
                                <div className='buttonsBlock'>
                                    <Link to={"product/" + item.id}>
                                        <Button variant="outlined" color="tertiary" >Details</Button>
                                    </Link>
                                    <Button variant="outlined" color="tertiary" onClick={() => this.onDeleteProduct(item.id)}>Delete</Button>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}

export default Products;
