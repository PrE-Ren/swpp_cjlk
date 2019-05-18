import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { HistoryList } from 'components'

storiesOf('HistoryList', module)
  .add('default', () => (
    <HistoryList>Hello</HistoryList>
  ))
  .add('reverse', () => (
    <HistoryList reverse>Hello</HistoryList>
  ))
