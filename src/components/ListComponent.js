import React, { Component } from 'react';
import * as Directory from '../../store_directory_with_location.json';
import DetailComponent from './DetailComponent';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class ListComponent extends Component {

	constructor(props) {
		super(props);
		this.changeText = this.changeText.bind(this);
		this.state = {
			search: '',
			directory:[],
			searching:false
		}
		this.data = Object.values(Directory);
		this.data = this.data.map((e) =>({ Name:e.Name , Address:e.Address, searchName:e.Name? e.Name.toLowerCase():undefined, searchAddress: e.Address? e.Address.toLowerCase(): undefined}));
	}
	render() {
		const{search,directory,searching} =this.state;
		return (
				<div className="col-md-4 col-xs-6" style={searchStyle}>
					<div className="input-group">
				  	<span className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
				  	<input value={search} onChange={this.changeText} type="text" className="form-control" placeholder="Places" />
					</div>
					{searching? (
				    <div className="list-group" style={clickable}>
				     {directory.map((element,index) => (
	 						<a onClick={this.selectFromList.bind(this,element)} key={index} className="list-group-item">
	 						 	<h4 className="list-group-item-heading">{element.Name}</h4>
						  	<p className="list-group-item-text">{element.Address}</p>
						  </a>
				     ))}
						</div>
					):null}
					<DetailComponent ref="detail"/>
				</div>
		);
	}

	changeText(event) {
		this.setState({
			search: event.target.value,
			searching: true
		});
		this.refs.detail.hide();
		this.doSearch(event.target.value.toLowerCase());
	}
	selectFromList(data){
		this.selectData(data);
		this.props.parent.selectInMap(data);
	}
	selectData(data){
		this.refs.detail.setData(data);
		this.setState({
			searching:false
		})
	}
	doSearch(search) {
		if(search.trim() == ''){
			return this.setState({
				directory:[]
			})
		}
		this.setState({
			directory: this.data.filter((f)=> {
				let result = false;
				if(f.searchName) {
					result = f.searchName.indexOf(search)>=0 
				}
				if(f.searchAddress){
					result = result || f.searchAddress.indexOf(search)>=0 
				}
				return result;
			}).slice(0,5)
		});
	}
}
const searchStyle ={
	marginTop: '10px'
}
const clickable={
	cursor:'pointer'
}

