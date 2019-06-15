import React from 'react'
import ReportInfo from '../../../containers/ReportInfo'
import { Card, Header, Grid, Modal } from 'semantic-ui-react'

// username : 유저 아이디
// report_list : 관리자 페이지에서 보여줄 신고 리스트 정보
export const ReportAdminPage = ({ username, report_list }) => {

  // 관리자 O
  if (username == 'admin') {
      if (report_list != null) {
          let reports = JSON.parse(report_list)
          return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
              <Grid.Column>
              <Header as='h1' color='teal' textAlign='center'> User Reports </Header>
              <Card.Group>  {/* 각각의 카드는 하나의 신고 정보를 담고 있음 */}
                  {reports.map(report =>
                    <Card key = {report.id}>
                      <ReportInfo report_info = {report}/>
                    </Card>)}
              </Card.Group>
              </Grid.Column>
            </Grid>
          )
      }
  }
  return (<div></div>)
}
