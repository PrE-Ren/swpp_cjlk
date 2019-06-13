import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AllList } from 'components'

storiesOf('AllList', module)
  .add('default', () => (
    <AllList>Hello</AllList>
  ))
  .add('reverse', () => (
    <AllList reverse>Hello</AllList>
  ))
