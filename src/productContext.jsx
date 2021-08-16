import React from "react";
import axios from "axios";
import { useReducer } from "react";
import { JSON_API } from "./helpers/Const";

export const productContext = React.createContext();

const INIT_STATE = {
  products: [],
  idProductsCart: [],
  cartLength: 0,
  cart: "",
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, products: action.payload };
    case "CHANGE_CART_COUNT":
      return { ...state, cartLength: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProduct = async () => {
    let { data } = await axios(`${JSON_API}products`);
    dispatch({
      type: "GET_DATA",
      payload: data,
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${JSON_API}products/` + id);
    getProduct();
  };

  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let newProduct = {
      product: product,
      count: 1,
      subPrise: 0,
    };
    let filteredCart = cart.products.filter(
      (elem) => elem.product.id === product.id
    );
    if (cart.products.length > 0) {
      if (filteredCart.length > 0) {
        cart.products = cart.products.filter(
          (elem) => elem.product.id !== product.id
        );
      } else {
        cart.products.push(newProduct);
      }
    } else {
      cart.products.push(newProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "CHANGE_CART_COUNT",
      payload: cart.products.length,
    });
  };

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const changeProductCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((elem) => {
      if (elem.product.id === id) {
        elem.count = count;
        elem.subPrice = count * Number(elem.product.price);
      }
      cart.totalPrice = calcTotalPrice(cart.products);
      return elem;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  };



  function calcTotalPrice(products) {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.subPrice;
    });
    return totalPrice;
  }
  return (
    <productContext.Provider
      value={{
        products: state.products,
        cartLength: state.cartLength,
        cart: state.cart,
        getProduct,
        deleteProduct,
        addProductToCart,
        getCart,
        changeProductCount,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default ProductContextProvider;
