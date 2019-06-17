import React from 'react'
import { Segment, Form, Grid, Card, Button } from 'semantic-ui-react'
import styled from 'styled-components'
// username : 유저 아이디
// password : 유저 패스워드
// report_info : id, created, reason, isHandled, point, reporter, reporterid, reportee, reporteeid

const EllipsisCss = styled.span`
  display: inline-block;
  width: 190px;
  overflow: hidden;
`

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
        <Card.Description>
          신고자 : {this.props.report_info.reporter} ▶ 신고 대상 : {this.props.report_info.reportee}<br/><br/>
          <EllipsisCss>신고 사유 : {this.props.report_info.reason}</EllipsisCss>
        </Card.Description>
        <p></p>

        {/* 신고 처리 부분 (부여 벌점 입력, 처리 혹은 기각)*/}
        <Form size='large'>
          {!this.props.report_info.isHandled
          ?
          <Card.Content extra>
            <Form.Input type='number' fluid icon='exclamation triangle' iconPosition='left' placeholder='부여할 벌점 점수' onChange={(e) => point = e.target.value}/>
            <div className='ui two buttons'>
              <Button basic color='green' fluid size='large' onClick={() => {point == null || point =='' || point <= 0 ? alert('벌점을 알맞게 설정해주세요') :this.props.penalty_click(hash, true, this.props.report_info, point)}}>처리</Button>
              <Button basic color='red' fluid size='large' onClick={() => this.props.penalty_click(hash, true, this.props.report_info, 0)}>기각</Button>
            </div>
          </Card.Content>
          :
          <Card.Content extra>
            <br/>
            <Card.Meta>이미 처리된 신고 입니다.</Card.Meta>
            <br/>
            <Button basic color='green' fluid size='large' onClick={() => this.props.penalty_click(hash, false, this.props.report_info, 0)}>되돌리기</Button>
          </Card.Content>
          }
        </Form>

      </Card.Content>
    )
  }
}
