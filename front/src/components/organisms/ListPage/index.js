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
  display: inline-block;
  float: right;
  font-size: 50px;
  font-weight: bold;
  margin-right: 600px;
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
    console.log("확인")
    console.log(page_state)
      console.log(meetinglist_list)
    const prev_url = page_state.previous
    const next_url = page_state.next
    let prev_page_num, next_page_num, current_page_num
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

    const prev_text = (prev_page_num != 0) ? "["+String(prev_page_num)+"]" : ""
    const current_text = "["+String(current_page_num)+"]"
    const next_text = (next_page_num != 0) ? "["+String(next_page_num)+"]" : ""

    return (
      <div>
        <Upper_Box>
          <ToHome />
          <Logout />
          <ToMyPage />
          <Title_Font>SNU Moyeo</Title_Font>
        </Upper_Box>
        <Lower_Box>
          <Left_sidebar />
          <List_Box>
            <KindList /><br />
            <Button type = "submit" onClick={() => change_page_num_click(prev_page_num)}>Prev {prev_text}</Button>&ensp;
            <Button type = "submit" onClick={() => change_page_num_click(current_page_num)}>Current {current_text}</Button>&ensp;
            <Button type = "submit" onClick={() => change_page_num_click(next_page_num)}>Next {next_text}</Button>&ensp;&ensp;
            {/* number_of_pages = Math.ceil(JSON.parse(meetinglist_list).count / JSON.parse(meetinglist_list).page_size) */}
            {/* Can go to the page I want by typing the page number into <input> tag and pass the value to change_page_num_click function */}
            {/* But it is necessary to check whether it is in the range of [1, number_of_pages] */}
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
