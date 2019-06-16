import React from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import styled from 'styled-components'

const Font_Classify = styled.div`
  color: white;
  font-size: 20px;
  padding-top: 70px;
  padding-bottom: 20px;
  text-align: center;
`

export const Left_sidebar = () => {
  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
      <Menu.Item as='a' href="/"><Icon name='home' />To Home</Menu.Item>
      <Menu.Item as='a' href="/tutorial"><Icon name='question circle' />홈페이지 소개</Menu.Item>
      <Font_Classify>모임 분류</Font_Classify>
      <Menu.Item as='a' href="/list/0"><Icon name='food' />음식배달</Menu.Item>
      <Menu.Item as='a' href="/list/1"><Icon name='taxi' />택시합승</Menu.Item>
      <Menu.Item as='a' href="/list/2"><Icon name='dollar sign' />공동구매</Menu.Item>
      <Menu.Item as='a' href="/list/3"><Icon name='pencil alternate' />스터디</Menu.Item>
      <Menu.Item as='a' href="/list/4"><Icon name='basketball ball' />운동</Menu.Item>
      <Menu.Item as='a' href="/list/5"><Icon name='heart' />미팅</Menu.Item>
    </Sidebar>
  )
}

export default Left_sidebar
