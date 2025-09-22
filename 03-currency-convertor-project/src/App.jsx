import InputBox from "./components/InputBox"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import { useState } from "react"
function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState('inr')
  const [convertedAmt, setConvertedAmt] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)
  console.log(options)
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmt(amount)
    setAmount(convertedAmt)
  }

  const convert = () => { setConvertedAmt(amount * currencyInfo[to]) }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('https://images.pexels.com/photos/259100/pexels-photo-259100.jpeg')` }}>
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">

          <div className="w-full mb-1">
            <InputBox label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectCurrency={from}
            />
          </div>

          <div className="relative w-full h-0.5">
            <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-[#917F3E] text-white px-2 py-0.5"
              onClick={swap}>
              swap
            </button>
          </div>

          <div className="w-full mb-1">
            <InputBox label="To"
              amount={convertedAmt}
              currencyOptions={options}
              onCurrencyChange={(curr) => setTo(curr)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            className="w-full bg-[#917F3E] text-white px-4 py-3 rounded-lg "
            onClick={(e) => {
              e.preventDefault()
              convert()
            }}>Convert {from.toUpperCase()} to {to.toUpperCase()}</button>

        </div>
      </div>
    </div>
  )
}

export default App
