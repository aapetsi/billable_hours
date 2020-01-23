import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setHookState } from './utils/setHookState'

afterEach(rtl.cleanup)

let wrapper, csvReader

beforeEach(() => {
  wrapper = rtl.render(<App />)
})

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
const company = 'facebook'
const receipt = [
  {
    employee_id: 2,
    billable_rate: 100,
    project: 'facebook',
    date: '2020-01-20',
    hours: '7.33',
    total: 733.3333333333333
  },
  {
    employee_id: 3,
    billable_rate: 250,
    project: 'facebook',
    date: '2020-01-23',
    hours: '2.00',
    total: 500
  }
]
const show = false

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
    expect(receiptBtn.disabled).toBe(true)
  })

  test('should render the company drop down', () => {
    const select = rtl.getByTestId(wrapper.container, 'select')
    console.log(select.textContent)
    expect(select).toHaveTextContent(/select company/i)
  })
})
