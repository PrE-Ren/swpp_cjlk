import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ToHome from '.'

storiesOf('ToHome', module)
  .add('default', () => (
    <ToHome>Hello</ToHome>
  ))
  .add('reverse', () => (
    <ToHome reverse>Hello</ToHome>
  ))
