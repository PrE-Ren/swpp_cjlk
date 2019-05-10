import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ImpendingList } from 'components'

storiesOf('ImpendingList', module)
  .add('default', () => (
    <ImpendingList>Hello</ImpendingList>
  ))
  .add('reverse', () => (
    <ImpendingList reverse>Hello</ImpendingList>
  ))
