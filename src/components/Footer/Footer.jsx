import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Home } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { Badge, IconButton } from "@material-ui/core";
import { useContext } from "react";
import { productContext } from "../../productContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#1976d2",
  },
  icon: {
    color: "#fff",
  },
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { cartLength } = useContext(productContext);
  const history = useHistory();
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.icon}
        label="Recents"
        onClick={() => history.push("/")}
        icon={<Home />}
      />
      <BottomNavigationAction
        className={classes.icon}
        label="Favorites"
        icon={<FavoriteIcon />}
      />
      <Badge badgeContent={cartLength} color="secondary">
        <BottomNavigationAction
          className={classes.icon}
          label="Favorites"
          icon={<ShoppingBasketIcon  />}
          onClick={() => history.push("/cart")}
        />
      </Badge>
    </BottomNavigation>
  );
};

export default Footer;
