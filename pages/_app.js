import '@/styles/globals.css'
import { useState } from 'react'

export default function App({ Component, pageProps   }) {
  const [faceCount,setFaceCount]=useState(1)
  const [bathCount,setBathCount]=useState(1)
  const [address,setAddress]=useState('')
  const [name,setName]=useState('')
  const [phoneNumber, setPhoneNumber] = useState('');
  return <Component {...pageProps} bathCount={bathCount} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} address={address} setAddress={setAddress} name={name} setName={setName}  setBathCount={setBathCount} faceCount={faceCount } setFaceCount={setFaceCount} />
}
