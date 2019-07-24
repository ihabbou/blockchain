import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';

import CandidateCard from './CandidateCard';

import candidates from './candidates';
import './CandidateCard.css';
class Vote extends Component {

	state = {
		candidate: {}
	} 
	
    onSubmit = () => {
		console.log("DO TRANSACTION HERE");
		console.log(this.state.candidate);
		var trax = {
			"type": 2,
			"data": {
				"id": "f742af4df780a7548618cc7ddfc4093e639231d859d379b09cc13bf85ec75e8d",
				"input": [{
					"id": "6b929a9a2155b6e65fafd6f44e0e0555b15e86dd6a06b148a5854977ed74511e",
					"index": 0,
					"ScriptSig": "3045022100d2c4664474d83ed9ee8ac7913f1ea5fb8361df0c0df9441a3ad7255637119353022006ba1111585888163bc69fd15e330abcc0402968a26ffba5d72571e8666a7748"
				}],
				"output": [{
					"amount": 5,
					"ScriptPubKey": "04ca9b99a5ab136427796ac59ce777a8c5e62d7b803736952f9d22c43b09c6a51e0018bfe35fc2c512c5103df6be8b995d4421e1535eb412dedc730b5624f973ba"
				}, {
					"amount": 45,
					"ScriptPubKey": "0422ccf505c5ea676cccb6960df1a2ed1444628efbaa71c40dfe8449e32fb5a3fd730b28c7bcb2f6d2ee0ea3d1057ee910d202125b5d02e25d792716ff2563462c"
				}]
			}
		}
		
		this.props.history.push('/voted?tx='+JSON.stringify(trax));
		fetch("http://localhost:8001/", {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: {dooba: "dobbado"}
		}).then((data) => {
			console.log('Request succeeded with JSON response', data);
		}).catch((error) => {
			console.error('Request failed', error);
		});
		console.log("Dribs and Drabs");
	}
	
	componentWillMount() {
		const { id } = this.props.match.params;
		const candidate = candidates.candidates.find(cand => {
			return cand.id === id
		});
		this.setState({candidate: candidate})
    }


    render () {
        return (
			<div className="candContainer">
            <Form onSubmit={this.onSubmit} >
				<Header as='h1'>{this.state.candidate.name}</Header>
				<CandidateCard final candidate={this.state.candidate} />
				
            </Form>
			</div>
        );
    }
}

export default Vote;
