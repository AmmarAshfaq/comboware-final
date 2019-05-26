import React, { Component } from "react";
import web3 from "../web3";
import Asset from "../Asset";
// import Form from '../Container/Form'
import Navbar from "../Container/Navbar";

import Background from "../Image/background.jpg";

import { Button, Form, Segment, Dimmer, Loader } from "semantic-ui-react";

export default class CreateContract extends Component {
  state = {
    SKU_NO: 0,
    product_Name: "",
    weight: 0,
    geolocation: "",
    date: new Date().toLocaleString(),
    message: "",
    loading: true
  };

  onInputChange = (event, target) => {
    let obj = {};
    obj[target] = event.target.value;
    this.setState(obj);
  };

  onSubmit = async event => {
    event.preventDefault();
    const { SKU_NO, product_Name, weight, geolocation, date } = this.state;
    // const account = await web3.eth.getAccounts();
    let accountAdd = JSON.parse(localStorage.getItem('userInfo'))
    console.log(accountAdd)
    console.log(date)
    if (
      SKU_NO !== 0 &&
      product_Name !== "" &&
      weight !== 0 &&
      geolocation !== "" &&
      date 
    ) {
      console.log(this.state)
      // let dateParse = new Date(date);
      this.setState({
        message: "Waiting Transaction is in progress....",
        loading: false
      });
      // // console.log(dateParse);
      try {
        await Asset.methods
          .createAsset(SKU_NO, product_Name, weight, geolocation, date)
          .send({ from: accountAdd.accountAddress, gas: 3000000 });

        this.setState({
          message: `Asset Created at ${SKU_NO} successful.`,
          loading: true
        });
      } catch (err) {
        this.setState({ message: `${err} when asset created`, loading: true });
      }
    } else {
      this.setState({ message: "Please Enter All values.", loading: true });
    }

    this.setState({
      SKU_NO: 0,
      product_Name: "",
      weight: 0,
      geolocation: "",
      date: new Date().toLocaleString()
    });
  };
  render() {
    console.log(this.state.date)
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '25%', backgroundColor: 'blue' }}>
          <Navbar history={this.props.history} />
        </div>
        <div
          style={{ width: "75%", marginTop: 150, paddingBottom: 140 }}
        >
          <div style={{ width: "50%", margin: "0px auto" }}>
            <Segment inverted >
              <Form inverted>
                <Form.Group widths="equal">
                  <Form.Input
                    type="number"
                    fluid
                    label="SKU NO"
                    placeholder="Enter SKU NO"
                    value={this.state.SKU_NO}
                    onChange={event => this.onInputChange(event, "SKU_NO")}
                  />
                  <Form.Input
                    fluid
                    label="Product Name"
                    type="text"
                    placeholder="Enter Product Name"
                    value={this.state.product_Name}
                    onChange={event => this.onInputChange(event, "product_Name")}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Weight"
                    type="number"
                    placeholder="Enter Weight"
                    value={this.state.weight}
                    onChange={event => this.onInputChange(event, "weight")}
                  />
                  <Form.Input
                    fluid
                    label="City"
                    type="text"
                    placeholder="Enter City Name"
                    value={this.state.geolocation}
                    onChange={event => this.onInputChange(event, "geolocation")}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Date"
                    type="text"
                    placeholder="Enter Date"
                    value={this.state.date}
                    onChange={event => this.onInputChange(event, "date")}
                    disabled
                  />
                </Form.Group>

                <Button type="submit" onClick={this.onSubmit}>
                  Submit
            </Button>
              </Form>
            </Segment>
            {!this.state.loading ? (
              <div>
                <Loader active inline="centered" />
              </div>
            ) : (
                <h1>{this.state.message}</h1>
              )}
          </div>
        </div>
      </div>
    );
  }
}
