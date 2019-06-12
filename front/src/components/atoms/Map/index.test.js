import React from 'react'
import { shallow } from 'enzyme'
import { Map } from '.'

const wrap = (props = {}) => shallow(<Map {...props} />)

it('renders map when passed in', () => {
  const wrapper = wrap({ write: true })
  expect(wrapper.contains(<div>
    <div id="map" style={{width:'800px',height:'500px'}} />
  </div>)).toBe(true)
  const wrapper2 = wrap({ write: false })
  expect(wrapper2.contains(<div>
    <div id="map" style={{width:'600px',height:'300px'}} />
  </div>)).toBe(true)
})