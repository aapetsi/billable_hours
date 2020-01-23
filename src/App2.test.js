import React from 'react'
import App from './App'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

afterEach(rtl.cleanup)

let wrapper

beforeEach(() => {
  wrapper = rtl.render(<App />)
})

describe('App component', () => {
  test('should render homepage heading', () => {
    expect(
      wrapper.queryByText(/welcome to kratos billing systems/i)
    ).toBeInTheDocument()
  })
})
