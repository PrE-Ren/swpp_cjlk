import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

// logout_click : 로그아웃 버튼을 눌렀을 때 액션을 디스패치할 함수
export const Logout = ({ logout_click }) => {
  return (
    <div style={{ float:'right' }}>
      <Button secondary onClick={logout_click}>
        <Icon name='log out' /><span style={{ fontSize:'20px' }}>로그아웃</span>
      </Button>
    </div>
  );
};
