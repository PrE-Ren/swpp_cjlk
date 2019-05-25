import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LoginAuth } from 'components'

storiesOf('LoginAuth', module)
  .add('default', () => (
    <LoginAuth />
  ))
