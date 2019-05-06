import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure } from 'enzyme';
import MeetingEntry from '.';


const wrap = (props = {}) => shallow(<MeetingEntry {...props} />)

it('renders entry when passed in', () => {
  const wrapper = wrap({ id: 3, title: '미팅', created: '2019-05-10T19:00:00+09:00', leader: '김동욱', min_people: 8, max_people: 10, state: 0, description: '미팅 구해요', kind: 5, due: '2019-05-16T19:00:00+09:00'})
  expect(wrapper.contains('미팅')).toBe(true)
  expect(wrapper.contains('김동욱')).toBe(true)
  expect(wrapper.contains(8)).toBe(true)
  expect(wrapper.contains(10)).toBe(true)
  expect(wrapper.contains('미팅 구해요')).toBe(true)
  expect(wrapper.contains('2019-05-16T19:00:00+09:00')).toBe(true)
})

/*
configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('<MeetingEntry />', () => {
  it('MeetingEntry의 렌더링', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<MeetingEntry store={store} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#MeetingEntry').length).toEqual(2);
  });
});
*/