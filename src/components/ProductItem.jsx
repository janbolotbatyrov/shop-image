import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { productContext } from "../productContext";
import { Button, CardActions } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "98%",
    display: "flex",
    justifyContent:'space-between',
    flexWrap: "wrap",
    margin: "10px auto",
  },
  card: {
    width: "480px",
    backgroundColor: "#2196f3",
  },
  media: {
    height: 200,
  },
  btns: {},
  btnDelete: {
    color: "#d32f2f",
  },
  btnAddToCart: {
    color: "#fff",
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const { getProduct, products, deleteProduct, addProductToCart } =
    useContext(productContext);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Card className={classes.root}>
      {products.map((product) => (
        <CardActionArea key={product.id} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.price}
            </Typography>
          </CardContent>
          <CardActions className={classes.btns}>
            <Button
              className={classes.btnDelete}
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </Button>
            <Button
              className={classes.btnAddToCart}
              onClick={() => addProductToCart(product)}
            >
              Ad to Cart
            </Button>
          </CardActions>
        </CardActionArea>
      ))}
    </Card>
  );
}
