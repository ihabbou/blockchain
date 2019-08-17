import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './Voted.css';

class Errord extends Component {

    render () {
        return (
            <div className="byebye">
				<h1>Error</h1>
				<h2>This machine is not set up properly. Please check your blockchain.</h2>
				<Button onClick={()=> this.props.history.push('/')}>Close</Button>
			</div>
        );
    }
}

export default Errord;
