import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { TutorialPage } from 'components'

storiesOf('TutorialPage', module)
  .add('default', () => (
    <TutorialPage />
  ))
  .add('reverse', () => (
    <TutorialPage reverse />
  ))
