
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './CandidateCard.css';

class CandidateCard extends Component {

	render () {
		const { candidate, final } = this.props;
		console.log('candidate:::', candidate)
		return (
		<Card centered className='prodCard cart-item'>
			<Card.Content className="imageCard">
				<Image alt={`${candidate.name}`} src={require(`./Images/${candidate.image}`)} />
			</Card.Content>
			<Card.Content className="card-info">
				<Card.Header as='h2'>{candidate.name}</Card.Header>
				<Card.Description><b>Party: </b>{candidate.party}</Card.Description>
				<Card.Description><b>Vice President: </b>{candidate.vice}</Card.Description>
				{!final ? <div >
					<Button className='vote-button' as={Link} to={`/vote/${candidate.id}`}>Vote</Button>
				</div>: 
				<div>
					<Button className='vote-button' primary>Vote</Button>
				</div>}
			</Card.Content>
		</Card>
		);
	}
}

export default (CandidateCard);
