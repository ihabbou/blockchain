
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './CandidateCard.css';

class CandidateCard extends Component {

	render () {
		const { candidate } = this.props;
		console.log('candidate:::', candidate)
		return (
		<Card centered className='prodCard'>
			<Card.Content textAlign="left">
				<Card.Header as='h2'>{candidate.name}</Card.Header>
			</Card.Content>
			<Card.Content className="imageCard">
				<Image alt={`${candidate.name}`} src={require(`./Images/${candidate.image}`)} />
			</Card.Content>
			<Card.Content>
				<Card.Description><b>Party: </b>{candidate.party}</Card.Description>
				<Card.Description><b>Vice President: </b>{candidate.vice}</Card.Description>
			</Card.Content>
		</Card>
		);
	}
}


const mapStateToProps = state => ({
    product: state.product
});

export default (CandidateCard);
