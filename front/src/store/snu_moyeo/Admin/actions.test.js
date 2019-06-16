import * as actions from './actions'

it('test penalty_action', () => {
  const hash = 'asdqewqr'
  const flag = true
  const report_info = 'adqrqcaa'
  const point = 1

  const expectedAction = {
    type: actions.PENALTY_ACTION,
    hash,
    flag,
    report_info,
    point
  }
  expect(actions.penalty_action(hash,flag,report_info,point)).toEqual(expectedAction)
})

it('test get_report_success_action', () => {
  const report_list = '[dadadeq]'

  const expectedAction = {
    type: actions.GET_REPORT_SUCCESS_ACTION,
    report_list
  }
  expect(actions.get_report_success_action(report_list)).toEqual(expectedAction)
})

it('test accuse_action', () => {
  const hash = '1231asdq'
  const accuse_reason = 'asdqwerq'
  const member_id = '1'

  const expectedAction = {
    type: actions.ACCUSE_ACTION,
    hash,
    accuse_reason,
    member_id
  }
  expect(actions.accuse_action(hash,accuse_reason,member_id)).toEqual(expectedAction)
})
