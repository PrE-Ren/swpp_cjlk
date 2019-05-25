import React from 'react'
import { PropTypes } from 'prop-types'
import ToHome from '../../atoms/ToHome'
import ToMyPage from '../../atoms/ToMyPage'
import Logout from '../../../containers/Logout'
import Left_sidebar from '../../molecules/Left_sidebar'
import KindList from '../../../containers/KindList'
import Right_sidebar from '../../molecules/Right_sidebar'
import Button from '../../atoms/Button'
import styled from 'styled-components'

const Title_Font = styled.div`
  display: flex;
  font-size: 55px;
  font-weight: bold;
  justify-content: center;
`

const Upper_Box = styled.div`
  display: block;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 100px;
  margin-right: 5px;
`

const Lower_Box = styled.div`
  display: block;
  margin-left: 5px;
  margin-right: 5px;
`

const List_Box = styled.div`
  float: left;
  margin-left: 50px;
  display: inline-block;
`

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

export const ListPage = ({ token, meetinglist_list, change_page_num_click }) => {
  if (token == null) {
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
      <div>
        <Upper_Box>
          <Logout />
          <ToMyPage />
          <Title_Font>SNU Moyeo</Title_Font>
        </Upper_Box>
        <Lower_Box>
          <Left_sidebar />
          <List_Box>
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
          </List_Box>
          <Right_sidebar />
        </Lower_Box>
      </div>
    )
  }
  else {
    return <div></div>
  }
}
