import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { New } from 'components'

storiesOf('New', module)
  .add('default', () => (
    <New />
  ))
