import { useReceipt } from '../utils/useReceipt'
import * as rtl from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { timeSheet } from './data'

afterEach(rtl.cleanup)

let result

beforeEach(() => {
  result = renderHook(useReceipt).result
})

describe('test hooks', () => {
  test('handles file upload', () => {
    act(() => {
      result.current.handleFileUpload(timeSheet)
    })
    expect(result.current.timeSheet).toBeDefined()
    expect(result.current.timeSheet).toHaveLength(15)
  })

  test('handles company selection', () => {
    act(() => {
      result.current.handleFileUpload(timeSheet)
      //   rtl.fireEvent
      result.current.company = 'facebook'
      expect(result.current.company).toBe('facebook')
    })
  })

  test('handles generate receipt', () => {
    act(() => {
      result.current.handleFileUpload(timeSheet)
      result.current.company = 'slydepay'
      result.current.handleGenerateReceipt()
    })
    expect(result.current.receipt).toHaveLength(0)
  })
})
