import React from "react";
import data from "../../data.json";
import Cart from "../cart/Cart";
import Filter from "../filter/Filter";
import Products from "../products/Products";
import "./productList.css";

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  //add item to cart
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyIncart = true;
      }
    });
    if (!alreadyIncart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  //remove item from cart
  removeItem = (product) => {
    const cartItems = this.state.cartItems.slice();

    this.setState({
      cartItems: cartItems.filter((cartItem) => cartItem._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        cartItems.filter((cartItem) => cartItem._id !== product._id)
      )
    );
  };

  //sort product by prices
  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };

  //filter by sizes
  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({
        size: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  //create order
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };

  render() {
    return (
      <>
        <div className="content">
          <div className="main">
            <Filter
              count={this.state.products.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
            />
            <Products
              products={this.state.products}
              addToCart={this.addToCart}
            />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={this.state.cartItems}
              removeItem={this.removeItem}
              createOrder={this.createOrder}
            />
          </div>
        </div>
      </>
    );
  }
}

export default ProductList;
