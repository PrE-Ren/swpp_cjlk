import React from 'react'
import { shallow } from 'enzyme'
import { MeetingCreate } from '.'

const wrap = (props = {}) => shallow(<MeetingCreate {...props} />)

it('renders same sidebar when different childern, props passed in', () => {
  const wrapper = wrap({ username: 'a' })
  expect(wrapper.contains(<select ref={node => {kind=node;}} style={{width:'85px'}, {height:'30px'}}>
  <option value="0">음식배달</option>
  <option value="1">택시합승</option>
  <option value="2">공동구매</option>
  <option value="3">스터디</option>
  <option value="4">운동</option>
  <option value="5">미팅</option>
</select>)).toBe(true)
  expect(wrapper.contains(<input type="datetime-local" ref={node => {due=node;}} />)).toBe(true)
  expect(wrapper.contains(<input placeholder = "제목을 입력하세요." style={{width:'350px', height:'20px'}} ref={node => {title=node;}} />)).toBe(true)
  expect(wrapper.contains(<input type="number" ref={node => {min_people = node;}} style={{width:'45px'}} />)).toBe(true)
  expect(wrapper.contains(<input type="number" ref={node => {max_people = node;}} style={{width:'45px'}} />)).toBe(true)
  expect(wrapper.contains(<textarea placeholder = "내용을 입력하세요." rows="20" cols="80" ref={node => {description=node;}} />)).toBe(true)

  const wrapper2 = wrap({ username: 'b' })
  expect(wrapper2.contains(<select ref={node => {kind=node;}} style={{width:'85px'}, {height:'30px'}}>
  <option value="0">음식배달</option>
  <option value="1">택시합승</option>
  <option value="2">공동구매</option>
  <option value="3">스터디</option>
  <option value="4">운동</option>
  <option value="5">미팅</option>
</select>)).toBe(true)
  expect(wrapper2.contains(<input type="datetime-local" ref={node => {due=node;}} />)).toBe(true)
  expect(wrapper2.contains(<input placeholder = "제목을 입력하세요." style={{width:'350px', height:'20px'}} ref={node => {title=node;}} />)).toBe(true)
  expect(wrapper2.contains(<input type="number" ref={node => {min_people = node;}} style={{width:'45px'}} />)).toBe(true)
  expect(wrapper2.contains(<input type="number" ref={node => {max_people = node;}} style={{width:'45px'}} />)).toBe(true)
  expect(wrapper2.contains(<textarea placeholder = "내용을 입력하세요." rows="20" cols="80" ref={node => {description=node;}} />)).toBe(true)

})