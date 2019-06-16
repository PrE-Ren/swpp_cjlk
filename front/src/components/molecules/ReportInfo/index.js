import React from 'react'
import { Segment, Form, Grid, Card, Button } from 'semantic-ui-react'

// username : 유저 아이디
// password : 유저 패스워드
// report_info : id, created, reason, isHandled, point, reporter, reporterid, reportee, reporteeid
export class ReportInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    let point = 0  //  입력한 부여 벌점 점수
    const hash = new Buffer(`${this.props.username}:${this.props.password}`).toString('base64')  //  유저의 해시값

    return (
      <Card.Content>

        {/* 신고 기본 정보  */}
        <Card.Meta> 신고자 : {this.props.report_info.reporter} ▶ 신고 대상 : {this.props.report_info.reportee} </Card.Meta>
        <Card.Meta> 신고 사유 : {this.props.report_info.reason} </Card.Meta>
        <p></p>

        {/* 신고 처리 부분 (부여 벌점 입력, 처리 혹은 기각)*/}
        <Form size='large'>
          {!this.props.report_info.isHandled
          ?
          <Segment stacked>  {/* 처리되지 않은 신고 */}
            <Form.Input fluid icon='user' iconPosition='left' placeholder='부여할 벌점 점수' onChange={(e) => point = e.target.value}/>
            <Grid columns={2}>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => this.props.penalty_click(hash, true, this.props.report_info, point)}>처리</Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => this.props.penalty_click(hash, true, this.props.report_info, 0)}>기각</Button>
              </Grid.Column>
            </Grid>
          </Segment>
          :
          <Segment stacked>  {/* 처리된 신고 */}
            <Grid columns={1}>
              <Grid.Column width={16}>
                <Button color='teal' fluid size='large' onClick={() => this.props.penalty_click(hash, false, this.props.report_info, 0)}>되돌리기</Button>
              </Grid.Column>
            </Grid>
          </Segment>}
        </Form>

      </Card.Content>
    )
  }
}
