import React from 'react'
import { Grid, Header, Icon, Container, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

const Font_content = styled.div`
  font-size: 19px;
  line-height: 1.5em;
  padding-bottom: 30px;
`

export const TutorialPage = () => {
  return (
    <Grid columns={3}>
      <Grid.Column width={2}>
        <br />
        <Menu.Item as='a' href="/"><div style={{fontSize:'30px'}}><Icon name='home' />To Home</div></Menu.Item>
      </Grid.Column>

      <Grid.Column width={12}>
        {/* Header */}
        <Container>
          <Header as='h1' icon textAlign='center'>
            <Icon name='group' circular />SNU Moyeo
            <Header.Subheader> SNU web service that helps you construct and join a meeting </Header.Subheader><br /><br />
          </Header>
        </Container>

        {/* Explanation */}
        <Container>

          <Header as='h1'>0. SNU Moyeo에 온 것을 환영합니다.</Header>
          <Font_content>
            <li>안녕하세요 서울대 구성원 여러분. SNU Moyeo는 서울대 구성원들의 모임 결성을 손쉽게 도와주는 웹 서비스입니다.</li>
          </Font_content>

          <Header as='h1'>1. 회원가입 시 제공한 개인정보의 관리</Header>
          <Font_content>
            <li>회원가입 시 입력했던 이름과 인증을 위해 입력했던 휴대폰 번호 및 이메일에 대한 정보는 관리자에 의해 관리되며,
            해당 정보들은 귀하가 참여한 모임의 주최자가 모임의 유지 및 관리를 위해 접근하여 볼 수 있습니다.</li>
          </Font_content>

          <Header as='h1'>2. 모임</Header>
          <Header as='h2'>2-1. 모임의 형성</Header>
          <Font_content>
            <li>모임은 총 7가지(음식배달, 택시합승, 공동구매, 스터디, 운동, 미팅, 기타)로 분류됩니다.<br/></li>
            <li>새 모임을 만들 때 모임의 종류를 선택할 수 있으며, 좌측 사이드바에서 모임의 종류를 선택하면 해당 종류의 모임만을 볼 수 있습니다.<br/></li>
            <li>새 모임을 만들 때 모임의 제목, 내용, 마감 날짜, 최소/최대 인원을 원하는 대로 설정할 수 있습니다.<br/></li>
            <li>또한 부가적으로 모임의 장소를 지도를 통해 지정하거나, 사진을 1장 첨부하거나, 카카오톡 오픈 채팅방 링크를 등록할 수도 있습니다.<br/></li>
          </Font_content>
          <Header as='h2'>2-2. 모임의 상태와 참여</Header>
          <Font_content>
            <li>모임의 상태는 모집 중, 마감, 추가모집 중, 추가모집 중단, 해산으로 나뉩니다.</li>
            <li>모집 중 혹은 추가모집 중인 상태의 모임에만 참가가 가능합니다.</li>
            <li>한 사람 당 해산되지 않은 모임에는 최대 5개까지만 참가 가능합니다.</li>
            <li>최소 인원이 충족되면 주최자는 언제든 모임 모집을 마감시킬 수 있습니다.</li>
            <li>시간이 흘러 마감 날짜가 지났을 때, 해당 모임은 최소 인원이 충족되어 있다면 자동 마감되고 아니라면 강제 해산됩니다.</li>
          </Font_content>
          <Header as='h2'>2-3. 모임의 탈퇴</Header>
          <Font_content>
            <li>모임이 해산되지 않았을 경우, 언제든지 모임의 탈퇴가 가능합니다.</li>
            <li>단 모집 마감 이후 탈퇴할 경우 자동으로 벌점 3점을 부과받게 됩니다.</li>
            <li>따라서 모임 참가 시 해당 모임의 정보와 댓글 내용을 잘 확인하시기를 권장드립니다.</li>
          </Font_content>
          <Header as='h2'>2-4. 모임의 관리 (주최자 입장)</Header>
          <Font_content>
            <li>주최자는 자신이 만든 모임의 최소 인원이 채워지면 가입 시 입력했던 자신의 휴대폰으로 알림 메세지를 받게 됩니다.</li>
            <li>또한 언제든 자신이 만든 모임에 참여한 멤버들의 정보를 엑셀 형태로 다운받을 수 있습니다.</li>
            <li>최소 인원이 충족되면 언제든 모집을 마감시킬 수 있고, 해산은 언제든지 가능합니다.</li>
            <li>하지만 정당한 사유 없이 모임을 해산시켜버릴 경우 다른 유저들의 신고에 의해 벌점을 부과받을 수도 있습니다.</li>
          </Font_content>

          <Header as='h1'>3. 신고 및 벌점에 관하여</Header>
          <Font_content>
            <li>정상적이지 않은 게시물, 댓글, 혹은 행위에 대하여 다른 유저들에게 신고받을 수 있습니다.</li>
            <li>불량 유저일 경우 관리자가 임의로 벌점을 주어 경고를 줄 수도 있으며, 벌점이 누적되어 10점 이상 쌓이면 계정 활동이 불가해집니다.</li>
          </Font_content>
        </Container>
      </Grid.Column>

      <Grid.Column width={2}></Grid.Column>
    </Grid>
  )
}
