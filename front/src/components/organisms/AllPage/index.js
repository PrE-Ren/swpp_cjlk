import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import AllList from '../../../containers/AllList'
import Right_sidebar from '../../molecules/Right_sidebar'
import { Grid, Header, Icon, Container, Pagination, Search } from 'semantic-ui-react'

// username : 유저 아이디 (로그인 여부 확인을 위해 필요)
// mySNU_verification_token : 이메일 토큰 (인증 여부 확인을 위해 필요)
// phone_verification_token : 폰 토큰 (인증 여부 확인을 위해 필요)
// meetinglist_all : 현재 페이지에서 보여줄 미팅 리스트 정보
// change_page_num_click : 페이지를 바꿀 때 액션을 디스패치할 함수
export const AllPage = ({ username, mySNU_verification_token, phone_verification_token, meetinglist_all, change_page_num_click }) => {

  // 로그인 X : 로그인 페이지로 리다이렉트
  if (username == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/login' });
    return (<div></div>)
  }

  // 로그인 O, 인증 X : 인증 페이지로 리다이렉트
  else if (mySNU_verification_token == null || phone_verification_token == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' });
    return (<div></div>)
  }

  // 로그인 O, 인증 O : 정상 출력
  else if (meetinglist_all != null) {
    let last_page_num  // 총(마지막) 페이지 수
    last_page_num = Math.ceil(JSON.parse(meetinglist_all).count / JSON.parse(meetinglist_all).page_size)
    if (last_page_num == 0)
      last_page_num = 1;

    return (
      <Grid columns={3}>

        {/* Left Sidebar */}
        <Grid.Column width={2}>
          <Left_sidebar />
        </Grid.Column>

        {/* Center : Header + All List + Pagination + Search Bar */}
        <Grid.Column width={10}>
          <Container>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular /> SNU Moyeo
              <Header.Subheader> SNU web service that helps you construct and join a meeting </Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>
            <AllList /><br />
            <Grid columns={1}>
              <Grid.Column width={12}>
                <Pagination defaultActivePage={1} totalPages={last_page_num}
                            onPageChange={(e, {activePage}) => change_page_num_click({activePage}.activePage)} />
              </Grid.Column>
            </Grid>
          </Container>
        </Grid.Column>

        {/* Right Sidebar */}
        <Grid.Column width={4}>
          <Right_sidebar />
        </Grid.Column>
      </Grid>
    )
  }
  else {
    return (<div></div>)
  }
}
