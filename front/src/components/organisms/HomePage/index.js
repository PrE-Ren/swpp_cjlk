import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import ImpendingList from '../../../containers/ImpendingList'
import RecentList from '../../../containers/RecentList'
import Right_sidebar from '../../molecules/Right_sidebar'
import { Grid, Header, Icon, Container } from 'semantic-ui-react'

// username : 유저 아이디 (로그인 여부 확인을 위해 필요)
// mySNU_verification_token : 이메일 토큰 (인증 여부 확인을 위해 필요)
// phone_verification_token : 폰 토큰 (인증 여부 확인을 위해 필요)
export const HomePage = ({ username, mySNU_verification_token, phone_verification_token }) => {

  // 로그인 X : 로그인 페이지로 리다이렉트
  if (username == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/login' })
    return (<div></div>)
  }

  // 로그인 O, 인증 X : 인증 페이지로 리다이렉트
  else if (mySNU_verification_token == null || phone_verification_token == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' })
    return (<div></div>)
  }

  // 로그인 O, 인증 O : 홈 페이지 화면 정상 출력
  else {
    return (
      <Grid columns={3}>

        {/* Left Sidebar */}
        <Grid.Column width={2}>
          <Left_sidebar />
        </Grid.Column>

        {/* Center : Header + ImpendingList + RecentList */}
        <Grid.Column width={10}>
          <Container>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular /> SNU Moyeo
              <Header.Subheader> SNU web service that helps you construct and join a meeting </Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>
            <ImpendingList />
            <RecentList />
          </Container>
        </Grid.Column>

        {/* Right Sidebar */}
        <Grid.Column width={4}>
          <Right_sidebar />
        </Grid.Column>

      </Grid>
    )
  }
}
