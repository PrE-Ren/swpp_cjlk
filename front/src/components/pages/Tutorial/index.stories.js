import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Tutorial } from 'components'

storiesOf('Tutorial', module)
  .add('default', () => (
    <Tutorial />
  ))
