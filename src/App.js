import React from 'react';


import {Switch, Route, HashRouter} from "react-router-dom";

import './App.css';

import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <HashRouter basename={"http://NickPaimon.github.io/productList"}>
                    <Switch>
                        <Route exact path="/" component={Products} />
                        <Route path="/product/:id" component={ProductDetails} />
                    </Switch>
                </HashRouter>

            </div>
        </div>
    )
}

export default App;
