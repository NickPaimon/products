import React, {Component} from 'react';

import Modal from '@material-ui/core/Modal';

import {mockedAPI} from "../../api/api";

import ProductEdit from './ProductEdit';
import Comment from "../Comments/Comment";

import './ProductDetails.css'

import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

class ProductDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            comments: [],
            open: false,
            newCommentText: '',
        };
    }

    getCommentsFunc = () => {
        mockedAPI.getComments().then(((response) => {
            this.setState({comments: response.data})
        }))
    };

    componentDidMount() {
        mockedAPI.getProductById(this.props.match.params.id).then((response) => {
            this.setState({product: response.data});
        });
        this.getCommentsFunc();
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    save = (newData, id) => {
        mockedAPI.updateProductData(newData, id).then((response) => {
            this.setState({product: response.data});
        });
    };
    delete = (id) => {
        mockedAPI.deleteComment(id).then((response) => {
            if (response.statusText === "OK") {
                this.getCommentsFunc();
            }
        });

    };
    sendNewComment = () => {
        let data = {
            description: this.state.newCommentText,
            productID: this.state.product.productID,
        };
        if (data.description === "") {
            return ;
        } else {
            mockedAPI.uploadComment(data).then((responce) => {
                if (responce.statusText === "Created") {
                    this.setState({newCommentText: ''});
                    this.getCommentsFunc();
                }
            }).catch((error) => {
                alert("Max number of elements reached for this resource!");
            })
        }
    };


    render() {
        let {product} = this.state;
        let {comments} = this.state;
        return (
            <div>
                <div className="productBlock productPage">
                    <div className="productImageBlock">
                        <img className="productImage" src={product.imageUrl} alt={product.name}/>
                    </div>
                    <div className="productDescriptionBlock">
                        <Typography variant="subtitle2">Назва: {product.name}</Typography>
                        <Typography variant="subtitle2">Oпис: {product.description}</Typography>
                        <Typography variant="subtitle2">Кількість одиниць: {product.count}</Typography>
                        <Typography variant="subtitle2">Вага: {product.weight}гр</Typography>
                        <ul>
                            <Typography variant="subtitle2">Розмір: </Typography>
                            <Typography variant="subtitle2"><li>Висота: {product.height}.мм</li></Typography>
                            <Typography variant="subtitle2"><li>Ширина: {product.width}.мм</li></Typography>
                        </ul>

                        <div className="buttons">
                            <Link to="/"><Button variant="outlined" >Back</Button></Link>
                            <Button variant="outlined"  onClick={this.handleOpen}>Edit</Button>
                        </div>
                    </div>

                    <Modal open={this.state.open} onClose={this.handleClose} aria-labelledby="simple-modal-title"
                           aria-describedby="simple-modal-description">
                        <div className="modal">
                            <ProductEdit save={this.save} cancel={this.handleClose}/>
                        </div>
                    </Modal>

                </div>
                <div className="commentsBlock">
                    <Typography variant="subtitle1">Comments</Typography>
                    {comments ? comments.filter((item) => {
                        if (item.productID === product.productID) {
                            return item
                        }
                    }).map((c) => {
                        return <Comment delete={this.delete} key={c.id} comment={c.description} date={c.createdAt}
                                        id={c.id}/>
                    }) : null}
                    <div className="sendCommentBlock">
                        <Input type="text" value={this.state.newCommentText}
                               onChange={(e) => this.setState({newCommentText: e.target.value})}/>
                        <Button variant="outlined"  onClick={this.sendNewComment}>Send</Button>
                    </div>
                </div>

            </div>
        )
    }
};

export default withRouter(ProductDetails);

