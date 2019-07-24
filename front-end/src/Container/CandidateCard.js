
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './CandidateCard.css';

class CandidateCard extends Component {
	constructor(props){
		super(props)
	}


	render () {
		const { candidate, final } = this.props;
		console.log('candidate:::', candidate)
		let imgClasses= "imageCard"+ this.props.solo?"no-float":"";
		let cardInfoClasses= "card-info" + this.props.solo?"no-float":"";

		return (
		<Card centered  style={{textAlign:'center'}}  className='candCard cart-item'>
			<Card.Content  className={imgClasses}>
				<Image className={this.props.solo?"centerify":""} alt={`${candidate.name}`} src={require(`./Images/${candidate.image}`)} />
			</Card.Content>
			<Card.Content className={cardInfoClasses}>
				{!this.props.solo &&<Card.Header as='h2'>{candidate.name}</Card.Header>}
				<Card.Description><b>Party: </b>{candidate.party}</Card.Description>
				<Card.Description><b>Vice President: </b>{candidate.vice}</Card.Description>
				{!final ? <div >
					<Button className='vote-button' as={Link} to={`/vote/${candidate.id}`}>Vote</Button>
				</div>: 
				<div>
					<Button className='vote-button no-float centerify' primary>Vote</Button>
				</div>}
			</Card.Content>
		</Card>
		);
	}
}

export default (CandidateCard);
