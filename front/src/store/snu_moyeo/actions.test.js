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
  const mySNU_verification_token = 'asd2231867qe'
  const phone_verification_token = 'asdsaqwe'
  const user_id = '1'
  const email = 'test@snu.ac.kr'
  const phone_number ='01012345678'
  const name = 'test1'

  const expectedAction = {
    type : actions.LOGIN_SUCCESS_ACTION,
    data : {
        username : username,
        password : password,
        mySNU_verification_token : mySNU_verification_token,
        phone_verification_token : phone_verification_token,
        user_id : user_id,
        email : email,
        phone_number : phone_number,
        name : name
    }
  }
  expect(actions.login_success_action(username, password, mySNU_verification_token, phone_verification_token, user_id, email, phone_number, name)).toEqual(expectedAction)
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
  const name = 'test1'

  const expectedAction = {
    type : actions.SIGNUP_ACTION,
    username,
    password,
    name
  }
  expect(actions.signup_action(username, password, name)).toEqual(expectedAction)
})

it('test signup_success_action', () => {
  const expectedAction = {
    type : actions.SIGNUP_SUCCESS_ACTION
  }
  expect(actions.signup_success_action()).toEqual(expectedAction)
})

it('test login_auth_action', () => {
  const username = 'test'
  const password = '1234'
  const user_id = '1'
  const name = 'test1'

  const expectedAction = {
    type : actions.LOGIN_AUTH_ACTION,
    username,
    password,
    user_id,
    name
  }
  expect(actions.login_auth_action(username, password, user_id, name)).toEqual(expectedAction)
})

it('test send_email_action', () => {
  const hash = '1235asdad'
  const email = 'test@snu.ac.kr'

  const expectedAction = {
    type : actions.SEND_EMAIL_ACTION,
    hash,
    email
  }
  expect(actions.send_email_action(hash, email)).toEqual(expectedAction)
})

it('test send_phone_action', () => {
  const hash = '1235asdad'
  const phone_number = '01012345678'

  const expectedAction = {
    type : actions.SEND_PHONE_ACTION,
    hash,
    phone_number
  }
  expect(actions.send_phone_action(hash, phone_number)).toEqual(expectedAction)
})

it('test confirm_email_action', () => {
  const hash = '1235asdad'
  const email = 'test@snu.ac.kr'
  const email_code = '12345'

  const expectedAction = {
    type : actions.CONFIRM_EMAIL_ACTION,
    hash,
    email,
    email_code
  }
  expect(actions.confirm_email_action(hash, email, email_code)).toEqual(expectedAction)
})

it('test confirm_phone_action', () => {
  const hash = '1235asdad'
  const phone_number = '01012345678'
  const phone_code = '12345'

  const expectedAction = {
    type : actions.CONFIRM_PHONE_ACTION,
    hash,
    phone_number,
    phone_code
  }
  expect(actions.confirm_phone_action(hash, phone_number, phone_code)).toEqual(expectedAction)
})

it('test success_email_action', () => {
  const email = 'test@snu.ac.kr'
  const email_code = '12345'

  const expectedAction = {
    type : actions.SUCCESS_EMAIL_ACTION,
    email,
    email_code
  }
  expect(actions.success_email_action(email, email_code)).toEqual(expectedAction)
})

it('test success_phone_action', () => {
  const phone_number = '01012345678'
  const phone_code = '12345'

  const expectedAction = {
    type : actions.SUCCESS_PHONE_ACTION,
    phone_number,
    phone_code
  }
  expect(actions.success_phone_action(phone_number, phone_code)).toEqual(expectedAction)
})

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
  const user_id = '1'
  const meeting_info = '{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}'

  const expectedAction = {
    type : actions.MODIFY_ACTION,
    hash,
    user_id,
    meeting_info
  }
  expect(actions.modify_action(hash, user_id, meeting_info)).toEqual(expectedAction)
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

it('test change_page_num_action', () => {
  const page_num = '2'

  const expectedAction = {
    type: actions.CHANGE_PAGE_NUM_ACTION,
    page_num
  }
  expect(actions.change_page_num_action(page_num)).toEqual(expectedAction)
})

it('test change_page_num_success_action', () => {
  const page_num = '2'
  const meetinglist = '[{id: 3, title: 미팅, created: 2019-05-10T19:00:00+09:00, leader: test, min_people: 8, max_people: 10, state: 0, description: 미팅 구해요, kind: 5, due: 2019-05-16T19:00:00+09:00, members: [1]}]'

  const expectedAction = {
    type: actions.CHANGE_PAGE_NUM_SUCCESS_ACTION,
    page_num,
    meetinglist
  }
  expect(actions.change_page_num_success_action(page_num, meetinglist)).toEqual(expectedAction)
})

it('test load_leaderinfo_action', () => {
  const user_id = '1'

  const expectedAction = {
    type: actions.LOAD_LEADERINFO_ACTION,
    user_id
  }
  expect(actions.load_leaderinfo_action(user_id)).toEqual(expectedAction)
})

it('test load_comments_action', () => {
  const meeting_id = '1'

  const expectedAction = {
    type: actions.LOAD_COMMENTS_ACTION,
    meeting_id
  }
  expect(actions.load_comments_action(meeting_id)).toEqual(expectedAction)
})

it('test load_comments_success_action', () => {
  const comments = '[]'

  const expectedAction = {
    type: actions.LOAD_COMMENTS_SUCCESS_ACTION,
    comments
  }
  expect(actions.load_comments_success_action(comments)).toEqual(expectedAction)
})

it('test add_comment_action', () => {
  const hash = '123sad'
  const content = '[]'
  const meeting_id = '1'

  const expectedAction = {
    type: actions.ADD_COMMENT_ACTION,
    hash,
    content,
    meeting_id
  }
  expect(actions.add_comment_action(hash, content, meeting_id)).toEqual(expectedAction)
})

it('test edit_comment_action', () => {
  const hash = '123sad'
  const comment_id = '2'
  const meeting_id = '1'
  const writer_id = '3'
  const content = '[]'

  const expectedAction = {
    type: actions.EDIT_COMMENT_ACTION,
    hash,
    comment_id,
    meeting_id,
    writer_id,
    content
  }
  expect(actions.edit_comment_action(hash, comment_id, meeting_id, writer_id, content)).toEqual(expectedAction)
})

it('test delete_comment_action', () => {
  const hash = '123sad'
  const comment_id = '1'

  const expectedAction = {
    type: actions.DELETE_COMMENT_ACTION,
    hash,
    comment_id
  }
  expect(actions.delete_comment_action(hash, comment_id)).toEqual(expectedAction)
})
