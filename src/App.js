import React, { Component } from "react";
import web3 from "./web3";
import Asset from "./Asset";
import Routes from "./Routes";
// import "semantic-ui-css/semantic.min.css";
import Navbar from "./Container/Navbar";
import { Provider } from 'react-redux';
import store from './store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">

          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;
