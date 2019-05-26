import React, { Component } from "react";
import { Button, Form, Segment,Loader } from "semantic-ui-react";
import web3 from "../web3";
import Asset from "../Asset";
import Navbar from "../Container/Navbar";

 class AssetTransfer extends Component {
  state = {
    senderAddress: "",
    receiverAddress: "",
    ownerName: "",
    SKU_NO: undefined,
    geolocation: "",
    loading: true,
    message: "",
    // date: new Date()
    date:""
  };
  onInputChange = (event, target) => {
    let obj = {};
    obj[target] = event.target.value;
    this.setState(obj);
  };
  onSubmit = async event => {
    event.preventDefault();
    let accountAdd = JSON.parse(localStorage.getItem('userInfo'))
    const {
      SKU_NO,
      senderAddress,
      receiverAddress,
      ownerName,
      geolocation,
      loading,
      date
    } = this.state;
    console.log(this.state)
    if (
      SKU_NO !== undefined &&
      senderAddress !== "" &&
      receiverAddress !== "" &&
      ownerName !== "" &&
      geolocation !== ""
    ) {
      const chksumSender = await web3.utils.toChecksumAddress(senderAddress);
      const chksumReceiver = await web3.utils.toChecksumAddress(
        receiverAddress
      );
      // const account = await web3.eth.getAccounts();
      // console.log(account);
      this.setState({ loading:false });

      //  const result =
      await Asset.methods
        .transferToOwner(
          senderAddress,
          receiverAddress,
          ownerName,
          SKU_NO,
          geolocation,date
        )
        .send({
          gas: 3000000,
          // from: account[0]
          from :accountAdd.accountAddress
        });
        // Asset.getPastEvents(
        //   'AcceptOwnerships',
        //   {
        //     fromBlock:0,
        //     toBlock:'latest'
        //   },
        //   (err,events) =>{

        //     this.props.assetTransferCom(events);
        //   }
        // )
      // console.log(result)
      // var ClientReceipt = Asset.at("0x38Da83eC922f7D55878f580d0B0862e9cE06d6a3");
      // var listAsset = ClientReceipt.AcceptOwnerships();
      // console.log(listAsset)
      // let 
      // listAsset.watch(function(error,result){
      //   if(!error){
      //     console.log(result);
      //   }
      // })

      this.setState({
        message: `Asset Transfer to address ${receiverAddress} successful.`,
        loading:true
      });
    } else {
      this.setState({
        message: "Please enter all values.",
        loading:true
      });
    }
    
  };
  render() {
    return (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '25%', backgroundColor: 'blue' }}>
          <Navbar history={this.props.history}/>
          </div>
          <div
            style={{ width: "75%",  marginTop: 150, paddingBottom: 140 }}
          >
            <div style={{ width: "50%", margin: "0px auto" }}>
        <Segment inverted>
          <Form inverted>
            <Form.Group widths="equal">
              <Form.Input
              fluid
              label="Sender Address"
                type="text"
                placeholder="Enter Sender Address"
                value={this.state.senderAddress}
                onChange={event => this.onInputChange(event, "senderAddress")}
              />
              <Form.Input
               fluid
               label="Receiver Address"
                type="text"
                placeholder="Enter Receiver Address"
                value={this.state.receiverAddress}
                onChange={event => this.onInputChange(event, "receiverAddress")}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
               fluid
               label="New Owner Name"
                type="text"
                placeholder="Enter New Owner Name"
                value={this.state.ownerName}
                onChange={event => this.onInputChange(event, "ownerName")}
              />
              <Form.Input
               fluid
               label="SKU NO"
                type="number"
                placeholder="Enter SKU NO"
                value={this.state.SKU_NO}
                onChange={event => this.onInputChange(event, "SKU_NO")}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
               fluid
               label="City"
                type="text"
                placeholder="Enter City Name"
                value={this.state.geolocation}
                onChange={event => this.onInputChange(event, "geolocation")}
              />
               <Form.Input
               fluid
               label="Current Time"
                // type="text"
                // placeholder="Enter City Name"
                // disabled
                style={{backgroundColor:'#fff'}}
                value={this.state.date
                  // toDateString()
                }
                onChange={event => this.onInputChange(event, "date")}
              />
            </Form.Group>

            <Button type="submit" onClick={this.onSubmit}>
              Send
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

export default AssetTransfer;
// export default connect(null,null)(AssetTransfer);