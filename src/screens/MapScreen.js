import React, { Component } from 'react';
import HelpComponent from '../components/HelpComponent';
import ListComponent from '../components/ListComponent';
import {createDiv} from '../utils';
import * as Directory from '../../store_directory_with_location.json';

const CDMX_LOCATION = {
        lat:19.432778,
        lng: -99.133333
};

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.selectInMap = this.selectInMap.bind(this);
  }
  componentDidMount() {
    this.initMap();
    this.initList();
  }
  render() {
    return (
        <div style={MapStyle}>
          <div id="modalHelp" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Instructions</h4>
                </div>
                <div className="modal-body">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
          <div ref="map" style={MapStyle}>
            
          </div>
      </div>
    );
  }
  selectInMap(data) {
    let marker = this.markers[data.Name];
    this.selectMarker(marker,data,true);
  }

  selectMarker(marker,data,center){
    if(this.lastMarker){
      this.lastMarker.setIcon({
        url: '/static/images/marker1.png',
        scaledSize:new google.maps.Size(30,30)
      });
    }
    this.list.child.selectData(data);
    marker.setIcon({
        url: '/static/images/marker2.png',
        scaledSize:new google.maps.Size(30,30)
    })
    if(center) {
      this.map.panTo(marker.getPosition());
    }
    this.lastMarker = marker;
  }

  initMap() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: CDMX_LOCATION,
      mapTypeControl:false
    });
    this.help= createDiv(HelpComponent,this);
    this.list = createDiv(ListComponent,this);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(this.help.div);    
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.list.div);    

    this.markers ={};
    this.directory = Object.values(Directory);
    this.directory = this.directory.slice(0,this.directory.length-1);
    this.directory.forEach((d,index)=>{
      let marker = new google.maps.Marker({
          position: {
            lat: d.Lat,
            lng: d.Lng
          },
          map: this.map,
          icon:{
            url:'/static/images/marker1.png',
            scaledSize:new google.maps.Size(30,30)
          }
      });
      marker.addListener('click', ()=> {    
        this.selectMarker(marker,d);
      });
      this.markers[d.Name] = marker;
    });
  }
  initList(){
    
  }
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var MapStyle = {
  height: '100%'
};