import React from 'react'
import { shallow } from 'enzyme'
import { NaverShopping } from '.'

const wrap = (props = {}) => shallow(<NaverShopping {...props} />)


const initialState = {
  user_id : null,
  username: null,
  password: null,
  name : null,
  email : null,
  point : null,
  mySNU_verified : null,
  mySNU_verification_token: null,
  meetings : null,
};

const onClick = jest.fn()
const onClick2 = jest.fn()

const state1 = {...initialState, username : 'abc', email : 'hello@snu.ac.kr', user_id : 1}

it('calls onClick when clicked', () => {
  const wrapper = wrap({state: state1, prepare_search_click: onClick, search_click: onClick2})
  onClick.mockClear()
  onClick2.mockClear()
  expect(onClick).not.toBeCalled()
  expect(onClick2).not.toBeCalled()
  wrapper.find('Button').first().simulate('click')
  expect(onClick).toBeCalled()
  expect(onClick2).toBeCalled()
})

