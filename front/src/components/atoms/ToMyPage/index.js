import React from 'react'
import { PropTypes } from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

const ToMyPage = () => {
  return (
      <Button secondary onClick={() => window.location.href = '/mypage'}>
        <Icon name='user' /><span style={{ fontSize:'20px' }}>내 정보</span>
      </Button>
  );
};

ToMyPage.defaultProps = {
    palette: 'primary',
    type: 'button',
}

export default ToMyPage
