import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductList";
import ProductContextProvider from "./productContext";

const Routers = () => {
  return (
    <ProductContextProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <div style={{marginBottom:70}}>
            <Route exact path='/' component={ProductList} />
            <Route exact path="/cart" component={Cart} />
          </div>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ProductContextProvider>
  );
};

export default Routers;
