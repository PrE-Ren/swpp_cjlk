import React from 'react'
import Left_sidebar from '../../molecules/Left_sidebar'
import AllList from '../../../containers/AllList'
import { shallow } from 'enzyme'
import { AllPage } from '.'

const wrap = (props = {}) => shallow(<AllPage {...props} />)

it('username null', () => {
  const wrapper = wrap({ username: null })
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('username not null, token null', () => {
  let username
  const wrapper2 = wrap({ username: 'asqe', mySNU_verification_token: null, phone_verification_token: null })
  expect(wrapper2.contains(<div></div>)).toBe(true)
})

it('username not null, token not null, meetinglist_all null', () => {
  const wrapper3 = wrap({ username: 'asqe', mySNU_verification_token: 'asdaewq', phone_verification_token: 'qweqwas', meetinglist_all: null})
  expect(wrapper3.contains(<div></div>)).toBe(true)
})

it('username not null, token not null, meetinglist_all not null', () => {
  const wrapper4 = wrap({ username: 'asqe', mySNU_verification_token: 'asdqwe', phone_verification_token: 'qtqaad', meetinglist_all: '{"count":1,"page_size":3}'})
  expect(wrapper4.contains(<AllList />)).toBe(true)
  expect(wrapper4.contains(<Left_sidebar />)).toBe(true)
})
