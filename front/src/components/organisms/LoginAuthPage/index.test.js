import React from 'react'
import { shallow } from 'enzyme'
import { LoginAuthPage }from '.'
import { Button, Form, Grid, Header, Segment, Container } from 'semantic-ui-react'

const wrap = (props = {}) => shallow(<LoginAuthPage {...props} />)

it('username not defined', () => {
  const wrapper = wrap({ username: null })
  expect(wrapper.contains('인증완료')).toBe(false)
  expect(wrapper.contains('Authenticate your MySNU email')).toBe(false)
  expect(wrapper.contains('Authenticate your phone')).toBe(false)
  expect(wrapper.contains(<div></div>)).toBe(true)
})

it('username defined, email not defined, phone not defined', () => {
  const wrapper2 = wrap({ username: 'asda', mySNU_verification_token : null, phone_verification_token : null })
  expect(wrapper2.contains('인증완료')).toBe(true)
  expect(wrapper2.contains('인증번호 전송')).toBe(true)
  expect(wrapper2.contains(' Authenticate your MySNU email ')).toBe(true)
  expect(wrapper2.contains(' Authenticate your phone ')).toBe(true)
  expect(wrapper2.contains(<Button color='teal' disabled fluid size='large'>메일 인증 완료</Button>)).toBe(false)
  expect(wrapper2.contains(<Button color='teal' disabled fluid size='large'>핸드폰 인증 완료</Button>)).toBe(false)
})

it('username defined, email defined, phone defined', () => {
  const wrapper3 = wrap({ username: 'asda', mySNU_verification_token : 'asdas', phone_verification_token : 'avs' })
  expect(wrapper3.contains('인증완료')).toBe(true)
  expect(wrapper3.contains(' Authenticate your MySNU email ')).toBe(true)
  expect(wrapper3.contains(' Authenticate your phone ')).toBe(true)
  expect(wrapper3.contains(<Button color='teal' disabled fluid size='large'>메일 인증 완료</Button>)).toBe(true)
  expect(wrapper3.contains(<Button color='teal' disabled fluid size='large'>핸드폰 인증 완료</Button>)).toBe(true)
})

it('username defined, email not defined, phone defined', () => {
  const wrapper4 = wrap({ username: 'asda', mySNU_verification_token : null, phone_verification_token : 'avs' })
  expect(wrapper4.contains('인증완료')).toBe(true)
  expect(wrapper4.contains(' Authenticate your MySNU email ')).toBe(true)
  expect(wrapper4.contains(' Authenticate your phone ')).toBe(true)
  expect(wrapper4.contains(<Button color='teal' disabled fluid size='large'>메일 인증 완료</Button>)).toBe(false)
  expect(wrapper4.contains(<Button color='teal' disabled fluid size='large'>핸드폰 인증 완료</Button>)).toBe(true)
})

it('username defined, email defined, phone not defined', () => {
  const wrapper5 = wrap({ username: 'asda', mySNU_verification_token : 'asdas', phone_verification_token : null })
  expect(wrapper5.contains('인증완료')).toBe(true)
  expect(wrapper5.contains(' Authenticate your MySNU email ')).toBe(true)
  expect(wrapper5.contains(' Authenticate your phone ')).toBe(true)
  expect(wrapper5.contains(<Button color='teal' disabled fluid size='large'>메일 인증 완료</Button>)).toBe(true)
  expect(wrapper5.contains(<Button color='teal' disabled fluid size='large'>핸드폰 인증 완료</Button>)).toBe(false)
})
