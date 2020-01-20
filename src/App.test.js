import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App'
import { setHookState } from './utils/setHookState'
import Receipt from './components/Receipt'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a shallowWrapper for the app component
 * @function setup
 * @param {object} props
 * @param {object} state - Initial state for app
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />)
}

/**
 * Return ShallowWrapper containing node(s) with the given data test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

const timeSheet = [
  {
    employee_id: 1,
    billable_rate: 300,
    project: 'google',
    date: '2020-01-20',
    start_time: '08:00',
    end_time: '12:00'
  },
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'facebook',
    date: '2020-01-20',
    start_time: '09:30',
    end_time: '16:50'
  },
  {
    employee_id: 3,
    billable_rate: 250,
    project: 'twitter',
    date: '2020-01-20',
    start_time: '12:00',
    end_time: '16:00'
  },
  {
    employee_id: 1,
    billable_rate: 300,
    project: 'instagram',
    date: '2020-01-21',
    start_time: '10:30',
    end_time: '15:30'
  },
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'twitter',
    date: '2020-01-21',
    start_time: '08:00',
    end_time: '14:15'
  },
  {
    employee_id: 3,
    billable_rate: 250,
    project: 'yahoo',
    date: '2020-01-21',
    start_time: '13:00',
    end_time: '15:00'
  },
  {
    employee_id: 1,
    billable_rate: 300,
    project: 'uber',
    date: '2020-01-22',
    start_time: '09:00',
    end_time: '11:00'
  },
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'slydepay',
    date: '2020-01-22',
    start_time: '08:00',
    end_time: '17:00'
  },
  {
    employee_id: 3,
    billable_rate: 250,
    project: 'linkedin',
    date: '2020-01-22',
    start_time: '12:00',
    end_time: '16:00'
  },
  {
    employee_id: 1,
    billable_rate: 300,
    project: 'linkedin',
    date: '2020-01-23',
    start_time: '11:00',
    end_time: '15:00'
  },
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'instagram',
    date: '2020-01-23',
    start_time: '13:00',
    end_time: '16:00'
  },
  {
    employee_id: 3,
    billable_rate: 250,
    project: 'facebook',
    date: '2020-01-23',
    start_time: '15:00',
    end_time: '17:00'
  },
  {
    employee_id: 1,
    billable_rate: 300,
    project: 'slydepay',
    date: '2020-01-24',
    start_time: '09:00',
    end_time: '16:00'
  },
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'whatsapp',
    date: '2020-01-24',
    start_time: '12:00',
    end_time: '15:00'
  },
  {
    employee_id: 3,
    billable_rate: 250,
    project: 'whatsapp',
    date: '2020-01-24',
    start_time: '11:00',
    end_time: '16:00'
  }
]

const receipt = [
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'slydepay',
    date: '2020-01-22',
    hours: '9.00',
    total: 900
  },
  {
    employee_id: 1,
    billable_rate: 300,
    project: 'slydepay',
    date: '2020-01-24',
    hours: '7.00',
    total: 2100
  }
]

test('renders without errors', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test('renders generate receipt button', () => {
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'component-generate-receipt')
  expect(button.length).toBe(1)
})

test('no receipt displayed', () => {
  const wrapper = setup()
  const receipt = findByTestAttr(wrapper, 'component-receipt')
  expect(receipt.length).toBe(1)
  expect(receipt.text()).toContain('Your receipts will show here')
})

test('expect modal to show', () => {
  React.useState = setHookState({
    timeSheet,
    company: 'slydepay',
    receipt,
    show: false
  })
  const wrapper = setup()
  const button = findByTestAttr(wrapper, 'component-generate-receipt')
  button.simulate('click')
  const receipt_ = findByTestAttr(wrapper, 'component-receipt')
  expect(receipt_).toEqual({})
  console.log(wrapper.debug())
})

test('clicking generate receipt renders receipts', () => {})
