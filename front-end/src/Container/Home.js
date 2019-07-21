import React, { Component } from "react";
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Vote from './Vote';

import Obama from './Images/Obama.jpg';
import Hillary from './Images/Hillary.jpeg';
import Trump from './Images/Trump.jpg';
import "./Home.css";
import candidates from './candidates';
import CandidateCard from './CandidateCard';


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
	//	const candidates = JSON.parse("./candidates.json");
		const allcandidates = candidates.candidates;
		console.log('candidates', candidates);
		return (
			<div>
				<div className="home-title-container">
					<h2 className="text-center home-title">who should be the next president?</h2>
				</div>
				<div style={container} className="col-md-12 col-md-offset-3 padding-top">
				{ candidates && allcandidates.map((candidate, index) => 
                    (
					<div>
                        <CandidateCard candidate={candidate} />
						<div style={{clear:"both",marginBottom:"50px"}}></div>
					</div>

                    ))}
{/*
					<div>
						<img alt={Obama} src={Obama} style={imageStyle} class="image" onClick={() => this.selectCandidate('Obama')}/>
						<h3>Obama</h3>
					</div>
					<img src={Hillary} style={imageStyle} class="image"/>
					<img src={Trump} style={imageStyle} class="image"/>*/}
				</div>
			</div>
		);
	}
}

const styles = {

}
const container = {
	paddingTop: 30
}
const imageStyle = {
	height: 300,
	width: 300,
	padding: 10,
	margin: 20
}
