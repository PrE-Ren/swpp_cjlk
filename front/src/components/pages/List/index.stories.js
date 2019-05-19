import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { List } from 'components'

storiesOf('List', module)
  .add('default', () => (
    <List />
  ))
