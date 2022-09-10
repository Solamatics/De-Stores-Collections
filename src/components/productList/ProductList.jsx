import React from "react";
import data from "../../data.json";
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
    };

    // this.filterProducts = this.filterProducts.bind(this);
    // this.sortProducts = this.sortProducts.bind(this);
  }

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
            <Products products={this.state.products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </>
    );
  }
}

export default ProductList;
