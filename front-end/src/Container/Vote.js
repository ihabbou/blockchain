import React, { Component } from 'react';
import { Form, Image,Header } from 'semantic-ui-react';

import CandidateCard from './CandidateCard';

import candidates from '../candidates';
import './CandidateCard.css';
class Vote extends Component {

	state = {
		id: "",
		candidate: {}
	} 
	
    onSubmit = () => {
		console.log(this.state.id);
		console.log("voted for :");
		console.log(this.state.candidate);
		
		var trax = {
			"key": this.state.id,
			"candidate": this.state.candidate
		}
		
		this.props.history.push('/voted?tx='+JSON.stringify(trax));
		fetch("http://localhost:7999/", {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: {dooba: "dobbado"}
		}).then((data) => {
			console.log('Vote passed to the blockchain node: ', data);
		}).catch((error) => {
			console.error('Request failed', error);
			this.props.history.push('/error');
		});
		console.log("Vote attempted");
	}
	
	componentWillMount() {
		const { id, cand } = this.props.match.params;
		const candidate = candidates.candidates.find(candid => {
			return candid.id === cand
		});
		this.setState({id: id, candidate: candidate});
		console.log(`You are ${id} voting for ${candidate.id}`);
    }

    render () {
        return (
			<div className="candContainer"  style={{textAlign:'center'}} >
				<div className="home-title-container">
					<div>
						<Image src={require("./Images/america.jpg")} />
					</div>
					<h2 className="text-center home-title">is this your one?</h2>
				</div>
            <Form onSubmit={this.onSubmit}   style={{textAlign:'center'}}  >
				<Header style={{textAlign:'center'}} as='h1'>{this.state.candidate.name}</Header>
				<div style={{width:"100%", alignItems: 'center'}}>
					<CandidateCard solo final candidate={this.state.candidate} />
				</div>
            </Form>
			</div>
        );
    }
}

export default Vote;
