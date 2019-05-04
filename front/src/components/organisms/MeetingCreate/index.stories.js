import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { MeetingCreate } from 'components'

storiesOf('MeetingCreate', module)
  .add('default', () => (
    <MeetingCreate />
  ))
  .add('reverse', () => (
    <MeetingCreate reverse />
  ))
