import React from 'react'
import { shallow } from 'enzyme'
import { ReportAdminPage } from '.'

const wrap = (props = {}) => shallow(<ReportAdminPage {...props} />)

it('if user is not admin', () => {
  const wrapper = wrap({ username : 'aaa', report_list : '[id : 1, report_info : asdasd]'})
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('if user is admin', () => {
  const wrapper2 = wrap({ username : 'admin', report_list : '[{"id":1}]'})
  expect(wrapper2.contains('User reports')).toBe(true)
})
