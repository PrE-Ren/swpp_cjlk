import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { ReportAdmin } from 'components'

storiesOf('ReportAdmin', module)
  .add('default', () => (
    <ReportAdmin />
  ))
