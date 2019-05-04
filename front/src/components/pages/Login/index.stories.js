import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Login } from 'components'

storiesOf('Login', module)
  .add('default', () => (
    <Login />
  ))
