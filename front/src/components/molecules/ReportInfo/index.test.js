import React from 'react'
import { shallow } from 'enzyme'
import { ReportInfo } from '.'

const wrap = (props = {}) => shallow(<ReportInfo {...props} />)

const report_info = {reporter: 'alice', reportee: 'bob', reason: 'macro user', isHandled: false}
const report_info2 = {reporter: 'alice', reportee: 'bob', reason: 'macro user', isHandled: true}

const onClick = jest.fn()

it('report which is not handled', () => {
  onClick.mockClear()
  const wrapper = wrap({ username: 'alice', password: '1234', report_info: report_info, penalty_click: onClick})
  expect(wrapper.contains('alice')).toBe(true)
  expect(wrapper.contains('bob')).toBe(true)
  expect(wrapper.contains('macro user')).toBe(true)
  expect(wrapper.contains('처리')).toBe(true)
  expect(wrapper.contains('기각')).toBe(true) 
  expect(onClick).not.toBeCalled()
  wrapper.find('Button').first().simulate('click')
  expect(onClick).toBeCalled()
  onClick.mockClear()
  expect(onClick).not.toBeCalled()
  wrapper.find('Button').at(1).simulate('click')
  expect(onClick).toBeCalled()
})

it('report which is handled', () => {
  onClick.mockClear()
  const wrapper = wrap({ username: 'alice', password: '1234', report_info: report_info2, penalty_click: onClick})
  expect(wrapper.contains('alice')).toBe(true)
  expect(wrapper.contains('bob')).toBe(true)
  expect(wrapper.contains('macro user')).toBe(true)
  expect(wrapper.contains('되돌리기')).toBe(true)
  expect(onClick).not.toBeCalled()
  wrapper.find('Button').first().simulate('click')
  expect(onClick).toBeCalled()
})
