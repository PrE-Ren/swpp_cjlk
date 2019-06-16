import React, { Component } from 'react';

declare var daum:any;

// meeting_info : id, title, created, due, min_people, max_people, description, state, kind,
//                leader, leaderid, picture, members, comments, latitude, longitude, kakao_link
// write : 조작 가능 여부
export class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = { is_added_handler: false }
    sessionStorage.removeItem("lat")  //  이전 자료는 날려야 함
    sessionStorage.removeItem("lng")  //  이전 자료는 날려야 함
  }

  // 렌더링된 직후에 실행되는 함수
  componentDidMount() {
    const map_container = document.getElementById('map')  //  지도를 표시할 element
    let daumMap       //  지도
    let map_position  //  지도 옵션
    let marker        //  위치를 표시할 마커
    let infowindow    //  주소를 보여줄 창
    let geocoder      //  주소-좌표 변환 객체

    // 모임 정보를 보려는 경우
    if (this.props.write == false) {
      map_position = { center: new daum.maps.LatLng(this.props.meeting_info.latitude, this.props.meeting_info.longitude), level: 4 }  //  모임 위치
      daumMap = new daum.maps.Map(map_container, map_position)          //  지도 생성
      marker = new daum.maps.Marker({ position: daumMap.getCenter() })  //  모임 위치를 표시할 마커 생성 (아직 보이지는 않음)
      marker.setMap(daumMap)                                            //  마커를 지도 위에 표시
    }

    // 모임을 생성 혹은 수정하려는 경우
    else if (this.props.write == true) {
      console.log("아나")
      console.log(this.props.meeting_info)

      // New (모임 생성)
      if (this.props.meeting_info == null) {
        map_position = { center: new daum.maps.LatLng(37.4615299, 126.9519267), level: 4 }  //  기본 위치
        sessionStorage.setItem("lat", 37.4615299)   //  한 번도 클릭하지 않았을 경우를 대비하여 초기화
        sessionStorage.setItem("lng", 126.9519267)  //  한 번도 클릭하지 않았을 경우를 대비하여 초기화
      }

      // Modify (모임 수정)
      else {
        if (this.props.meeting_info.latitude == 0 && this.props.meeting_info.longitude == 0) {
          map_position = { center: new daum.maps.LatLng(37.4615299, 126.9519267), level: 4 }  //  모임 위치
          sessionStorage.setItem("lat", 37.4615299)   //  한 번도 클릭하지 않았을 경우를 대비하여 초기화
          sessionStorage.setItem("lng", 126.9519267)  //  한 번도 클릭하지 않았을 경우를 대비하여 초기화
        }
        else {
          map_position = { center: new daum.maps.LatLng(this.props.meeting_info.latitude, this.props.meeting_info.longitude), level: 4 }  //  모임 위치
          sessionStorage.setItem("lat", this.props.meeting_info.latitude)   //  한 번도 클릭하지 않았을 경우를 대비하여 초기화
          sessionStorage.setItem("lng", this.props.meeting_info.longitude)  //  한 번도 클릭하지 않았을 경우를 대비하여 초기화
        }
      }

      daumMap = new daum.maps.Map(map_container, map_position)          //  지도 생성
      infowindow = new daum.maps.InfoWindow()                           //  클릭한 위치의 주소를 보여줄 창 생성 (아직 보이지는 않음)
      marker = new daum.maps.Marker({ position: daumMap.getCenter() })  //  클릭한 위치를 표시할 마커 생성 (아직 보이지는 않음)
      marker.setMap(daumMap)                                            //  마커를 지도 위에 표시
      geocoder = new daum.maps.services.Geocoder()  //  주소-좌표 변환 객체 생성

      // 클릭 이벤트 핸들러가 아직 등록되지 않은 경우 (등록하고 강제 리렌더링해야 함)
      if (this.state.is_added_handler == false) {

        // 지도에 클릭 이벤트를 등록
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
        daum.maps.event.addListener(daumMap, 'click', function(mouseEvent) {
          sessionStorage.removeItem("lat")  //  세션 스토리지에 있는 위도 정보 삭제
          sessionStorage.removeItem("lng")  //  세션 스토리지에 있는 경도 정보 삭제

          // 마우스로 클릭한 위치의 위도 및 경도
          geocoder.coord2Address(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat(), function(result, status) {
            if (status === daum.maps.services.Status.OK) {
                let detailAddr = (!!result[0].road_address ? '<span>도로명 주소 : ' + result[0].road_address.address_name + '</span><br />' : '')
                                  + '<span>지번 주소 : ' + result[0].address.address_name + '</span>';
                let content = '<div style="width:300px; height:45px;">' + detailAddr + '</div>';

                // 마커를 클릭한 위치에 표시
                marker.setPosition(mouseEvent.latLng);

                // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시
                infowindow.setContent(content);
                infowindow.open(daumMap, marker);

                sessionStorage.setItem("lat", mouseEvent.latLng.getLat())  //  클릭한 위치의 위도 값을 세션 스토리지에 저장
                sessionStorage.setItem("lng", mouseEvent.latLng.getLng())  //  클릭한 위치의 경도 값을 세션 스토리지에 저장
            }
          })
        })

        this.forceUpdate()  //  강제 리렌더링
        this.setState({ is_added_handler: true })  //  강제 리렌더링은 한 번만 일어나게 함
      }
    }
  }

  render() {

    // 모임을 생성 혹은 수정하려는 경우
    if (this.props.write == true)
      return (<div><div id="map" style={{width:'800px', height:'500px'}} /></div>)

    // 모임 정보를 보려는 경우
    else {
      console.log(this.props.meeting_info)
      if (this.props.meeting_info.latitude == 0 && this.props.meeting_info.longitude == 0)
        return (<div><div id="map" style={{width:'0px', height:'0px'}} /></div>)
      else
        return (<div><div id="map" style={{width:'600px', height:'300px'}} /></div>)
    }
  }
}
