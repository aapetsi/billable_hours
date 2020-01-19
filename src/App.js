import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Receipt from './components/Receipt'
import { Jumbotron, Button } from 'react-bootstrap'

const App = () => {
  const [timeSheet, setTimeSheet] = useState([])
  const [company, setCompany] = useState('')
  const [receipt, setReceipt] = useState([])

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
  }

  const handleFileUpload = (data, filename) => {
    setReceipt([])
    setTimeSheet([...data])
  }

  const handleCompanyChange = e => {
    setCompany(e.target.value)
  }

  const handleGenerateReceipt = () => {
    if (!company) {
      alert('Select a company from the drop down list')
    }
    // filter companies by their name
    let res = []
    const filteredCompanies = timeSheet.filter(item => item.project === company)
    filteredCompanies.forEach(item => {
      // define start and end dates
      const start = new Date(`${item.date} ${item.start_time}`)
      const end = new Date(`${item.date} ${item.end_time}`)
      const hours = (end.getTime() - start.getTime()) / 3.6e6
      res.push({
        employee_id: item.employee_id,
        billable_rate: item.billable_rate,
        project: item.project,
        date: item.date,
        hours: hours.toFixed(2),
        total: hours * item.billable_rate
      })
    })
    setReceipt([...res])
  }

  const distinctCompanies = [...new Set(timeSheet.map(x => x.project))]
  const selectCompany = (
    <select onChange={handleCompanyChange} disabled={timeSheet.length === 0}>
      <option value=''>select company</option>
      {distinctCompanies.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
        </option>
      ))}
    </select>
  )
  return (
    <div className='App' data-test='component-app'>
      <Jumbotron className='jumbotron'>
        <h1 className='text'>Welcome to Kratos Billing Systems</h1>
        <p className='text'>
          To begin, upload your time sheet data in CSV format
        </p>
      </Jumbotron>

      <CSVReader
        cssClass='react-csv-input'
        parserOptions={papaparseOptions}
        onFileLoaded={handleFileUpload}
      />
      <Button onClick={handleGenerateReceipt} disabled={timeSheet.length === 0}>
        Generate Receipt
      </Button>

      {selectCompany}
      <br />

      {receipt.length === 0 ? (
        <p>Your receipts will show here</p>
      ) : (
        <Receipt company={company} receipt={receipt} />
      )}
    </div>
  )
}

export default App
