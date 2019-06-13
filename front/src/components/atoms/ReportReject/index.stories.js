import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ReportReject from '.'

storiesOf('ReportReject', module)
  .add('default', () => (
    <ReportReject>Hello</ReportReject>
  ))
  .add('reverse', () => (
    <ReportReject reverse>Hello</ReportReject>
  ))
