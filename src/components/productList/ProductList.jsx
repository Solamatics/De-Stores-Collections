import React from "react";
import data from "../../data.json";
import Products from "../products/Products";
import "./productList.css";

class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  render() {
    return (
      <>
        <div className="content">
          <div className="main">
            <Products products={this.state.products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </>
    );
  }
}

export default ProductList;
