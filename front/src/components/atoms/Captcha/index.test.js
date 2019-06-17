import React from 'react'
import { shallow } from 'enzyme'
import { Captcha } from '.'

const wrap = (props = {}) => shallow(<Captcha {...props} />)

const onClick = jest.fn()
const onClick2 = jest.fn()
const onClick3 = jest.fn()

it('test if not verified', () => {
  onClick.mockClear()
  onClick2.mockClear()
  const wrapper = wrap({ is_captcha_loaded: false, is_captcha_verified: false, prepare_load_captcha_click: onClick, load_captcha_click: onClick2, confirm_captcha_click: onClick3 })
  expect(wrapper.contains('새로고침')).toBe(true)
  expect(wrapper.contains('확인')).toBe(true)
  expect(onClick).not.toBeCalled()
  expect(onClick2).not.toBeCalled()
  wrapper.find('Button').first().simulate('click')
  expect(onClick).toBeCalled()
  expect(onClick2).toBeCalled()
})

it('test if verified', () => {
  const wrapper = wrap({ is_captcha_loaded: false, is_captcha_verified: true, prepare_load_captcha_click: onClick, load_captcha_click: onClick2, confirm_captcha_click: onClick3 })
  expect(wrapper.contains('새로고침')).toBe(false)
  expect(wrapper.contains('확인')).toBe(false)
  expect(wrapper.find('Button')).toHaveLength(0)
})
