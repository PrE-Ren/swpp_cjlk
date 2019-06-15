import * as actions from './actions'

it('test reload_action', () => {
  const option = 'meeting'
  const meetinglist = '[{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00}, members: [1]]'

  const expectedAction = {
    type : actions.RELOAD_ACTION,
    option,
    meetinglist
  }
  expect(actions.reload_action(option,meetinglist)).toEqual(expectedAction)
})

it('test change_page_num_action', () => {
  const option = 'meeting'
  const page_num = '2'

  const expectedAction = {
    type: actions.CHANGE_PAGE_NUM_ACTION,
    option,
    page_num
  }
  expect(actions.change_page_num_action(option, page_num)).toEqual(expectedAction)
})

it('test change_page_num_success_action', () => {
  const option = 'meeting'
  const page_num = '2'
  const meetinglist = '[{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}]'

  const expectedAction = {
    type: actions.CHANGE_PAGE_NUM_SUCCESS_ACTION,
    option,
    page_num,
    meetinglist
  }
  expect(actions.change_page_num_success_action(option, page_num, meetinglist)).toEqual(expectedAction)
})
