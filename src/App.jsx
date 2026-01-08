import { useState } from "react";
import Searchinfo from "./searchinfo";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [pincode, setPincode] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter valid 6 digit pincode");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setShow(true);
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const result = await res.json();
      setData(result);
      //setData("");
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Enter Pincode</h1>
      <input
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <div>
        <button onClick={handleClick}>Lookup</button>
      </div>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {show && <Searchinfo data={data} pincode={pincode} />}
    </>
  );
}

export default App;
