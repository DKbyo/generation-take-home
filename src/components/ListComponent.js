import React, { Component } from 'react';
import DetailComponent from './DetailComponent';

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class ListComponent extends Component {

	constructor(props) {
		super(props);
		this.changeText = this.changeText.bind(this);
		this.viewFavorites = this.viewFavorites.bind(this);
		this.state = {
			search: '',
			directory:[],
			searching:false,
			favorites:false
		}
	}
	render() {
		const{search,directory,searching,favorites} =this.state;
		const{parent} = this.props;
		return (
				<div  style={searchStyle}>
					<div className="input-group">
				  	<span className="input-group-addon"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></span>
				  	<input value={search} onChange={this.changeText} type="text" className="form-control" placeholder="Search..." />
				  	<span className="input-group-btn">
				      <button onClick={this.viewFavorites} className="btn btn-default" type="button"><span className="glyphicon glyphicon-bookmark" aria-hidden="true"></span></button>
				    </span>
					</div>
					{searching? (
				    <div className="list-group" style={clickable}>
				     {directory.map((element,index) => (
	 						<a onClick={this.selectFromList.bind(this,element)} key={index} className="list-group-item">
	 						 	<h4 className="list-group-item-heading">
	 						 	<span className={`glyphicon pull-right ${this.getStarClass(element)}`}></span>
	 						 	<span className={title}>{element.Name}</span>
	 						 	</h4>
						  	<p className="list-group-item-text">{element.Address}</p>
						  </a>
				     ))}
						</div>
					):null}
					<DetailComponent ref="detail" parent={parent}/>
				</div>
		);
	}
	getStarClass(element){
		return !element.favorite ? 'glyphicon-star-empty' :'glyphicon-star';
	}
	viewFavorites(){
		this.setState({
			favorites: !this.state.favorites,
			searching: true
		},()=>{
			this.refs.detail.hide();
			this.doSearch(this.state.search);
		});
		
	}
	changeText(event) {
		this.setState({
			search: event.target.value,
			searching: true,
			favorites: false
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
			searching:false,
			favorites: false
		})
	}
	doSearch(search) {
		if(search.trim() == ''){
			return this.setState({
				directory: this.props.parent.directory.filter((f)=>{
										if(this.state.favorites && !f.favorite){
											return false;
										}
										return true;
									})
									.sort((e)=> e.favorite? -1:1)
									.slice(0,5)
			})
		}
		this.setState({
			directory: this.props.parent.directory.filter((f)=> {
				let result = false;

				if(f.searchName) {
					result = f.searchName.indexOf(search)>=0 
				}
				if(f.searchAddress){
					result = result || f.searchAddress.indexOf(search)>=0 
				}
				if(this.state.favorites && !f.favorite){
					return false;
				}
				return result;
			})
			.sort((e)=> e.favorite? -1:1)
			.slice(0,5)
		});
	}
}
const searchStyle ={
	marginTop: '10px',
	marginLeft:'10px',
	width: '320px'
}
const clickable={
	cursor:'pointer'
}
const title ={
	width: 'calc(100% - 20px)',
	display: 'block'
}

