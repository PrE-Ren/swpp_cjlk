import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { join_chatroom } from 'components'

storiesOf('join_chatroom', module)
  .add('default', () => (
    <join_chatroom>Hello</join_chatroom>
  ))
  .add('reverse', () => (
    <join_chatroom reverse>Hello</join_chatroom>
  ))
