import React from 'react'
import ReportInfo from '../../../containers/ReportInfo'
import { Grid, Header, Icon, Container, Menu, Card } from 'semantic-ui-react'

// username : 유저 아이디
// report_list : 관리자 페이지에서 보여줄 신고 리스트 정보
export const ReportAdminPage = ({ username, report_list }) => {

  // 관리자 O
  if (username == 'admin') {
      if (report_list != null) {
          let reports = JSON.parse(report_list)
          return (
              <div>
                {/* Header */}
                <Container>
                  <Header as='h1' icon textAlign='center'>
                    <Icon name='group' circular />User reports
                  </Header>
                </Container>
                <br/>
                {/* Explanation */}
                <Container>
                  <Card.Group itemsPerRow={4}>  {/* 각각의 카드는 하나의 신고 정보를 담고 있음 */}
                    {reports.map(report =>
                      <Card key = {report.id}>
                        <ReportInfo report_info = {report}/>
                      </Card>)}
                  </Card.Group>
                </Container>
              </div>
          )
      }
  }
  return (<div></div>)
}
