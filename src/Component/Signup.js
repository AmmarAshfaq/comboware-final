import React from "react";
import Background from '../Image/background.jpg'
import { signupAction } from '../store/action';
import { connect } from 'react-redux';
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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountPassword: ""
    };
  }
  signIn = () => {
    this.props.history.push('/')
  }
  updateValue = (ev, target) => {
    let obj = {};
    obj[target] = ev.target.value;
    this.setState(obj);
  };

  handelFormSubmit = () => {
    const { email, password, confirmPassword, name } = this.state;
    console.log(this.state)
    if (password === confirmPassword && password !== "") {
      this.props.signUpUser({ email, password, name, confirmPassword, history: this.props.history });
    } else {
      // this.props.authSignUpError("Password Doesn't match")
      alert("Password doesn't match");
    }
    this.setState({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",

    });
    // const { accountPassword } = this.state;

    // if (accountPassword.length > 4) {
    //   this.props.signUpUser({
    //     password: accountPassword
    //   })
    // } else {
    //   alert("Please enter password greater then 4 character ");
    // }

    // this.setState({
    //   accountPassword: ""
    // })
  }
  render() {
    // console.log(this.state)
    return (
      <div style={style.root}>
        <div style={style.paperWapper}>
          <div>
            <h1 style={style.heading}>Sign Up</h1>
            {/* <input
              onChange={event=> this.setState({accountPassword:event.target.value})}
              value={this.state.accountPassword}
              style={style.textStyle}
              type="text"
              placeholder="name"
            /> */}

            <br />
            <input
              onChange={event => {
                this.updateValue(event, "name");
              }}
              value={this.state.name}
              style={style.textStyle}
              type="text"
              placeholder="name"
            />

            <br />
            <input
              onChange={event => {
                this.updateValue(event, "email");
              }}
              value={this.state.email}
              style={style.textStyle}
              type="email"
              placeholder="Email"
            />

            <br />
            <input
              onChange={event => {
                this.updateValue(event, "password");
              }}
              value={this.state.password}
              style={style.textStyle}
              type="password"
              placeholder="Password"
            />
            <br />
            <input
              onChange={event => {
                this.updateValue(event, "confirmPassword");
              }}
              value={this.state.confirmPassword}
              style={style.textStyle}
              type="password"
              placeholder="Confirm Password"
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

            <button
              onClick={this.handelFormSubmit}
              style={style.button}
            >
              SIGN UP
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
              Already have an account?
            </p>
            <h3
              style={{ color: "#000", cursor: "pointer" }}
              onClick={this.signIn}
            >
              LOG IN NOW
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  return {
    signUpUser: data => dispatch(signupAction(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
