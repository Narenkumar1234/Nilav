import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState({});
  const [count, setCount] = useState({});
  const [price, setPrice] = useState({})
  const [faceCount, setFaceCount] = useState(1);
  const [bathCount, setBathCount] = useState(1);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPriceOne, setSelectedPriceOne] = useState();
  const [selectedPriceTwo, setSelectedPriceTwo] = useState();
  const [selectedQtyOne, setSelectedQtyOne] = useState();
  const [selectedQtyTwo, setSelectedQtyTwo] = useState();
  const [isTN, setIsTN] = useState(true);
  const [theme, setTheme] = useState("theme");

  return (
    <Component
      {...pageProps}
      selectedQtyOne={selectedQtyOne}
      setSelectedQtyOne={setSelectedQtyOne}
      selectedQtyTwo={selectedQtyTwo}
      setSelectedQtyTwo={setSelectedQtyTwo}
      selectedPriceOne={selectedPriceOne}
      setSelectedPriceOne={setSelectedPriceOne}
      selectedPriceTwo={selectedPriceTwo}
      setSelectedPriceTwo={setSelectedPriceTwo}
      bathCount={bathCount}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      address={address}
      setAddress={setAddress}
      name={name}
      setName={setName}
      setBathCount={setBathCount}
      faceCount={faceCount}
      setFaceCount={setFaceCount}
      isTN={isTN}
      setIsTN={setIsTN}
      theme={theme}
      setTheme={setTheme}
      count={count}
      setCount={setCount}
      cartItems={cartItems}
      setCartItems={setCartItems}
      price={price}
      setPrice={setPrice}
    />
  );
}
