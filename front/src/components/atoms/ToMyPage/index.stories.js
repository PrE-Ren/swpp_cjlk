import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ToMyPage from '.'

storiesOf('ToMyPage', module)
  .add('default', () => (
    <ToMyPage>Hello</ToMyPage>
  ))
  .add('reverse', () => (
    <ToMyPage reverse>Hello</ToMyPage>
  ))
