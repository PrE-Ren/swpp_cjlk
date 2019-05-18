import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { JoinList } from 'components'

storiesOf('JoinList', module)
  .add('default', () => (
    <JoinList>Hello</JoinList>
  ))
  .add('reverse', () => (
    <JoinList reverse>Hello</JoinList>
  ))
