import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without errors', () => {
  const wrapper = shallow(<App />)
  const appComponent = wrapper.find("[data-test='component-app']")
  expect(appComponent.length).toBe(1)
})

test('renders generate receipt button', () => {})

test('no receipt displayed', () => {})

test('clicking generate receipt renders receipts', () => {})
