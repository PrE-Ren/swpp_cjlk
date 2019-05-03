import React from 'react'
import { storiesOf } from '@kadira/storybook'
import make_new from '.'

storiesOf('make_new', module)
  .add('default', () => (
    <make_new>Hello</make_new>
  ))
  .add('reverse', () => (
    <make_new reverse>Hello</make_new>
  ))
