import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ButtonsInMeetingInfo from '.'

storiesOf('ButtonsInMeetingInfo', module)
  .add('default', () => (
    <ButtonsInMeetingInfo>Hello</ButtonsInMeetingInfo>
  ))
  .add('reverse', () => (
    <ButtonsInMeetingInfo reverse>Hello</ButtonsInMeetingInfo>
  ))
