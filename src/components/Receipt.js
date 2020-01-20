import React from 'react'
import { Table } from 'react-bootstrap'

const Receipt = ({ receipt, company }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  //   calculate total cost
  const totalCost = receipt.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  )
  return (
    <div data-test='component-receipt-app'>
      <h2 data-test='component-company-name'>
        Company: {company.toUpperCase()}
      </h2>
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
          {receipt.map((item, idx) => (
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
