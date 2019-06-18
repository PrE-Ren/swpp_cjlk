import React from 'react'
import MeetingEntry from '../../../containers/MeetingEntry'
import { Segment, Card, Header, Label, Button } from 'semantic-ui-react'


export class LeadList extends React.Component {
  state = {
    fold_click : false
  }

  list_show = () => this.setState({ fold_click : true })
  list_close = () => this.setState({ fold_click : false})

  render() {
    const { meetinglist_lead } = this.props
    console.log('<Lead Rendering>')
    if (meetinglist_lead != null) {
      let meetings = JSON.parse(meetinglist_lead)  //  미팅 리스트
      return (
        <Segment raised>
          <Label as='a' color='red' ribbon>I am leader!</Label>  {/* 라벨 */}
          <Header as='h1'>내가 만든 모임 &nbsp;
          {this.state.fold_click ?
            <Button basic color='green' circular icon='triangle up' content = '접기' onClick={() => this.list_close()}/>
            :
            <Button basic color='green' circular icon='triangle down' content = '펼치기' onClick={() => this.list_show()}/>
          }</Header>                    {/* 제목 */}

          <br/>

          {this.state.fold_click ?
            <Card.Group>                                                {/* 각각의 카드는 하나의 미팅 엔트리를 담고 있음 */}
              {meetings.map(meeting_entry =>
                <Card key = {meeting_entry.id} >
                  <MeetingEntry meeting_info = {meeting_entry}/>
                </Card>
              )}
            </Card.Group>
          :
          <Card.Group></Card.Group>
          }
        </Segment>
      )
    }
    else
      return (<div></div>)
  }
}
