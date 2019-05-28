import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery"

declare var daum:any;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_added_handler: false }
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

    if (this.state.is_added_handler == false) {
      daum.maps.event.addListener(daumMap, 'click', function(mouseEvent) {
        let latitue_longitude = mouseEvent.latLng;
        marker.setPosition(latitue_longitude);
        alert('위도:' + latitue_longitude.getLat() + ', 경도:' + latitue_longitude.getLng())
      })
      this.forceUpdate()
      this.setState({ is_added_handler: true })
    }
  }
  render() {
    return (
      <div>
        <div id="map" style={{width:'800px',height:'500px'}} />
      </div>
    )
  }
}

$(document).ready(function () {
    ReactDOM.render(<Map />, document.getElementById('map'));
});

export default Map;
