import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateAsset from "./Component/CreateAsset";
import Search from "./Component/SearchAsset";
import CreateProfile from "./Component/CreateProfile";
import AssetTransfer from "./Component/AssetTransfer";
import Background from './Image/background.jpg'
import Graph from './Component/Graph';
import AssetTracker from './Component/AssetTracker';
import User from './Component/User';
import Setting from './Component/Settings';
import Login from './Component/Login'
import SignUp from './Component/Signup';
import Loading from './Component/Loading'
import ConnectionDB from './Component/Connection';
import Publish from './Component/Publish'
import PublicPageDetail from './Component/PublicPageDetail';
import PublicPage from './Component/PublicPage'
export default () => {
  return (
    <Router>
      <div style={{
        backgroundImage: "url(" + Background + ")",
        height: "100%",

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        {/* <Navbar /> */}
        <Route exact path="/" component={Loading} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/searchAsset" component={Search} />
        <Route path="/createAsset" component={CreateAsset} />
        <Route path="/assetTransfer" component={AssetTransfer} />
        <Route path="/reports" component={Graph} />
        <Route path="/assetTracker" component={AssetTracker} />
        <Route path="/user" component={User} />
        <Route path="/settings" component={Setting} />
        <Route path="/dbConnectionTool" component={ConnectionDB} />
        <Route path="/publishpagelist" component={Publish} />
        <Route path="/publicpage" component={PublicPage}/>
        <Route path="/publishpage/:publish" component={PublicPageDetail}/>

      </div>
    </Router>
  );
};
