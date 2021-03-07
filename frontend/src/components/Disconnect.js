import React, { Component } from 'react';
import * as API from '../api/api.js';
import { connect } from 'react-redux';

import { disconnectUser } from '../Store/actions/profilAction.js';

class Disconnect extends Component {

	constructor(props)
	{
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(e){
		this.props.dispatch(disconnectUser());
		this.props.closeAction(); 
	}

	render(){
		return(
			<p className="exit valign-wrapper center row" onClick={this.clickHandler} ><span className="col s10 push-s1">Sortir</span><i className="material-icons col s2">exit_to_app</i></p>
			);
	}
}

const mapStateToProps = state => {return {...state}};

export default connect(mapStateToProps)(Disconnect);