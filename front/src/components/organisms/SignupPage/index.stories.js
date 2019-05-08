import React from 'react'
import { storiesOf } from '@kadira/storybook'
import SignupPage from 'components'

storiesOf('SignupPage', module)
  .add('default', () => (
    <SignupPage>Hello</SignupPage>
  ))
  .add('reverse', () => (
    <SignupPage reverse>Hello</SignupPage>
  ))
