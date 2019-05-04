import React from 'react'
import { storiesOf } from '@kadira/storybook'
import MeetingEntry from '.'

storiesOf('MeetingEntry', module)
  .add('default', () => (
    <MeetingEntry>Hello</MeetingEntry>
  ))
  .add('reverse', () => (
    <MeetingEntry reverse>Hello</MeetingEntry>
  ))
