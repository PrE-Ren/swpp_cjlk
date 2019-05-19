import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { KindList } from 'components'

storiesOf('KindList', module)
  .add('default', () => (
    <KindList>Hello</KindList>
  ))
  .add('reverse', () => (
    <KindList reverse>Hello</KindList>
  ))
