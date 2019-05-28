import React from 'react'
import { PropTypes } from 'prop-types'
import Left_sidebar from '../../molecules/Left_sidebar'
import KindList from '../../../containers/KindList'
import Right_sidebar from '../../molecules/Right_sidebar'
import Button from '../../atoms/Button'
import styled from 'styled-components'
import { Grid, Header, Icon, Container } from 'semantic-ui-react'

const Left_Arrow = styled.div`
  display: inline-block;
  text-align: center;
  border: 1.5px solid black;
  padding: 8px 8px 10px 8px;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
  &::before {
    content: '◀';
  }
`

const MovePage = styled.div`
  display: inline-block;
  text-align: center;
  border: 1.5px solid black;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`

const Right_Arrow = styled.div`
  display: inline-block;
  text-align: center;
  border: 1.5px solid black;
  padding: 8px 8px 10px 10px;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
  &::after {
    content: '▶';
  }
`

export const ListPage = ({ mySNU_verification_token, phone_token, meetinglist_list, change_page_num_click }) => {
  if (mySNU_verification_token == null || phone_token == null) {
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: '/login'
    });
    return (<div></div>)
  }
  else if (meetinglist_list != null) {
    const page_state = JSON.parse(meetinglist_list).links
    const prev_url = page_state.previous
    const next_url = page_state.next
    let prev_page_num, next_page_num, current_page_num, last_page_num
    let page_num

    if (prev_url != null && next_url != null) {
      prev_page_num = Number(prev_url.split('?page=')[1])
      current_page_num = prev_page_num + 1
      next_page_num = current_page_num + 1
    }
    else if (prev_url != null && next_url == null) {
      next_page_num = 0
      prev_page_num = Number(prev_url.split('?page=')[1])
      prev_page_num = isNaN(prev_page_num) ? 1 : prev_page_num
      current_page_num = prev_page_num + 1

    }
    else if (prev_url == null && next_url != null) {
      prev_page_num = 0
      next_page_num = Number(next_url.split('?page=')[1])
      current_page_num = next_page_num - 1
    }
    else {
      prev_page_num = 0
      next_page_num = 0
      current_page_num = 1
    }

    last_page_num = Math.ceil(JSON.parse(meetinglist_list).count / JSON.parse(meetinglist_list).page_size)
    if (last_page_num == 0)
      last_page_num = 1;

    const prev_text = (prev_page_num != 0) ? String(prev_page_num) : ""
    const current_text = String(current_page_num)
    const next_text = (next_page_num != 0) ? String(next_page_num) : ""
    const last_text = String(last_page_num)

    console.log(page_num)
    return (
      <Grid columns={3}>
        <Grid.Column width={2}>
          <Left_sidebar />
        </Grid.Column>

        <Grid.Column width={10}>
          <Container>
            <Header as='h1' icon textAlign='center'>
              <Icon name='group' circular />
              SNU Moyeo
              <Header.Subheader>SNU web service that helps you construct and join a meeting </Header.Subheader><br /><br />
            </Header>
          </Container>
          <Container>
            <KindList /><br />
            <Left_Arrow type = "submit" onClick={() => change_page_num_click(prev_page_num)}>Prev</Left_Arrow>&ensp;[
            <span key={current_page_num}>
              <input
                type="number"
                style={{width:'35px'}}
                defaultValue={current_page_num}
                ref={node => {page_num = node;}}/>
              /{last_text} page]&ensp;
            </span>
            <MovePage type = "submit" onClick={() => {
              if (page_num.value >= 1 && page_num.value <= last_page_num)
                change_page_num_click(page_num.value)
              else
                change_page_num_click(0)
              }}>
              페이지 이동
            </MovePage>&ensp;
            <Right_Arrow type = "submit" onClick={() => change_page_num_click(next_page_num)}>Next</Right_Arrow>&ensp;&ensp;
          </Container>
        </Grid.Column>

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
