import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import MeetingCreate from '../../../containers/MeetingCreate'
import Right_sidebar from '../../molecules/Right_sidebar'
import { Grid, Header, Icon, Container } from 'semantic-ui-react'
import styled from 'styled-components'

const Font_content = styled.div`
  font-size: 19px;
  line-height: 1.5em;
`

export const TutorialPage = ({ username, point, mySNU_verification_token, phone_verification_token }) => {

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
    Object.defineProperty(window.location, 'href', { writable: true, value: '/auth' });
    return (<div></div>)
  }

  // 로그인 O, 인증 O : 정상 출력
  else {
    return (
      <Grid columns={3}>

        {/* Left Sidebar */}
        <Grid.Column width={2}>
          <Left_sidebar />
        </Grid.Column>

        {/* Center : Header + MeetingCreate */}
        <Grid.Column width={10}>
          <Container>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular /> SNU Moyeo
              <Header.Subheader> SNU web service that helps you construct and join a meeting </Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>

            <Header as='h2'>0. 스누모여에 온 것을 환영합니다.</Header>
            <Font_content>
              안녕하세요. 서울대 구성원 여러분. 스누모여는 서울대 구성원들의 모임 결성을 편리하게 하는 것을 목표로 하여 만든 사이트입니다.
            </Font_content>

            <Header as='h2'>1. 가입 정보 시 개인정보의 관리</Header>
            <Font_content>
              회원가입 시 인증으로 입력했던 핸드폰 번호, 이메일에 대한 정보는 저장됩니다. <br/>
              해당 정보는 관리자에 의해 관리되며, 이름과 핸드폰 번호, 이메일은 참여한 모임의 주최자(리더)가 모임의 유지 및 관리를 위해 살펴볼 수 있습니다.
            </Font_content>

            <Header as='h2'>2. 모임</Header>

            <Header as='h2'>2-1. 모임의 형성</Header>
            <Font_content>
              각 모임의 종류는 총 7가지, 음식배달, 택시합승, 공동구매, 스터디, 운동, 미팅, 기타로 분류됩니다.<br/>
              좌측 사이드바에서 모임의 종류에 따라 살펴볼 수 있으며, 새로운 모임을 만들 때 지정 가능합니다.<br/>
              모임을 주최할 때, 모임의 제목, 내용을 포함하여 모임 마감시간과 최소, 최대 참여 인원이 지정 가능합니다.<br/>
              또한 모임의 장소를 지도를 통해 지정 가능하며, 카카오톡 오픈채팅방을 등록할 수 있는 링크를 입력할 수 있습니다.<br/>
            </Font_content>

            <Header as='h2'>2-2. 모임의 상태와 참여</Header>
            <Font_content>
              모임의 상태는 모집 중, 마감, 추가 모집, 해산이 있으며 만든 모임을 포함하여, 한 사람당 해산되지 않은 모임을 최대 5개까지 참여가능합니다.<br/>
              참여 자체는 모집 중과 추가 모집의 경우에만 가능합니다.<br/>
              모임의 최소 인원이 충족된다면 언제든 주최자는 마감할 수 있으며, 마감 시간이 지날 경우 자동 마감됩니다.<br/>
              만약 참여 인원이 최소 제한 인원보다 적으며 마감 시간이 지날 경우 모임은 강제로 해산됩니다.
            </Font_content>

            <Header as='h2'>2-3. 모임의 탈퇴</Header>
            <Font_content>
              모임이 해산되지 않았을 경우, 언제든지 모임의 탈퇴가 가능합니다.<br/>
              다만, 모임이 마감되었을 때, 모임 탈퇴 시 벌점이 자동으로 3점 부과되니 모임의 참여 시 모임의 정보를 확인하거나,미리 모임의 댓글을 통해 모임을 확인하시길 바랍니다.
            </Font_content>

            <Header as='h2'>2-4. 모임의 관리 (주최자 입장)</Header>
            <Font_content>
              주최자는 최소 충족 인원이 채워지면 가입 시 인증했던 핸드폰 번호로 알림이 옵니다.<br/>
              또한 언제든 참여자들에 대한 정보 (참여자들의 정보, 이름, 핸드폰 번호, 이메일)을 엑셀을 통해 다운로드 받을 수 있습니다.<br/>
              최소 충족인원을 넘기는 경우는 언제든 모임 마감이 가능하며, 정당한 사유 없이 모임을 해산시켜버릴 경우 다른 유저들의 신고를 통해 벌점이 누적될 수 있습니다.
            </Font_content>

            <Header as='h2'>3. 신고 및 벌점에 관하여</Header>
            <Font_content>
              정상적이지 않은 게시물, 댓글, 혹은 행위 시 타 유저들에게 신고를 받을 수 있습니다.<br/>
              신고의 누적으로 인해 관리자가 임의로 벌점을 주어 경고를 줄 수 있으며, 벌점이 누적되어 10점 이상 시 로그인 및 계정 활동이 불가해집니다.
            </Font_content>
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
