import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(rtl.cleanup)

let wrapper

beforeEach(() => {
  wrapper = rtl.render(<App />)
})

describe('App component', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

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
    expect(receiptBtn).toBeInTheDocument()
    expect(receiptBtn.disabled).toBe(true)
  })

  test('should render the company selector ', () => {
    const select = rtl.getByTestId(wrapper.container, 'select')
    expect(select).toHaveTextContent(/select company/i)
  })
})
