import React, { Component } from "react";
import formatCurrency from "../../util";
import "./cart.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  createOrder = (e) => {
    e.preventDefault();

    const order = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);

    this.setState({
      showCheckout: false,
    });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart__header">Cart is empty</div>
        ) : (
          <div className="cart cart__header">
            You have {cartItems.length} item(s) in the cart{" "}
          </div>
        )}
        <div className="cart">
          <ul className="cart__items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button
                      className="button"
                      onClick={() => this.props.removeItem(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <div className="total">
                <div>
                  {" "}
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  className="button primary"
                  onClick={() => this.setState({ showCheckout: true })}
                >
                  Proceed
                </button>
              </div>
            </div>
            {this.state.showCheckout && (
              <div className="cart">
                <form onSubmit={this.createOrder}>
                  <ul className="form__container">
                    <li>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={this.handleInput}
                      />
                    </li>

                    <li>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={this.handleInput}
                      />
                    </li>

                    <li>
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
