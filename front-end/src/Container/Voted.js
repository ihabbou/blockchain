import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './Voted.css';

class Voted extends Component {

	componentWillMount() { 
		this.props.history.push('/voted');
	} 

    render () {
        return (
            <div className="byebye">
				<h1>Thank you for voting</h1>
				<Button onClick={()=> this.props.history.push('/')}>Close</Button>
			</div>
        );
    }
}

export default Voted;
