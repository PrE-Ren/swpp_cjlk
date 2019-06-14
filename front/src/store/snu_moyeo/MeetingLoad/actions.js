export const RELOAD_ACTION = 'RELOAD_ACTION'
export const CHANGE_PAGE_NUM_ACTION = 'CHANGE_PAGE_NUM_ACTION'
export const CHANGE_PAGE_NUM_SUCCESS_ACTION = 'CHANGE_PAGE_NUM_SUCCESS_ACTION'

export const reload_action = (option, meetinglist) => {
  return {
    type : RELOAD_ACTION,
    option,
    meetinglist
  }
};

export const change_page_num_action = (option, page_num) => {
  return {
    type: CHANGE_PAGE_NUM_ACTION,
    option,
    page_num
  }
}

export const change_page_num_success_action = (option, page_num, meetinglist) => {
  return {
    type: CHANGE_PAGE_NUM_SUCCESS_ACTION,
    option,
    page_num,
    meetinglist
  }
}
