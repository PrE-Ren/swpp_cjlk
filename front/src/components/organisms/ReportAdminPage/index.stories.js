import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ReportAdminPage } from 'components'

storiesOf('ReportAdminPage', module)
  .add('default', () => (
    <ReportAdminPage />
  ))
  .add('reverse', () => (
    <ReportAdminPage reverse />
  ))
