import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LoginAuthPage } from 'components'

storiesOf('LoginAuthPage', module)
  .add('default', () => (
    <LoginAuthPage />
  ))
  .add('reverse', () => (
    <LoginAuthPage reverse />
  ))
