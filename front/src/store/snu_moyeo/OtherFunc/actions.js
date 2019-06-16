export const PREPARE_SEARCH_ACTION = 'PREPARE_SEARCH_ACTION'
export const SEARCH_ACTION = 'SEARCH_ACTION'
export const SEARCH_SUCCESS_ACTION = 'SEARCH_SUCCESS_ACTION'


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



