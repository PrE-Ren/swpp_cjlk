import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ReportInfo } from 'components'

storiesOf('ReportInfo', module)
  .add('default', () => (
    <ReportInfo>Hello</ReportInfo>
  ))
  .add('reverse', () => (
    <ReportInfo reverse>Hello</ReportInfo>
  ))
