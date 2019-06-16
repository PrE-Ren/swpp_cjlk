import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ToMyPage = () => {
  return (
      <Button secondary onClick={() => window.location.href = '/mypage'}>
        <Icon name='user' /><span style={{ fontSize:'20px' }}>내 정보</span>
      </Button>
  );
};

export default ToMyPage
