import React from 'react'
import { shallow } from 'enzyme'
import Make_new from '.'

const onClick = jest.fn() 
const wrap = (props = {}) => shallow(<Make_new onClick = {onClick} {...props} />)

it('renders with different combination of props', () => {
  wrap({ disabled: true })
  wrap({ transparent: true })
  wrap({ disabled: true, transparent: true })
})

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' })
  expect(wrapper.contains('test')).toBe(true)
})

it('renders props when passed in', () => {
  const wrapper = wrap({ type: 'submit' })
  expect(wrapper.find({ type: 'submit' })).toHaveLength(1)
})

it('renders button by default', () => {
  const wrapper = wrap()
  expect(wrapper.dive().find('button')).toHaveLength(1)
})

it('calls onClick when Clicked', () => {
  onClick.mockClear()
  const wrapper = wrap()
  expect(onClick).not.toBeCalled()
  wrapper.simulate('click')
  expect(onClick).toBeCalled()
})