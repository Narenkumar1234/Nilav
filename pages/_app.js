import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [cartGrams, setcartGrams] = useState({});
  const [count, setCount] = useState({});
  const [price, setPrice] = useState({});
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTN, setIsTN] = useState(true);
  const [theme, setTheme] = useState("theme");
  const [paymentId, setPaymentId] = useState("");
  return (
    <Component
      {...pageProps}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      address={address}
      setAddress={setAddress}
      name={name}
      setName={setName}
      isTN={isTN}
      setIsTN={setIsTN}
      theme={theme}
      setTheme={setTheme}
      count={count}
      setCount={setCount}
      cartGrams={cartGrams}
      setcartGrams={setcartGrams}
      price={price}
      setPrice={setPrice}
      paymentId1={paymentId}
      setPaymentId1={setPaymentId}
    />
  );
}
