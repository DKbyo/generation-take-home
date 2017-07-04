import React, { Component } from 'react';
import * as Directory from '../../store_directory_with_location.json';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class DetailComponent extends Component {

	constructor(props) {
		super(props);
		this.toggleFavorite = this.toggleFavorite.bind(this);
		this.state = {
			data: {
				Name:'',
				Address:''
			},
			favorite:false,
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
						    <h3  className="panel-title">
						   		<span style={clickable} onClick={this.toggleFavorite} className={`glyphicon pull-right ${this.getStarClass()}`}></span>
						    	<span style={title}>{data.Name} </span>
						    </h3>
						  </div>
						  <div className="panel-body">
						    {data.Address}
						  </div>
						</div>
					):null}
				</div>
		);
	}

	getStarClass(){
		return !this.state.favorite ? 'glyphicon-star-empty' :'glyphicon-star';
	}

	toggleFavorite() {
		let newFavorite = !this.state.favorite;
		this.setState({
			favorite:newFavorite
		})
		this.props.parent.toggleFavorite(this.state.data, newFavorite);
	}

	setData(data) {
		this.setState({
			data: data,
			favorite: data.favorite,
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
const title ={
	width: 'calc(100% - 20px)',
	display: 'block'
}
const clickable={
	cursor: 'pointer'
}

