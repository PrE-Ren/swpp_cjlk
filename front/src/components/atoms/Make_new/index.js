import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding-top: 150px;
  padding-bottom: 50px;
`

const Font = styled.span`
  font-size: 30px;
  vertical-align: middle;
`

// 새 모임 만들기 버튼을 누르면 세션 스토리지에 저장된 미팅 정보를 지워야 함
// 남아 있으면 '새 모임 만들기'가 아니라 '모임 게시물 수정하기'로 인식하기 때문
const Make_New = () => {
  return (
    <Wrapper>
      <Button secondary onClick={() => { sessionStorage.removeItem("meeting_info"); window.location.href = '/new' }} size='big'>
        <Icon name='plus' size='big' />
        <Font> 새 모임 만들기 </Font>
      </Button>
    </Wrapper>
  );
};

export default Make_New
