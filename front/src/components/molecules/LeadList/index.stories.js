import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { LeadList } from 'components'

storiesOf('LeadList', module)
  .add('default', () => (
    <LeadList>Hello</LeadList>
  ))
  .add('reverse', () => (
    <LeadList reverse>Hello</LeadList>
  ))
