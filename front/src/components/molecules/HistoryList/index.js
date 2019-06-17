import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label, Button } from 'semantic-ui-react'


export class HistoryList extends React.Component {
  state = {
    fold_click : false
  }

  list_show = () => this.setState({ fold_click : true })
  list_close = () => this.setState({ fold_click : false})

  render() {
    const { meetinglist_history } = this.props
    console.log('<History Rendering>')
    if (meetinglist_history != null) {
      let meetings = JSON.parse(meetinglist_history)  //  미팅 리스트
      return (
        <Segment raised>
          <Label as='a' color='red' ribbon>History</Label> {/* 라벨 */}
          <Header as='h1'>내가 참여했던 모임 &nbsp;
          {this.state.fold_click ?
            <Button basic color='green' circular icon='triangle up' content = '접기' onClick={() => this.list_close()}/>
            :
            <Button basic color='green' circular icon='triangle down' content = '펼치기' onClick={() => this.list_show()}/>
          }</Header>                        {/* 제목 */}

          {this.state.fold_click ?
            <Card.Group>                                                {/* 각각의 카드는 하나의 미팅 엔트리를 담고 있음 */}
              {meetings.map(meeting_entry =>
                <Card key = {meeting_entry.id} >
                  <MeetingEntry meeting_info = {meeting_entry}/>
                </Card>
              )}
            </Card.Group>
          :
          <div></div>
          }
        </Segment>
      )
    }
    else
      return (<div></div>)
  }
}
