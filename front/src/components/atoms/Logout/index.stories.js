import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Logout from '.'

storiesOf('Logout', module)
  .add('default', () => (
    <Logout>Hello</Logout>
  ))
  .add('reverse', () => (
    <Logout reverse>Hello</Logout>
  ))
