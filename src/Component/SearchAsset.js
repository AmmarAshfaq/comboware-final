import React, { Component } from "react";
import Asset from "../Asset";
import { Button, Form, List, Segment, Header } from "semantic-ui-react";
import Background from "../Image/background.jpg";
import Navbar from "../Container/Navbar";

export default class Search extends Component {
  state = {
    SKU_NO: undefined,
    weight: "",
    geolocation: "",
    productName: "",
    dateOfmanufactoring: "",
    currentOwner: "",
    productGet: false,
    message: "",
    list: false,
    ownerProduct: [],
    currentLocation: "",
    ownerLoad: false,
    previous: false
  };

  getSecificProductFunc = async event => {
    event.preventDefault();
    const {
      SKU_NO,
      weight,
      geolocation,
      productName,
      dateOfmanufactoring,
      currentOwner,
      message
    } = this.state;

    if (SKU_NO !== undefined) {
      const product = await Asset.methods.getSpecificProduct(SKU_NO).call();
      console.log(product);
      const onlyValues = Object.values(product);
      console.log(onlyValues);
      if (
        onlyValues[0] !== "" &&
        onlyValues[1] !== "" &&
        onlyValues[2] !== "" &&
        onlyValues[3] !== "" &&
        onlyValues !== ""
      ) {
        this.setState({
          weight: onlyValues[0],
          geolocation: onlyValues[1],
          productName: onlyValues[2],
          dateOfmanufactoring: onlyValues[3],
          currentOwner: onlyValues[4],
          productGet: true
        });
      } else {
        this.setState({
          message: "There is no asset please create first.",
          productGet: false
        });
      }
    } else {
      this.setState({
        message: "Please Enter SKU NO."
      });
    }
  };

  getListOfAssetOwnByManufacturer = async event => {
    event.preventDefault();
    const listOfAsset = await Asset.methods
      .getListOfAssetOwnedByManufacturer()
      .call();
    console.log(listOfAsset);
    if (listOfAsset.length > 0) {
      this.setState({
        ownerProduct: listOfAsset,
        list: true
      });
    } else {
      this.setState({
        list: false,
        message: "There is no asset."
      });
    }
  };
  getCurrentOwnerOfAsset = async () => {
    const { SKU_NO, currentOwner, currentLocation } = this.state;
    if (SKU_NO !== undefined) {
      const currentOwner = await Asset.methods
        .getCurrentOwnerOfAsset(SKU_NO)
        .call();
      // console.log(currentOwner);
      const onlyValues = Object.values(currentOwner);
      if (onlyValues[0] !== "" && onlyValues[1] !== "") {
        this.setState({
          currentOwner: onlyValues[0],
          currentLocation: onlyValues[1],
          ownerLoad: true
        });
      } else {
        this.setState({
          ownerLoad: false,
          message: "No record found."
        });
      }
    } else {
      this.setState({
        message: "Please Enter SKU No."
      });
    }
  };
  getPreviousOwnerOfAssetFunc = event => {
    event.preventDefault();
    const { SKU_NO } = this.state;
    if (SKU_NO !== undefined) {
      const previousOwner = Asset.methods
        .getPreviousOwnerOfAsset(SKU_NO)
        .call()
        .then(res => {
          console.log(res);
        });
      console.log(previousOwner);
    } else {
      this.setState({
        message: "Please Enter SKU NO"
      });
    }
  };
  render() {
    console.log(this.state);
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '25%', backgroundColor: 'blue' }}>
          <Navbar history={this.props.history} />
        </div>
        <div
          style={{ width: "75%", marginTop: 70, paddingBottom: 80 }}
        >
          <div style={{ width: "50%", margin: "0px auto" }}>
            <Form>
              <Form.Field>
                <Header as="h1">Get Specific Product</Header>

                <input
                  placeholder="Enter SKU No"
                  type="number"
                  value={this.state.SKU_NO}
                  onChange={event =>
                    this.setState({ SKU_NO: event.target.value })
                  }
                />
              </Form.Field>
              <Button type="submit" onClick={this.getSecificProductFunc}>
                Submit
            </Button>
              {!this.state.productGet ? (
                this.state.message
              ) : (
                  <div>
                    <h1>Product Detail!</h1>
                    <ul>
                      <li>Product Weight: {this.state.weight} KG</li>
                      <li>Owner Name: {this.state.currentOwner}</li>
                      <li>
                        Date Of Manufacturing: {this.state.dateOfmanufactoring}
                      </li>
                      <li>Product Name: {this.state.productName}</li>
                      <li>Geolocation: {this.state.geolocation}</li>
                    </ul>
                  </div>
                )}
            </Form>

            <hr />
            <Header as="h1">Get List of Asset Own by Manufacturer</Header>
            <Segment inverted>
              <List divided inverted relaxed>
                <List.Item>
                  <List.Content>
                    {!this.state.list ? (
                      this.state.message
                    ) : (
                        <div>
                          <h2>Product owned by manufacturer are:</h2>
                          {this.state.ownerProduct.map(value => {
                            return (
                              <ul key={value}>
                                <li>{value}</li>
                              </ul>
                            );
                          })}
                          <h3>You can check product detail using SKU NO.</h3>
                        </div>
                      )}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
            <Button type="submit" onClick={this.getListOfAssetOwnByManufacturer}>
              Get
          </Button>

            <hr />
            <Header as="h1">Get Current Owner Of Asset</Header>

            <Form>
              <Form.Field>
                <input
                  placeholder="Enter SKU No"
                  type="number"
                  value={this.state.SKU_NO}
                  onChange={event =>
                    this.setState({ SKU_NO: event.target.value })
                  }
                />
              </Form.Field>
              <Button type="submit" onClick={this.getCurrentOwnerOfAsset}>
                Submit
            </Button>
            </Form>
            {!this.state.ownerLoad ? (
              this.state.message
            ) : (
                <div>
                  <h1>Owner Detail</h1>
                  <ul>
                    <li>Owner Name: {this.state.currentOwner}</li>
                    <li>Owner Location: {this.state.currentLocation}</li>
                  </ul>
                </div>
              )}

            {/* <Header as='h1'>Get Previous Owner Of Asset</Header>

        <Form>
          <Form.Field>
            <input placeholder='Enter SKU No' type="number" value={this.state.SKU_NO} onChange={event => this.setState({ SKU_NO: event.target.value })} />
          </Form.Field>
          <Button type='submit' onClick={this.getPreviousOwnerOfAssetFunc}>Submit</Button>
        </Form>
        {
          !this.state.previous ? this.state.message :
            <div>
            </div>
        } */}
          </div>
        </div>
      </div>
    );
  }
}

// get specific product send
// get List of asset owned by manufacturer call
// get current owner of asset send
// previous owner of asset
