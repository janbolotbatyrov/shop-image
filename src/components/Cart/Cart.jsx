import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import { productContext } from "../../productContext";
import { useState } from "react";

const useStyles = makeStyles({
  cart: {
    marginTop: 50,
  },
  table: {
    minWidth: 700,
  },
  
});

const Cart = (props) => {
  const classes = useStyles();
  const { cart, getCart ,changeProductCount} = useContext(productContext);

  useEffect(() => {
    getCart();
  }, []);
  return (
    <Container>
        <h1>Корзина</h1>
      <TableContainer component={Paper} className={classes.cart}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                ТОВАРЫ
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Картинка</TableCell>
              <TableCell>Название</TableCell>
              <TableCell align="right">Колчество</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.products
              ? cart.products.map((item) => (
                  <TableRow>
                    <TableCell><img src={item.product.image} alt="" style={{width:200}} /></TableCell>
                    <TableCell>{item.product.title}</TableCell>
                    <TableCell align="right">
                      <input
                      id='price'
                        type="number"
                        style={{ width: 60, fontSize: 16 }}
                        value={item.count}
                        onChange={(e) => changeProductCount(e.target.value, item.product.id)}
                      />
                    </TableCell>
                    <TableCell align="right">${item.product.price}</TableCell>
                    <TableCell align="right">${item.subPrice}</TableCell>
                  </TableRow>
                ))
              : null}

            <TableRow >
              <TableCell colSpan={5} align="right">Общая сумма:  ${cart.totalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cart;
