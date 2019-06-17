import React from 'react'
import { shallow } from 'enzyme'
import { Map } from '.'

const wrap = (props = {}) => shallow(<Map {...props} />)

const meeting_info = {latitude: 100, longitude: 120}
const meeting_info2 = {latitude: 0, longitude: 0}

it('meeting create or modify', () => {
  const wrapper = wrap({ write: true, meeting_info: meeting_info })
  expect(wrapper.contains(<div>
    <div id="map" style={{width:'800px',height:'500px'}} />
  </div>)).toBe(true)
})

it('look at meeting', () => {
  const wrapper = wrap({ write: false, meeting_info: meeting_info })
  expect(wrapper.contains(<div>
    <div id="map" style={{width:'600px',height:'300px'}} />
  </div>)).toBe(true)
  const wrapper2 = wrap({ write: false, meeting_info: meeting_info2 })
  expect(wrapper2.contains(<div>
    <div id="map" style={{width:'0px',height:'0px'}} />
  </div>)).toBe(true)
})