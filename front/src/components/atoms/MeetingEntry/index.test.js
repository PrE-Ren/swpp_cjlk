import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure } from 'enzyme';
import MeetingEntry from './MeetingEntry';

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
