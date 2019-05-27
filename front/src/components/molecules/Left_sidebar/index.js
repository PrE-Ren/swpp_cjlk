import React from 'react'
import { PropTypes } from 'prop-types'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import styled from 'styled-components'

const Font_Classify = styled.div`
  color: white;
  font-size: 20px;
  padding-top: 70px;
  padding-bottom: 20px;
  text-align: center;
`
// style={{backgroundColor: '#35bdb2'}}
export const Left_sidebar = () => {
  return (
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
      <Menu.Item as='a' href="/"><Icon name='home' />To Home</Menu.Item>
      <Font_Classify>모임 분류</Font_Classify>
      <Menu.Item as='a' href="/list/0"><Icon name='food' />음식배달</Menu.Item>
      <Menu.Item as='a' href="/list/1"><Icon name='taxi' />택시합승</Menu.Item>
      <Menu.Item as='a' href="/list/2"><Icon name='pencil alternate' />스터디</Menu.Item>
      <Menu.Item as='a' href="/list/3"><Icon name='basketball ball' />운동</Menu.Item>
      <Menu.Item as='a' href="/list/4"><Icon name='heart' />미팅</Menu.Item>
    </Sidebar>
  )
}

Left_sidebar.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default Left_sidebar
