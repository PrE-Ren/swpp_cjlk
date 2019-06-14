import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AllPage } from 'components'

storiesOf('AllPage', module)
  .add('default', () => (
    <AllPage />
  ))
  .add('reverse', () => (
    <AllPage reverse />
  ))
