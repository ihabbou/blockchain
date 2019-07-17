import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        PreviousHash: "",
        transaction: ""
    };
  }

  onSubmit = () => {
   
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
          <FormGroup controlId="PreviousHash" bsSize="large">
            <ControlLabel>Previous Hash</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.PreviousHash}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="transaction" bsSize="large">
            <ControlLabel>Transaction</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.transaction}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            onClick={this.onSubmit}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
