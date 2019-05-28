import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Make_New_Css = styled.div`
  padding-top: 150px;
  padding-bottom: 50px;
`

const Font_Css = styled.span`
  font-size: 30px;
  vertical-align: middle;
`

const Make_New = () => {
  return (
    <Make_New_Css>
      <Button secondary onClick={() => {sessionStorage.removeItem("meeting_info"),window.location.href = '/new'}} size='big'>
        <Icon name='plus' size='big' />
        <Font_Css>새 모임 만들기</Font_Css>
      </Button>
    </Make_New_Css>
  );
};

export default Make_New
