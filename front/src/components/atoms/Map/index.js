import React, { Component } from 'react';

declare var daum:any;

export class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_added_handler: false }
    sessionStorage.removeItem("lat")
    sessionStorage.removeItem("lng")
  }

  componentDidMount() {
    const el = document.getElementById('map');
    let geocoder = new daum.maps.services.Geocoder();
    let daumMap;

    // new
    if (this.props.meeting_info == null) {
      daumMap = new daum.maps.Map(el, {
        center: new daum.maps.LatLng(37.4615299, 126.9519267),
        level: 4
      });
    }

    // modify
    else {
      daumMap = new daum.maps.Map(el, {
        center: new daum.maps.LatLng(this.props.meeting_info.latitude, this.props.meeting_info.longitude),
        level: 4
      });
    }

    let infowindow = new daum.maps.InfoWindow();

    let marker = new daum.maps.Marker({
      position: daumMap.getCenter()
    });
    marker.setMap(daumMap);

    if (this.props.write == true) {
      if (this.state.is_added_handler == false) {
        daum.maps.event.addListener(daumMap, 'click', function(mouseEvent) {
          sessionStorage.removeItem("lat")
          sessionStorage.removeItem("lng")

          geocoder.coord2Address(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat(), function(result, status) {
            if (status === daum.maps.services.Status.OK) {
                let detailAddr = (!!result[0].road_address ? '<span>도로명주소 : ' + result[0].road_address.address_name + '</span><br />' : '')
                                  + '<span>지번 주소 : ' + result[0].address.address_name + '</span>';
                let content = '<div style="width:300px; height:45px;">' + detailAddr + '</div>';

                // 마커를 클릭한 위치에 표시
                marker.setPosition(mouseEvent.latLng);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
                infowindow.setContent(content);
                infowindow.open(daumMap, marker);

                sessionStorage.setItem("lat", mouseEvent.latLng.getLat())
                sessionStorage.setItem("lng", mouseEvent.latLng.getLng())
            }
          });
        })

        this.forceUpdate()
        this.setState({ is_added_handler: true })
      }
    }
  }

  render() {
    if (this.props.write == true) {
      return (
        <div>
          <div id="map" style={{width:'800px', height:'500px'}} />
        </div>
      )
    }
    else {
      return (
        <div>
          <div id="map" style={{width:'600px', height:'300px'}} />
        </div>
      )
    }
  }
}
