import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const [password , setPassword] = useState("")
  const [length,setLength] = useState(8)
  const [char , setChar] = useState(false)
  const [num , setNum] = useState(false)
  const notify = () => toast.success("Password Copied!");


  const passGen = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(num) { str += "0123456789"}
    if(char) {str += "`~!@#$%^&*()_-+=}]{[|\;:/?.>,<"}

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length)
      pass += str.charAt(index)
    }
    setPassword(pass)
    console.log(str)
  },[length,char,num])

  useEffect(()=>{
    passGen()
  },[length,num,char])

  const copyText = () =>{
    passText.current.select()
    window.navigator.clipboard.writeText(password)
    notify()
  }

  const passText = useRef()

  return (
    <>
    <ToastContainer position="top-center" />
      <div className='w-full h-screen bg-zinc-950 text-white flex items-center justify-center'>
        <div className='bg-zinc-900 py-5 px2 rounded-xl flex flex-col items-center justify-center gap-10'>
          <h1 className='text-3xl font-semibold px-6'>PassWord Generator</h1>
          <div className='flex'>
            <input 
            className='w-[200px] h-[40px] outline-none rounded-l-md text-black px-2 text-xl'
            type="text"
            value={password}
            readOnly
            ref={passText}
            />
            <button
            className='bg-blue-700 px-3 rounded-r-md'
            onClick={copyText}
            >Copy</button>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col items-center justify-center gap-1'>
              <input 
              type="range"  id="len" 
              value={length}
              onChange={(e)=>setLength(e.target.value)}
              min={6}
              max={50}
              />
              <label htmlFor="len">Length : ({length})</label>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <input 
              type="checkbox" id="num" 
              checked={num} // Changed value to checked
              onChange={()=>setNum((prev) => !prev)} // Changed onClick to onChange
              />
              <label htmlFor="num">Numbers</label>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <input 
              type="checkbox" id="char" 
              checked={char} // Changed value to checked
              onChange={()=>setChar((prev) => !prev)} // Changed onClick to onChange
              />
              <label htmlFor="char">Characters</label> {/* Changed htmlFor to match id */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App