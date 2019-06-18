import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import KindList from '../../../containers/KindList'
import Right_sidebar from '../../molecules/Right_sidebar'
import { Grid, Header, Icon, Container, Pagination, Input, Button } from 'semantic-ui-react'
import NaverShopping  from '../../../containers/NaverShopping';

// username : 유저 아이디 (로그인 여부 확인을 위해 필요)
// mySNU_verification_token : 이메일 토큰 (인증 여부 확인을 위해 필요)
// phone_verification_token : 폰 토큰 (인증 여부 확인을 위해 필요)
// meetinglist_list : 현재 페이지에서 보여줄 미팅 리스트 정보
// change_page_num_click : 페이지를 바꿀 때 액션을 디스패치할 함수
export const ListPage = ({ username, point, mySNU_verification_token, phone_verification_token, meetinglist_list, change_page_num_click }) => {
  let keyword  //  입력한 검색 키워드

  // 로그인 X : 로그인 페이지로 리다이렉트
  if (username == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/login' })
    return (<div></div>)
  }

  // 로그인 O, 벌점 10 이상 : 로그인 페이지로 리다이렉트
  else if (point >= 10) {
    alert('벌점 10점 이상으로 접근이 불가합니다. 운영자에게 연락하십시오.')
    Object.defineProperty(window.location, 'href', { writable: true, value: '/login' });
    return (<div></div>)
  }

  // 로그인 O, 인증 X : 인증 페이지로 리다이렉트
  else if (mySNU_verification_token == null || phone_verification_token == null) {
    Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' })
    return (<div></div>)
  }

  // 로그인 O, 인증 O : 정상 출력
  else if (meetinglist_list != null) {
    let last_page_num  // 총(마지막) 페이지 수
    last_page_num = Math.ceil(JSON.parse(meetinglist_list).count / JSON.parse(meetinglist_list).page_size)
    if (last_page_num == 0)
      last_page_num = 1;

    return (
      <Grid columns={3}>

        {/* Left Sidebar */}
        <Grid.Column width={2}>
          <Left_sidebar />
        </Grid.Column>

        {/* Center : Header + Kind List + Pagination + Search Bar */}
        <Grid.Column width={10}>
          <Container>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular />
              SNU Moyeo
              <Header.Subheader>SNU web service that helps you construct and join a meeting</Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>
            <KindList /><br />
            <Grid columns={2}>
              <Grid.Column width={11}>
                <Pagination defaultActivePage={1} totalPages={last_page_num}
                            onPageChange={(e, {activePage}) => change_page_num_click({activePage}.activePage)} />
              </Grid.Column>
              <Grid.Column width={4}>
                <Input type='text' placeholder='이 게시판에서 검색' action style={{ marginLeft: '-5px' }}>
                  <input style={{width:'190px'}} ref={node => {keyword = node}}/>
                  <Button type='submit' onClick={() => {
                    const kind = window.location.pathname[6]  //  "/list/n"에서 "n"을 추출
                    if (keyword.value == "")                  //  검색 키워드는 반드시 입력해야 함
                      alert('검색어를 입력해주세요.')
                    else
                      window.location.href = '/list/' + kind + '/' + keyword.value;  //  검색
                  }}> Search </Button>
                </Input>
                {window.location.pathname[6] == 2 ? <NaverShopping/> : <div></div>}
              </Grid.Column>
            </Grid>
          </Container>

          {/* 네이버 쇼핑 검색 API */}
          {/* {window.location.pathname[6] == 2 ? <NaverShopping/> : <div></div>} */}

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
