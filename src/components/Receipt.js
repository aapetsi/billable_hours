import React from 'react'
import { Table } from 'react-bootstrap'

const Receipt = ({ receipt, company }) => {
  //   calculate total cost
  const totalCost = receipt.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  )
  return (
    <div>
      <h2>Company: {company.toUpperCase()}</h2>
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
        <tbody>
          {receipt.map((item, idx) => (
            <tr key={idx}>
              <td>{item.employee_id}</td>
              <td>{item.hours}</td>
              <td>{item.billable_rate.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
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
              <strong>{totalCost.toFixed(2)}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}

export default Receipt
