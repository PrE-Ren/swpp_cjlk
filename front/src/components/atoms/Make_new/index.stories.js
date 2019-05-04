import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Make_new from '.'

storiesOf('Make_new', module)
  .add('default', () => (
    <Make_new>Hello</Make_new>
  ))
  .add('reverse', () => (
    <Make_new reverse>Hello</Make_new>
  ))
