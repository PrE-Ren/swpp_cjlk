import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Join_chatroom from 'components'

storiesOf('Join_chatroom', module)
  .add('default', () => (
    <Join_chatroom>Hello</Join_chatroom>
  ))
  .add('reverse', () => (
    <Join_chatroom reverse>Hello</Join_chatroom>
  ))
