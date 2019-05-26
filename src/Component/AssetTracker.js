import React, { Component } from "react";
import { Header, Table, Form, Button, FormGroup } from "semantic-ui-react";
import Asset from "../Asset";
import { connect } from "react-redux";
import { AssetTrackerFunc } from "../store/action";
import Navbar from "../Container/Navbar";

class AssetTracker extends Component {
  state = {
    SKU_NO: undefined,
    trackerList: []
  };
  componentWillMount() {
    Asset.getPastEvents(
      "AcceptOwnerships",
      {
        fromBlock: 0,
        toBlock: "latest"
      },
      (err, events) => {
        console.log(err)
        console.log(events)
        if (events !== undefined) {
          console.log(events,"aseet tracker")
          this.props.assetTransferCom(events);
        } else {
          // console.lo
          alert("Please Check Your Internet Connection");
        }
      }
    );
  }
  onInputChange = eventVal => {
    // console.log(eventVal.)
    this.setState({
      SKU_NO: eventVal.target.value
    });
  };
  onSubmit = () => {
    let filterArr = this.props.assetList.filter(value => {
      return value._SKU === this.state.SKU_NO;
    });
    console.log(filterArr);
    this.setState({
      trackerList: filterArr
    });
  };
  render() {
    // console.log(this.props.assetList)
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%" }}>
          <Navbar history={this.props.history} />
        </div>
        <div style={{ width: "75%", marginTop: 80, paddingBottom: 470 }}>
          <div style={{ width: "80%", margin: "0px auto" }}>
            <Form style={{ width: "50%", display: "block" }}>
              <Form.Group widths="equal">
                <Form.Field>
                  <input
                    placeholder="Enter SKU No"
                    value={this.state.SKU_NO}
                    type="number"
                    onChange={event => this.onInputChange(event)}
                  />
                </Form.Field>
                <Button type="search" onClick={this.onSubmit}>
                  Search
                </Button>
              </Form.Group>
            </Form>
            {/* {
                    
                        console.log(value);
                    })
                } */}

            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>SKU NO</Table.HeaderCell>
                  <Table.HeaderCell>Previous Owner Name</Table.HeaderCell>
                  <Table.HeaderCell>Previous Owner Location</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {this.state.trackerList.map(value => {
                return (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell singleLine>{value._SKU}</Table.Cell>

                      <Table.Cell>{value.name}</Table.Cell>
                      <Table.Cell>{value.location}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
            </Table>
            {/* <table>
                    <th>
                        </th>
                    </table> */}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    assetList: state.reducer.trackerArr
  };
}

function mapDispatchToProps(dispatch) {
  return {
    assetTransferCom: payload => {
      dispatch(AssetTrackerFunc(payload));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTracker);
