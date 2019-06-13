import React from 'react'
import { Modal, Card } from 'semantic-ui-react'

export class ReportInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is_folded: true };
  }
  render() {
    let points = 0;
    let report_info = (
      <Card.Content>
        <Card.Meta> 신고자 : {this.props.report_info.reporter} -> 신고 대상 : {this.props.report_info.target} </Card.Meta>
        <Card.Meta> 신고 사유 : {this.props.meeting_info.content} </Card.Meta>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='부여할 벌점 점수' onChange={(e) => points = e.target.value}/>
          <Grid columns={2}>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => this.props.give_penalty_click(this.props.report_info.target, points)}>벌점 부과</Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button color='teal' fluid size='large' onClick={() => this.props.give_penalty_click(this.props.report_info.target, 0)}>기각</Button>
              </Grid.Column>
          </Grid>  
        </Segment>
      </Card.Content>
    )

    return (
      <Modal trigger={report_info} >
        <Modal.Header>{this.props.report_info.title}</Modal.Header>
      </Modal>
    )
  }
}
