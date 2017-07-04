import React, { Component } from 'react';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class HelpComponent extends Component {

	render() {
		return (
			<button  data-toggle="modal" data-target="#modalHelp" style={buttonStyle} className="btn btn-primary"><span className="glyphicon glyphicon-question-sign"></span></button>
		);
	}

}
const buttonStyle ={
	marginTop: '10px',
	marginRight: '10px'
}