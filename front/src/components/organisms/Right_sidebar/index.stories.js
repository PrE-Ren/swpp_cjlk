import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Right_sidebar } from 'components'

storiesOf('Right_sidebar', module)
  .add('default', () => (
    <Right_sidebar />
  ))
  .add('reverse', () => (
    <Right_sidebar reverse />
  ))
