import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Captcha from '.'

storiesOf('Captcha', module)
  .add('default', () => (
    <Captcha>Hello</Captcha>
  ))
  .add('reverse', () => (
    <Captcha reverse>Hello</Captcha>
  ))
