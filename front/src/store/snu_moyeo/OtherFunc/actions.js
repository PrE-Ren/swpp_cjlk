export const PREPARE_SEARCH_ACTION = 'PREPARE_SEARCH_ACTION'
export const SEARCH_ACTION = 'SEARCH_ACTION'
export const SEARCH_SUCCESS_ACTION = 'SEARCH_SUCCESS_ACTION'
export const PREPARE_LOAD_CAPTCHA_ACTION = 'PREPARE_LOAD_CAPTCHA_ACTION'
export const LOAD_CAPTCHA_ACTION = 'LOAD_CAPTCHA_ACTION'
export const LOAD_CAPTCHA_SUCCESS_ACTION = 'LOAD_CAPTCHA_SUCCESS_ACTION'
export const CONFIRM_CAPTCHA_ACTION = 'CONFIRM_CAPTCHA_ACTION'
export const CONFIRM_CAPTCHA_SUCCESS_ACTION = 'CONFIRM_CAPTCHA_SUCCESS_ACTION'

export const prepare_search_action = () => {
  return {
    type : PREPARE_SEARCH_ACTION
  }
}

export const search_action = (query) => {
  return {
    type : SEARCH_ACTION,
    query
  }
};

export const search_success_action = () => {
  return {
    type : SEARCH_SUCCESS_ACTION
  }
};

export const prepare_load_captcha_action = () => {
  return {
    type : PREPARE_LOAD_CAPTCHA_ACTION
  }
}

export const load_captcha_action = () => {
  return {
    type : LOAD_CAPTCHA_ACTION
  }
};

export const load_captcha_success_action = () => {
  return {
    type : LOAD_CAPTCHA_SUCCESS_ACTION
  }
};

export const confirm_captcha_action = (key, value) => {
  return {
    type : CONFIRM_CAPTCHA_ACTION,
    key,
    value
  }
};

export const confirm_captcha_success_action = () => {
  return {
    type : CONFIRM_CAPTCHA_SUCCESS_ACTION
  }
}
