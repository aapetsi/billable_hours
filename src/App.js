import React from 'react'
import CSVReader from 'react-csv-reader'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Receipt from './components/Receipt'
import { Jumbotron, Button } from 'react-bootstrap'
import { useReceipt } from './utils/useReceipt'

const App = () => {
  const {
    handleCompanyChange,
    handleGenerateReceipt,
    company,
    receipt,
    timeSheet,
    papaparseOptions,
    handleFileUpload
  } = useReceipt()

  const selectCompany = (
    <select onChange={handleCompanyChange} disabled={timeSheet.length === 0}>
      <option value=''>Select Company</option>
      {[...new Set(timeSheet.map(x => x.project))].map((item, idx) => (
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
      <div className='container'>
        <div className='inputs'>
          <div data-test='component-generate-receipt'>
            <Button
              data-testid='generate-receipt'
              onClick={handleGenerateReceipt}
              disabled={!company ? true : false}
            >
              Generate Receipt
            </Button>
          </div>

          <div data-testid='select'>{selectCompany}</div>
        </div>
        <br />

        {receipt.length === 0 ? (
          <p data-testid='receipt-none' data-test='component-receipt'>
            Your receipts will show here
          </p>
        ) : (
          <Receipt company={company} receipt={receipt} />
        )}
      </div>
    </div>
  )
}

export default App
