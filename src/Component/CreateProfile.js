import React, { Component } from "react";
import web3 from "../web3";
import Asset from "../Asset";
// import Form from '../Container/Form'
import { Button, Form } from "semantic-ui-react";

export default class CreateProfile extends Component {
  state = {
    name: "",
    address: ""
  };

  onInputChange = (event, target) => {
    let obj = {};
    obj[target] = event.target.value;
    this.setState(obj);
  };
 
  onSubmit = async () => {
    const { name, address } = this.state;

    const result = await Asset.methods.AssetTracker(name, address);
    console.log(result);
  };
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={this.state.name}
            onChange={event => this.onInputChange(event, "name")}
          />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            value={this.state.address}
            onChange={event => this.onInputChange(event, "address")}
          />
        </Form.Field>
        <Button type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}
