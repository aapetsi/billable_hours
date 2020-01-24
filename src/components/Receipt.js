import React from 'react'
import { Table } from 'react-bootstrap'

const Receipt = ({ receipt, company }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  })

  let receiptCopy = receipt.slice(0)

  // group by employee id
  let result = []
  receiptCopy.forEach((item, index) => {
    if (result.length === 0) {
      return result.push(item)
    }
    // find if item already exists in array
    const found = result.find(x => x.employee_id === item.employee_id)

    if (found) {
      found.total = Number(item.total) + Number(found.total)
      found.hours = Number(item.hours) + Number(found.hours)
    } else {
      result.push(item)
    }
  })

  //   calculate total cost
  const totalCost = result.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  )
  return (
    <div data-test='component-receipt-app'>
      <h4 data-test='component-company-name'>
        Company: {company.toUpperCase()}
      </h4>
      <Table
        striped
        bordered
        hover
        size='sm'
        responsive='sm'
        style={{ textAlign: 'center', margin: '0 auto', width: '70%' }}
      >
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Number of Hours</th>
            <th>Unit Price</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody data-test='component-table-body'>
          {result.map((item, idx) => (
            <tr key={idx}>
              <td>{item.employee_id}</td>
              <td>{item.hours}</td>
              <td>{formatter.format(item.billable_rate)}</td>
              <td>{formatter.format(item.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong data-test='component-total-cost'>
                {formatter.format(totalCost)}
              </strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}

export default Receipt
