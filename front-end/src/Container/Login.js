import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publicKey: "",
      password: ""
    };
  }

  onSubmit = () => {
    this.props.history.push('/Home/'+this.state.publicKey)
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="publicKey" bsSize="large">
            <ControlLabel>Your Public key</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.publicKey}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            onClick={this.onSubmit}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
