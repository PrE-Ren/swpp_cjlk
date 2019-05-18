export const OPEN = 0
export const CLOSED = 1
export const RE_OPEN = 2
export const RE_CLOSED = 3
export const BREAK_UP = 4

export const STATE_NUM_TO_STRING = (state_num) => {
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

export const DELIVER = 0
export const TAXI = 1
export const BUY = 2
export const STUDY = 3
export const EXERCISE = 4
export const MEETING = 5

export const KIND_NUM_TO_STRING = (kind_num) => {
  switch (kind_num) {
    case DELIVER :
      return '음식배달'
    case TAXI :
      return '택시합승'
    case BUY :
      return '공동구매'
    case STUDY :
      return '스터디'
    case EXERCISE :
      return '운동'
    case MEETING :
      return '미팅'
    default :
      return ''
  }
}
