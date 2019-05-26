import React, { Component } from "react";
import dbConfig from "../config";
import {
  Button,
  Menu,
  Icon,
  Image,
  Segment,
  Sidebar,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuBox extends Component {
  constructor(props) {
    super(props)
    this.state = { activeItem: "createasset" };
    console.log(props.history)
    this.navigate = props.history;

  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  logout = () => {

    // console.log(history)
    dbConfig
      .auth()
      .signOut()
      .then(() => {
        alert("User is Logout");
        this.navigate.push('/login')
        localStorage.removeItem('userInfo')
        // localStorage.removeItem('ownerAccount')
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="wide"
      >
        {/* // <Menu size="huge"> */}
        {/* <Sidebar.Pushable as={Segment}> */}
        {/* <Menu.Item name='Create Profile' as={Link} to='/' active={activeItem === 'profile'} onClick={this.handleItemClick} /> */}
        {/* <p style={{color:'#fff',fontSize:24}}>Admin Dashboard</p> */}
        <Header as="h1" style={{ marginTop: 20, color: "#fff" }}>
          <div>
            <Icon name="dashboard" style={{ marginRight: 10 }} />
            Admin Dashboard
          </div>
        </Header>
        <Menu.Item
          name="User"
          as={Link}
          to="/user"
          active={activeItem === "User"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="add circle" style={{ marginRight: 10 }} />
            Create Pages
          </div>
        </Menu.Item>
        <Menu.Item
          name="Publish Pages"
          as={Link}
          to="/publishpagelist"
          active={activeItem === "Publish Pages"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="user" style={{ marginRight: 10 }} />
            Publish Pages
          </div>
        </Menu.Item>
        <Menu.Item
          name="Settings"
          as={Link}
          to="/settings"
          active={activeItem === "Settings"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="setting" style={{ marginRight: 10 }} />
            Settings
          </div>
        </Menu.Item>
        <Menu.Item
          name="DB Connection Tool"
          as={Link}
          to="/dbConnectionTool"
          active={activeItem === "DB Connection Tool"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="sync" style={{ marginRight: 10 }} />
            DB Connection Tool
          </div>
        </Menu.Item>
        <Menu.Item
          name="create asset"
          as={Link}
          to="/createAsset"
          active={activeItem === "createasset"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="add circle" style={{ marginRight: 10 }} />
            Create Asset
          </div>
        </Menu.Item>
        <Menu.Item
          name="Search asset"
          as={Link}
          to="/searchAsset"
          active={activeItem === "Search Asset"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="search" style={{ marginRight: 10 }} />
            Search Asset
          </div>
        </Menu.Item>
        <Menu.Item
          name="Transfer Asset"
          as={Link}
          to="/assetTransfer"
          active={activeItem === "Transfer Asset"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="exchange" style={{ marginRight: 10 }} />
            Transfer Asset
          </div>
        </Menu.Item>
        <Menu.Item
          name="Reports"
          as={Link}
          to="/reports"
          active={activeItem === "Reports"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="area graph" style={{ marginRight: 10 }} />
            Reports
          </div>
        </Menu.Item>
        <Menu.Item
          name="Asset Tracker"
          as={Link}
          to="/assetTracker"
          active={activeItem === "Asset Tracker"}
          onClick={this.handleItemClick}
        >
          <div>
            <Icon name="road" style={{ marginRight: 10 }} />
            Asset Tracker
          </div>
        </Menu.Item>

        <Menu.Item
          name="Log Out"
          active={activeItem === "Log Out"}
          onClick={this.logout}
        >
          <div>
            <Icon name="sign-out" style={{ marginRight: 10 }} />
            Log Out
          </div>
        </Menu.Item>
        {/* <div onClick= {this.logout} > */}
        {/* <Icon name="logout" style={{ marginRight: 10,color:'#fff' }} /> */}
        {/* <h5 style={{color:'#fff'}}>Log Out</h5> */}
        {/* </div> */}

        {/* <Menu.Menu position="right">
          <Menu.Item>
            <Button primary>Log Out</Button>
          </Menu.Item>
        </Menu.Menu> */}

        {/* // </Menu> */}
      </Sidebar>
    );
  }
}
