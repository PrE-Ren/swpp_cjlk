import React from 'react'
import { shallow } from 'enzyme'
import { ListPage } from '.'
import { change_page_num_action } from '../../../store/snu_moyeo/actions'
import { Grid, Header, Icon, Container } from 'semantic-ui-react'

const wrap = (props = {}) => shallow(<ListPage {...props} />)

it('username not defined', () => {
  const wrapper = wrap({ username: null, mySNU_verification_token: null, phone_verification_token: null, meetinglist_list: null, change_page_num_click: change_page_num_action })
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('token not defined', () => {
  const wrapper2 = wrap({ username: 'test1', mySNU_verification_token: null, phone_verification_token: null, meetinglist_list: null, change_page_num_click: change_page_num_action})
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('meetinglist_list not defined', () => {
  const wrapper3 = wrap({ username: 'test1', mySNU_verification_token: 'asda', phone_verification_token: 'asdaq', meetinglist_list: null, change_page_num_click: change_page_num_action})
  expect(wrapper3.contains(<div></div>)).toBe(true)
})

it('meetinglist_list defined', () => {
  const wrapper4 = wrap({ username: 'test1', mySNU_verification_token: 'asda', phone_verification_token: 'asdaq', meetinglist_list: '{"links":{"next":null,"previous":null},"count":1,"page_size":3,"results":[{"id":3,"title":"adzc","created":"2019-06-02T16:05:18.202510+09:00","due":"2020-06-02T16:04:00+09:00","min_people":2,"max_people":3,"description":"adaqqe","state":0,"kind":0,"leader":"bob","leaderid":1,"picture":null,"members":[1],"comments":[],"latitude":37.46047198620325,"longitude":126.95481058087687}]}', change_page_num_click: change_page_num_action})
  expect(wrapper4.contains(<Header.Subheader>SNU web service that helps you construct and join a meeting </Header.Subheader>)).toBe(true)
})
