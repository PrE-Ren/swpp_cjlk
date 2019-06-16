import React from 'react'
import { storiesOf } from '@kadira/storybook'
import CommentEntry from '.'

storiesOf('CommentEntry', module)
  .add('default', () => (
    <CommentEntry>Hello</CommentEntry>
  ))
  .add('reverse', () => (
    <CommentEntry reverse>Hello</CommentEntry>
  ))
