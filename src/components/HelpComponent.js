import React, { Component } from 'react';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class HelpComponent extends Component {

	render() {
		return (
			<div style={buttonStyle} >
				<button   data-toggle="modal" data-target="#modalHelp"  className="btn btn-primary"><span className="glyphicon glyphicon-question-sign"></span></button>
			</div>
		);
	}

}
const buttonStyle ={
	marginTop: '10px',
	marginRight: '10px'
}
const buttonMargin ={
	marginRight:'10px'
}