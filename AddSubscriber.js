import React, { Component } from 'react';
import Header from './Header'; // You can create Header.js if needed
import './AddSubscriber.css';  // Make sure this CSS file exists

class AddSubscriber extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: ''
    };
  }

  inputChangedHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Header heading="Add Subscriber" />
        <div className="component-body-container">
          <button className="custom-btn">Back</button>

          <form className="subscriber-form">
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              onChange={this.inputChangedHandler}
            /><br /><br />

            <label>Phone:</label><br />
            <input
              type="text"
              name="phone"
              onChange={this.inputChangedHandler}
            /><br /><br />
          </form>

          <div>
            <p>Subscriber to be added:</p>
            <p>Name: {this.state.name}</p>
            <p>Phone: {this.state.phone}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSubscriber;
