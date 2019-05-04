import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { NewPage } from 'components'

storiesOf('NewPage', module)
  .add('default', () => (
    <NewPage>Hello</NewPage>
  ))
  .add('reverse', () => (
    <NewPage reverse>Hello</NewPage>
  ))
