export const OPEN = 0
export const CLOSED = 1
export const RE_OPEN = 2
export const RE_CLOSED = 3
export const BREAK_UP = 4

export const NUM_TO_STRING = (state_num) => {
  switch (state_num) {
    case OPEN :
      return '모집 중'
    case CLOSED :
      return '모집 마감'
    case RE_OPEN :
      return '추가 모집 중'
    case RE_CLOSED :
      return '추가 모집 마감'
    case BREAK_UP :
      return '해산'
    default :
      return ''
  }
}
