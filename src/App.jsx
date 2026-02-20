import React, { useState, useCallback, useEffect, useRef} from 'react'

const App = () => {

    const [length,setLength] = useState(8)
    const [numberAllowed,setNumberAllowed] = useState(false)
    const [charAllowed,setCharAllowed] = useState(false)
    const[password,setPassword] = useState("")    


 const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%*-_~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

const passwordReference = useRef(null)

const copyPasswordtoclipboard = ()=> {
  passwordReference.current.select();
  // passwordReference.current.setSelectionRange(0,5)
  window.navigator.clipboard.writeText(password)
}

useEffect(() => { passwordGenerator()}, [length, numberAllowed, charAllowed,passwordGenerator])

  return (
    <div className='w-full h-screen bg-no-repeat bg-cover'
     style={{backgroundImage: `url('https://wallpapers.com/images/hd/hacker-background-nxb1xld1uajt6wsg.jpg')`}}>
   <div className=' h-screen w-full flex justify-center items-center'>
    <div className='w-[700px] bg-black/60 px-8 py-8 backdrop-blur-2xl rounded-xl'>
      <h1 className='text-white text-2xl font-semibold text-center mb-1'>Complex Password generator</h1>
    <div className='flex overflow-hidden gap-2'>
            <input type="text" placeholder='Password' value={password} readOnly ref={passwordReference} className='bg-black text-cyan-300 border border-cyan-600 outline-none w-full h-12 rounded-xl px-4  text-2xl' />
      <button onClick={copyPasswordtoclipboard} className=' px-4 h-12 text-xl  rounded-xl bg-cyan-600 hover:bg-violet-800 text-white font-bold'>copy</button>
    </div>
    <div className='flex gap-x-2 mt-5 justify-evenly items-center'>
      <input className='cursor-pointer accent-cyan-400' type="range" min={8} max={100} defaultValue={8} onChange={(Event) => {setLength(Event.target.value)}} />
      <label className='text-cyan-200 text-xl'>Length: {length}</label>
      <input type="checkbox" defaultChecked={numberAllowed} id='number-input' onChange={()=> { setNumberAllowed((value) => !value)}}  className='size-5 accent-cyan-500'/>
      <label className='text-cyan-200 text-xl'>Number Allowed</label>
      <input type="checkbox" defaultChecked={charAllowed} id='number-input' onChange={()=> {setCharAllowed((value)=>!value)}}  className='size-5 accent-cyan-500'/>
      <label className='text-cyan-200 text-xl'>Characters Allowed</label>
    </div>
    </div>
   </div>
   </div>
  )
}

export default App

// for optimisation use useCallback

//  const passwordGenerator = useCallback(() => {
//     let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//     if (numberAllowed) str += "0123456789"
//     if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

//     for (let i = 1; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length + 1)
//       pass += str.charAt(char)
      
//     }

//     setPassword(pass)


//   }, [length, numberAllowed, charAllowed, setPassword])


// without using useCallback

// const passwordGenerator = () => {
//    let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"  
//     if (numberAllowed) str += "0123456789"
//     if (charAllowed) str += "@#_-"

//     for (let i = 0; i <= length; i++) {
//       let char = Math.floor(Math.random() * str.length + 1)
//       pass += str.charAt(char)
      
//     }

//     setPassword(pass)
// }