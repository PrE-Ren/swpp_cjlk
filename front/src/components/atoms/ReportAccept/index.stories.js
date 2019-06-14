import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ReportAccept from '.'

storiesOf('ReportAccept', module)
  .add('default', () => (
    <ReportAccept>Hello</ReportAccept>
  ))
  .add('reverse', () => (
    <ReportAccept reverse>Hello</ReportAccept>
  ))
