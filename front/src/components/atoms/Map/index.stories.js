import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Map from '.'

storiesOf('Map', module)
  .add('default', () => (
    <Map>Hello</Map>
  ))
  .add('reverse', () => (
    <Map reverse>Hello</Map>
  ))
