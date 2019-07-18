import React, { Component } from 'react';
import { Form, Button, Header } from 'semantic-ui-react';

import CandidateCard from './CandidateCard';

import candidates from './candidates';

class Vote extends Component {

	state = {
		candidate: {}
	} 
	
    onSubmit = () => {
		console.log("DO TRANSACTION HERE");
		console.log(this.state.candidate)
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
            <Form onSubmit={this.onSubmit} >
				<Header as='h1'>{this.state.candidate.name}</Header>
				<CandidateCard candidate={this.state.candidate} />
				
                <Button primary>Vote</Button>
            </Form>
        );
    }
}

export default Vote;
