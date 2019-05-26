import React, { Component } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import Asset from "../Asset";
import Navbar from "../Container/Navbar";
import { Dropdown } from "semantic-ui-react";
import { showAssetCreate } from '../store/action'
const selectType = [
  {
    key: "Bar",
    text: "Bar",
    value: "Bar"
  },
  {
    key: "Pie",
    text: "Pie",
    value: "Pie"
  },
  {
    key: "Line",
    text: "Line",
    value: "Line"
  }
];
export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: '',
      charData: {
        labels: [
          "3/11/2019",
          "4/11/2019",
          "5/11/2019",
          "6/11/2019",
          "7/11/2019",
          "8/11/2019"
        ],
        datasets: [
          {
            label: "Population",
            data: [50, 100, 150, 200, 300, 200],
            backgroundColor: [
              "rgba(100,99,200,0.6)",
              "rgba(100,145,150,0.6)",
              "rgba(255,199,100,0.6)",
              "rgba(255,145,220,0.6)",
              "rgba(100,99,212,0.6)",
              "rgba(100,99,202,0.6)"
            ]
          }
        ]
      },
      charAsset: {
        labels: [
          "3/11/2019",
          "4/11/2019",
          "5/11/2019",
          "6/11/2019",
          "7/11/2019",
          "8/11/2019"
        ],
        datasets: [
          {
            label: "Population",
            data: [50, 100, 50, 200, 100, 200],
            backgroundColor: [
              "rgba(100,99,200,0.6)",
              "rgba(100,145,150,0.6)",
              "rgba(255,199,100,0.6)",
              "rgba(255,145,220,0.6)",
              "rgba(100,99,212,0.6)",
              "rgba(100,99,202,0.6)"
            ]
          }
        ]
      }
    };
  }
  getSelectValue = (event, { value }) => {
    // console.log(value);
    let select_value = event.target.textContent;
    console.log(select_value);
    this.setState({
      selectValue: select_value
    })
  }
  componentWillMount() {
    Asset.getPastEvents(
      "AssetCreate",
      {
        fromBlock: 0,
        toBlock: "latest"
      },
      (err, events) => {
        // console.log(events)
        if (events !== undefined) {
          console.log(events, "asset receive");
          events.map(item => {

            let currentDate = new Date();
            console.log('current date', currentDate)
            var weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
            currentDate.setTime(currentDate.getTime() - weekInMilliseconds);
            // console.log('one week earlierDate', currentDate)
            let currentDateValue = currentDate;
            console.log(item.returnValues.date)
            for (var i = 1; i < 7; i++) {
              console.log(currentDateValue, 'valid')
              let next = new Date();
              console.log(next.toLocaleString(), 'date new')
              // console.log(next,'xxxxxxxxxxxxxxxxxxxx')
              next.setDate(15 - i);

              console.log(next, 'week');
            }
            let dateCHange = new Date(item.returnValues.date)
            // console.log(dateCHange, "dates")
            let seconds = dateCHange.getTime()
            console.log(seconds)
          })
          // https://www.dyclassroom.com/javascript-code/create-an-array-of-dates-between-start-date-and-end-date-in-javascript
          // this.props.assetTransferCom(events);
        } else {
          alert("Please Check Your Internet Connection");
        }
      }
    );
  }
  render() {
    // console.log(this.state.selectType[0].value)
    console.log(this.state.selectValue)
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "25%", backgroundColor: "blue" }} >
          <Navbar history={this.props.history} />
        </div>

        <div style={{ width: "75%" }}>
          <div style={{ width: "90%", margin: "0px auto", }}>
            <div style={{ marginTop: 40, width: "40%", }}>
              <Dropdown
                placeholder="Select"
                fluid
                selection
                options={selectType}
                onChange={this.getSelectValue}

              />
            </div>
            {this.state.selectValue === "Line" ?
              <div>
                <h1 style={{ textAlign: "center" }}>Asset Created</h1>
                <div>
                  <Line
                    data={this.state.charData}
                    width={100}
                    height={300}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
                <h1 style={{ textAlign: "center" }}>Asset Transfer</h1>

                <div>
                  <Line
                    data={this.state.charAsset}
                    width={100}
                    height={300}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
              : this.state.selectValue === 'Bar' ?

                <div>
                  <h1 style={{ textAlign: "center" }}>Asset Created</h1>
                  <div>
                    <Bar
                      data={this.state.charData}
                      width={100}
                      height={300}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                  <h1 style={{ textAlign: "center" }}>Asset Transfer</h1>

                  <div>
                    <Bar
                      data={this.state.charAsset}
                      width={100}
                      height={300}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
                :
                <div>
                  <h1 style={{ textAlign: "center" }}>Asset Created</h1>
                  <div>
                    <Pie
                      data={this.state.charData}
                      width={100}
                      height={300}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                  <h1 style={{ textAlign: "center" }}>Asset Transfer</h1>

                  <div>
                    <Pie
                      data={this.state.charAsset}
                      width={100}
                      height={300}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
