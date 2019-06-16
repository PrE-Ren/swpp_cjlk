import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { NaverShopping } from 'components'

storiesOf('NaverShopping', module)
  .add('default', () => (
    <NaverShopping>Hello</NaverShopping>
  ))
  .add('reverse', () => (
    <NaverShopping reverse>Hello</NaverShopping>
  ))
