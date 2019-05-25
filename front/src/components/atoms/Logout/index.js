import React from 'react'
import { PropTypes } from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

export const Logout = ({ logout_click }) => {
  return (
    <div style={{ float:'right' }}>
      <Button secondary onClick={logout_click}>
        <Icon name='log out' /><span style={{ fontSize:'20px' }}>로그아웃</span>
      </Button>
    </div>
  );
};

Logout.defaultProps = {
    palette: 'primary',
    type: 'button',
}
