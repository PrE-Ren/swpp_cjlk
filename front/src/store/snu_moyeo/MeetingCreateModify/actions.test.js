import * as actions from './actions'

it('test new_action',()=> {
  const hash = '132asda'
  const user_id = '1'
  const meeting_info = '{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}'

  const expectedAction = {
    type : actions.NEW_ACTION,
    hash,
    user_id,
    meeting_info
  }
  expect(actions.new_action(hash, user_id, meeting_info)).toEqual(expectedAction)
})

it('test modify_action',()=> {
  const hash = '132asda'
  const meeting_info = '{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}'

  const expectedAction = {
    type : actions.MODIFY_ACTION,
    hash,
    meeting_info
  }
  expect(actions.modify_action(hash, meeting_info)).toEqual(expectedAction)
})

it('test change_meeting_state_action', () => {
    const hash = 'asdqe12'
    const meeting_info = '{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}'
    const new_state = '2'

    const expectedAction = {
      type : actions.CHANGE_MEETING_STATE_ACTION,
      hash,
      meeting_info,
      new_state
    }
    expect(actions.change_meeting_state_action(hash,meeting_info,new_state)).toEqual(expectedAction)
})

it('test change_meeting_info_action', () => {
    const meeting_info = '{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}'

    const expectedAction = {
      type : actions.CHANGE_MEETING_INFO_ACTION,
      meeting_info
    }
    expect(actions.change_meeting_info_action(meeting_info)).toEqual(expectedAction)
})
