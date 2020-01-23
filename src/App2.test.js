import React from 'react'
import App from './App'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setHookState } from './utils/setHookState'

afterEach(rtl.cleanup)

let wrapper, csvReader

beforeEach(() => {
  wrapper = rtl.render(<App />)
})

describe('App component', () => {
  test('should match the snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  test('should render homepage heading', () => {
    expect(
      wrapper.queryByText(/welcome to kratos billing systems/i)
    ).toBeInTheDocument()
  })

  test('button should be disabled', () => {
    const receiptBtn = wrapper.queryByText(/generate receipt/i)
    expect(receiptBtn.disabled).toBe(true)
  })

  test('should render no receipts', () => {
    const file = new File(['(⌐□_□)'], 'test.csv', { type: '.csv, text/csv' })
    const receipt = rtl.getByTestId(wrapper.container, /receipt-none/i)
    expect(receipt.textContent).toBe('Your receipts will show here')
  })

  test('should render all receipts', () => {
    React.useState = setHookState({
      timeSheet: [1, 2, 3],
      receipt: [1, 2, 3],
      company: 'test',
      show: false
    })
    const receipts = rtl.getByTestId(wrapper.container, 'receipt')
    wrapper.debug()
  })
})
