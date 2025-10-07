import React from 'react'
import { calculateInvestmentResults, formatter } from '../util/investment'

export default function Results({ userInput }) {

  let r = calculateInvestmentResults(userInput)
  console.log(userInput)
  let initiall = r[0].valueEndOfYear - r[0].interest - r[0].annual
  return (
    <table id='result'>
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest(Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {r.map((i) => {

          const total = i.valueEndOfYear - i.annual * i.year - initiall;
          const totalAmt = i.valueEndOfYear - total;

          return (<tr tr key={i.year} >
            <td>{i.year}</td>
            <td>{formatter.format(i.valueEndOfYear)}</td>
            <td>{formatter.format(i.interest)}</td>
            <td>{formatter.format(total)}</td>
            <td>{formatter.format(totalAmt)}</td>
          </tr>)
        })}
      </tbody>
    </table >
  )
}