export const PENALTY_ACTION = 'PENALTY_ACTION'
export const GET_REPORT_SUCCESS_ACTION = 'GET_REPORT_SUCCESS_ACTION'

export const penalty_action = (hash, flag, report_info, points) => {
  return {
    type : PENALTY_ACTION,
    hash,
    flag,
    report_info,
    points
  }
}

export const get_report_success_action = (report_list) => {
  return {
    type : GET_REPORT_SUCCESS_ACTION,
    report_list
  }
}
