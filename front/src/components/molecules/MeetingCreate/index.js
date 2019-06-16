import React from 'react'
import Map from '../../../containers/Map'
import { Form, Radio } from 'semantic-ui-react'
import NaverShopping from '../../../containers/NaverShopping';

export class MeetingCreate extends React.Component{
  state = {
    title: undefined,
    due: undefined,
    min_people: undefined,
    max_people: undefined,
    kakao_link: undefined,
    description: undefined,
    kind: undefined,
    picture: undefined
  }

  get_current_datetime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    const day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
    const hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
    const min = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
    const datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
    return datetime
  }

  parse_datetime = (date) => {
    const year = date.split("-")[0]
    const month = date.split("-")[1]
    let temp = date.split("-")[2]  //  시간 때문에 임시로 쓴 변수
    const day = temp.split("T")[0]
    temp = temp.split("T")[1]
    const hour = temp.split(":")[0]
    const min = temp.split(":")[1]
    const datetime = year + "-" + month + "-" + day + "T" + hour + ":" + min
    return datetime
  }

   // 위의 변수와 각 입력 Form을 바운드
  handle_title = (e) => this.setState({title: e.target.value})
  handle_due = (e, { value }) => this.setState({due: value})
  handle_min_people = (e) => this.setState({ min_people: e.target.value })
  handle_max_people = (e) => this.setState({ max_people: e.target.value })
  handle_kakao_link = (e) => this.setState({ kakao_link: e.target.value })
  handle_description = (e) => this.setState({ description: e.target.value })
  handle_kind = (e, { value }) => this.setState({kind: value})
  handle_picture = (e) => this.setState({ picture: e.target.files[0] })

  render(){
    const { username, password, user_id, map_checked, new_click, modify_click, change_map_false, change_map_true } = this.props

    // 모임 유형 상수
    const options = [
      { key: 0, text: '음식배달', value: 0 },
      { key: 1, text: '택시합승', value: 1 },
      { key: 2, text: '공동구매', value: 2 },
      { key: 3, text: '스터디', value: 3 },
      { key: 4, text: '운동', value: 4 },
      { key: 5, text: '미팅', value: 5 },
    ]


    // username : 유저 아이디 (해시값 획득을 위해 필요)
    // password : 유저 패스워드 (해시값 획득을 위해 필요)
    // user_id : 유저 고유값 (모임 생성 시 Participate 모델의 POST를 위해 필요)
    // new_click : 생성 완료 버튼을 눌렀을 때 액션을 디스패치할 함수 (Meeting 모델 POST)
    // modify_click : 수정 완료 버튼을 눌렀을 때 액션을 디스패치할 함수 (Meeting 모델 PUT)
    const hash = new Buffer(`${username}:${password}`).toString('base64')    //  유저의 해시값
    const meeting_info = JSON.parse(sessionStorage.getItem('meeting_info'))  //  세션 스토리지에 저장된 미팅 정보

    // New (새 모임 만들기 버튼을 누르면 세션 스토리지에 저장된 미팅 정보가 삭제됨)
    if (meeting_info == null) {
      const datetime = this.get_current_datetime()  //  현재 시간
      return (
        <Form>
          <Form.Input fluid label='제목' placeholder='Title' onChange={this.handle_title}/>
          <Form.Group widths='equal'>
            <Form.Select fluid label='모임 유형' options={options} placeholder='Meeting Type' width={6} onChange={this.handle_kind} />
            <Form.Input fluid label='모집 마감 기한' type="datetime-local" defaultValue={datetime} width={6} onChange={this.handle_due} />
            <Form.Input fluid label='최소인원' placeholder='2' type="number" width={2} onChange={this.handle_min_people} />
            <Form.Input fluid label='최대인원' placeholder='2' type="number" width={2} onChange={this.handle_max_people} />
          </Form.Group>
          {this.state.kind == 2 ? <NaverShopping/> : <div></div>}
          <Form.Input fluid label='오픈 채팅방 링크' placeholder='https://open.kakao.com/' onChange={this.handle_kakao_link} />
          <Form.Input fluid label='사진' type="file" width={6} onChange={this.handle_picture} accept="image/*" />

          {map_checked  ? <Radio toggle label='hide the map' onChange={() => change_map_false()}/> :
                         <Radio toggle label='show the map' onChange={() => change_map_true()} /> }

          {map_checked == true ? <div><br/><Map meeting_info = {meeting_info} write = {true} /></div> : <div><br/></div>}

          <Form.TextArea label='내용' placeholder='About this meeting...' onChange={this.handle_description} />
          <Form.Button onClick={() => new_click(hash, user_id, {
            title: this.state.title,              //  제목 (직접 입력)
            due: this.state.due,                  //  마감 기한 (직접 입력)
            min_people: this.state.min_people,    //  최소 인원 (직접 입력)
            max_people: this.state.max_people,    //  최대 인원 (직접 입력)
            kakao_link : this.state.kakao_link,   //  오픈 채팅방 링크 (직접 입력)
            description: this.state.description,  //  본문 (직접 입력)
            kind: this.state.kind,                //  유형 (직접 입력)
            leader: username,          //  주최자 아이디 (자동 입력)
            picture: this.state.picture           //  사진 (직접 입력)
          })}> 완료 </Form.Button>
        </Form>
      )
    }

    // Modify (수정 버튼을 누르면 세션 스토리지에 해당 미팅 정보가 저장됨)
    else {
      const datetime = this.parse_datetime(meeting_info.due)  //  기존 마감 기한
      return (
        <Form>
          <Form.Input fluid label='제목' placeholder='Title' defaultValue={meeting_info.title} onChange={this.handle_title}/>
          <Form.Group widths='equal'>
            <Form.Select disabled fluid label='모임 유형' options={options} placeholder='Meeting Type' width={6} defaultValue={meeting_info.kind} />
            <Form.Input disabled fluid label='모집 마감 기한' type="datetime-local" defaultValue={datetime} width={6} />
            <Form.Input disabled fluid label='최소인원' placeholder='2' type="number" width={2} defaultValue={meeting_info.min_people}  />
            <Form.Input disabled fluid label='최대인원' placeholder='2' type="number" width={2} defaultValue={meeting_info.max_people}  />
          </Form.Group>
          <Form.Input fluid label='오픈 채팅방 링크' placeholder='https://open.kakao.com/' defaultValue={meeting_info.kakao_link} onChange={this.handle_kakao_link} />
          <Form.Input fluid label='사진' type="file" width={6} onChange={this.handle_picture} accept="image/*" />

          {map_checked  ? <Radio toggle label='hide the map' onChange={() => change_map_false()}/> :
                         <Radio toggle label='show the map' onChange={() => change_map_true()} /> }

          {map_checked == true ? <div><br/><Map meeting_info = {meeting_info} write = {true} /></div> : <div><br/></div>}

          <Form.TextArea label='내용' placeholder='Description' defaultValue={meeting_info.description} onChange={this.handle_description} />
          <Form.Button onClick={() => modify_click(hash, {
            title: (this.state.title !== undefined) ? this.state.title : meeting_info.title,                          // 수정 가능 (안 바꾸면 기존 값)
            due: meeting_info.due,                                                              // 수정 불가능 (기존 값 사용)
            min_people: meeting_info.min_people,                                                // 수정 불가능 (기존 값 사용)
            max_people: meeting_info.min_people,                                                // 수정 불가능 (기존 값 사용)
            kakao_link: (this.state.kakao_link !== undefined) ? this.state.kakao_link : meeting_info.kakao_link,      // 수정 가능 (안 바꾸면 기존 값)
            description: (this.state.description !== undefined) ? this.state.description : meeting_info.description,  // 수정 가능 (안 바꾸면 기존 값)
            kind: meeting_info.kind,                                                            // 수정 불가능 (기존 값 사용)
            leader: username,                                                                   // 수정 불가능 (기존 값 사용)
            picture: this.state.picture,                                                                   // 수정 가능 (입력 안 하면 undefined)
            state: meeting_info.state                                                           // 수정 불가능 (기존 값 사용)
          })}> 수정 </Form.Button>
        </Form>
      )
    }
  }
}
