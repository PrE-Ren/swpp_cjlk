import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { RecentList } from 'components'

storiesOf('RecentList', module)
  .add('default', () => (
    <RecentList>Hello</RecentList>
  ))
  .add('reverse', () => (
    <RecentList reverse>Hello</RecentList>
  ))
