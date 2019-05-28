import React, { Component } from 'react';

declare var daum:any;

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const el = document.getElementById('map');
    let daumMap = new daum.maps.Map(el, {
      center: new daum.maps.LatLng(37.4615299, 126.9519267),
      level: 4
    });
    this.setState({
      lat:37.4615299,
      lng:126.9519267
    })
    let marker = new daum.maps.Marker({
      position: daumMap.getCenter()
    });
    marker.setMap(daumMap);
  }
  render() {
    return (
      <div>
        <div id="map" style={{width:'800px',height:'500px'}} />
      </div>
    )
  }
}

export default Map;
