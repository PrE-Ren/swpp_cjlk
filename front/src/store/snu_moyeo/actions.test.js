import * as actions from './actions'

it('test reload_action', () => {
  const option = 'meeting'
  const meetinglist = '[{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: 김동욱, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00}, members: [1]]'

  const expectedAction = {
    type : actions.RELOAD_ACTION,
    option,
    meetinglist
  }
  expect(actions.reload_action(option,meetinglist)).toEqual(expectedAction)
})

it('test log_in action', () => {
  const username = 'test'
  const password = '1234'
  const expectedAction = {
    type : actions.LOGIN_ACTION,
    username,
    password
  }
  expect(actions.login_action(username,password)).toEqual(expectedAction)
})

it('test login_success_action',() => {
  const username = 'test'
  const password = '1234'
  const token = 'asd2231867qe'
  const user_id = '1'
  const email = 'test@snu.ac.kr'
  const name = 'test1'

  const expectedAction = {
    type : actions.LOGIN_SUCCESS_ACTION,
    data : {
        username : username,
        password : password,
        mySNU_verification_token : token,
        user_id : user_id,
        email : email,
        name : name
    }
  }
  expect(actions.login_success_action(username, password, token, user_id, email, name)).toEqual(expectedAction)
})

it('test logout_action', () => {
  const expectedAction = {
    type : actions.LOGOUT_ACTION
  }
  expect(actions.logout_action()).toEqual(expectedAction)
})

it('test signup_action', () => {
  const username = 'test'
  const password = '1234'
  const email = 'test@snu.ac.kr'
  const name = 'test1'

  const expectedAction = {
    type : actions.SIGNUP_ACTION,
    username,
    password,
    email,
    name
  }
  expect(actions.signup_action(username, password, name, email)).toEqual(expectedAction)
})

it('test signup_success_action', () => {
  const expectedAction = {
    type : actions.SIGNUP_SUCCESS_ACTION
  }
  expect(actions.signup_success_action()).toEqual(expectedAction)
})

it('test new_action',()=> {
  const username = 'test'
  const password = '1234'
  const kind = '0'
  const leader = 'test1'
  const title = 'testmeeting'
  const due = '2019-05-17T18:48:25.217357+09:00'
  const min_people = '2'
  const max_people = '5'
  const description = 'testtesttest'
  const user_id = '1'
  const picture = null

  const expectedAction = {
    type : actions.NEW_ACTION,
    username,
    password,
    kind,
    leader,
    title,
    due,
    min_people,
    max_people,
    description,
    user_id,
    picture
  }
  expect(actions.new_action(username, password, kind, leader, title, due, min_people, max_people, description, user_id, picture)).toEqual(expectedAction)
})

it('test change_meeting_state_action', () => {
    const hash = 'asdqe12'
    const meeting_info = '{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: 김동욱, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}'
    const new_state = '2'

    const expectedAction = {
      type : actions.CHANGE_MEETING_STATE_ACTION,
      hash,
      meeting_info,
      new_state
    }
    expect(actions.change_meeting_state_action(hash,meeting_info,new_state)).toEqual(expectedAction)
})

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

it('test participate_update_action', () => {
  const participate_info ='{user_id: 1, meeting_id: 1}'

  const expectedAction = {
    type: actions.PARTICIPATE_ADD_ACTION,
    participate_info
  }
  expect(actions.participate_update_action(participate_info)).toEqual(expectedAction)
})
