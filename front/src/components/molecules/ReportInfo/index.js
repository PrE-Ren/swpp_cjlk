import React from 'react'
import { Segment, Form, Grid, Modal, Card, Button } from 'semantic-ui-react'

export class ReportInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    let points = 0;
    const hash = new Buffer(`${this.props.username}:${this.props.password}`).toString('base64')
    let report_info = (
      <Card.Content>
        <Card.Meta> 신고자 : {this.props.report_info.reporter} -> 신고 대상 : {this.props.report_info.reportee} </Card.Meta>
        <Card.Meta> 신고 사유 : {this.props.report_info.reason} </Card.Meta>  
        <p></p>
        <Form size='large'>
          {!this.props.report_info.isHandled ? 
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='부여할 벌점 점수' onChange={(e) => points = e.target.value}/>
            <Grid columns={2}>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => this.props.penalty_click(hash, true, this.props.report_info, points)}>처리</Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => this.props.penalty_click(hash, true, this.props.report_info, 0)}>기각</Button>
              </Grid.Column>
            </Grid>
          </Segment>
          :
          <Segment stacked>
            <Grid columns={1}>
              <Grid.Column width={16}>
                <Button color='teal' fluid size='large' onClick={() => this.props.penalty_click(hash, false, this.props.report_info, 0)}>되돌리기</Button>
              </Grid.Column>
            </Grid>
          </Segment>}   
        </Form>   
      </Card.Content>
    )

    return (
      report_info
    )
  }
}
