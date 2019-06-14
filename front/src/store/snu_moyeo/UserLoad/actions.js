export const LOAD_LEADERINFO_ACTION = 'LOAD_LEADERINFO_ACTION'
export const LOAD_LEADERINFO_SUCCESS_ACTION = 'LOAD_LEADERINFO_SUCCESS_ACTION'
export const LOAD_MEMBERINFO_ACTION = 'LOAD_MEMBERINFO_ACTION'
export const LOAD_MEMBERINFO_SUCCESS_ACTION = 'LOAD_MEMBERINFO_SUCCESS_ACTION'

export const load_leaderinfo_action = (user_id) => {
  return {
    type : LOAD_LEADERINFO_ACTION,
    user_id
  }
}

export const load_leaderinfo_success_action = () => {
  return {
    type : LOAD_LEADERINFO_SUCCESS_ACTION
  }
}

export const load_memberinfo_action = (members) => {
  return {
    type : LOAD_MEMBERINFO_ACTION,
    members
  }
}

export const load_memberinfo_success_action = (member_list) => {
  return {
    type : LOAD_MEMBERINFO_SUCCESS_ACTION,
    member_list
  }
}
