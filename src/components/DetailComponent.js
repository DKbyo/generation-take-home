import React, { Component } from 'react';
import * as Directory from '../../store_directory_with_location.json';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class DetailComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
				Name:'',
				Address:''
			},
			visible:false
		}
	}
	render() {
		const{data,visible} =this.state;
		return (
				<div style={searchStyle}>
					{visible?(
						<div className="panel panel-default">
						  <div className="panel-heading">
						    <h3 className="panel-title">{data.Name}</h3>
						  </div>
						  <div className="panel-body">
						    {data.Address}
						  </div>
						</div>
					):null}
				</div>
		);
	}

	setData(data) {
		this.setState({
			data: data,
			visible:true
		});
	}
	hide(){
		this.setState({
			visible:false
		});
	}

}
const searchStyle ={
	marginTop: '10px'
}

