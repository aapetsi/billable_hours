import { useState } from 'react'

export const useReceipt = () => {
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
    setReceipt([])
  }

  const handleGenerateReceipt = () => {
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

  return {
    timeSheet,
    company,
    receipt,
    handleGenerateReceipt,
    handleCompanyChange,
    handleFileUpload,
    papaparseOptions
  }
}
