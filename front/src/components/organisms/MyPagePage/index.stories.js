import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { MyPagePage } from 'components'

storiesOf('MyPagePage', module)
  .add('default', () => (
    <MyPagePage />
  ))
  .add('reverse', () => (
    <MyPagePage reverse />
  ))
