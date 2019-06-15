import * as actions from './actions'

it('test load_leaderinfo_action', () => {
  const user_id = '1'

  const expectedAction = {
    type: actions.LOAD_LEADERINFO_ACTION,
    user_id
  }
  expect(actions.load_leaderinfo_action(user_id)).toEqual(expectedAction)
})

it('test load_leaderinfo_success_action', () => {

  const expectedAction = {
    type: actions.LOAD_LEADERINFO_SUCCESS_ACTION
  }
  expect(actions.load_leaderinfo_success_action()).toEqual(expectedAction)
})

it('test load_memberinfo_action', () => {
  const members ='[1,2]'

  const expectedAction = {
    type: actions.LOAD_MEMBERINFO_ACTION,
    members
  }
  expect(actions.load_memberinfo_action(members)).toEqual(expectedAction)
})

it('test load_memberinfo_success_action', () => {
  const member_list = '[1,2]'

  const expectedAction = {
    type: actions.LOAD_MEMBERINFO_SUCCESS_ACTION,
    member_list
  }
  expect(actions.load_memberinfo_success_action(member_list)).toEqual(expectedAction)
})
