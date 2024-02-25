import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState("")
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const paaswordRef=useRef(null)

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxy";
    if (number) { str += "1234567890" }
    if (character) { str += "!@#$%^&*-_+=[]{}~`" }
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      // console.log(char);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, number, character, setPassword])

  
  const passwordCopy = useCallback(()=>{  
    window.navigator.clipboard.writeText(password);
    paaswordRef.current?.select()
    // paaswordRef.current?.setSelectionRange(0,10)
  },[password])

  useEffect(()=>{
    passGenerator()
  },[length,number,character,passGenerator])

  return (
    <div className='bg-black text-black w-full h-screen text-center flex justify-center px-4 py-4'>
      <div className='w-2/4 h-40 bg-slate-400 rounded-xl flex flex-col py-2 items-center'>
        <h1 className='text-xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-black'>
          <input
            type="text"
            value={password}
            className="outline-none w-80 py-1 px-5 " 
            placeholder='Password'
            readOnly
            ref={paaswordRef}/>
          <button
            onClick={passwordCopy}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >copy</button>
        </div>
        <div className='flex justify-center gap-x-2'>
          <input type="range"
            value={length}
            min={6}
            max={100}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }} 
            />
          <label>Length: {length}</label>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={character}
                id="characterInput"
                onChange={() => {
                  setCharacter((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput">Characters</label>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
