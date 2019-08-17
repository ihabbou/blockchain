
import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './CandidateCard.css';

class CandidateCard extends Component {
	render () {
		const { candidate, final, solo, id } = this.props;
		let imgClasses= "imageCard"
		let cardInfoClasses= "card-info"

		return (
		<Card centered  style={{textAlign:'center'}}  className='candCard cart-item'>
			<Card.Content style={solo?{margin:"0 auto", float:"none"}:{}}  className={imgClasses}>
				<Image  className={this.props.solo?"centerify":""} alt={`${candidate.name}`} src={require(`./Images/${candidate.image}`)} />
			</Card.Content>
			<Card.Content style={solo?{margin:"0 auto", float:"none"}:{}} className={cardInfoClasses}>
				{!solo &&<Card.Header as='h2'>{candidate.name}</Card.Header>}
				<Card.Description><b>Party: </b>{candidate.party}</Card.Description>
				<Card.Description><b>Vice President: </b>{candidate.vice}</Card.Description>
				{!final ? <div >
					<Button className='vote-button' as={Link} to={`/vote/${id}/${candidate.id}`}>Vote</Button>
				</div>: 
				<div>
					<Button style={solo?{margin:"0 auto", float:"none", fontWeight:"bold"}:{}} className='vote-button ' primary>Confirm</Button>
					<br/>
					<Link style={solo?{ color:"black"}:{}} to={"/Home/"+id}>Back</Link>
				</div>}
			</Card.Content>
		</Card>
		);
	}
}

export default (CandidateCard);
