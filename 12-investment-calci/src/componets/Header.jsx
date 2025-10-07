import React from 'react'
import logo from "../assets/investment-calculator-logo.png"

export const Header = () => {
  return (
    <header id='header'>
      <img  src={logo}></img>
      <h1>Investment Calculator</h1>
    </header>
  )
}
