import React, { useState } from 'react'
import { Trash } from 'lucide-react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState('')
  const [operator, setOperator] = useState('')

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Infinity' || display === 'NaN') {
      setDisplay(num)
    } else {
      setDisplay(display + num)
    }
  }

  const handleOperator = (op: string) => {
    setPrevValue(display)
    setOperator(op)
    setDisplay('0')
  }

  const calculate = () => {
    if (!prevValue || !operator) return
    
    const current = parseFloat(display)
    const previous = parseFloat(prevValue)
    
    let result = 0
    
    switch (operator) {
      case '+':
        result = previous + current
        break
      case '-':
        result = previous - current
        break
      case '*':
        result = previous * current
        break
      case '/':
        result = previous / current
        break
    }
    
    setDisplay(result.toString())
    setPrevValue('')
    setOperator('')
  }

  const clear = () => {
    setDisplay('0')
    setPrevValue('')
    setOperator('')
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm">
      <div className="p-4">
        <div className="flex justify-end items-center h-16">
          <span className="text-white text-3xl font-light tracking-wider overflow-x-auto no-scrollbar">
            {display}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-6">
          <button 
            onClick={clear}
            className="col-span-1 bg-white/20 hover:bg-white/30 text-white font-medium py-4 rounded-xl transition-all duration-200"
          >
            <Trash size={24} className="mx-auto" />
          </button>
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn, i) => (
            <button
              key={i}
              onClick={() => {
                if (btn === '=') calculate()
                else if (['+', '-', '*', '/'].includes(btn)) handleOperator(btn)
                else handleNumber(btn)
              }}
              className={`col-span-1 py-4 rounded-xl transition-all duration-200 ${
                ['+', '-', '*', '/', '='].includes(btn)
                  ? 'bg-purple-600/30 hover:bg-purple-600/50 text-purple-100 font-semibold'
                  : 'bg-white/20 hover:bg-white/30 text-white font-medium'
              }`}
            >
              <span className={`text-xl ${btn === '=' ? 'text-purple-100' : ''}`}>
                {btn}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
