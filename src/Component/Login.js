import React from "react";
import Background from "../Image/background.jpg";
import { loginAction } from "../store/action";
import { connect } from "react-redux";
const style = {
  paperWapper: {
    width: "30%",
    margin: "100px auto 0px",
    border: "3px solid #E8E8E8",
    backgroundColor: "#fff",
    color: "#fff",
    textAlign: "center",
    borderRadius: 15
  },
  textStyle: {
    width: "80%",
    // color: "#fff",
    marginBottom: 8,
    boxShadow: "none"
  },
  button: {
    width: "80%",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "10px",
    marginLeft: "10px",
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: 10
  },
  heading: {
    color: "#fff",
    backgroundColor: "#000",
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 50,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 32
  },
  root: {
    backgroundImage: "url(" + Background + ")",
    padding: 50
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accountAddress:""
    };
  }

  register = () => {
    // browserHistory.push('/signup')
    this.props.history.push("/signup");
  };
  updateValue = (ev, target) => {
    // console.log(target);
    // console.log(ev.target.value);
    let obj = {};
    obj[target] = ev.target.value;
    this.setState(obj);
  };

  signIn = () => {
    const { email, password , accountAddress} = this.state;
    if (email.trim() !== "" && password !== ""
    // && accountAddress !== ""
    ) {
      this.props.signInUser({ email, password, accountAddress ,history: this.props.history });
    } else {
      // this.showAlertMessage('Data Badly Formated')
      alert("Data Badly Formated");
      // this.props.loaderOff()
    }
  };

  render() {
    return (
      <div style={style.root}>
        <div style={style.paperWapper}>
          <div>
            <h1 style={style.heading}>Sign In</h1>

            <input
              onChange={event => this.updateValue(event, "email")}
              value={this.state.email}
              placeholder="email"
              style={style.textStyle}
            />

            <br />
            <input
              onChange={event => {
                this.updateValue(event, "password");
              }}
              value={this.state.password}
              style={style.textStyle}
              type="password"
              // label='Password'
              placeholder="Password"
            />

            <br />
            <input
              onChange={event => {
                this.updateValue(event, "accountAddress");
              }}
              value={this.state.accountAddress}
              style={style.textStyle}
              type="text"
              // label='Password'
              placeholder="Enter Account Address"
            />
            
            <br />

            {/* <p
              style={{
                fontSize: 16,
                color: "silver",
                float: "right",
                marginRight: 35
              }}
            >
              Forgot{" "}
              <span
                style={{ color: "#3c806d", cursor: "pointer" }}
                // onClick={this.changeRoute.bind(this)}
              >
                Password?
              </span>{" "}
            </p> */}
            {/* </span> */}
            <br />
            <br />
            {/* {this.props.loader ? (
            <Loader type='Oval' color='#000' height={50} width={50} />
          ) : null} */}

            <button onClick={this.signIn} style={style.button}>
              SIGN IN
            </button>
            <br />
            <br />
            <br />
            <br />
            <br />

            <p
              style={{
                color: "silver",
                lineHeight: "0.2em"
              }}
            >
              Don't have an account?
            </p>
            <h3
              style={{ color: "#000", cursor: "pointer" }}
              onClick={this.register}
            >
              SIGN UP NOW
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    signInUser: data => dispatch(loginAction(data))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
