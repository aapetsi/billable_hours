import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { receipt } from './data'

import Receipt from '../components/Receipt'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a shallowWrapper for the app component
 * @function setup
 * @param {object} props
 * @param {object} state - Initial state for app
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  return shallow(<Receipt {...props} />)
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

describe('Test Receipt Component', () => {
  test('renders without errors', () => {
    const wrapper = setup({ company: '', receipt: [] })
    const receiptComponent = findByTestAttr(wrapper, 'component-receipt-app')
    expect(receiptComponent.length).toBe(1)
  })

  test('it calculates the correct cost total', () => {
    const wrapper = setup({ company: '', receipt: [] })
    const total = findByTestAttr(wrapper, 'component-total-cost')
    expect(total.length).toBe(1)
  })

  test('it renders the correct company name', () => {
    const wrapper = setup({
      company: 'slydepay',
      receipt: []
    })
    const companyName = findByTestAttr(wrapper, 'component-company-name')
    expect(companyName.text()).toMatch(/company: slydepay/i)
  })

  test('renders correct total', () => {
    const wrapper = setup({
      company: 'slydepay',
      receipt
    })
    const total = findByTestAttr(wrapper, 'component-total-cost')
    expect(total.text()).toMatch('NGN 1,233.33')
  })
})
