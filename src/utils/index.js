import React from 'react';
import ReactDOM from 'react-dom';

let createDiv = (Component,parent)=>{
	let newDiv = document.createElement('div');
	
	let child = ReactDOM.render(<Component parent={parent}>
							</Component>, newDiv);
	return {
		div:newDiv,
		child:child
	};
}

export {createDiv};
