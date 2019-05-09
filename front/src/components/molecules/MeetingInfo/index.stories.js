import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { MeetingInfo } from 'components'

storiesOf('MeetingInfo', module)
  .add('default', () => (
    <MeetingInfo>Hello</MeetingInfo>
  ))
  .add('reverse', () => (
    <MeetingInfo reverse>Hello</MeetingInfo>
  ))
