import * as actions from './actions'

it('test join_meeting_action',() => {
  const hash = 'asdaq123'
  const user_id = '1'
  const meeting_id = '1'

  const expectedAction = {
    type: actions.JOIN_MEETING_ACTION,
    hash,
    user_id,
    meeting_id
  }

  expect(actions.join_meeting_action(hash,user_id,meeting_id)).toEqual(expectedAction)
})

it('test withdraw_meeting_action', () => {
  const hash = 'asdaq123'
  const user_id = '1'
  const meeting_id = '1'

  const expectedAction = {
    type: actions.WITHDRAW_MEETING_ACTION,
    hash,
    user_id,
    meeting_id
  }
  expect(actions.withdraw_meeting_action(hash,user_id,meeting_id)).toEqual(expectedAction)
})
