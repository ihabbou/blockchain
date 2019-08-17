import React, { Component } from "react";
import { Image } from 'semantic-ui-react';

import "./Home.css";
import candidates from '../candidates';
import CandidateCard from './CandidateCard';


export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			candidate: {}
		};
	}
	
	selectCandidate = (candidate) => {
		this.setState({id: this.props.match.id});
		this.props.history.push(`/VotingForm/${this.state.id}/${candidate}`);
	}

	render() {
		const { params } = this.props.match
	//	const candidates = JSON.parse("./candidates.json");
		const allcandidates = candidates.candidates;
		console.log('candidates', candidates);
		return (
			<div className="parent-container">
				<div className="home-title-container">
					<div>
						
						<h2 className="text-center home-title">who should be the next president?</h2>
					</div>
					<Image src={require("./Images/america.jpg")} />
					
				</div>
				<div style={container} className="col-md-12 col-md-offset-3 padding-top">
				{ candidates && allcandidates.map((candidate, index) => 
                    (
					<div>
                        <CandidateCard candidate={candidate} id={params.id}/>
						<div style={{clear:"both",marginBottom:"50px"}}></div>
					</div>
                    ))}
				</div>
			</div>
		);
	}
}

const container = {
	paddingTop: 30
}
