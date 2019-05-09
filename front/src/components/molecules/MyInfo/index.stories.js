import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { MyInfo } from 'components'

storiesOf('MyInfo', module)
  .add('default', () => (
    <MyInfo />
  ))
  .add('reverse', () => (
    <MyInfo reverse />
  ))
