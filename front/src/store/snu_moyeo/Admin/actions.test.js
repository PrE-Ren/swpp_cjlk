import * as actions from './actions'

it('test penalty_action', () => {
  const hash = 'asdqewqr'
  const flag = true
  const report_info = 'adqrqcaa'
  const points = 1

  const expectedAction = {
    type: actions.PENALTY_ACTION,
    hash,
    flag,
    report_info,
    points
  }
  expect(actions.penalty_action(hash,flag,report_info,points)).toEqual(expectedAction)
})

it('test get_report_success_action', () => {
  const report_list = '[dadadeq]'

  const expectedAction = {
    type: actions.GET_REPORT_SUCCESS_ACTION,
    report_list
  }
  expect(actions.get_report_success_action(report_list)).toEqual(expectedAction)
})
