import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Left_sidebar from 'components'


storiesOf('Left_sidebar', module)
  .add('default', () => (
    <Left_sidebar>Hello</Left_sidebar>
  ))
  .add('reverse', () => (
    <Left_sidebar reverse>Hello</Left_sidebar>
  ))
