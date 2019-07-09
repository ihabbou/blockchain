import React, { Component } from "react";
import Obama from './Images/Obama.jpg';
import Hillary from './Images/Hillary.jpeg';
import Trump from './Images/Trump.jpg';
import "./Home.css";

const container = {
  paddingTop: 30
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidate: "",
    };
  }

  selectCandidate = (candidate) => {
    this.props.history.push('/VotingForm/'+ candidate)
  }

  render() {
    const { params } = this.props.match
    return (
      <div>
        <h2 className="text-center"> Whom do you wanna see the next time?</h2>
        <div style={container} className="col-md-12 col-md-offset-3 padding-top">
          <img src={Obama} style={imageStyle} class="image"  onClick={() => this.selectCandidate('Obama')}/>
          <img src={Hillary} style={imageStyle} class="image"/>
          <img src={Trump} style={imageStyle} class="image"/>
        </div>
      </div>
    );
  }
}

const imageStyle = {
  height: 300,
  width: 300,
  padding: 10,
  margin: 20
}
